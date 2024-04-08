import $ from "../config/plagins.js";
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';

export const img = () => {
  return app.src("src/img/**/*")
    .pipe(
      $.cache(
        $.imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [
            {
              interlaced: true,
            },
            {
              removeViewBox: false,
            },
            {
              removeUselessStrokeAndFill: false,
            },
            {
              cleanupIDs: false,
            },
          ],
          use: [
            pngquant([
              {
                quality: "65-80",
              },
            ]),
          ],
          use: [
            mozjpeg([
              {
                progressive: true,
                quality: 80,
              },
            ]),
          ],
        })
      )
    )
    .pipe(app.dest("dist/img"));
};

export const imgUpload = () => {
  return app.src("src/upload/**/*")
    .pipe(
      $.cache(
        $.imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [
            {
              interlaced: true,
            },
            {
              removeViewBox: false,
            },
            {
              removeUselessStrokeAndFill: false,
            },
            {
              cleanupIDs: false,
            },
          ],
          use: [
            pngquant([
              {
                quality: "65-80",
              },
            ]),
          ],
          use: [
            mozjpeg([
              {
                progressive: true,
                quality: 80,
              },
            ]),
          ],
        })
      )
    )
    .pipe(app.dest("dist/upload"));
};
