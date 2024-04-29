import $ from "../config/plagins.js";
import strip from 'gulp-strip-comments';


export const pug = async () => {
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


export const pugBuild = async () => {
  const assets = await import ("../../dist/assets.json", {assert: {type: "json"}});
  return app.src("src/pug/structure/**/*.pug")
    .pipe(
      $.pug({
        pretty: true,
      })
    )
    .pipe($.replace('main.min.js', assets.default['main.min.js']))
    .pipe($.replace('style.min.css', assets.default['style.min.css']))
    .pipe(strip())
    .pipe(app.dest("dist/"))
    .on("end", app.reload);
}


