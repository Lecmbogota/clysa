const { addKeyword } = require('@bot-whatsapp/bot');

/**
 *  Flujo de catalogo
 */
const flowCatalogo = addKeyword('#_/CATALOGO/_# ')
.addAnswer([
    '*CATALOGO DE PRODUCTOS*',
    ' ',
    '👇🏼 *_Selecciona una categoria_*',
    '1️⃣ SOMBREROS',
    '2️⃣ PANTALONETAS',
    '3️⃣ CONJUNTOS INFANTILES',
    '9️⃣ VOLVER AL MENU PRINCIPAL'
], {capture: true }, async (ctx,{fallBack, gotoFlow, flowDynamic}) => {
    const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
          await flowDynamic([
            {
              body: "¡Excelente! Si estás buscando sombreros, aquí tienes algunas opciones que podrían interesarte 🤠👒",
            },
          ]);
            await gotoFlow(require('./sombreros/sombreros.flow'))
          break;
        case 2:
          await flowDynamic([
            {
              body: "¡Excelente! Si estás buscando pantalonetas, aquí tienes algunas opciones que podrían interesarte 🩳",
            },
          ]);
            await gotoFlow(require('./pantalonetas/pantalonetas.flow'))
          break;
        case 3:
          await flowDynamic([
            {
              body: "¡Excelente! Si estás buscando conjuntos infantiles, aquí tienes algunas opciones que podrían interesarte 👚🩳",
            },
          ]);
            await gotoFlow(require('./conjuntosInfantiles/conjuntosInfantiles.flow'))
          break;
        case 9:
            await gotoFlow(require('../../bienvenida.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('./catalogo.flow'))
          break;
      }
    
})

module.exports = flowCatalogo