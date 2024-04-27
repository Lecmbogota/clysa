const { addKeyword } = require('@bot-whatsapp/bot');

/**
 *  Flujo de catalogo
 */
const flowPreguntas = addKeyword('#_/CATALOGO/_# ')
.addAnswer([
    '👇🏼 *_Selecciona una categoria_*',
    '1️⃣ METODOS DE PAGO.',
    '2️⃣ DONDE ESTAMOS UBICADOS',
    '3️⃣ CUADRO DE MEDIDAS',
    '4️⃣ TELAS',
    '8️⃣ HABLAR CON UN ASESOR',
    '9️⃣ VOLVER AL MENU PRINCIPAL',
    '0️⃣ FINALIZAR'
], {capture: true }, async (ctx,{fallBack, gotoFlow}) => {
    const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
            await gotoFlow(require('../catalogo/sombreros/sombreros.flow'))
          break;
        case 2:
            await gotoFlow(require('./pantalonetas/pantalonetasSub.flow'))
          break;
        case 3:
            await gotoFlow(require('./conjuntosInfantiles/conjuntosInfantiles.flow'))
          break;
        case 8:
            await gotoFlow(require('../asesor/asesorPreguntas.flow'))
          break;
        case 9:
            await gotoFlow(require('../../bienvenida.flow'))
          break;
        case 4:
            await gotoFlow(require('../../finaliza.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('../catalogo/catalogo.flow'))
          break;
      }
    
})

module.exports = flowPreguntas