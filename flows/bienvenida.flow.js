const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const catalogo = require('./menuPPL/catalogo/catalogo.flow')

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
        '8️⃣ HABLAR CON UN ASESOR',
        '0️⃣ FINALIZAR',
        ' ',
        '(Introduce el número de la opción)'
    ],
    { capture: true },
    async(ctx, { fallBack, gotoFlow }) => {
        const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
            await gotoFlow(require('./menuPPL/catalogo/catalogo.flow'))
          break;
        case 2:
            await gotoFlow(require('./menuPPL/preguntas/preguntas.flow'))
          break;
        case 3:
            await gotoFlow(require('./menuPPL/asesor/asesorVetasPorMayor.flow'))
          break;
        case 8:
            await gotoFlow(require('./menuPPL/asesor/asesorVentas.flow'))
          break;
        case 0:
            await gotoFlow(require('../flows/finaliza.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('./bienvenida.flow'))
          break;
      }
    }
);