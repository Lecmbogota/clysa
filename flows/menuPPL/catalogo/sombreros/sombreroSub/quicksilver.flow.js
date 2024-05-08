const { addKeyword } = require("@bot-whatsapp/bot");
const { quickSilver } = require('../../../rutas/rutas')

let flowDynamicCompleted = false;
module.exports = addKeyword("#_/QUICKSILVER/_#").addAction(
  async (_, { flowDynamic, gotoFlow }) => {
    await flowDynamic([quickSilver]);
    flowDynamicCompleted = true;
    if (flowDynamicCompleted) {
      await gotoFlow(require("./submenuSombreros"));
    }
  }
);
