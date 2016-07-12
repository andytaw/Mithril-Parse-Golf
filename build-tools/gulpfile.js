var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('script', function() {

    var sources = [
        '../src/js/init.js',
        '../src/js/models/*.js',
        '../src/js/services/*.js',
        '../src/js/controllers/*.js',
        '../src/js/views/*.js',
        '../src/js/components/*.js',
        '../src/js/startup.js',
    ];

    return gulp.src(sources)
        .pipe(concat('app.js'))
        .pipe(uglify({
            mangle: false,
            compress: false
        }))
        .pipe(gulp.dest('../src/js/'));

});

gulp.task('sass', function () {

    return gulp.src('../src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../src/css'));

});

gulp.task('default', ['script', 'sass'])