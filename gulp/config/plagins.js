import * as path from 'path';
import { fileURLToPath } from 'url';
import gulpLoadPlugins from 'gulp-load-plugins';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var pluginOpts = {
  config: path.join(__dirname,'../../package.json'),
  replaceString: /^gulp(-|\.)/,
  scope: ['devDependencies'],
  lazy: false
};

const $ = gulpLoadPlugins(pluginOpts);

export default $;
