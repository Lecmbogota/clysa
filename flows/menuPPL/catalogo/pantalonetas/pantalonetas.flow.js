require("dotenv").config();
const { addKeyword } = require("@bot-whatsapp/bot");
const flujoFinal = require('../../../finaliza.flow')
module.exports = addKeyword("#_/MENU_PRINCIPAL_PANTALONETAS/_#")
  .addAnswer(
    [
      "👇🏼 VER CATALOGOS DE PANTALONETAS:",
      "1️⃣ CABALLEROS",
      "2️⃣ DAMAS",
      "3️⃣ PAREJAS",
      "4️⃣ UNICOLOR ECONÓMICA",
      "5️⃣ INFANTIL",
      "9️⃣ VOLVER AL MENU PRINCIPAL",
    ],
    { capture: true, idle: 36000000 },
    async (ctx, { gotoFlow, inRef }) => {

      if (ctx?.idleFallBack) {
        return gotoFlow(flujoFinal);
      }

      const opcion = parseInt(ctx.body);
      switch (opcion) {
        case 1:
          await gotoFlow(
            require("./pantalonetasSub/catalogo/pantalonetasCatalogoCaballeros.flow") // Catalogo Caballeros (OPC 1)
          );
          break;
        case 2:
          await gotoFlow(
            require("./pantalonetasSub/catalogo/pantalonetasCatalogoDamas.flow") // Catalogo Damas (OPC 2)
          );
          break;
        case 3:
          await gotoFlow(
            require("./pantalonetasSub/catalogo/pantalonetasCatalogoParejas.flow") // Catalogo Parejas (OPC 3)
          );
          break;
        case 4:
          await gotoFlow(
            require("./pantalonetasSub/catalogo/pantalonetasCatalogoUnicolor.flow") // Catalogo Unicolor (OPC 4)
          );
          break;
        case 5:
          await gotoFlow(
            require("./pantalonetasSub/catalogo/pantalonetasCatalogoNinios.flow") // Catalogo Infantil (OPC 5)
          );
          break;
        case 9:
          await gotoFlow(require("../../../bienvenida.flow")); // Regresa al menu principal (OPC 9)
          break;
        default:
          await fallBack(
            `⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`
          );
          await gotoFlow(require("../pantalonetas/pantalonetas.flow"));
          break;
      }
    }
  );
