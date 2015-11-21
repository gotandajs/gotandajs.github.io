import gulp         from 'gulp';
import sass         from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import plumber      from 'gulp-plumber';

import gutil        from 'gulp-util';
import rename       from 'gulp-rename';
import gzip         from 'gulp-gzip';

import browserify   from 'browserify';
import watchify     from 'watchify';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import uglify       from 'gulp-uglify';

gulp.task('sass', () => {
  gulp.src('./src/styles/index.scss')
   .pipe(plumber())
   .pipe(sass())
   .pipe(autoprefixer())
   .pipe(gulp.dest('./public'));
});

const browserifyOpts = {
  entries: ['./src/scripts/index.jsx'],
  transform: ['babelify'],
};

gulp.task('watchify', () => {
  let opts = Object.assign(watchify.args, browserifyOpts);
  let b = watchify(browserify(opts));
  b.on('update', () => bundleJS(b) );
  b.on('log', gutil.log);
  bundleJS(b);
});

gulp.task('browserify', () => {
  let b = browserify(browserifyOpts);
  bundleJS(b);
});

let bundleJS = function(b) {
  const dest = './public';
  b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js')).pipe(buffer()).pipe(gulp.dest(dest))
    .pipe(uglify()).pipe(rename({extname:'.min.js'})).pipe(gulp.dest(dest))
    .pipe(gzip()).pipe(rename({extname:'.gz'})).pipe(gulp.dest(dest));
};

gulp.task('watch', ['sass', 'watchify'], () => {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
