const { addKeyword } = require("@bot-whatsapp/bot");

let flowDynamicCompleted = false;

module.exports = addKeyword("#_/MENU_PANTALONETAS/_#").addAnswer([
  "*MÉTODOS DE PAGO:*",
  "En CLYSA nos interesa bastante la comodidad de nuestros clientes al momento de realizar una compra😊, por eso manejamos 3️⃣ métodos de pago para que escojas el que más se ajuste a tus necesidades.",
  "",
  "✅*PAGO ANTICIPADO:*",
  " El pago del total de tú factura se realizará por medio de consignación ✨ (Nequi, Davivienda, Daviplata o Bancolombia) y el flete 🚛 lo podrás pagar una vez te entreguen tu pedido o pagarlo junto con la factura sin ningún recargo adicional, es el método más económico, rápido y efectivo😎.",
  "",
  "✅*PAGO MIXTO:*",
  "Pagas como mínimo el 50% del total de la factura por medio de consignación✨ (Nequi, Daviplata o Bancolombia), el restante lo cancelas por medio de pago contra entrega una vez el tengas el pedido en tus manos😎. Ten en cuenta que el pago mixto tiene un recargo adicional en este caso del 2%. ",
  "",
  "✅*PAGO CONTRA ENTREGA:*",
  "Pagas la totalidad de tu factura💲 y flete🚛 en la puerta de tu casa🏡. Ten en cuenta que este método es uno de los más usados por lo cual hay algunas demoras en las entregas⏳, los fletes suelen ser un poco más costosos y adicional a ello se suma un recargo del 6% al total de la factura por el servicio de recaudo de dinero.",
])
.addAction(async (_, { gotoFlow }) => {
    // Marcar que flowDynamic ha terminado su ejecución
  flowDynamicCompleted = true;

  // Ejecutar la lógica de addAnswer si flowDynamic ya ha completado
  if (flowDynamicCompleted) {
    await gotoFlow(require("../preguntas.flow"));
  }
});
