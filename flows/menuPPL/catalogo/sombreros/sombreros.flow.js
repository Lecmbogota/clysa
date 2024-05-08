const { addKeyword } = require("@bot-whatsapp/bot");
import { sombreros } from '../../rutas/rutas';

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/IMAGEN_SOMBREROS/_#").addAction(
  async (_, { flowDynamic, gotoFlow }) => {
    console.log("Objeto de URLs:", urls);

    await flowDynamic([sombreros]);

    flowDynamicCompleted = true;

    // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
    if (flowDynamicCompleted) {
      await gotoFlow(require("./sombrerosMenu.flow"));
    }
  }
);