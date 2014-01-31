var gulp = require('gulp');
var pkg = require('./package.json');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
// var watch = require('gulp-watch');
// var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
// var zip = require('gulp-zip');
// var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var less = require("gulp-less");
var ftp = require('gulp-ftp');

// lint js
gulp.task('lint', function(){
	gulp.src('./src-js/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

// concatenar e minificar
gulp.task('minify', function(){
	gulp.src('./src-js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});

// less
gulp.task('stylus', function () {
	gulp.src('./src-css/*.styl')
		.pipe(stylus({compress: true}))
		.pipe(gulp.dest('./css'))
		.pipe(livereload(server));
});

// salvando arquivo php e html
gulp.task('php', function(){  
	gulp.src('*.php')
		.pipe(livereload(server));
});

// salvando arquivo php e html
gulp.task('html', function(){  
	gulp.src('*.html')
		.pipe(livereload(server));
});

// livereload
gulp.task('livereload', function(){  
	server.listen(35729, function(err){
		if(err) return console.log(err);
	});
});


gulp.task('default', function(){
	gulp.run('livereload');
	gulp.watch("./assets/js/*.js", function(event){
		gulp.run('lint', 'minify');
	});
	gulp.watch("./assets/css/*.styl", function(event){
		gulp.run('stylus', 'livereload');
	});
	gulp.watch('*.php', function(ev){
		gulp.run('php');
	});
	gulp.watch('*.html', function(ev){
		gulp.run('html');
	});
});

