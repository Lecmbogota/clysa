const { addKeyword } = require('@bot-whatsapp/bot');


module.exports = addKeyword('#_/MENU_PRECIOS_PANTALONETAS/_#').addAnswer(
  [
    '*PANTALONETAS UNICOLOR PARA DAMA Y CABALLERO*',
    ' ',
    '🔴 1 X $28.000',
    '🟠 2 X $45.000',
    '🟢 7 X $105.000',
    '🔵 12 X $162.000'
  ]
).addAnswer(
  [
    ' Si tienes alguna duda, no dudes en Contactar con un Asesor. 😉'
  ]
).addAnswer([
  '👇🏼 *Por favor, selecciona una opción:*',
  ' ',
  '1️⃣ REALIZAR UN PEDIDO',
  '8️⃣ HABLAR CON UN ASESOR',
  '0️⃣ VOLVER AL MENU ANTERIOR',
  '9️⃣ VOLVER AL MENU PRINCIPAL'
], {capture: true }, async (ctx,{gotoFlow,}) => {

  const opcion = parseInt(ctx.body)
  switch(opcion) {
      case 1:
          await gotoFlow(require('../../../../../pedido.flow')) // Realizar un pedido (OPC 1)
        break;
      case 8:
          await gotoFlow(require('../../../../asesor/asesorVentas.flow')) // Hablar con un asesor (OPC 8)
        break;
      case 0:
          await gotoFlow(require('../../pantalonetas.flow')) // Volver al menu anterior (OPC 0)
        break;
      case 9:
          await gotoFlow(require('../../../../../bienvenida.flow')) // Volver menu Principal (OPC 9)
        break;
      default:
          await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
          await gotoFlow(require('../precios/CPPUnicolor'))
        break;
    }
})