export const cnv = document.querySelector(".cnv");
export const ctx = cnv.getContext("2d");

export function resize(cnv, w = innerWidth, h = innerHeight) {
  const dpr = devicePixelRatio;

  cnv.width = w * dpr;
  cnv.height = h * dpr;

  cnv.style.width = w + "px";
  cnv.style.height = h + "px";

  cnv.getContext("2d").scale(dpr, dpr);
}

export function fillCtx(cnv, color = "black") {
  const ctx = cnv.getContext("2d");

  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.restore();
}

export const getColorIndicesForCoord = (x, y, width) => {
  let red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

export const brightness = (r, g, b) =>
  Math.sqrt(r * r * .299 + g * g * .587 + b * b * .114);
