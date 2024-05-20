const { addKeyword } = require('@bot-whatsapp/bot');
const flujoFinal = require('../../../../../finaliza.flow')

module.exports = addKeyword('#_/MENU_PRECIOS_PANTALONETAS/_#').addAnswer(
  [
    '*PANTALONETAS PARA PAREJA*',
    ' ',
    '✌Al detal pareja= $75.000',
    '✌2 parejas = $49.800 ($99.600)',
    'Pack X3 parejas = $47.000 ($141.000)'
  ]
).addAnswer(
  [
    ' Si tienes alguna duda, no dudes en Contactar con un Asesor. 😉'
  ]
).addAnswer([
  '👇🏼 *MARCA UNA OPCION*',
  ' ',
  '1️⃣ VER CATALOGOS',
  '2️⃣ REALIZAR UN PEDIDO',
  '3️⃣ HABLAR CON UN ASESOR',
  '8️⃣ VOLVER AL MENU PRINCIPAL'
], {capture: true, idle: 36000000 }, async (ctx,{gotoFlow, inRef}) => {
  if (ctx?.idleFallBack) {
    return gotoFlow(flujoFinal);
  }
  const opcion = parseInt(ctx.body)
  switch(opcion) {
      case 1:
          await gotoFlow(require('./pantalonetasCatalogo.flow'))
        break;
      case 2:
          await gotoFlow(require('../../../../../pedido.flow'))
        break;
      case 3:
          await gotoFlow(require('../../../../asesor/asesorVentas.flow'))
        break;
      case 8:
          await gotoFlow(require('../../../../../bienvenida.flow'))
        break;
      default:
          await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
          await gotoFlow(require('../pantalonetasCatalogoMenu.flow'))
        break;
    }
}) 