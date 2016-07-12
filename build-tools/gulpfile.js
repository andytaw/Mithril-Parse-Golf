var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function() {

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