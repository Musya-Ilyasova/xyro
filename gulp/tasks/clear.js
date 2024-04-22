import $ from "../config/plagins.js";
import { deleteAsync } from 'del';

export const clear = () => {
  return deleteAsync(["./dist"]);
}


export const clearCache = () => {
  return $.cache.clearAll();
}

