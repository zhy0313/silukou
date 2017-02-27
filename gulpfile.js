const gulp  = require('gulp');
const babel = require('gulp-babel');
const bower = require('gulp-bower');
const sass  = require('gulp-sass');
var less = require('gulp-less');
var path = require('path');

gulp.task('bower', () => {
  return bower().pipe(gulp.dest('./bower_components'));
});

gulp.task('compile-font-awesome', () => {
  return gulp.
    src('./bower_components/font-awesome/fonts/**.*').
    pipe(gulp.dest('app/static/fonts'));
});

gulp.task(
  'compile',
  [
    'compile-es6',
    'compile-html',
    'compile-less',
    'compile-font',
    'compile-js',
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
    src('./bower_components/bootstrap/fonts/**.*').
    pipe(gulp.dest('app/static/fonts'));
});

gulp.task('compile-js', () => {
  return gulp.
    src('./bower_components/jquery/dist/**.*').
    pipe(gulp.dest('app/static/js'));
});


// gulp.task('compile-scss', () => {
//   return gulp.
//     src('src/**/*.less').
//     pipe(
//       less({
//         paths: [
//           './bower_components/bootstrap/less',
//           './bower_components/font-awesome/less',
//         ],
//       }).on('error', sass.logError)
//     ).
//     pipe(gulp.dest('app'));
// });

//直接编译less，然后通过import引入主css文件中去
gulp.task('compile-less', function () {
  return gulp.src('src/static/*.less')
    .pipe(less({
      paths: [ 
          './bower_components/bootstrap/less',
          './bower_components/font-awesome/less',
      ]
    }))
    .pipe(gulp.dest('app/static'));
});
