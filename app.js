require("dotenv").config();
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");
const Queue = require("queue-promise");
const mimeType = require("mime-types");
const fs = require("node:fs/promises");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const { downloadMediaMessage, delay } = require("@whiskeysockets/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const ServerHttp = require("./src/http");
const ChatwootClass = require("./src/chatwoot/chatwoot.class");
const moment = require("moment-timezone");


// Activar debug
const debug = process.env.DEBUG;

// Horarios de Atencion
const horarioDef = require("./horarios/horarios");

// Flujos de Bienvenida
const bienvenida = require("./flows/bienvenida.flow");

// Flujo fuera de Horario
const fueraHorario = require("./horarios/fueraDeHorario.flow");

// Flujos de Catalogo
const catalogo = require("./flows/menuPPL/catalogo/catalogo.flow");

// Flujos de Catalogo Submenus

const conjuntosInfantiles = require("./flows/menuPPL/catalogo/conjuntosInfantiles/conjuntosInfantiles.flow");

// flujos Pantalonetas 
const pantalonetas = require("./flows/menuPPL/catalogo/pantalonetas/pantalonetas.flow");
const pantalonetasSub = require("./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/pantalonetasCatalogo.flow");
const pantalonetasMenu = require("./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/pantalonetasCatalogoMenu.flow");
const pantalonetasPrecios = require("./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/pantalonetasCatalogoPrecios.flow");



// Flujos de Finaliza Conversacion
const finaliza = require("./flows/finaliza.flow");

// Flujos de Sombreros
const flowSombreros = require("./flows/menuPPL/catalogo/sombreros/sombreros.flow");
const submenusombreros = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/submenuSombreros");
const quicksilver = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/quicksilver.flow");
const surf = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/surf.flow");
const aventura = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/aventura.flow");
const sombrerosMenu = require("./flows/menuPPL/catalogo/sombreros/sombrerosMenu.flow");

// Flujos de preguntas
const preguntas = require("./flows/menuPPL/preguntas/preguntas.flow");
const ubicacion = require("./flows/menuPPL/preguntas/preguntasSub/ubicacion.flow");
const medidas = require("./flows/menuPPL/preguntas/preguntasSub/medidas.flow");
const telas = require("./flows/menuPPL/preguntas/preguntasSub/telas.flow");
const modosDePago = require("./flows/menuPPL/preguntas/preguntasSub/metodosDePago.flow");

// Flujos de pedido
const pedido = require("./flows/pedido.flow");

// Flujos de Asesor Humano
const asesor = require("./flows/menuPPL/asesor/asesorVentas.flow");

const flowPreguntas = require("./flows/menuPPL/preguntas/preguntas.flow");
const asesorPreguntas = require("./flows/menuPPL/asesor/asesorPreguntas.flow");


const { enviarMensajeMultiple } = require('./flows/sendMessage');


const { handlerMessage } = require("./src/chatwoot");

const PORT = process.env.PORT ?? 3001;

function validarHorarioDeAtencion() {
  const diaActual = moment().tz("America/Bogota").day();
  let dia;

  // se valida si el dia actual esta entre lunes y sabado o es domingo
  if (diaActual >= 0 && diaActual <= 6) {
    dia = "1"; // Lunes a Sabados
  } else if (diaActual === 6) {
    dia = "2"; // Domingos
  }

  // se obtiene el horario de atencion para el dia actual
  const horarioDeHoy = Object.values(horarioDef)[dia - 1];

  // se obtiene la hora actual
  const horaActual = moment().tz("America/Bogota").hour();

  // se valida si la hora actual esta dentro del horario de atencion
  if (horaActual >= horarioDeHoy.inicio && horaActual < horarioDeHoy.fin) {
    return true; // Está dentro del horario de atención para hoy
  } else {
    return false; // Está fuera del horario de atención para hoy
  }
}

const flowFiltroHorario = addKeyword(EVENTS.WELCOME).addAnswer('👋 Hola, Gracias por comunicarte con CLYSA')
.addAction(async (ctx, { gotoFlow}) => {
    if (validarHorarioDeAtencion()) {
      gotoFlow(bienvenida);
    } else {
      gotoFlow(fueraHorario);
    }
  }
);

const serverHttp = new ServerHttp(PORT);

const chatwoot = new ChatwootClass({
  account: process.env.CHATWOOT_ACCOUNT_ID,
  token: process.env.CHATWOOT_TOKEN,
  endpoint: process.env.CHATWOOT_ENDPOINT,
});


const queue = new Queue({
  concurrent: 1,
  interval: 500,
});

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowFiltroHorario, catalogo, fueraHorario, bienvenida, finaliza, flowSombreros, quicksilver, surf, aventura, pedido, submenusombreros, sombrerosMenu, asesor, pantalonetas, conjuntosInfantiles, flowPreguntas , asesorPreguntas, pantalonetasSub, pantalonetasMenu, pantalonetasPrecios , preguntas, ubicacion, medidas, telas, modosDePago]);
  const adapterProvider = createProvider(BaileysProvider);

  const bot = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  serverHttp.initialization(bot);

 
  adapterProvider.on("message", (payload) => {
    queue.enqueue(async () => {

      try {
        const attachment = [];
        if (payload?.body.includes("_event_")) {
          const mime =
            payload?.message?.imageMessage?.mimetype ??
            payload?.message?.videoMessage?.mimetype ??
            payload?.message?.documentMessage?.mimetype;
          const extension = mimeType.extension(mime);
          const buffer = await downloadMediaMessage(payload, "buffer");
          const fileName = `file-${Date.now()}.${extension}`;
          const pathFile = `${process.cwd()}/public/${fileName}`;
          await fs.writeFile(pathFile, buffer);
          attachment.push(pathFile);
        }
        if(debug === true){console.log("payload in ", payload);}
        await handlerMessage(
          {
            phone: payload.from,
            name: payload.pushName,
            message: payload.body,
            attachment,
            mode: "incoming",
          },
          chatwoot
        );
      } catch (err) {
        console.error("ERROR", err);
      }
    });
  });

  bot.on("send_message", (payload) => {
    queue.enqueue(async () => {
      if(debug === true){console.log("payload out ", payload);}

      await handlerMessage(
        {
          phone: payload.numberOrId,
          name: payload.pushName,
          message: payload.answer,
          mode: "outgoing",
        },
        chatwoot
      );
    });
  });
};

main();


module.exports =  {chatwoot};