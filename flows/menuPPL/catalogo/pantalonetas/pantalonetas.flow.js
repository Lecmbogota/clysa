require("dotenv").config();
const { addKeyword } = require('@bot-whatsapp/bot');


module.exports = addKeyword('#_/MENU_PRINCIPAL_PANTALONETAS/_#')
.addAnswer('📘 CATALOGO DE PRODUCTOS')
.addAnswer([
    '👇🏼 MENU_PANTALONETAS',
    '1️⃣ VER CATALOGOS',
    '2️⃣ VER PRECIOS',
    '9️⃣ VOLVER AL MENU PRINCIPAL'
], {capture: true }, async (ctx,{gotoFlow, flowDynamic}) => {

    const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
          await flowDynamic([
            {
              body: "¡Excelente! Si estás buscando Pantalonetas, aquí tienes algunas opciones que podrían interesarte 🩳",
            },
          ]);
            await gotoFlow(require('./pantalonetasSub/pantalonetasCatalogo.flow'))
          break;
        case 2:
          await flowDynamic([
            {
              body: "¡ Excelente! Te comparto el listado de precios de las pantalonetas 🩳",
            },
          ]);
            await gotoFlow(require('./pantalonetasSub/pantalonetasCatalogoPrecios.flow'))
          break;
        case 8:
            await gotoFlow(require('../../asesor/asesorVentas.flow'))
          break;
        case 9:
            await gotoFlow(require('../../../bienvenida.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('../pantalonetas/pantalonetas.flow'))
          break;
      }
})

 