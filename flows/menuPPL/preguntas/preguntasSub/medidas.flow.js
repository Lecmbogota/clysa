const { addKeyword } = require("@bot-whatsapp/bot");
const { medida1, medida2, medida3 } = require('../../rutas/rutas')

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAnswer([
  "*CUADROS DE MEDIDAS:*",
  "Hola!😊, Manejamos los siguientes cuadros de medidas detallados para que estes más segur@ al momento de hacer tu pedido",
])
.addAction(async (_, { gotoFlow, flowDynamic }) => {

  await flowDynamic([medida1]);
  await flowDynamic([medida2]);
  await flowDynamic([medida3]);
    // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("../preguntas.flow"));
  }
});