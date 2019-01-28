const gulp = require('gulp'), //me tarigo gulp
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'), //me traigo todos sus pluggin 
	browserSync = require ('browser-sync');

//Empiezo una tarea
gulp.task('sass', ()=> {
    gulp.src([
    './node_modules/bootstrap/scss/bootstrap.scss',                //ruta donde buscara el archivo
     './scss/*.scss'
     ])    
        .pipe(sass({outputStyle: 'compressed'}))                     // pluggin a utilizar 
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
 });     

gulp.task('js', () => {
  return gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(gulp.dest('./public/js'))
  .pipe(browserSync.stream());
});

gulp.task('server', ['sass'] ,()=> {
    browserSync.init({
    	server: './public'
    });

    gulp.watch([
    	'./node_modules/bootstrap/scss/bootstrap.scss',
    	'./scss/*.scss'
    	], ['sass']);

    gulp.watch('./public/*.html'). on('change', browserSync.reload);

});

gulp.task('font-awesome', () => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('./public/css'));
})

gulp.task('fonts', () => {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('default', ['js', 'server', 'font-awesome', 'fonts'])