const { addKeyword } = require("@bot-whatsapp/bot");
const { ConjuntosInfantiles } = require('../../../rutas/rutas')
let flowDynamicCompleted = false;
module.exports = addKeyword("#_/MENU_CONJUNTOS_INFANTILES/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([ConjuntosInfantiles]);
  flowDynamicCompleted = true;
  if (flowDynamicCompleted) {
    await gotoFlow(require("../precios/conjuntosInfantilesCatalogoPrecios.flow"));
  }
});
