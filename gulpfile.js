let gulp = require("gulp");
let rename = require("gulp-rename");
let watch = require("gulp-watch");
let clean = require("gulp-clean-css");
let minify = require("gulp-minify");
let livereload = require("gulp-livereload");
let tinyPNG = require("gulp-tinypng-compress");
let hmtlMin = require("gulp-htmlmin");

gulp.task("watchCSS", ()=>{
    livereload.listen();
    return watch("./src/css/style.css", {ignoreInitial: false})
        .pipe(clean({compatibility: "ie8"}))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./assets/css/"))
        .pipe(livereload(console.log("Start watching CSS...")));
});

gulp.task("watchJS", ()=>{
    livereload.listen();
    return watch("./src/js/main.js", {ignoreInitial: false})
        .pipe(minify())
        .pipe(gulp.dest("./assets/js/"))
        .pipe(livereload(console.log("Start watching JS...")));
});

gulp.task("watchSW", ()=>{
    livereload.listen();
    return watch("./src/js/sw.js", {ignoreInitial: false})
        .pipe(minify())
        .pipe(gulp.dest("./"))
        .pipe(livereload(console.log("Start watching SW...")));
});

gulp.task("watchImage", ()=>{
    livereload.listen();
    return watch("./src/img/*", {ignoreInitial: false})
        .pipe(tinyPNG({
            key: "GIiBwwZEtaA4lb1V4O2zZqVf22jvlxGy",
            sigFile: "images/.tinypng-sigs",
            summarize: true,
            log: true
        }))
        .pipe(gulp.dest("./assets/img/"))
        .pipe(livereload(console.log("Start watching Image...")));
});

gulp.task("htmlMin", ()=>{
    livereload.listen();
    return watch("./src/*.html", {ignoreInitial: false})
        .pipe(hmtlMin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest("./"))
        .pipe(livereload(console.log("Start watching HTML...")))
});

gulp.task("default", gulp.parallel(['watchCSS', 'watchJS','htmlMin', 'watchSW']));
gulp.task("tinyPNG", gulp.parallel(['watchImage']));