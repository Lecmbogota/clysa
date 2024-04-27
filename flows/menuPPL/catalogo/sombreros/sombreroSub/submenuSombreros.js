const { addKeyword } = require("@bot-whatsapp/bot");

module.exports = addKeyword("#_/SUB_MENU_SOMBREROS/_#").addAnswer(
  [
    "👇🏼 Selecciona una opcion",
    "1️⃣ VER OTRO PRODUCTO",
    "2️⃣ REALIZAR PEDIDO",
    "9️⃣ HABLAR CON UN ASESOR",
    "0️⃣ FINALIZAR",
  ],
  { capture: true, delay: 1000 },
  async (ctx, { gotoFlow, fallBack }) => {
    const opcion = parseInt(ctx.body);
    switch (opcion) {
      case 1:
        await gotoFlow(require("../sombrerosMenu.flow"));
        break;
      case 2:
        await gotoFlow(require("../../../../pedido.flow"));
        break;
      case 9:
        await gotoFlow(require("../../../asesor/asesorVentas.flow"));
        break;
      case 0:
        await gotoFlow(require("../../../../finaliza.flow"));
        break;
      default:
        await fallBack(
          `⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`
        );
        await gotoFlow(require("./submenuSombreros"));
        break;
    }
  }
);
