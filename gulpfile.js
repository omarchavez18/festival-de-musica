// function tarea(done) {
//   console.log("desde la primer tarea");
// el "done" da la instruccion de que acabo la tarea.
//   done();
// }
// function tarea2(done) {
//   console.log("desde la segunda tarea");
//   done();
// }

// la parte despues del punto es el nombre que le dimos y despues del = es el nombre de la tarea asociada a llamar.
// exports.tarea = tarea;
// exports.tarea2 = tarea2;

//CSS
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done) {
  /*primer paso, identificar el archivo sass a compilar. para identificarlo se utiliza una API require
const {src} = require('gulp') como arriba*/
  src("src/scss/**/*.scss")
    //
    .pipe(plumber())
    .pipe(sass()) // segundo paso, compilarlo.
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build/css")); // tercer paso, almacenarlo.

  done();
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") // esta function busca las imagenes png y jpg en todos los archivos
    .pipe(webp(opciones))
    .pipe(dest("build/img"));

  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") // esta function busca las imagenes png y jpg en todos los archivos
    .pipe(avif(opciones))
    .pipe(dest("build/img"));

  done();
}

function javascript(done) {
  src("src/js/**/*.js").pipe(dest("build/js"));
  done();
}

function dev(done) {
  /*este es el archivo que va a vigilar, identifica el archivo y luego la tarea que manda llamar,
   cuando se realice un cambio en el archivo .scss se ejecutara al momento*/
  // la parte del "**/*" se encarga de revisar todas las carpetas dentro del scss para ejecutar los cambios.
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
