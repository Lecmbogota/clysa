const { addKeyword } = require("@bot-whatsapp/bot");

module.exports = addKeyword("#_/MENU_PRECIOS_PANTALONETAS/_#")
  .addAnswer([
    "*CONJUNTOS INFANTILES*",
    " ",
    "👾Unidad $25.000",
    "👾Pack X4 $20.500 ($82.000)",
    "👾Pack X6 $19.000 ($114.000)",
    "👾Docena $17.500 ($210.000)",
  ])
  .addAnswer([
    " Si tienes alguna duda, no dudes en Contactar con un Asesor. 😉",
  ])
  .addAnswer(
    [
      "👇🏼 *Por favor, selecciona una opción:*",
      " ",
      "1️⃣ REALIZAR UN PEDIDO",
      "8️⃣ HABLAR CON UN ASESOR",
      "0️⃣ VOLVER AL MENU ANTERIOR",
      "9️⃣ VOLVER AL MENU PRINCIPAL",
    ],
    { capture: true },
    async (ctx, { gotoFlow }) => {
      const opcion = parseInt(ctx.body);
      switch (opcion) {
        case 1:
          await gotoFlow(require("../../../../pedido.flow"));
          break;
        case 8:
          await gotoFlow(require("../../../asesor/asesorVentas.flow"));
          break;
        case 0:
          await gotoFlow(require("../../catalogo.flow"));
          break;
        case 9:
          await gotoFlow(require("../../../../bienvenida.flow"));
          break;
        default:
          await fallBack(
            `⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`
          );
          await gotoFlow(require("../conjuntosInfantilesCatalogoMenu.flow"));
          break;
      }
    }
  );
