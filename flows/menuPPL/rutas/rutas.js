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
const aventura = {
  body: "Sombrero Aventura 🏕",
  media: `${url}/videos/aventuraVideo.mp4`,
  delay: 0,
};
const quickSilver = {
  body: "Sombrero QuickSilver 🌊 🏄🏼‍♀️",
  media: `${url}/videos/quicksilverVideo.mp4`,
  delay: 0,
};
const surfing = {
  body: "Sombrero Surfing 🌊 🏄🏼‍♀️",
  media: `${url}/videos/surfVideo.mp4`,
  delay: 0,
};

const medidas1 = {
  body: "Cuadro de medidas 1",
  media: `${url}/imagen/cuadro1.jpg`,
  delay: 0,
};
const medidas2 = {
  body: "Cuadro de medidas 2",
  media: `${url}/imagen/cuadro2.jpg`,
  delay: 0,
};
const medidas3 = {
  body: "Cuadro de medidas 3",
  media: `${url}/imagen/cuadro3.jpg`,
  delay: 0,
};
const telas = {
  body: "Nuestras Telas",
  media: `${url}/videos/telas.mp4`,
  delay: 0,
};



module.exports = {
  Caballeros,
  Damas,
  Parejas,
  Ninios,
  sombreros,
  aventura,
  quickSilver,
  surfing,
  medidas1,
  medidas2,
  medidas3,
  telas
};
