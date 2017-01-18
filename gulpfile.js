const gulp = require('gulp');
const del = require('del');
const sequence = require('run-sequence');
const zip = require('gulp-zip');
const lambda = require('gulp-awslambda');

let params = {
  FunctionName: '<YOUR_LAMBDA_FUNCTION>',
  Role: '<YOUR_ROLE_ARN>'
  Description: "Power on your Xbox with Alexa",
  Timeout: 10,
};

let options = {
  region: '<YOUR_AWS_REGION>'
};

// Copy node_modules to 'archive'
gulp.task('copy:modules', () => {
  return gulp.src('./node_modules/**/*').pipe(gulp.dest('./archive/node_modules'));
});

// Copy src to 'archive'
gulp.task('copy:src', () => {
  return gulp.src('./src/**/*').pipe(gulp.dest('./archive'));
});

// Copy package.json to 'archive'
gulp.task('copy:package', () => {
  gulp.src('./package.json').pipe(gulp.dest('./archive/'));
});

// Zip up 'archive'
gulp.task('zip', () => {
  return gulp.src('./archive/**/*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./dist'));
});

// Delete the 'archive' folder
gulp.task('clean', () => {
  return del(['archive']);
});

// Run all build tasks in sequence
gulp.task('build', () => {
  sequence(['copy:modules', 'copy:src', 'copy:package'], 'zip', 'clean');
});

// Deploy to AWS Lambda
gulp.task('deploy', () => {
  return gulp.src('./dist/archive.zip').pipe(lambda(params, options));
});

gulp.task('watch', () => {
  gulp.watch('./src/index.js', ['build']);
});

gulp.task('default', ['build']);
