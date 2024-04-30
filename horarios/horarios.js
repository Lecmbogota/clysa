require("dotenv").config();
/**
 *  se definen los horarios de atención para cada día de la semana
 */
// horarios/horarios.js 
module.exports = {
    lunesSabado: { inicio:  process.env.LUNES_SABADO_INI , fin: process.env.LUNES_SABADO_FIN },
    domingo: { inicio: process.env.DOMINGO_INI, fin: process.env.DOMINGO_FIN }
};
