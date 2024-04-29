import pkg from 'gulp';
import { pug, pugBuild, sass, sassBuild, scripts, scriptsBuild, img, imgUpload, webpImage, svg, copy, clear} from './gulp/config/allTasks.js'
import browserSync from 'browser-sync';
import dotenv from 'dotenv';

dotenv.config();

const { src, dest, watch, series, parallel } = pkg;

const reload = browserSync.reload;

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  src, dest, watch, series, parallel, reload
};

/////////////////////////////////////////////////
//--------------------WATCH--------------------//
/////////////////////////////////////////////////

export const observe = () => {
  watch("src/pug/**/*.pug", series(pug));
  watch(["src/sass/**/*.scss", "src/pug/**/*.scss"], series(sass));
  watch("src/js/**/*.js", series(scripts));
  watch("src/img/**/*", series(img));
  watch("src/upload/**/*", series(imgUpload));
  watch("src/svg/**/*.svg", series(svg));
}

/////////////////////////////////////////////////
//--------------------SERVE--------------------//
/////////////////////////////////////////////////

export const serve = () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
      serveStaticOptions: {
        extensions: ['html']
      }
    },
  });
}

/////////////////////////////////////////////////
//-------------------DEFAULT-------------------//
/////////////////////////////////////////////////

export default series(
  parallel(copy, img, imgUpload, webpImage, svg),
  parallel(scripts, sass, pug ),
  parallel(observe, serve)
);

/////////////////////////////////////////////////
//--------------------BUILD--------------------//
/////////////////////////////////////////////////

export const build = series(
  clear,
  parallel( copy, img, imgUpload, webpImage, svg),
  parallel( scripts, scriptsBuild, sassBuild ),
  parallel( pugBuild )
);
