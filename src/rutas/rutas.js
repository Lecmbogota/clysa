require("dotenv").config();

let url = process.env.URL_DEV || process.env.URL_PROD;

const Caballeros = {
  body: "Catalogo Caballeros",
  media: `${url}/pdf/CLYSA-Pantalonetas-Caballeros.pdf`,
  delay: 0,
};
const Damas = {
  body: "Catalogo Damas",
  media: `${url}/pdf/CLYSA-Pantalonetas-Damas.pdf`,
  delay: 0,
};

const Parejas = {
  body: "Catalogo Parejas",
  media: `${url}/pdf/CLYSA-Pantalonetas-Parejas.pdf`,
  delay: 0,
};

const Ninios = {
  body: "Catalogo Niños",
  media: `${url}/pdf/CLYSA-Pantalonetas-Ninos.pdf`,
  delay: 0,
};

const sombreros = {
    body: "Nuestras referencias en Sombreros 🤠👒",
    media: `${url}/imagen/sombreros.jpg`,
    delay: 0,
  };


module.exports = { 
  Caballeros,
  Damas,
  Parejas,
  Ninios,
  sombreros
 }