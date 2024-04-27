const { addKeyword } = require("@bot-whatsapp/bot");

let flowDynamicCompleted = false;

const Caballeros = "https://801x8zzp-3001.use2.devtunnels.ms/pdf/CLYSA-Pantalonetas-Caballeros.pdf"
const Damas = "https://801x8zzp-3001.use2.devtunnels.ms/pdf/CLYSA-Pantalonetas-Damas.pdf"
const Parejas= "https://801x8zzp-3001.use2.devtunnels.ms/pdf/CLYSA-Pantalonetas-Parejas.pdf" 
const Ninios = "https://801x8zzp-3001.use2.devtunnels.ms/pdf/CLYSA-Pantalonetas-Ninos.pdf"

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic([
    {
      body: "Catalogo Caballeros",
      media: Caballeros
    },
  ]);
  await flowDynamic([
    {
      body: "Catalogo Damas",
      media: Damas
    },
  ]);
  await flowDynamic([
    {
      body: "Catalogo Parejas",
      media: Parejas
    },
  ]);  
  await flowDynamic([
    {
      body: "Catalogo Niños",
      media: Ninios
    },
  ]);
  // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("./pantalonetasCatalogoMenu.flow"));
  }
});
