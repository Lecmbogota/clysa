const { addKeyword } = require('@bot-whatsapp/bot')
/**
 *  Flujo de finalizacion 
 */
module.exports = addKeyword('#_/FINALIZA/_#').addAction(async (_, { endFlow }) => {
    return endFlow('🎉 ¡Hola! Parece que nuestra conversación ha llegado a su fin. Agradezco mucho tu interés y tiempo dedicado. Antes de despedirnos, te animo a que explores más ofertas y productos increíbles en nuestra página web: https://clysamoda.com/ ¡No te pierdas las oportunidades que te esperan! Si necesitas algo más, ¡aquí estaré! ¡Hasta pronto y que tengas un gran día! 🌟')
    }
)

