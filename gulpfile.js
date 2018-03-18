var gulp = require("gulp"),
  sass = require("gulp-sass"),
  livereload = require("gulp-livereload");

gulp.task("default", function() {
  livereload.listen();
  gulp.watch("./sass/*.sass", function() {
    return gulp
      .src("./sass/*.sass")
      .pipe(sass())
      .pipe(livereload())
      .pipe(gulp.dest("./css"));
  });
  gulp.watch("./*.html", function() {
    return gulp.src("./*.html").pipe(livereload());
  });
  gulp.watch("./js/*.js", function() {
    return gulp.src("./*.html").pipe(livereload());
  });
});
