var gulp = require('gulp');
var clean = require('gulp-clean');
var traceur = require('gulp-traceur');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var dgeni = require('dgeni');

gulp.task('default', function() {
    // place code for your default task here
    console.log("Now watching changes on the ES6 source files ...");
    watch({glob: 'app/**/*.js',emitOnGlob:false, verbose:true})
            .pipe(plumber())
            .pipe(traceur({sourceMap: true,experimental: false}))
            .pipe(gulp.dest('out/app'));

});

gulp.task('clean', function () {
    return gulp.src('out/app', {read: false})
        .pipe(clean());
});

gulp.task('transpile',function(){
    return gulp.src('app/app.js')
        .pipe(traceur({sourceMap: true,experimental: true}))
        .pipe(gulp.dest('out/app'));
});

gulp.task('dgeni', function() {
    var generateDocs = dgeni.generator('docs/dgeni.conf.js');
    return generateDocs();
});