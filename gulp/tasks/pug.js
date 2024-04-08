import $ from "../config/plagins.js";
import strip from 'gulp-strip-comments';
// import browserSync from 'browser-sync';

// const reload = browserSync.reload;

const pug = () =>{
  return app.src("src/pug/structure/**/*.pug")
    .pipe(
      $.pug({
        pretty: true,
      })
    )
    .pipe(strip())
    .pipe(app.dest("dist/"))
    .on("end", app.reload);
}

export default pug;
