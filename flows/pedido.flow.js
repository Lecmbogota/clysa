const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
/**
 *  Flujo de bienvenida
 */
module.exports = addKeyword('#_PEDIDOS_#').addAnswer(['👇🏼*Indicacanos referencias y cantidades*' ], { capture: true}, async (ctx) => {
   
} ).addAction(async (_, { gotoFlow }) => {
    return await gotoFlow(require('./menuPPL/asesor/asesorVentas.flow'))
    }
)
;