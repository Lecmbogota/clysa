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
const {
  // GENERAL
  bienvenida, // ok
  finaliza, // ok
  pedido, // ok

  // HORARIO
  horarioDef, // ok
  fueraHorario, // ok

  // MUNU PRINCIPAL
  catalogo,
  flowPreguntas,
  asesorVentasPorMayor,

  //CATALOGO
  pantalonetas,
  sombreros,
  conjuntosInfantiles,

  // SOMBREROS
  quicksilver,
  surf,
  aventura,
  submenusombreros,
  sombrerosMenu,

  // PANTALONETAS
  PantalonetaCCaballero,
  PantalonetaCDamas,
  PantalonetaCParejas,
  PantalonetaCUnicolor,
  PantalonetaCNinios,
  pantalonetaPCaballeros,
  pantalonetaPDamas,
  pantalonetaPParejas,
  pantalonetaPUnicolor,
  pantalonetaPNinios,

  // CONJUNTOS INFANTILES
  conjuntosInfantilesCatalogo,
  conjuntosInfantilesPrecios,

  //ASESORES
  asesor,
  asesorPreguntas,

  preguntas,
  ubicacion,
  medidas,
  telas,
  modosDePago,
} = require("./flowColletions");

// Activar debug
const debug = process.env.DEBUG;

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

const flowFiltroHorario = addKeyword(EVENTS.WELCOME)
  .addAnswer("👋 Hola, Gracias por comunicarte con CLYSA")
  .addAction(async (ctx, { gotoFlow }) => {
    if (validarHorarioDeAtencion()) {
      gotoFlow(bienvenida);
    } else {
      gotoFlow(fueraHorario);
    }
  });

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
  const adapterFlow = createFlow([
      // GENERAL
  bienvenida, // ok
  finaliza, // ok
  pedido, // ok

  // HORARIO
  horarioDef, // ok
  fueraHorario, // ok

  // MUNU PRINCIPAL
  catalogo,
  flowPreguntas,
  asesorVentasPorMayor,

  //CATALOGO
  pantalonetas,
  sombreros,
  conjuntosInfantiles,

  // SOMBREROS
  quicksilver,
  surf,
  aventura,
  submenusombreros,
  sombrerosMenu,

  // PANTALONETAS
  PantalonetaCCaballero,
  PantalonetaCDamas,
  PantalonetaCParejas,
  PantalonetaCUnicolor,
  PantalonetaCNinios,
  pantalonetaPCaballeros,
  pantalonetaPDamas,
  pantalonetaPParejas,
  pantalonetaPUnicolor,
  pantalonetaPNinios,

  // CONJUNTOS INFANTILES
  conjuntosInfantilesCatalogo,
  conjuntosInfantilesPrecios,

  //ASESORES
  asesor,
  asesorPreguntas,

  preguntas,
  ubicacion,
  medidas,
  telas,
  modosDePago,
  ]);
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
        if (debug === true) {
          console.log("payload in ", payload);
        }
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
      if (debug === true) {
        console.log("payload out ", payload);
      }

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

module.exports = { chatwoot };
