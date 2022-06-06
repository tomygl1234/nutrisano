//Es para automatizar tareas
//gulp
const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
//imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");



function css(done) {
  //identificar el archivo de SASS
  src("src/scss/**/*.scss")
    //compilarlo
    .pipe(plumber())
    .pipe(sass())
  //Almacenarlo en el disco duro
    .pipe(dest("build/css"))
  done();
};
function imagenes(done){
  const opciones = {
    optimizationLevel : 3
  }
  src('src/img/**/*.{png, jpg}')
    .pipe( cache( imagemin()))
    .pipe( dest('build/img'))
  done();
}
function versionWebp(done){
  
  const opciones = {
    quality : 50
  };
  
  src('src/img/**/*.{png, jpg}')
    .pipe( webp(opciones) )
    .pipe( dest('build/img'))
  done();
}

function versionAvif(done){
  
  const opciones = {
    quality : 50
  };
  
  src('src/img/**/*.{png, jpg}')
    .pipe( avif(opciones) )
    .pipe( dest('build/img'))
  done();
}


function dev(done){
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);
