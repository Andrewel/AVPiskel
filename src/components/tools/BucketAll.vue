<template>
  <li id="tool-fill-drip" @click="BucketAll()">
     <v-tooltip right>
      <template v-slot:activator="{ on }">
        <i v-on="on" class="fas fa-fill-drip tool fill-drip-icon" id="fill-drip"></i>
      </template>
      <span>Bucket tool</span>
    </v-tooltip>

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
   filters: {
    capitalize: function(value) {
      return String.fromCharCode(value);
    },
  },
  methods: {
    BucketAll() {
      this.$store.state.SelectedTool = 4;
      let canvas = document.getElementById('canvas');
      let context = canvas.getContext('2d');
      let $canvas = $('#canvas');
      let canvasOffset = $canvas.offset();
      let offsetX = canvasOffset.left;
      let offsetY = canvasOffset.top;
      let canvasWidth = canvas.width;
      let canvasHeight = canvas.height;
      let strokeColor = {
        r: 152,
        g: 152,
        b: 152,
      };
      let fillColor = {
        r: 255,
        g: 255,
        b: 65,
      };
      let fillData;
      let strokeData;

      // load image
      let img = new Image();
      img.onload = function() {
        start();
      };
      img.crossOrigin = 'anonymous';
      img.src = 'http://i.imgur.com/kjY1kiE.png';

      // A small threshold would make it fill closer to stroke.
      let strokeThreshold = 1;
      function matchstrokeColor(r, g, b, a) {
        // Use sqrt difference to decide its storke or not.
        let diffr = r - strokeColor.r;
        let diffg = g - strokeColor.g;
        let diffb = b - strokeColor.b;
        let diff = Math.sqrt(diffr * diffr + diffg * diffg + diffb * diffb) / 3;
        return diff < strokeThreshold;
      }

      function matchStartColor(pixelPos, startR, startG, startB) {
        // get the color to be matched
        let r = strokeData.data[pixelPos],
          g = strokeData.data[pixelPos + 1],
          b = strokeData.data[pixelPos + 2],
          a = strokeData.data[pixelPos + 3];

        // If current pixel of the outline image is black-ish
        if (matchstrokeColor(r, g, b, a)) {
          return false;
        }

        // get the potential replacement color
        r = fillData.data[pixelPos];
        g = fillData.data[pixelPos + 1];
        b = fillData.data[pixelPos + 2];

        // If the current pixel matches the clicked color
        if (r === startR && g === startG && b === startB) {
          return true;
        }

        // If current pixel matches the new color
        if (r === fillColor.r && g === fillColor.g && b === fillColor.b) {
          return false;
        }

        return true;
      }

      // Thank you William Malone!
      function floodFill(startX, startY, startR, startG, startB) {
        let newPos;
        let x;
        let y;
        let pixelPos;
        let neighborLeft;
        let neighborRight;
        let pixelStack = [[startX, startY]];

        while (pixelStack.length) {
          newPos = pixelStack.pop();
          x = newPos[0];
          y = newPos[1];

          // Get current pixel position
          pixelPos = (y * canvasWidth + x) * 4;

          // Go up as long as the color matches and are inside the canvas
          while (y >= 0 && matchStartColor(pixelPos, startR, startG, startB)) {
            y -= 1;
            pixelPos -= canvasWidth * 4;
          }

          pixelPos += canvasWidth * 4;
          y += 1;
          neighborLeft = false;
          neighborRight = false;

          // Go down as long as the color matches and in inside the canvas
          while (
            y <= canvasHeight - 1 &&
            matchStartColor(pixelPos, startR, startG, startB)
          ) {
            y += 1;

            fillData.data[pixelPos] = fillColor.r;
            fillData.data[pixelPos + 1] = fillColor.g;
            fillData.data[pixelPos + 2] = fillColor.b;
            fillData.data[pixelPos + 3] = 255;

            if (x > 0) {
              if (matchStartColor(pixelPos - 4, startR, startG, startB)) {
                if (!neighborLeft) {
                  // Add pixel to stack
                  pixelStack.push([x - 1, y]);
                  neighborLeft = true;
                }
              } else if (neighborLeft) {
                neighborLeft = false;
              }
            }

            if (x < canvasWidth - 1) {
              if (matchStartColor(pixelPos + 4, startR, startG, startB)) {
                if (!neighborRight) {
                  // Add pixel to stack
                  pixelStack.push([x + 1, y]);
                  neighborRight = true;
                }
              } else if (neighborRight) {
                neighborRight = false;
              }
            }

            pixelPos += canvasWidth * 4;
          }
        }
      }

      // Start a floodfill
      // 1. Get the color under the mouseclick
      // 2. Replace all of that color with the new color
      // 3. But respect bounding areas! Replace only contiguous color.
      function paintAt(startX, startY) {
        // get the clicked pixel's [r,g,b,a] color data
        let pixelPos = (startY * canvasWidth + startX) * 4,
          r = fillData.data[pixelPos],
          g = fillData.data[pixelPos + 1],
          b = fillData.data[pixelPos + 2],
          a = fillData.data[pixelPos + 3];

        // this pixel's already filled
        if (r === fillColor.r && g === fillColor.g && b === fillColor.b) {
          return;
        }

        // this pixel is part of the original black image--don't fill
        if (matchstrokeColor(r, g, b, a)) {
          return;
        }

        // execute the floodfill
        floodFill(startX, startY, r, g, b);

        // put the colorized data back on the canvas
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.putImageData(fillData, 0, 0);
        context.drawImage(img, 0, 0);
      }

      // draw the image to the canvas and get its pixel array
      // listen for mouse clicks and do floodfill when clicked
      function start() {
        context.drawImage(img, 0, 0);
        strokeData = context.getImageData(0, 0, canvasWidth, canvasHeight);
        //context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        fillData = context.getImageData(0, 0, canvasWidth, canvasHeight);
        //context.drawImage(img, 0, 0);

        $('#canvas').mousedown(function(e) {
          // Mouse down location
          let mouseX = parseInt(e.clientX - offsetX);
          let mouseY = parseInt(e.clientY - offsetY);
          // floodfill
          paintAt(mouseX, mouseY);
        });
      }
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
