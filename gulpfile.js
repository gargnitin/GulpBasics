var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
//var gulpif = require('gulp-if');
var argv = require('yargs').argv;
//var print = require('gulp-print');
var config = require('./src/gulp-config');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')();
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var taskListing = require('gulp-task-listing');



// you can define config here or in seperate file
/*
var config = {
    js : {
        src : './src/js/*',
        dest : './dest/js/',
        fileName : 'app.js'
    }
    
};*/


gulp.task('default', ['css', 'js', 'inject', 'connect', 'watch'], function(){
    console.log("gulp default task is running");
    
})

gulp.task('help', taskListing);


function cleanup(folderpath){
    return gulp.src(folderpath, {read : false})
        .pipe(clean());
}


gulp.task('js', function(){
    cleanup(config.js.dest);
    
    return gulp.src(config.js.src)
    .pipe($.if(argv.verbose, $.print()))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(config.js.fileName))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest))
})


gulp.task('css', function(){
    cleanup(config.css.dest);
    
    return gulp.src(config.css.src)
    .pipe(plumber())
    //.pipe(uglify())
    //.on('error', console.error.bind(console))
    .pipe(gulp.dest(config.css.dest))
})

gulp.task('html', function(){
    cleanup(config.injectConfig.destAllHtml);
    
    return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dest))
})

gulp.task('inject', ['html'], function(){
    var sources = gulp.src([config.injectConfig.destAllJs, config.injectConfig.destAllCss], {read: false});
    
    return gulp.src(config.injectConfig.destAllHtml)
    .pipe(inject(sources, {relative : true}))
    .pipe(gulp.dest(config.html.dest))
})


gulp.task('watch', ['browser-sync'], function(){
    //livereload.listen();
    var watcher = gulp.watch(config.js.src, ['js']).on('change', browserSync.reload);;
    var cssWatcher = gulp.watch(config.css.src, ['css']).on('change', browserSync.reload);;
    var htmlWatcher = gulp.watch(config.html.src, ['html']).on('change', browserSync.reload);
    
    watcher.on('change', function(event){
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }) 
    
    cssWatcher.on('change', function(event){
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
    
    htmlWatcher.on('change', function(event){
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
})


gulp.task('connect', function(){
    connect.server({
       port: 9005,
        root : 'dest'
    });
})


gulp.task('browser-sync', function() {

    browserSync.init({
        proxy: config.browserSyncConfig.dev
    });
    
    //browserSync(options);
});


/*
//if you want to run task once child task is finished
// call dependent child in [] and return stream.
// use returned output in parent

gulp.task('uglify', ['concat'], function(){
    console.log("gulp uglify is running");

    gulp.src('./src/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dest/js/'));
})


gulp.task('concat', function(){
    console.log("gulp concat is running");
    
    return gulp.src('./src/js/*')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./src/js/'))
})
*/


/*
gulp.task('runtasks', ['secondtask'], function(){
    console.log("gulp runtasks is running");
})

gulp.task('firsttask', function(){
    return console.log("i will run first");    
})


gulp.task('secondtask', ['firsttask'], function(){
    return console.log("i will run second");
})
*/
