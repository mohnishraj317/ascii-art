import './style.css'
import { cnv, ctx, resize } from "./utils.js"
import { asciiArt } from "./image.js"

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
  const width = 800;
  const height = width / aspectRatio;

  resize(cnv, width, height);

  ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight,
    0, 0, cnv.width, cnv.height);
}

addEventListener("load", () => {
  resize(cnv);

  loadVideo("/videos/clip.mp4").then(vid => {
    document.body.append(vid);

    vid.style.visibility = "hidden";

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
