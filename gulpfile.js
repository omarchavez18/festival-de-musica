// function tarea(done) {
//   console.log("desde la primer tarea");
//   // el "done" da la instruccion de que acabo la tarea.
//   done();
// }
// function tarea2(done) {
//   console.log("desde la segunda tarea");
//   done();
// }

// // la parte despues del punto es el nombre que le dimos y despues del = es el nombre de la tarea asociada a llamar.
// exports.tarea = tarea;
// exports.tarea2 = tarea2;

const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done) {
  /*primer paso, identificar el archivo sass a compilar. para identificarlo se utiliza una API require
const {src} = require('gulp') como arriba*/
  src("src/scss/**/*.scss")
    //
    .pipe(plumber())
    .pipe(sass()) // segundo paso, compilarlo.
    .pipe(dest("build/css")); // tercer paso, almacenarlo.

  done();
}

function dev(done) {
  /*este es el archivo que va a vigilar, identifica el archivo y luego la tarea que manda llamar,
   cuando se realice un cambio en el archivo .scss se ejecutara al momento*/
  // la parte del "**/*" se encarga de revisar todas las carpetas dentro del scss para ejecutar los cambios.
  watch("src/scss/**/*.scss", css);

  done();
}
exports.css = css;
exports.dev = dev;
