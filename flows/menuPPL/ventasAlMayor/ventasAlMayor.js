const { addKeyword } = require("@bot-whatsapp/bot");

/**
 *  Flujo de catalogo
 */
const flowCatalogo = addKeyword("#_/CATALOGO/_# ")
  .addAnswer([
    "*PANTALONETAS SUBLIMADA PARA CABALLERO*",
    " ",
    "🔷 Mayor a 12 unidades $19.500 ($234.000)",
  ])
  .addAnswer([
    "*PANTALONETAS PARÁ DAMA Y NIÑO*",
    " ",
    "🔷 Mayor a 12 unidades $ 17.000 ($204.000)",
  ]).addAnswer([
    "*PANTALONETAS PAREJAS*",
    " ",
    "✌Mayor a 6 parejas = $36.500 ($219.000)",
  ])
  .addAnswer(
    [
      "*PANTALONETAS UNICOLOR Dama y Caballero*",
      " ",
      "🟡 50 X $625.000",
    ],
    null,
    async (gotoFlow) => {
      await gotoFlow(require("../asesor/asesorVentasPorMayor.flow"));
    }
  )

module.exports = flowCatalogo;
