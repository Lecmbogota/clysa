const { addKeyword, addAnswer, EVENTS ,addChild } = require('@bot-whatsapp/bot');



const flowCatalogo = addKeyword('1').addAnswer('📘 CATALOGO DE PRODUCTOS')
.addAnswer([
    '👇🏼 Selecciona una opcion',
    '1️⃣ SOMBREROS',
    '2️⃣ PANTALONETAS',
    '3️⃣ CONJUNTOS INFANTILES',
    '4️⃣ VOLVER AL MENU ANTERIOR',
    '5️⃣ FINALIZAR'
], {capture: true }, async (ctx,{gotoFlow}) => {

    const numero = ctx.body

    if(numero === '4'){
        // Si existe lo enviamos al flujo de regostrados..
        await gotoFlow(require('./bienvenida.flow'))
    }
})

module.exports = flowCatalogo