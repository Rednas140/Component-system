import gulp from "gulp";
const { watch, src, dest } = gulp;
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import prefix from "gulp-autoprefixer";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import minify from "gulp-minify-css"

function clean(cb) {
    // body omitted
    cb();
}

function scss(){
    return src('./src/scss/**/**/*.scss')
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(dest('./web/assets/css'));
}

function javascript (filePath){
    return src(filePath, { allowEmpty: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('web/assets/js'));
}

// watches for JS and CSS files
export const watchSrc = ()=>{
   const scssWatch = watch('./src/scss/**/**/*.scss');
   const jsWatch = watch('./src/js/**/*.js');

    jsWatch.on('all', function (event, filePath){
        console.log(`JS File changed: ${filePath}`);
        javascript(filePath);
    });

    scssWatch.on('all', function (event, filePath){
        console.log(`SCSS File changed: ${filePath}`);
        scss();
    });
};

