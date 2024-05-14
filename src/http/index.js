require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Variable para almacenar el estado de autenticación
let authenticated = false;

// Middleware para verificar la autenticación antes de servir la imagen QR
const checkAuth = (req, res, next) => {
  // Si está autenticado, permite el acceso
  if (authenticated) {
    next();
  } else {
    // Si no está autenticado, redirige a la página de inicio de sesión
    res.redirect("/login");
  }
};

class ServerHttp {
  app;
  port;

  constructor(_port = 3001) {
    this.port = _port;
  }

  // Ruta para mostrar el formulario de autenticación
  login = (req, res) => {
    res.send(`
      <form action="/authenticate" method="POST">
          <label for="key">Clave:</label>
          <input type="password" id="key" name="key">
          <button type="submit">Enviar</button>
      </form>
  `);
  };

  // Ruta para autenticar la clave
  authenticate = (req, res) => {
    const providedKey = req.body.key;
    const correctKey = "Clysa.,23"; // Reemplaza 'tu_clave_secreta' con tu clave real
    if (providedKey === correctKey) {
      // Si la clave es correcta, establece el estado de autenticación como verdadero
      authenticated = true;
      // Redirige a la ruta para mostrar la imagen QR
      res.redirect("/scan-qr");
    } else {
      // Si la clave es incorrecta, muestra un mensaje de error
      res.send("Clave incorrecta. Intenta de nuevo.");
    }
  };

  // Ruta para mostrar la imagen QR
  qrCtrl = (req, res) => {
    const pathQrImage = path.join(process.cwd(), `bot.qr.png`);
    const fileStream = fs.createReadStream(pathQrImage);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
    // Reiniciar el estado de autenticación después de un minuto
    setTimeout(() => {
      authenticated = false;
    }, 60000); // 60000 milisegundos = 1 minuto
  };

  // CONTROLADORES PARA ENVIAR ARCHIVOS DE TIPO MULTIMEDIA EN EL CHATBOT
  /**
   *  este es el controlador para mostar el pdf
   * @param {*} req
   * @param {*} res
   */
  getPdf = (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    const rutaArchivoPDF = path.join(
      __dirname,
      "..",
      "..",
      "catalogo",
      nombreArchivo
    ); // Ajustamos la ruta del archivo PDF

    fs.access(rutaArchivoPDF, fs.constants.F_OK, (err) => {
      // Corregir variable rutaArchivo a rutaArchivoPDF
      if (err) {
        console.error(err);
        return res.status(404).send("Archivo no encontrado");
      }

      fs.readFile(rutaArchivoPDF, (err, data) => {
        // Corregir variable rutaArchivo a rutaArchivoPDF
        if (err) {
          console.error(err);
          return res.status(500).send("Error al leer el archivo");
        }

        res.setHeader("Content-Type", "application/pdf");
        res.send(data);
      });
    });
  };
  /**
   *  este es el controlador para mostar la imagen
   * @param {*} req
   * @param {*} res
   */
  getImage = (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    const rutaArchivoImagen = path.join(
      __dirname,
      "..",
      "..",
      "imagenes",
      nombreArchivo
    );

    fs.access(rutaArchivoImagen, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        return res.status(404).send("Imagen no encontrada");
      }
      fs.readFile(rutaArchivoImagen, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al leer la imagen");
        }
        const extension = path.extname(nombreArchivo).toLowerCase();
        let contentType = "image/jpeg";
        if (extension === ".png") {
          contentType = "image/png";
        } else if (extension === ".gif") {
          contentType = "image/gif";
        }
        res.setHeader("Content-Type", contentType);
        res.send(data);
      });
    });
  };

  /**
   *  este es el controlador para mostar el video
   * @param {*} req
   * @param {*} res
   */
  getVideo = (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    const rutaArchivoVideo = path.join(
      __dirname,
      "..",
      "..",
      "videos",
      nombreArchivo
    );

    fs.access(rutaArchivoVideo, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        return res.status(404).send("Video no encontrado");
      }
      fs.readFile(rutaArchivoVideo, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al leer el video");
        }
        // Determinar el tipo de contenido del video según su extensión
        const extension = path.extname(nombreArchivo).toLowerCase();
        let contentType = "video/mp4"; // Predeterminado como MP4, puedes ajustarlo según tus necesidades
        if (extension === ".webm") {
          contentType = "video/webm";
        } else if (extension === ".ogg") {
          contentType = "video/ogg";
        }

        // Establecer el tipo de contenido en la respuesta
        res.setHeader("Content-Type", contentType);
        // Enviar el video
        res.send(data);
      });
    });
  };

  // CONTROLADOR PARA COMUNICARSE CON EL CHATWOOT
  /**
   * Este el controlador del los enventos del Chatwoot
   * @param {*} req
   * @param {*} res
   */
  chatwootCtrl = async (req, res) => {
    const body = req.body;
    const attachments = body?.attachments;
    const customAttributes = body?.custom_attributes;
    const estadoDePedido = customAttributes?.estado_de_pedido;
    const telefonoCliente = customAttributes?.phone_number;
    const guia = customAttributes?.ultima_guia;
    console.log("estado del pedido", estadoDePedido);

    const estado = body?.status;
    const bot = req.bot;
    console.log("body chatwootCtrl: ", body);
    console.log("estado:  ", estadoDePedido);
    try {
      
      if (estadoDePedido ==="en transito"){
        const phone = telefonoCliente.replace(
          "+",
          ""
        );
        console.log("aqui telefono: ",phone);
        const content = `"su pedido se encuentra en transito con la guia N° ${guia}"`
console.log( "contenido del mensaje:", content );
        const response = await bot.providerClass.sendMessage(`${phone}`, content, {});
console.log("respuesta:", response);
        res.send("ok");
        return;
      };

      let currentValueOfTeamId = null;

      if (body?.event === "conversation_updated") {
        const phone = body?.meta?.sender?.phone_number?.replace("+", "");
        const mapperAttributes = body?.changed_attributes;

        let currentValueOfTeamId;

        // Itera sobre los atributos cambiados
        for (const attribute of mapperAttributes) {
          // Verifica si el nodo team_id está presente
          if (attribute?.team_id !== undefined) {
            currentValueOfTeamId = attribute?.team_id?.current_value;
            break; // Una vez encontrado, sal del bucle
          }
        }

        if (
          currentValueOfTeamId === 1 ||
          currentValueOfTeamId === 2 ||
          currentValueOfTeamId === 3
        ) {
          // Agrega el número de teléfono a la lista dinámica y a la lista negra
          console.log(
            `✔ ✔ se agrega el número ${phone} al team ${currentValueOfTeamId}`
          );
          console.log(`✔ ✔ se agrega el número ${phone} a la lista Negra`);
          bot.dynamicBlacklist.add(phone);
        } else if (estado === "resolved") {
          // Remueve el número de teléfono de la lista dinámica y de la lista negra
          console.log(
            `❌❌ se remueve el número ${phone} del team ${currentValueOfTeamId}`
          );
          console.log(`❌❌ se remueve el número ${phone} de la lista Negra`);
          bot.dynamicBlacklist.remove(phone);
        }

        res.send("ok");
        return;
      }
      const checkIfMessage =
        body?.private == false &&
        body?.event == "message_created" &&
        body?.message_type === "outgoing" &&
        body?.conversation?.channel.includes("Channel::Api");
      if (checkIfMessage) {
        const phone = body.conversation?.meta?.sender?.phone_number.replace(
          "+",
          ""
        );
        const content = body?.content ?? "";

        const file = attachments?.length ? attachments[0] : null;
        if (file) {
          await bot.providerClass.sendMedia(
            `${phone}@c.us`,
            file.data_url,
            content
          );
          res.send("ok");
          return;
        }

        await bot.providerClass.sendMessage(`${phone}`, content, {});

        res.send("ok");
        return;
      }

      res.send("ok");
    } catch (error) {
      console.error(error);
      return res.status(405).send("Error");
    }
  };

  /**
   * Incia tu server http sera encargador de injectar el instanciamiento del bot
   */
  initialization = (bot = undefined) => {
    if (!bot) {
      throw new Error("DEBES_DE_PASAR_BOT");
    }
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    // Middleware para analizar el cuerpo de la solicitud
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req, _, next) => {
      req.bot = bot;
      next();
    });

    this.app.post(`/chatwoot`, this.chatwootCtrl);
    this.app.post(`/authenticate`, this.authenticate);

    this.app.get(`/login`, this.login);
    this.app.get("/scan-qr", checkAuth, this.qrCtrl);
    this.app.get("/pdf/:nombreArchivo", this.getPdf);
    this.app.get("/imagen/:nombreArchivo", this.getImage);
    this.app.get("/videos/:nombreArchivo", this.getVideo);

    this.app.listen(this.port, () => {
      console.log(`🦮 Bot Clysa Iniciado`);
    });
  };
}

module.exports = ServerHttp;
