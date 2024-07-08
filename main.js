import './style.css'
import { cnv, ctx, resize, fillCtx } from "./utils.js"
import { asciiArt } from "./image.js"
import vidSrc from "/videos/clip.mp4";

const VALUE_SCALE = [".", ",", "*", "$", "x"];
const SIZE = 10;

async function loadVideo(path) {
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

function drawVid(ctx, vid) {
  const aspectRatio = vid.videoWidth / vid.videoHeight;
  const width = innerWidth - 20;
  const height = width / aspectRatio;

  resize(cnv, width, height);

  ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight,
    0, 0, width, height);
}

addEventListener("load", () => {
  resize(cnv);

  loadVideo(vidSrc).then(vid => {
    document.body.append(vid);

    vid.style.visibility = "hidden";
    vid.style.height = "1px";
    vid.style.width = "1px";

    vid.addEventListener("play", function animate() {
      requestAnimationFrame(animate);

      if (!vid.paused && !vid.ended) {
        drawVid(ctx, vid);
        const { data } = ctx.getImageData(0, 0, cnv.width, cnv.height);
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        asciiArt(cnv, data, VALUE_SCALE, SIZE);
      }
    });


  }).catch(console.error)
});
