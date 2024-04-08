import $ from "../config/plagins.js";
import strip from 'gulp-strip-comments';
import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';

export const scriptsLibs = () => {
  return app.src([
    // "node_modules/jquery/dist/jquery.min.js",
    //'node_modules/object-fit-images/dist/ofi.min.js',
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
