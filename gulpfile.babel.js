import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('sass', () => {
  gulp.src('./src/styles/index.scss')
   .pipe(sass())
   .pipe(autoprefixer())
   .pipe(gulp.dest('./public'));
});

gulp.task('default', ['sass'], () => {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});
