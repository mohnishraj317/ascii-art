import { cnv, ctx, resize } from "./utils.js";

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

export function grayScale() {

}
