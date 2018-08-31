var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	image = require('gulp-image'),
	minifyCSS = require('gulp-csso'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps');

// -- gulp tasks
// build html components
gulp.task('html', function(){
	return gulp.src('views/**/*.html')
		.pipe(pug())
		.pipe(gulp.dest('build'))
});

// combile image and optimization
gulp.task('image', function () {
  gulp.src('templates/img/*')
    .pipe(image({
      svgo: true,
      quiet: true, // defaults to false
      optipng: true,
      mozjpeg: true,
      guetzli: true,
      gifsicle: true,
      pngquant: true,
      concurrent: 10,
      zopflipng: true,
      jpegRecompress: true
    }))
    .pipe(gulp.dest('build/image'));
});
 
// build css pages
gulp.task('sass', function () {
	return gulp.src('templates/sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

// build js pages
gulp.task('js', function(){
	return gulp.src('templates/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js'))
});

// -- watch function --
// for reload browser and only bulid for changed files
gulp.task('watch', function () {
	gulp.watch('views/*.html', ['html']);
	gulp.watch('templates/js/**/*.js', ['js']);
	gulp.watch('templates/img/*', ['image']);
	gulp.watch('templates/sass/**/*.scss', ['sass']);
});


gulp.task('default', [ 'html', 'sass', 'js', 'image', 'watch' ]);