var gulp = require('gulp'),
    browser_sync = require('browser-sync'),
    swig = require('gulp-swig'),
    sass = require('gulp-sass'),
    auto_prefixer = require('gulp-autoprefixer'),
    px_to_rem = require('gulp-pxtorem'),
    size = require('gulp-size');

gulp.task('serve', function(){
    browser_sync({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: false
    });

    gulp.watch(['./src/assets/scss/**/*.scss'], ['styles']);
    gulp.watch(['./src/*.swig'], ['templates']);
});

gulp.task('styles', function(){
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass({
            // errLogToConsole stops sass errors breaking the task
            errLogToConsole: true,
            precision: 10,
            sourceComments: true,
            stats: true
        }))
        .on('error', function(e){
            console.log(e);
        })
        .pipe(auto_prefixer())
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(browser_sync.reload({
            stream: true
        }))
        .pipe(size({
            title: 'styles'
        }));
});

gulp.task('templates', function(){
    gulp.src('./src/*.swig')
        .pipe(swig({
            defaults: {
                cache: false
            }
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', function(){
            browser_sync.reload()
        })
});

gulp.task('default', ['serve', 'templates', 'styles']);