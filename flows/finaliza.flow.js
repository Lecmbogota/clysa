const { addKeyword } = require('@bot-whatsapp/bot')
/**
 *  Flujo de finalizacion 
 */
module.exports = addKeyword('#_/FINALIZA/_#').addAction(async (_, { endFlow }) => {
    return endFlow('🎉 GRACIAS POR SU VISITA 🎉')
    }
)

