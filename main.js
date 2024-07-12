import './style.css'
import { cnv, ctx, resize, fillCtx } from "./utils.js"
import { asciiArt } from "./image.js"
import { loadVideo, drawVid } from "./video.js";
import vidSrc from "/videos/rickroll.mp4"

const VALUE_SCALE = [".", ",", "*", "$", "x"];
const SIZE = 10;

cnv.willReadFrequently = true;

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
