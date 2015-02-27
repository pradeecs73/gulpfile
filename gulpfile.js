var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha=require('gulp-mocha'),
    istanbul = require('gulp-istanbul');

gulp.task('default', ['test','lint','mocha']);


gulp.task('test',function () {

       var coverageSrc = [
       'app.js',
      'public/js/*.js',
      'public/js/controller/*.js',
      'public/js/model/*.js',
      'routes/*.js'
        ];
        
    return gulp.src(coverageSrc)
    .pipe(istanbul({ includeUntested: true }))      
        .pipe(istanbul.writeReports({
          dir: './gulpcodecoverage',
          reportOpts: {
            dir: './gulpcodecoverage'
          },
          reporters: ['text-summary','html']
        }));
          
    });

 

gulp.task('lint',['test'],function() {

  var lintSrc = [
      'app.js',
      'public/js/*.js',
      'public/js/controller/*.js',
      'public/js/model/*.js',
      'routes/*.js'
  ];

  return gulp.src(lintSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: __dirname + '/gulpcodecoverage/jshint-output.html'
    }));
});
 


gulp.task('mocha',['test','lint'],function () {

   var exec = require('child_process').exec;

  
exec('sh gulp/start.sh', function(error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});

console.log("server started");

var delay=1000;//1 seconds
    setTimeout(function(){

  var mochaSrc = [
      'gulp/test.js'
  ];

    console.log("mocha started"); 

    gulp.src(mochaSrc,{read: false}).pipe(mocha({reporter: 'spec'}))
   
       },delay); 

  
});







  




