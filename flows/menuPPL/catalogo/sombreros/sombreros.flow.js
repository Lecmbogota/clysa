const { addKeyword } = require("@bot-whatsapp/bot");

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/IMAGEN_SOMBREROS/_#").addAction(
  async (_, { flowDynamic, gotoFlow }) => {
    await flowDynamic([
      {
        body: "Nuestras referencias en Sombreros 🤠👒",
        media: "https://801x8zzp-3001.use2.devtunnels.ms/imagen/sombreros.jpg",
        delay: 0,
      },
    ]);
    flowDynamicCompleted = true;

    // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
    if (flowDynamicCompleted) {
      await gotoFlow(require("./sombrerosMenu.flow"));
    }
  }
);
