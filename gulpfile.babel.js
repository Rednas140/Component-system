import gulp from "gulp";
const { watch, src, dest, series } = gulp;
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import prefix from "gulp-autoprefixer";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import minify from "gulp-minify-css";
import plumber from "gulp-plumber";

function clean(cb) {
    // body omitted
    cb();
}

function scss() {
    return src('./src/scss/**/**/*.scss')
        .pipe(plumber())
        .pipe(sass({ style: 'compressed' }))
        .pipe(plumber())
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(dest('./web/assets/css'));
}

function javascript() {
    return src('./src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('./web/assets/js'));
}

// watches for JS and CSS files
const defaultTask = () => {
    const watcher = watch(['./src/scss/**/**/*.scss', './src/js/**/*.js']);
    console.log("Started watching JavaScript and SCSS files");

    watcher.on('all', function (event, filePath) {
        console.log(`File changed: ${filePath}`);

        if (filePath.endsWith('.scss')) {
            console.log("Detected SCSS file change");
            scss();
        } else if (filePath.endsWith('.js')) {
            console.log("Detected JS file change");
            javascript(filePath);
        } else {
            console.log("File type not supported");
        }
    });
};

// Build task
const build = series(clean, scss, javascript);

gulp.task('default', defaultTask);
gulp.task('build', build);