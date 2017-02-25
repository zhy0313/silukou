const gulp  = require('gulp');
const babel = require('gulp-babel');
const bower = require('gulp-bower');
const sass  = require('gulp-sass');

gulp.task('bower', () => {
  return bower().pipe(gulp.dest('./bower_components'));
});

gulp.task('compile-font-awesome', () => {
  return gulp.
    src('./bower_components/font-awesome/fonts/**.*').
    pipe(gulp.dest('app/fonts'));
});

gulp.task(
  'compile',
  [
    'compile-es6',
    'compile-html',
    'compile-scss',
    'compile-font',
  ]
);

gulp.task('compile-es6', () => {
  return gulp.
    src('src/**/*.js').
    pipe(
      babel({
        presets: ['es2015', 'react'],
        plugins: [
          'syntax-trailing-function-commas',
          'transform-class-properties',
          'transform-inline-environment-variables',
          'transform-object-rest-spread',
        ],
      })
    ).
    pipe(gulp.dest('app'));
});

gulp.task('compile-html', () => {
  return gulp.
    src('src/**/*.html').
    pipe(gulp.dest('app'));
});
//将bootstrap中的字体样式传入，可能以后可以用font awesome的样式
gulp.task('compile-font', () => {
  return gulp.
    src('./bower_components/bootstrap-sass/assets/fonts/**/**.*').
    pipe(gulp.dest('app/fonts'));
});


gulp.task('compile-scss', () => {
  return gulp.
    src('src/**/*.scss').
    pipe(
      sass({
        includePaths: [
          './bower_components/bootstrap-sass/assets/stylesheets',
          './bower_components/font-awesome/scss',
        ],
      }).on('error', sass.logError)
    ).
    pipe(gulp.dest('app'));
});
