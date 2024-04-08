import $ from "../config/plagins.js";
import { deleteAsync } from 'del';

export const clear = (done) => {
  deleteAsync("dist");
  done();
}


export const clearCache = () => {
  return $.cache.clearAll();
}

