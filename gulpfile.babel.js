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

var browserifyOpts = {
  entries: ['./src/scripts/index.js'],
  transform: ['babelify'],
};

gulp.task('watchify', function() {
  var opts = Object.assign(watchify.args, browserifyOpts);
  var b = watchify(browserify(opts));
  b.on('update', function(){ bundleJS(b) });
  b.on('log', gutil.log);
  bundleJS(b);
});

gulp.task('browserify', function() {
  var b = browserify(browserifyOpts);
  bundleJS(b);
});

var bundleJS = function(b) {
  var dest = './public';
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
