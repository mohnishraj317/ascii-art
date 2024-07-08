import { cnv, ctx, resize, brightness, getColorIndicesForCoord } from "./utils.js";

export async function loadImg(path) {
  const img = new Image();
  img.src = path;

  return new Promise((res, rej) => {
    img.addEventListener("load", () => res(img));
    img.addEventListener("error", () => rej());
  });
}

export function drawImg(img) {
  const imgAspectRatio = img.width / img.height;
  const width = 400;
  const height = width / imgAspectRatio;
  resize(cnv, width, height);

  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
}

export function grayscale(cnv) {
  const ctx = cnv.getContext("2d");
  const imgData = ctx.getImageData(0, 0, cnv.width, cnv.height);

  for (let i = 0; i < imgData.data.length; i += 4) {
    const r = imgData.data[i];
    const g = imgData.data[i + 1];
    const b = imgData.data[i + 2];

    const gray = brightness(r, g, b);

    imgData.data[i] =
      imgData.data[i + 1] =
      imgData.data[i + 2] = gray;

    imgData.data[i + 3] = 255;
  }

  return imgData;
}

export function findMinMax(data) {
  let min = 256;
  let max = -1;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const bright = ~~brightness(r, g, b);

    if (bright > max) max = bright;
    if (bright < min) min = bright;
  }

  return { min, max };
}

export function asciiArt(cnv, data, VALUE_SCALE, SIZE) {
  const ctx = cnv.getContext("2d");
  const { min, max } = findMinMax(data);
  const dpr = devicePixelRatio;

  const VALUE_RANGE = ~~((min + max) / VALUE_SCALE.length);
  ctx.save();
  ctx.font = SIZE + "px monospace";

  for (let x = 0; x < cnv.width; x += SIZE * dpr) {
    for (let y = 0; y < cnv.height; y += SIZE * dpr) {
      const [r, g, b] = getColorIndicesForCoord(~~x, ~~y, cnv.width);

      const red = data[r];
      const green = data[g];
      const blue = data[b];

      const bright = brightness(red, green, blue);
      let val;

      for (let i = 1; i <= VALUE_SCALE.length; i++) {
        if (bright < i * VALUE_RANGE) {
          val = i * VALUE_RANGE;
          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          ctx.fillText(VALUE_SCALE[VALUE_SCALE.length - i], x / dpr, y / dpr);
          break;
        }
      }
    }
  }

  ctx.restore();
}
