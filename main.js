import './style.css'
import { cnv, ctx, resize, brightness, getColorIndicesForCoord } from "./utils.js"
import { drawImg, loadImg, grayscale, findMinMax } from "./image.js"

const VALUE_SCALE = [" ", ".", "*", "$", "#"];
const SIZE = 2;

addEventListener("load", () => {
  resize(cnv);

  loadImg("/images/face.png").then(img => {
    drawImg(img);
    const { data } = grayscale(cnv);
    const { min, max } = findMinMax(data);
    const VALUE_RANGE = (min + max) / VALUE_SCALE.length;

    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.font = SIZE + "px monospace";

    for (let x = 0; x < cnv.width; x += SIZE) {
      for (let y = 0; y < cnv.height; y += SIZE) {
        const [r, g, b] = getColorIndicesForCoord(x, y, cnv.width);

        const red = data[r];
        const green = data[g];
        const blue = data[b];

        const bright = brightness(red, green, blue);
        let val;

        for (let i = 1; i <= VALUE_SCALE.length; i++) {
          if (bright < i * VALUE_RANGE) {
            val = i * VALUE_RANGE;
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillText(VALUE_SCALE[i - 1], x, y);
            break;
          }
        }
      }
    }
    //ctx.putImageData(newData, 0, 0)
  });
});
