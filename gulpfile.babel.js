const { gulp, watch, series, src, dest, parallel} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);

function clean(cb) {
    // body omitted
    cb();
}

function scss(path){
    return gulp.src(path)
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('web/assets/css'));
}

function javascript (path){
    return src(path)
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('web/assets/js'));
}
function sassWatcher(){
    const scssWatch = watch('src/scss/**/**/*.scss');

    scssWatch.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
    });

    scssWatch.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
    });

    scssWatch.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
    });
}

function jsWatcher(){
    const jsWatch = watch('src/scss/**/**/*.scss');

    jsWatch.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
    });

    jsWatch.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
    });

    jsWatch.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
    });
}

exports.default = parallel(sassWatcher, jsWatcher);