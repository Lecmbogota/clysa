const { addKeyword } = require('@bot-whatsapp/bot');
const { asignarEquipo } = require("../../../src/chatwoot");
const ChatwootClass = require("../../../src/chatwoot/chatwoot.class");

const chatwoot = new ChatwootClass({
  account: process.env.CHATWOOT_ACCOUNT_ID,
  token: process.env.CHATWOOT_TOKEN,
  endpoint: process.env.CHATWOOT_ENDPOINT,
});
/**
 *  Flujo para hablar con asesor humano.
 */
const asesorMayor = addKeyword('#').addAnswer([' En un momento uno de nuestros asesores se pondra en contacto contigo'],null, async (_,{ flowDynamic}) => {
    await asignarEquipo(dataIn = { team: 3 }, chatwoot)
})

module.exports = asesorMayor
