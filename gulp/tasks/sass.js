import $ from "../config/plagins.js";
import gcmq from 'gulp-group-css-media-queries';
import nodeSass from "node-sass";

const gulpSass = $.sass(nodeSass);

export const sass = () =>{
  return (
    app.src("src/sass/*.scss")
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
      .pipe(app.dest("dist/css"))
      .pipe(
        app.reload({
          stream: true,
        })
      )
  );
}

export const sassBuild = () =>{
  return (
    app.src("src/sass/*.scss")
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
      .pipe($.hash())
      .pipe(app.dest("dist/css"))
      .pipe($.hash.manifest('./assets.json', {
        sourceDir: app.dest("./dist/css/")
      }))
      .pipe(app.dest('./dist'))
      .pipe(
        app.reload({
          stream: true,
        })
      )
  );
}
