
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const catalogo = require('./menuPPL/catalogo/catalogo.flow')
const flujoFinal = require('./finaliza.flow')
require('dotenv').config();

/**
 *  Flujo de bienvenida
 */
module.exports = addKeyword('#_MENU_PRINCIPAL_#')
.addAnswer(
    [   
      '*MENU PRINCIPAL*',
      ' ',
        '👇🏼*Por favor, selecciona una opción:*',
        '1️⃣ CATALOGO DE PRODUCTOS',
        '2️⃣ PREGUNTAS FRECUENTES',
        '3️⃣ VENTAS AL POR MAYOR',
        '4️⃣ HABLAR CON UN ASESOR',
        ' ',
        '(Introduce el número de la opción)'
    ],
    { capture: true, idle: parseInt(process.env.IDLE_TIMEOUT) }, // 6 dias de espera para la respuesta por parte del cliente 
    async(ctx, { fallBack, gotoFlow, inRef  }) => {

      if (ctx?.idleFallBack) {
        return gotoFlow(flujoFinal)
    }
        const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
            await gotoFlow(require('./menuPPL/catalogo/catalogo.flow'))
          break;
        case 2:
            await gotoFlow(require('./menuPPL/preguntas/preguntas.flow'))
          break;
        case 3:
            await gotoFlow(require('./menuPPL/asesor/asesorVentasPorMayor.flow'))
          break;
        case 4:
            await gotoFlow(require('./menuPPL/asesor/asesorPreguntas.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('./bienvenida.flow'))
          break;
      }
    }
);