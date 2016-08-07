var pkg = require('./package.json');
var program = require('commander');
var fs = require('fs-extra');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var bump = require('gulp-bump');

program
  .version('0.0.1')
  .option('-b, --build [value]', 'Build configuration')
  .parse(process.argv);
  
var config = {
	build: program.build || process.env.GULP_BUILD || "dev"
};


console.log(config);

////////////////////////////////////
var build = {version: pkg.version + '-0'}; // {version: '0.0.0-0'};
var buildJsonFile = './build.json';
var ensureBuildFile = function()
{
    try
    {
        return fs.statSync(buildJsonFile).isFile();
    }
    catch (err)
    {
		fs.writeFileSync(buildJsonFile, JSON.stringify(build));
		console.log("Created new build.json file.");
    }
};
//////////////////////////////////////

var outputDir = './build/' + config.build;

gulp.task('bump', function(){
    ensureBuildFile();
	return gulp.src('./build.json')
		.pipe(bump({type: 'prerelease'}))
		.pipe(gulp.dest('./'));
});

gulp.task('empty', function () {;
	console.log('empty task');
});

gulp.task('script', function() {

    var sources = [
        './src/js/init.js',
        './src/js/model.js',
        './src/js/models/*.js',
        './src/js/services/*.js',
        './src/js/controllers/*.js',
        './src/js/views/*.js',
        './src/js/components/*.js',
        './src/js/startup.js',
    ];

    return gulp.src(sources)
        .pipe(concat('app.js'))
        .pipe(uglify({
            mangle: false,
            compress: false
        }))
        .pipe(gulp.dest(outputDir + '/js'));

});

gulp.task('sass', function () {

    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(outputDir + '/css'));

});

gulp.task('configcss', function(){

    var version = require('./build.json').version;
    var css = "div.app-config-statement{display:block;}div.app-config-statement:before{content:'Version: " + version + ", Build Config: " + config.build + "'}";

    fs.writeFile(outputDir + '/css/config.css', css, function(err) {
        if(err) {
            return console.log(err);
        }
    });

});

gulp.task('copy', function () {
	
	fs.copySync('./src/index.html', outputDir + '/index.html');
	fs.copySync('./bower_components/bootstrap/dist/css/bootstrap.min.css', outputDir + '/css/bootstrap.css');
	fs.copySync('./bower_components/jquery/dist/jquery.min.js', outputDir + '/js/jquery.js');
	fs.copySync('./bower_components/parse-sdk/lib/parse.min.js', outputDir + '/js/parse.js');
	fs.copySync('./bower_components/mithril/mithril.min.js', outputDir + '/js/mithril.js');
	
});

gulp.task('default', ['bump', 'script', 'sass', 'copy', 'configcss']);