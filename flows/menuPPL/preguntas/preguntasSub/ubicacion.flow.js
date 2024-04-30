const { addKeyword } = require("@bot-whatsapp/bot");

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAnswer([
  "✅*NUESTRA UBICACION:*",
  "Hola, tenemos una articulación logística a nivel nacional para hacerte llegar tus pedidos a la puerta de tu casa o Comercio, sin embargo, si deseas una atención presencial👥 estamos ubicados en la ciudad de Bogotá con *sede principal* en el Barrio Boíta Calle 43 sur #72N-29 (Clysa full style en Google Maps) y *Madrugón* bodega Medellín pasillo #3 local 170",
])
.addAction(async (_, { gotoFlow }) => {
    // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("../preguntas.flow"));
  }
});