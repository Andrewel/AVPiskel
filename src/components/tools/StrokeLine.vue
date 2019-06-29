<template>
  <li id="tool-pencil-ruler" @click="StrokeLine()">
    <i class="fas fa-pencil-ruler tool pencil-ruler-icon" id="pencil-ruler"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'StrokeLine',
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
    StrokeLine() {
      const canvasWidth = 700;
      const canvasHeight = 700;
      let canvas = null;
      let bounds = null;
      let ctx = null;
      let hasLoaded = false;

      let startX = 0;
      let startY = 0;
      let mouseX = 0;
      let mouseY = 0;
      let isDrawing = false;
      const existingLines = [];

      function draw() {
        // ctx.fillStyle = '#333333';
        // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        clearCanvas();

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < existingLines.length; ++i) {
          const line = existingLines[i];
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
        }

        ctx.stroke();

        if (isDrawing) {
          ctx.strokeStyle = 'darkred';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      }

      function onmousedown(e) {
        if (hasLoaded && e.button === 0) {
          if (!isDrawing) {
            startX = e.clientX - bounds.left;
            startY = e.clientY - bounds.top;

            isDrawing = true;
          }

          draw();
        }
      }

      function onmouseup(e) {
        if (hasLoaded && e.button === 0) {
          if (isDrawing) {
            existingLines.push({
              startX,
              startY,
              endX: mouseX,
              endY: mouseY,
            });

            isDrawing = false;
          }

          draw();
        }
      }

      function onmousemove(e) {
        if (hasLoaded) {
          mouseX = e.clientX - bounds.left;
          mouseY = e.clientY - bounds.top;

          if (isDrawing) {
            draw();
          }
        }
      }
      canvas = document.getElementById('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.onmousedown = onmousedown;
      canvas.onmouseup = onmouseup;
      canvas.onmousemove = onmousemove;

      bounds = canvas.getBoundingClientRect();
      ctx = canvas.getContext('2d');
      hasLoaded = true;

      draw();
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
