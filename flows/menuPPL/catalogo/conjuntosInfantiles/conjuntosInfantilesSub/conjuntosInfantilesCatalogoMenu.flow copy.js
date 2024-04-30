require("dotenv").config();
const { addKeyword } = require('@bot-whatsapp/bot');


module.exports = addKeyword('#_/CATALOGO_MENU/_#').addAnswer([
    '👇🏼 *MARCA UNA OPCION*',
    ' ',
    '1️⃣ CONSULTAR PRECIOS',
    '2️⃣ REALIZAR UN PEDIDO',
    '3️⃣ HABLAR CON UN ASESOR',
    '8️⃣ VOLVER AL MENU PRINCIPAL',
    '0️⃣ FINALIZAR'
], {capture: true }, async (ctx,{gotoFlow,}) => {

    const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
            await gotoFlow(require('./conjuntosInfantilesCatalogoPrecios.flow'))
          break;
        case 2:
            await gotoFlow(require('../../../../pedido.flow'))
          break;
        case 3:
            await gotoFlow(require('../../../asesor/asesorVentas.flow'))
          break;
        case 8:
            await gotoFlow(require('../../../../bienvenida.flow'))
          break;
        case 0:
            await gotoFlow(require('../../../../finaliza.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('./conjuntosInfantilesCatalogoMenu.flow'))
          break;
      }
})

 