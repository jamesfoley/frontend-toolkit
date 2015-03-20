var gulp = require('gulp'),
    browser_sync = require('browser-sync'),
    swig = require('gulp-swig'),
    sass = require('gulp-sass'),
    auto_prefixer = require('gulp-autoprefixer'),
    px_to_rem = require('gulp-pxtorem'),
    size = require('gulp-size'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify');

gulp.task('serve', function(){
    browser_sync({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: false
    });

    watch('./src/assets/scss/**/*.scss', function(){
        gulp.start('styles')
    })

    watch('./src/assets/js/**/*.js', function(){
        gulp.start('scripts')
    })

    watch('./src/assets/img/**/*', function(){
        gulp.start('images')
    })

    watch('./src/*.swig', function(){
        gulp.start('templates')
    })

});

gulp.task('styles', function(){
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass({
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

gulp.task('templates', ['clean'], function(){
    gulp.src('./src/[^_]*.swig')
        .pipe(swig({
            defaults: {
                cache: false
            }
        }))
        .on('error', function(error){
            console.log(error.message)
        })
        .pipe(gulp.dest('./dist'))
        .on('end', function(){
            browser_sync.reload()
        })
});

gulp.task('scripts', function() {
    gulp.src('./src/assets/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('images', function() {
    gulp.src('./src/assets/img/**/*')
        .pipe(gulp.dest('dist/assets/img'))
})

gulp.task('clean', function(){
    gulp.src('./dist/*.html')
        .pipe(clean())
});

gulp.task('default', ['serve', 'build']);
gulp.task('build', ['templates', 'styles', 'scripts', 'images']);
