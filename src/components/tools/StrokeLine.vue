<template>
  <li
    id="tool-pencil-ruler"
    :class="{ active: this.$store.state.SelectedTool === 6 }"
    @click="StrokeLine()"
  >
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
  created() {
    document.addEventListener('keyup', e => {

      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyStroke)) {
        this.StrokeLine();
      }
    });
  },
  methods: {
    StrokeLine() {
      this.$store.state.SelectedTool = 6;
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      ctx.strokeStyle = document.getElementById('palette1').value;
      ctx.lineWidth = this.$store.state.BrushSize;
      let bounds = canvas.getBoundingClientRect();
      let hasLoaded = true;

      let startX = 0;
      let startY = 0;
      let mouseX = 0;
      let mouseY = 0;
      let isDrawing = false;
      const existingLines = this.$store.state.existingLines;

      function draw() {
        ctx.beginPath();

        for (let i = 0; i < existingLines.length; ++i) {
          const line = existingLines[i];

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
          ctx.rect(line.last_mouseX, line.last_mouseY, line.width, line.height);
          ctx.scale(line.scaleX, line.scaleY);
          ctx.arc(line.centerX, line.centerY, 1, 0, 2 * Math.PI);
          // Restore and draw
          ctx.restore();
          ctx.stroke();
        }

        ctx.stroke();

      }

      function clearCanvas(width, height) {
        ctx.clearRect(0, 0, width, height);
      }

      function onmousedown(e) {
        if (!isDrawing) {
          startX = e.clientX - bounds.left;
          startY = e.clientY - bounds.top;

          isDrawing = true;
        }

      }

      function onmouseup(e) {
        if (isDrawing) {
          existingLines.push({
            startX,
            startY,
            endX: mouseX,
            endY: mouseY,
          });

          isDrawing = false;
        }

      }

      function onmousemove(e) {
        mouseX = e.clientX - bounds.left;
        mouseY = e.clientY - bounds.top;

        if (isDrawing) {
          clearCanvas(canvas.width, canvas.height);
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
          draw();
        }
      }

      canvas.onmousedown = onmousedown;
      canvas.onmouseup = onmouseup;
      canvas.onmousemove = onmousemove;

      this.$store.state.existingLines = existingLines;
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
