const { addKeyword } = require("@bot-whatsapp/bot");
const { medidas1, medidas2, medidas3 } = require('../../rutas/rutas')

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAnswer([
  "*CUADROS DE MEDIDAS:*",
  "Hola!😊, Manejamos los siguientes cuadros de medidas detallados para que estes más segur@ al momento de hacer tu pedido",
])
.addAction(async (_, { gotoFlow, flowDynamic }) => {

  await flowDynamic([medidas1]);
  await flowDynamic([medidas2]);
  await flowDynamic([medidas3]);
    // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("../preguntas.flow"));
  }
});