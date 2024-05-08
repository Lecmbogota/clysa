const { addKeyword } = require('@bot-whatsapp/bot');
const flujoFinal = require('../../finaliza.flow')
/**
 *  Flujo de catalogo
 */
const flowPreguntas = addKeyword('#_/CATALOGO/_# ')
.addAnswer([
    '👇🏼 *_Selecciona una categoria_*',
    '1️⃣ METODOS DE PAGO.',
    '2️⃣ DONDE ESTAMOS UBICADOS',
    '3️⃣ CUADRO DE MEDIDAS',
    '4️⃣ TELAS',
    '8️⃣ HABLAR CON UN ASESOR',
    '9️⃣ VOLVER AL MENU PRINCIPAL'
], {capture: true, idle: 36000000 }, async (ctx,{fallBack, gotoFlow, inRef}) => {

  if (ctx?.idleFallBack) {
    return gotoFlow(flujoFinal);
  }

    const opcion = parseInt(ctx.body)
    switch(opcion) {
        case 1:
            await gotoFlow(require('./preguntasSub/metodosDePago.flow'))
          break;
        case 2:
            await gotoFlow(require('./preguntasSub/ubicacion.flow'))
          break;
        case 3:
            await gotoFlow(require('./preguntasSub/medidas.flow'))
          break;
        case 4:
            await gotoFlow(require('./preguntasSub/telas.flow'))
          break;
        case 8:
            await gotoFlow(require('../asesor/asesorPreguntas.flow'))
          break;
        case 9:
            await gotoFlow(require('../../bienvenida.flow'))
          break;
        default:
            await fallBack(`⛔ Haz marcado una opcion Invalida, Intenta de nuevo ⛔`)
            await gotoFlow(require('./preguntas.flow'))
          break;
      }
    
})

module.exports = flowPreguntas