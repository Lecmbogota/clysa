const { addKeyword } = require("@bot-whatsapp/bot");
const { telas } = require("../../rutas/rutas");
let flowDynamicCompleted = false;
module.exports = addKeyword("#_/MENU_PANTALONETAS/_#")
  .addAnswer([
    "✅*NUESTRAS TELAS:*",
    "Mira nuestra tela de pantalonetas sublimadas es antifluido por lo tanto de rápido secado🍃, en la parte interna es sensación piel de durazno y la parte externa es tipo drill✨, es una tela muy buena y agradable al tacto, sabemos que entre la calidad de nuestra tela y diseños tenemos la clave de nuestro éxito en ventas, apenas tengas el producto en tus manos lo vas a notar. 😊",
    "",
    "Nuestra tela de pantaloneta unicolor 🔴🟠🟡🟢🔵⚫ es antifluido de muy alta calidad como principal característica su rápido secado, ideal para actividades deportivas, acuáticas o para vestir muy genial y con comodidad✨",
  ])
  .addAction(async (_, { gotoFlow, flowDynamic }) => {
    await flowDynamic([telas]);
    flowDynamicCompleted = true;
    if (flowDynamicCompleted) {
      await gotoFlow(require("../preguntas.flow"));
    }
  });
