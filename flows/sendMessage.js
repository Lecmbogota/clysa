
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const adapterProvider = require('../app')

async function enviarMensajeMultiple(telefonos, mensaje) {
  try {
      for (let telefono of telefonos) {
          const response = await adapterProvider.sendText(
              `${telefono}@c.us`,
              mensaje
          );
          console.log(`Mensaje enviado a ${telefono}:`, response);
      }
      console.log("Todos los mensajes fueron enviados exitosamente.");
  } catch (error) {
      console.error("Ocurrió un error al enviar los mensajes:", error);
  }
}

// Uso de la función
const phoneNumbers = ['573152092535', '573196233749']; // Array de números de teléfono
const mensaje = [
  "Felicitaciones! Ya tienes acceso al curso 🙌"
].join("\n"); // Mensaje a enviar

enviarMensajeMultiple(phoneNumbers, mensaje);


