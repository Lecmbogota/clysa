const { addKeyword } = require('@bot-whatsapp/bot');
const flujoFinal = require('../../../../../finaliza.flow')

module.exports = addKeyword('#_/MENU_PRECIOS_PANTALONETAS/_#').addAnswer(
  [
    '*PANTALONETAS SUBLIMADA PARA CABALLERO*',
    ' ',
    '🔷 Unidad $39.500',
    '🔷 PACK X3 26.500 ($79.500)',
    '🔷 De 6 a 11 unidades $25.500'
  ]
).addAnswer(
  [
    '*PANTALONETAS PARÁ DAMA Y NIÑO*',
    ' ',
    '🔷 UNIDAD $ 35.500',
    '🔷 PACK X 3 $ 23.300 ($70.000)',
    '🔷 De 6 a 11 unidades $21.500'
  ]
).addAnswer(
  [
    '*PANTALONETAS UNICOLOR Dama y Caballero*',
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