const { addKeyword } = require("@bot-whatsapp/bot");
const { Caballeros } = require('../../../../rutas/rutas');

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  
  await flowDynamic([Caballeros]);
  
  flowDynamicCompleted = true;
  
  if (flowDynamicCompleted) {
    await gotoFlow(require("../precios/CPPCaballero"));
  }

});