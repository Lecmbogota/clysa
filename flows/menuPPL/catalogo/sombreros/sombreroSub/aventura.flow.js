const { addKeyword } = require("@bot-whatsapp/bot");
const { aventura } = require('../../../rutas/rutas');

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/AVENTURA/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([aventura]);
  flowDynamicCompleted = true;
  if (flowDynamicCompleted) {
    await gotoFlow(require("./submenuSombreros"));
  }
});
