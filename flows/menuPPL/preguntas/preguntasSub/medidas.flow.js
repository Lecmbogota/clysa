const { addKeyword } = require("@bot-whatsapp/bot");

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAnswer([
  "*CUADROS DE MEDIDAS:*",
  "Hola!😊, Manejamos los siguientes cuadros de medidas detallados para que estes más segur@ al momento de hacer tu pedido",
])
.addAction(async (_, { gotoFlow, flowDynamic }) => {

  await flowDynamic([
    {
      body: "Cuadro de medidas 1",
      media: "https://801x8zzp-3001.use2.devtunnels.ms/imagen/cuadro1.jpg"
    },
  ]);
  await flowDynamic([
    {
      body: "Cuadro de medidas 2",
      media: "https://801x8zzp-3001.use2.devtunnels.ms/imagen/cuadro2.jpg"
    },
  ]);
  await flowDynamic([
    {
      body: "Cuadro de medidas 3",
      media: "https://801x8zzp-3001.use2.devtunnels.ms/imagen/cuadro3.jpg"
    },
  ]);
    // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("../preguntas.flow"));
  }
});