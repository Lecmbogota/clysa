const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

class ServerHttp {
  app;
  port;

  constructor(_port = 3001) {
    this.port = _port;
  }

  // CONTROLADOR PARA MOSTRAR EL CODIGO QR PARA INICIAR SESION EN EL CHATBOT
  /**
   * este es el controlador para mostar el qr code
   * @param {*} _
   * @param {*} res
   */
  qrCtrl = (_, res) => {
    const pathQrImage = join(process.cwd(), `bot.qr.png`);
    const fileStream = fs.createReadStream(pathQrImage);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
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

    console.log("Ruta del archivo PDF:", rutaArchivoPDF); // Agregar log aquí

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

    console.log("Ruta del archivo PDF:", rutaArchivoImagen);

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

    console.log("Ruta del archivo de video:", rutaArchivoVideo);

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
        console.log("Video enviado correctamente", res);
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
    const bot = req.bot;
    try {
      
      
      let currentValueOfTeamId = null;
      const mapperAttributes = body?.changed_attributes;
      

      if (
        body?.event === "conversation_updated")
      {
        const phone = body?.meta?.sender?.phone_number.replace("+", "");

          // Itera sobre los atributos cambiados
          for (const attribute of mapperAttributes) {
            // Verifica si el nodo team_id está presente
            if (attribute.hasOwnProperty("team_id")) {
              currentValueOfTeamId = attribute.team_id.current_value;
              break; // Una vez encontrado, sal del bucle
            }
          }
        
        if (currentValueOfTeamId === 3 ) {
          
          // Agrega el número de teléfono a la lista dinámica
          console.log("agrega el número de teléfono a la lista Negra");
          bot.dynamicBlacklist.add(phone);
        } 
        if ( currentValueOfTeamId === 6) {
          // Remueve el número de teléfono de la lista dinámica
          console.log("remueve el número de teléfono de la lista Negra");
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
          console.log(`Este es el archivo adjunto...`, file.data_url);
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
      console.log(error);
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

    this.app.use((req, _, next) => {
      req.bot = bot;
      next();
    });

    this.app.post(`/chatwoot`, this.chatwootCtrl);
    this.app.get("/scan-qr", this.qrCtrl);
    this.app.get("/pdf/:nombreArchivo", this.getPdf);
    this.app.get("/imagen/:nombreArchivo", this.getImage);
    this.app.get("/videos/:nombreArchivo", this.getVideo);

    this.app.listen(this.port, () => {
      console.log(`🦮 http://localhost:${this.port}/scan-qr`);
      console.log(`🦮 http://localhost:${this.port}/pdf/:nombreArchivo`);
      console.log(`🦮 http://localhost:${this.port}/imagen/:nombreArchivo`);
      console.log(`🦮 http://localhost:${this.port}/videos/:nombreArchivo`);
    });
  };
}

module.exports = ServerHttp;
