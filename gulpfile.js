  const { src, dest, watch, series, parallel } = require("gulp");
  const concat = require("gulp-concat");
  const uglify = require("gulp-uglify-es").default;
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');
  const cssnano = require('cssnano');
  const imagemin = require('gulp-imagemin');
  const browsersync = require("browser-sync").create();
  const del = require('del');
  const sass = require('gulp-sass');
  sass.compiler = require('node-sass');
  const GulpClient = require("gulp");
  const sourcemaps = require('gulp-sourcemaps');
  const babel = require("gulp-babel");
  
  //Paths
  const files = {
      htmlPath: "src/**/*.html",
      cssPath: "src/**/*.css",
      imagesPath: "src/images/*",
      jsPath: "src/**/*.js",
      sassPath: "src/**/*.scss",
  }
  //Task - Clean Remove the pub folder
  function clean() {
     return del(['pub/']);
  }
  //Task - HTML
  function html() {
      return src(files.htmlPath)
      .pipe(dest('pub'))
      .pipe(browsersync.stream());
  }
  
  //Task - concat and minify js files
  function js() {
      return src(files.jsPath)
      .pipe(concat('main.js'))
      .pipe(babel())
      .pipe(uglify())
      .pipe(dest('pub/js'))
      .pipe(browsersync.stream());
  }
  
  //Task - concat and minify css files
  function css() {
      return src(files.cssPath)
      .pipe(concat('main.css'))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(dest('pub/css'))
      //.pipe(browsersync.stream());
  }
  
  //Task - compress images
  function images() {
      return src(files.imagesPath)
         .pipe(imagemin())
         .pipe(dest('pub/images'))
         //.pipe(browserSync.stream());
   }
  
   //Task - Scss
   function sassTask() {
      return src(files.sassPath)
          .pipe(sourcemaps.init())
          .pipe(concat('main.css'))
          .pipe(sass().on("error", sass.logError))
          .pipe(sourcemaps.write('/.'))
          .pipe(dest("pub/css"))
          //.pipe(browserSync.stream());
  }
  
   //Browsersync and watch
   function serve() {
      browsersync.init({
         server: 'pub/'
      });
  
      watch([files.htmlPath], { intervall: 1000 }, html);
      watch([files.cssPath], { intervall: 1000 }, css);
      watch([files.sassPath], { intervall: 1000 }, sassTask);
      watch([files.jsPath], {intervall: 1000 }, js);
      watch([files.imagesPath], {intervall: 1000 }, images);
  }
  
  /* Export all public tasks */
  exports.clean = clean;
  exports.html = html;
  exports.css = css;
  exports.sassTask = sassTask;
  exports.js = js;
  exports.images = images;
  exports.serve = serve;
  
  /* Export default command */
  exports.default = series(clean, parallel([html, css, sassTask, js, images]), serve);