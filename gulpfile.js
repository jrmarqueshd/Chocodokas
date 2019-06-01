let gulp = require("gulp");
let rename = require("gulp-rename");
let watch = require("gulp-watch");
let clean = require("gulp-clean-css");
let minify = require("gulp-js-minify");
// let pipeline = require("readable-stream").pipeline;
let livereload = require("gulp-livereload");

gulp.task("watchCSS", ()=>{
    livereload.listen();
    return watch("./css/style.css", {ignoreInitial: false})
        .pipe(clean({compatibility: "ie8"}))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./assets/css/"))
        .pipe(livereload(console.log("Start watching CSS...")));
});

gulp.task("watchJS", ()=>{
    livereload.listen();
    return watch("./js/main.js", {ignoreInitial: false})
        .pipe(minify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest("./assets/js/"))
        .pipe(livereload(console.log("Start watching JS...")));
});

gulp.task("default", gulp.parallel(['watchCSS', 'watchJS']));