const { addKeyword } = require("@bot-whatsapp/bot");

let flowDynamicCompleted = false;

const ConjuntosInfantiles = "http://54.39.20.253:3001/pdf/CLYSA-Conjuntos-Infantiles.pdf"


module.exports = addKeyword("#_/MENU_CONJUNTOS_INFANTILES/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([
    {
      body: "Catalogo Conjuntos Infantiles",
      media: ConjuntosInfantiles
    },
  ]);
  // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("./conjuntosInfantilesCatalogoMenu.flow"));
  }
});
