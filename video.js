import { cnv, resize } from "./utils.js";

export async function loadVideo(path) {
  const vid = document.createElement("video");
  vid.src = path;
  vid.autoplay = true;
  vid.muted = true;
  vid.loop = true;

  return new Promise((res, rej) => {
    vid.addEventListener("loadeddata", () => res(vid));
    vid.addEventListener("error", () => rej());
  })
}

export function drawVid(ctx, vid) {
  const aspectRatio = vid.videoWidth / vid.videoHeight;
  const width = innerWidth - 20;
  const height = width / aspectRatio;

  resize(cnv, width, height);

  ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight,
    0, 0, width, height);
}


