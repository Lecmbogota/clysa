/**
 *  [ Genenal ]
 */
const bienvenida = require("./flows/bienvenida.flow");
const finaliza = require("./flows/finaliza.flow");
const pedido = require("./flows/pedido.flow");

/**
 *  [ Horario ]
 */
const horarioDef = require("./horarios/horarios");
const fueraHorario = require("./horarios/fueraDeHorario.flow");

/**
 *  [ Menu principal ]
 */
const catalogo = require("./flows/menuPPL/catalogo/catalogo.flow");
const flowPreguntas = require("./flows/menuPPL/preguntas/preguntas.flow");
const asesorVentasPorMayor = require("./flows/menuPPL/ventasAlMayor/ventasAlMayor");

/**
 *  [ Catalogo ]
 */
const sombreros = require("./flows/menuPPL/catalogo/sombreros/sombreros.flow");
const pantalonetas = require("./flows/menuPPL/catalogo/pantalonetas/pantalonetas.flow");
const conjuntosInfantiles = require("./flows/menuPPL/catalogo/conjuntosInfantiles/conjuntosInfantiles.flow");

/**
 *  [ Preguntas Frecuentes ]
 */
const ubicacion = require("./flows/menuPPL/preguntas/preguntasSub/ubicacion.flow");
const medidas = require("./flows/menuPPL/preguntas/preguntasSub/medidas.flow");
const telas = require("./flows/menuPPL/preguntas/preguntasSub/telas.flow");
const modosDePago = require("./flows/menuPPL/preguntas/preguntasSub/metodosDePago.flow");

/**
 *  [ Sombreros ]
 */
const sombrerosMenu = require("./flows/menuPPL/catalogo/sombreros/sombrerosMenu.flow");
const quicksilver = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/quicksilver.flow");
const surf = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/surf.flow");
const aventura = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/aventura.flow");
const submenusombreros = require("./flows/menuPPL/catalogo/sombreros/sombreroSub/submenuSombreros");

/**
 *  [ Pantalonetas Catalogos ]
 */
const PantalonetaCCaballero = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/catalogo/pantalonetasCatalogoCaballeros.flow')
const PantalonetaCDamas = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/catalogo/pantalonetasCatalogoDamas.flow')
const PantalonetaCParejas = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/catalogo/pantalonetasCatalogoParejas.flow')
const PantalonetaCUnicolor = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/catalogo/pantalonetasCatalogoUnicolor.flow')
const PantalonetaCNinios = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/catalogo/pantalonetasCatalogoNinios.flow')

/**
 *  [ Pantalonetas Precios ]
 */
const pantalonetaPCaballeros = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/precios/CPPCaballero')
const pantalonetaPDamas = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/precios/CPPDamas')
const pantalonetaPParejas = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/precios/CPPParejas')
const pantalonetaPUnicolor = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/precios/CPPUnicolor')
const pantalonetaPNinios = require('./flows/menuPPL/catalogo/pantalonetas/pantalonetasSub/precios/CPPNinios')


/**
 *  [ Conjuntos Infantiles ]
 */
const conjuntosInfantilesCatalogo = require("./flows/menuPPL/catalogo/conjuntosInfantiles/conjuntosInfantilesSub/catalogo/conjuntosInfantilesCatalogo.flow");

/**
 *  [ Conjuntos Infantiles Precios ]
 */
const conjuntosInfantilesPrecios = require("./flows/menuPPL/catalogo/conjuntosInfantiles/conjuntosInfantilesSub/precios/conjuntosInfantilesCatalogoPrecios.flow");



/**
 *  [ Asesor Humano ]
 */
const preguntas = require("./flows/menuPPL/preguntas/preguntas.flow");
const asesor = require("./flows/menuPPL/asesor/asesorVentas.flow");
const asesorPreguntas = require("./flows/menuPPL/asesor/asesorPreguntas.flow");

module.exports = {
  // GENERAL
  bienvenida, // ok
  finaliza, // ok
  pedido, // ok

  // HORARIO
  horarioDef, // ok
  fueraHorario, // ok

  // MUNU PRINCIPAL
  catalogo,
  flowPreguntas,
  asesorVentasPorMayor,

  //CATALOGO
  pantalonetas,
  sombreros,
  conjuntosInfantiles,

  // SOMBREROS
  quicksilver,
  surf,
  aventura,
  submenusombreros,
  sombrerosMenu,

  // PANTALONETAS
  PantalonetaCCaballero,
  PantalonetaCDamas,
  PantalonetaCParejas,
  PantalonetaCUnicolor,
  PantalonetaCNinios,
  pantalonetaPCaballeros,
  pantalonetaPDamas,
  pantalonetaPParejas,
  pantalonetaPUnicolor,
  pantalonetaPNinios,

  // CONJUNTOS INFANTILES
  conjuntosInfantilesCatalogo,
  conjuntosInfantilesPrecios,

  //ASESORES
  asesor,
  asesorPreguntas,

  preguntas,
  ubicacion,
  medidas,
  telas,
  modosDePago,
};
