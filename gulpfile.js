var gulp = require('gulp'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),
	image = require('gulp-image'),
	minifyCSS = require('gulp-csso'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps');

// -- gulp tasks for watch and build for one time
// build html pages and components
gulp.task('html', function(){
	return gulp.src('views/*.html')
		.pipe(gulp.dest('app'))
});

// combile images
gulp.task('image', function () {
  gulp.src('templates/img/*')
    .pipe(gulp.dest('app/image'));
});
 
// build css pages
gulp.task('sass', function () {
	return gulp.src('templates/sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest('app/css'));
});

// build js pages
gulp.task('js', function(){
	return gulp.src('templates/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/js'))
});

// gulp taskes for build final releas to production
// build html pages
gulp.task('html', function(){
	return gulp.src('views/*.html')
		.pipe(gulp.dest('build'));
});

// build and minify css and fonts
gulp.task('cssMinify', function () {
	return gulp.src('templates/sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

// build js pages
gulp.task('jsMinify', function(){
	return gulp.src('templates/js/*.js')
		.pipe(gulp.dest('build/js'));
});

// export and compress images
gulp.task('imageCompress', function () {
  gulp.src('templates/img/*')
  .pipe(image({
      svgo: true,
      quiet: true,
      optipng: true,
      mozjpeg: true,
      guetzli: true,
      gifsicle: true,
      pngquant: true,
      concurrent: 10,
      zopflipng: true,
      jpegRecompress: true
    }))
    .pipe(gulp.dest('bild/image'));
});


// -- watch function --
// for reload browser and only bulid for changed files
gulp.task('watch', function () {
	gulp.watch('views/*.html', ['html']);
	gulp.watch('templates/js/**/*.js', ['js']);
	gulp.watch('templates/img/*', ['image']);
	gulp.watch('templates/sass/**/*.scss', ['sass']);
});

// gulp build for one time
gulp.task('default', [ 'html', 'sass', 'js', 'image' ]);

// gulp build and watch -- run project --
gulp.task('run', [ 'html', 'sass', 'js', 'image', 'watch' ]);

// gulp minified and compress all files
gulp.task('production', [ 'html', 'cssMinify', 'jsMinify', 'imageCompress' ]);