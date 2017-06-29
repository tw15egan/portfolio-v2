const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const surge = require('gulp-surge');

const reload = browserSync.reload;

const src = {
  scss: 'app/scss/**.scss',
  js: 'app/js/*.js',
  html: 'app/index.html',
};

gulp.task('html', () =>
  gulp
    .src(src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist')),
);

gulp.task('sass', () =>
  gulp
    .src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream()),
);

gulp.task('js', () =>
  gulp.src(src.js).pipe(babel()).pipe(uglify()).pipe(gulp.dest('dist')),
);

gulp.task('serve', ['sass', 'html'], () => {
  browserSync.init({
    open: false,
    notify: false,
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html, ['html', reload]);
  gulp.watch(src.js, ['js', reload]);
});

gulp.task('build', ['sass', 'html', 'js']);

gulp.task('deploy', ['build'], () => {
  surge({
    project: './dist',
    domain: 'tjegan.surge.sh',
  });
});
