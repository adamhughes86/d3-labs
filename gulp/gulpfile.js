var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var assetsPath = '../public/assets';

gulp.task('css', function () {
 return gulp.src(assetsPath + '/src/sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(assetsPath + '/build/css'));
});

gulp.task('default', ['css'],  function() {
  console.log('Gulp Default');
});

gulp.task('watch', ['css'], function (){
  console.log("Gulp is keeping it's eyes peeled for changes");
  gulp.watch(assetsPath + '/src/sass/**/*', ['css']);
});
