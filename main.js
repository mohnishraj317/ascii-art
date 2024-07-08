import './style.css'
import { cnv, ctx, resize, fillCtx, brightness } from "./utils.js"
import { drawImg, loadImg, getColorIndicesForCoord } from "./image.js"

function deb() {
  ctx.save();
  ctx.arc(innerWidth / 2, innerHeight / 2, 200, 0, 6.28)
  ctx.stroke();
  ctx.restore();
}

addEventListener("load", () => {
  resize(cnv);

  loadImg("/images/download").then(img => {
    drawImg(img);

    const { data } = ctx.getImageData(0, 0, cnv.width, cnv.height);
    const newData = ctx.createImageData(cnv.width, cnv.height);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      const avg = 127; //brightness(r, g, b) * 255;
      newData.data[i] =
      newData.data[i+1] =
      newData.data[i+2] = avg;

      newData.data[i+3] = 255;
    }

    //ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.putImageData(newData, 0, 0);
    
    
  });
});
