import $ from "../config/plagins.js";
import gcmq from 'gulp-group-css-media-queries';
import nodeSass from "node-sass";

const gulpSass = $.sass(nodeSass);

const sass = () =>{
  return (
    app.src("src/sass/style.scss")
      .pipe(gulpSass())
      .pipe($.autoprefixer({ grid: "autoplace" }))
      .pipe(gcmq())
      .pipe(
        $.csso({
          restructure: false,
          sourceMap: true,
          debug: true,
        })
      )
      .pipe(
        $.rename({
          extname: ".min.css",
        })
      )
      //.pipe($.sourcemaps.write())
      .pipe(app.dest("dist/css"))
      .pipe(
        app.reload({
          stream: true,
        })
      )
  );
}

export default sass;
