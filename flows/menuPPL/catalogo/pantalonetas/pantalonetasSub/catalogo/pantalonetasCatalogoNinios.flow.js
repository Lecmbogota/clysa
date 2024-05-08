const { addKeyword } = require("@bot-whatsapp/bot");
const { Ninios } = require('../../../../rutas/rutas');

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([Ninios]);

  // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("../precios/CPPNinios"));
  }

});
