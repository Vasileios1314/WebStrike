/// <binding />
let gulp = require('gulp')
let gulp_sass = require('gulp-sass')(require('sass'))
let gulp_ts = require('gulp-typescript')

let filePaths = {
    sassInputPath: "./Sass/**/*.scss",
    sassOutputPath: "./wwwroot/css",
    tsInputPath: "./scripts/**/*.ts",
    tsOutputPath: "./wwwroot/js",
}

gulp.task('build-sass', () => {
    return gulp.src(filePaths.sassInputPath)
        .pipe(gulp_sass())
        .pipe(gulp.dest(filePaths.sassOutputPath))
})

gulp.task('build-ts', () => {
    return gulp.src(filePaths.tsInputPath)
        .pipe(gulp_ts({
            "noImplicitAny": false,
            "noEmitOnError": true,
            "removeComments": false,
            "sourceMap": true,
            "target": "es6",
            "outDir": "wwwroot/js"
        }))
        .pipe(gulp.dest(filePaths.tsOutputPath))
})

gulp.task('watch', () => {
    gulp.watch(filePaths.sassInputPath, gulp.series('build-sass'))
    gulp.watch(filePaths.tsInputPath, gulp.series('build-ts'))
})

exports.default = gulp.parallel('build-ts', 'build-sass', 'watch')

//var gulp = require("gulp");
//var del = require("del");
//var paths = {
//    scripts: ["scripts/**/*.js", "scripts/**/*.ts", "scripts/**/*.map"],
//};
//gulp.task("clean", function () {
//    return del(["wwwroot/scripts/**/*"]);
//});
//gulp.task("default", function (done) {
//    gulp.src(paths.scripts).pipe(gulp.dest("wwwroot/scripts"));
//    done();
//});

