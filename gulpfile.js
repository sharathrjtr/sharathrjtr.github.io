var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require('sass'));
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

function scripts() {
    return gulp.src('js/scripts.js')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
}

function styles() {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
}

function watchFiles() {
    gulp.watch('js/*.js', scripts);
    gulp.watch('scss/*.scss', styles);
}

// Export tasks
exports.scripts = scripts;
exports.styles = styles;
exports.watch = gulp.series(gulp.parallel(scripts, styles), watchFiles);
exports.default = gulp.parallel(scripts, styles);
