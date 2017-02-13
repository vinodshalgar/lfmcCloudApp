///
//required  
///
var gulp = require('gulp'),
    uglify= require('gulp-uglify'),
    jshint = require('gulp-jshint');



///
//task
///
gulp.task('scripts',function(){
      console.log('task 1');
    });

gulp.task('lint',function(){
      return gulp.src('app/components/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter(''));
    });


///
//default task
///
gulp.task('default',['scripts','lint']);
