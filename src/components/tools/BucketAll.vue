<template>
  <li id="tool-fill-drip" @click="BucketAll()">
    <i class="fas fa-fill-drip tool fill-drip-icon" id="fill-drip"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'BucketAll',
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    BucketAll() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      const getPixelPos = function(x, y) {
        return (y * canvas.width + x) * 4;
      };

      const matchStartColor = function(data, pos, startColor) {
        return (
          data[pos] === startColor.r &&
          data[pos + 1] === startColor.g &&
          data[pos + 2] === startColor.b &&
          data[pos + 3] === startColor.a
        );
      };

      const colorPixel = function(data, pos, color) {
        data[pos] = color.r || 0;
        data[pos + 1] = color.g || 0;
        data[pos + 2] = color.b || 0;
        data[pos + 3] = color.hasOwnProperty('a') ? color.a : 255;
      };

      // http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
      const floodFill = function(startX, startY, fillColor) {
        // var srcImg = ctx.getImageData(0,0,canvas.width,canvas.height);
        // var srcData = srcImg.data;
        const dstImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const dstData = dstImg.data;

        const startPos = getPixelPos(startX, startY);
        const startColor = {
          r: dstData[startPos],
          g: dstData[startPos + 1],
          b: dstData[startPos + 2],
          a: dstData[startPos + 3],
        };
        const todo = [[startX, startY]];

        while (todo.length) {
          const pos = todo.pop();
          const x = pos[0];
          let y = pos[1];
          let currentPos = getPixelPos(x, y);

          while (y-- >= 0 && matchStartColor(dstData, currentPos, startColor)) {
            currentPos -= canvas.width * 4;
          }

          currentPos += canvas.width * 4;
          ++y;
          let reachLeft = false;
          let reachRight = false;

          while (
            y++ < canvas.height - 1 &&
            matchStartColor(dstData, currentPos, startColor)
          ) {
            colorPixel(dstData, currentPos, fillColor);

            if (x > 0) {
              if (matchStartColor(dstData, currentPos - 4, startColor)) {
                if (!reachLeft) {
                  todo.push([x - 1, y]);
                  reachLeft = true;
                }
              } else if (reachLeft) {
                reachLeft = false;
              }
            }

            if (x < canvas.width - 1) {
              if (matchStartColor(dstData, currentPos + 4, startColor)) {
                if (!reachRight) {
                  todo.push([x + 1, y]);
                  reachRight = true;
                }
              } else if (reachRight) {
                reachRight = false;
              }
            }

            currentPos += canvas.width * 4;
          }
        }

        ctx.putImageData(dstImg, 0, 0);
      };

       canvas.onclick = function(e) {
        const startX = e.pageX - canvas.offsetLeft;
        const startY = e.pageY - canvas.offsetTop;
        floodFill(startX, startY, { r: 255 });
      };
     /*  canvas.onclick = function(e) {
        const startX = e.clientX - canvas.offsetLeft;
        const startY = e.clientY - canvas.offsetTop;
        floodFill(startX, startY, { r: 255 });
      };
     */
    },
  },
};
</script>

<style scoped>
.tool {
  margin: 2px 2px;
  padding: 10px 5px;
  height: 4vw;
  width: 4vw;
  background-color: grey;
  box-shadow: 0px 0px 0px 0px rgba(255, 252, 80, 1);
  font-size: 2vw;
  color: white;
}

.tool:hover {
  background-color: black;
}
</style>
