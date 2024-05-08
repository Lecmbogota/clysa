const { addKeyword } = require('@bot-whatsapp/bot')
/**
 *  Flujo de finalizacion 
 */
module.exports = addKeyword('#_/FINALIZA/_#').addAction(async (_, { endFlow }) => {
    return endFlow('🎉 ¡Gracias por tu interés! Parece que nuestra sesión ha llegado a su fin. ¿Deseas seguir explorando? Visita https://clysamoda.com/ para descubrir más ofertas. ¡Nos encantaría verte de vuelta! 🌟')
    }
)

