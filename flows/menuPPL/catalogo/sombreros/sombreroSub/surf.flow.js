const { addKeyword } = require("@bot-whatsapp/bot");
const { surfing } = require("../../../rutas/rutas");
let flowDynamicCompleted = false;
module.exports = addKeyword("#_/SOMBRERO_SURF/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([surfing]);
  flowDynamicCompleted = true;
  if (flowDynamicCompleted) {
    await gotoFlow(require("./submenuSombreros"));
  }
});
