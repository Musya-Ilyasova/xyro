import $ from "../config/plagins.js";
import strip from 'gulp-strip-comments';
import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';

export const scriptsLibs = () => {
  return app.src([
    'node_modules/svg4everybody/dist/svg4everybody.min.js'
  ])
    .pipe($.concat("libs.min.js"))
    .pipe(strip())
    .pipe(app.dest("dist/js/"))
    .pipe(
      app.reload({
        stream: true,
      })
    );
}

export const scripts = () => {
  return app
    .src("src/js/main.js", { sourcemaps: app.isDev })
    .pipe($.plumber())
    .pipe(webpack({ config: webpackConfig(app.isDev) }))
    .pipe(app.dest("dist/js/"))
    .pipe(strip())
    .pipe(app.reload({
      stream: true,
      })
    );
};

export const scriptsBuild = () => {
  return app
    .src("src/js/main.js", { sourcemaps: app.isDev })
    .pipe($.plumber())
    .pipe(webpack({ config: webpackConfig(app.isDev) }))
    .pipe($.hash())
    .pipe(app.dest("dist/js/"))
    .pipe($.hash.manifest('./assets.json', {
      deleteOld: true,
      sourceDir: app.dest("./dist/js/")
    }))
    .pipe(app.dest('./dist'))
    .pipe(strip())
};
