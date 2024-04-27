const { addKeyword } = require("@bot-whatsapp/bot");

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/QUICKSILVER/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([
    {
      body: "Sombrero QuickSilver 🌊 🏄🏼‍♀️",
      media: "https://801x8zzp-3001.use2.devtunnels.ms/videos/quicksilverVideo.mp4"
    },
  ]);

  // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("./submenuSombreros"));
  }
});

