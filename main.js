import './style.css'
import { cnv, ctx, resize, fillCtx } from "./utils.js"
import { drawImg, loadImg, asciiArt } from "./image.js"

const VALUE_SCALE = [" ", ".", "*", "$", "#"];
const SIZE = 10;
const dpr = devicePixelRatio;

addEventListener("load", () => {
  resize(cnv);

  loadImg("/images/face.png").then(img => {
    drawImg(img);
    const { data } = ctx.getImageData(0, 0, cnv.width, cnv.height);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    //asciiArt(cnv, data, VALUE_SCALE, SIZE);
  });
});
