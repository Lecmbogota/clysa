const { addKeyword } = require("@bot-whatsapp/bot");
import { Caballeros, Damas, Parejas, Ninios } from '../../../rutas/rutas';

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([Caballeros]);
  await flowDynamic([Damas]);
  await flowDynamic([Parejas]);
  await flowDynamic([Ninios]);

  // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("./pantalonetasCatalogoMenu.flow"));
  }

});
