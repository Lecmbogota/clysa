const { addKeyword } = require('@bot-whatsapp/bot');

/**
 *  Flujo de catalogo
 */
const flowCatalogo = addKeyword('#_/CATALOGO/_# ')
.addAnswer([
    '👇🏼 *_Selecciona una categoria_*',
    '1️⃣ SOMBREROS',
    '2️⃣ PANTALONETAS',
    '3️⃣ CONJUNTOS INFANTILES',
    '9️⃣ VOLVER AL MENU ANTERIOR',
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

module.exports = flowCatalogo