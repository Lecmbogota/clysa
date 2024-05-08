const { addKeyword } = require("@bot-whatsapp/bot");

const flowSombrerosMenu = addKeyword("#_/SOMBREROS/_#")
  .addAnswer([])
  .addAnswer(
    [
      "👇🏼 Por favor, selecciona una categoría para ver mas detalles:",
      " ",
      "1️⃣ QUICKSILVER",
      "2️⃣ SURFING",
      "3️⃣ AVENTURA",
      "4️⃣ REALIZAR UN PEDIDO",
      "9️⃣ VOLVER AL MENU PRINCIPAL"
    ],
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic, state }) => {
      const opcion = parseInt(ctx.body);
      switch (opcion) {
        case 1:
          const opt = 
          await flowDynamic([
            "PRECIOS DE SOMBREROS QUICKSILVER 🏄🏼‍♀️",
            "🔵 Unidad $65.000",
            "🔵 2 unidades $118.000 (59.000)",
            "🔵 6 unidades o mas $55.000",
          ]);
          await gotoFlow(require("./sombreroSub/quicksilver.flow"));
          break;
        case 2:
          await flowDynamic([
            "PRECIOS DE SOMBREROS SURFING 🏄🏼‍♀️",
            "🔵 Unidad $65.000",
            "🔵 2 unidades $118.000 (59.000)",
            "🔵 6 unidades o mas $55.000",
          ]);
          await gotoFlow(require("./sombreroSub/surf.flow"));
          break;
        case 3:
          await flowDynamic([
            "PRECIOS DE SOMBREROS AVENTURA 🏄🏼‍♀️",
            "🔵 Unidad $55.000",
            "🔵 2 unidades $98.000 (49.000)",
            "🔵 6 unidades o mas $45.000",
          ]);
          await gotoFlow(require("./sombreroSub/aventura.flow"));
          break;
        case 4:
          await gotoFlow(require("../../../pedido.flow"));
          break;
        case 9:
          await gotoFlow(require("../../../bienvenida.flow"));
          break;
        default:
          await fallBack(
            `⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`
          );
          //await gotoFlow(require('../catalogo/catalogo.flow'))
          break;
      }
    }
  );

module.exports = flowSombrerosMenu;
