const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

// Define paths
const srcDir = "./"; // Source directory where your style.sass file is located
const destDir = "./"; // Destination directory where you want the compiled style.css to be saved

// Compile Sass to CSS
function compileSass() {
  return src(["**/*.sass", "**/*.scss"]) // Select all Sass files in all folders
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(dest(destDir))
    .pipe(browserSync.stream());
}

// Watch for changes in Sass files
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  watch(["**/*.sass", "**/*.scss"], compileSass); // Watch all Sass files in all folders
  watch("*.html").on("change", browserSync.reload);
}

// Define the default task
exports.default = watchFiles;