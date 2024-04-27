const { addKeyword } = require('@bot-whatsapp/bot');
const horarioDef = require('./horarios');

/**
 * Flujo para responder con el horario de atención
 */
module.exports = addKeyword('#_/HORARIO/_#').addAnswer([ 
    'Nuestro Horario de Atencion es:',
    `Lunes a Sábado:  ${horarioDef.lunesSabado.inicio}:00 AM - ${horarioDef.lunesSabado.fin - 18}:30 PM`,
    `Domingo:    ${horarioDef.domingo.inicio}:00 AM - ${horarioDef.domingo.fin - 12}:00 PM`,
], async (_, { gotoFlow }) => {
    await gotoFlow(flowCatalogo)
});


