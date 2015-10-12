import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';

gulp.task('sass', () => {
  gulp.src('./src/styles/index.scss')
   .pipe(plumber())
   .pipe(sass())
   .pipe(autoprefixer())
   .pipe(gulp.dest('./public'));
});

gulp.task('default', ['sass'], () => {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});
