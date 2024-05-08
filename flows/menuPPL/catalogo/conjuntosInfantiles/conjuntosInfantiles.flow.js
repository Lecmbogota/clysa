require("dotenv").config();
const { addKeyword } = require('@bot-whatsapp/bot');


module.exports = addKeyword('#_/MENU_PRINCIPAL_CONJUNTOS_INFANTILES/_#')
.addAnswer([
    '👇🏼 SELECCIONA UNA OPCION',
    '1️⃣ VER CATALOGOS',
    '2️⃣ VER PRECIOS',
    '9️⃣ VOLVER AL MENU PRINCIPAL'
], {capture: true }, async (ctx,{gotoFlow, flowDynamic}) => {

    const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
          await flowDynamic([
            {
              body: "¡Excelente! Si estás buscando Conjuntos Infantiles, aquí tienes algunas opciones que podrían interesarte 🛍",
            },
          ]);
            await gotoFlow(require('./conjuntosInfantilesSub/catalogo/conjuntosInfantilesCatalogo.flow'))
          break;
        case 2:
          await flowDynamic([
            {
              body: "¡ Excelente! Te comparto el listado de precios de las Conjuntos Infantiles 🛍",
            },
          ]);
            await gotoFlow(require('./conjuntosInfantilesSub/precios/conjuntosInfantilesCatalogoPrecios.flow'))
          break;
        case 8:
            await gotoFlow(require('../../asesor/asesorVentas.flow'))
          break;
        case 9:
            await gotoFlow(require('../../../bienvenida.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('../conjuntosInfantiles/conjuntosInfantiles.flow'))
          break;
      }
})

 