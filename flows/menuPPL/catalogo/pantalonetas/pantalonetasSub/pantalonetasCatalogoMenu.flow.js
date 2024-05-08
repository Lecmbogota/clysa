require("dotenv").config();
const { addKeyword } = require('@bot-whatsapp/bot');


module.exports = addKeyword('#_/MENU_PRINCIPAL_PANTALONETAS/_#').addAnswer([
    '👇🏼 *MARCA UNA OPCION*',
    ' ',
    '1️⃣ CONSULTAR PRECIOS',
    '2️⃣ REALIZAR UN PEDIDO',
    '3️⃣ HABLAR CON UN ASESOR',
    '8️⃣ VOLVER AL MENU PRINCIPAL'
], {capture: true }, async (ctx,{gotoFlow,}) => {

    const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
            await gotoFlow(require('./pantalonetasCatalogoPrecios.flow'))
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
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('./pantalonetasCatalogoMenu.flow'))
          break;
      }
})

 