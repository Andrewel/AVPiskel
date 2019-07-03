<template>
  <li
    id="tool-square"
    :class="{ active: this.$store.state.SelectedTool === 7 }"
    @click="Rectangle()"
  >
    <i class="far fa-square tool square-icon" id="square"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Rectangle',
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
      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyRectangle)) {
        this.Rectangle();
      }
    });
  },
  methods: {
    Rectangle() {
      this.$store.state.SelectedTool = 7;
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = document.getElementById('palette1').value;
      ctx.lineWidth = this.$store.state.BrushSize;
      const canvasx = $(canvas).offset().left;
      const canvasy = $(canvas).offset().top;
      let last_mouseX = 0;
      let last_mouseY = 0;
      let mouseX = 0;
      let mouseY = 0;
      let width = 0;
      let height = 0;

      let mousedown = false;
      let existingLines = this.$store.state.existingLines;

      function draw() {

        for (let i = 0; i < existingLines.length; ++i) {
          const line = existingLines[i];

          ctx.beginPath();
          ctx.strokeStyle = line.colorStroke;
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
          ctx.stroke();
          ctx.strokeStyle = line.colorRectangle;
          ctx.rect(line.last_mouseX, line.last_mouseY, line.width, line.height);
          ctx.stroke();
          ctx.strokeStyle = line.colorCircle;
          ctx.save();
          ctx.scale(line.scaleX, line.scaleY);
          ctx.arc(line.centerX, line.centerY, 1, 0, 2 * Math.PI);
          ctx.restore();
          ctx.stroke();
        }
      }

      function clearCanvas(width, height) {
        ctx.clearRect(0, 0, width, height);
      }

      canvas.onmousedown = function(e) {
        last_mouseX = e.clientX - canvasx;
        last_mouseY = e.clientY - canvasy;
        mousedown = true;
      };

      canvas.onmouseup = function(e) {
        existingLines.push({
          last_mouseX,
          last_mouseY,
          width,
          height,
          colorRectangle: document.getElementById('palette1').value,
        });
        mousedown = false;
      };
      canvas.onmouseout = function(e) {
        mousedown = false;
      };
      canvas.onmousemove = function(e) {
        mouseX = e.clientX - canvasx;
        mouseY = e.clientY - canvasy;
        if (mousedown) {
          width = mouseX - last_mouseX;
          height = mouseY - last_mouseY;
          clearCanvas(canvas.width, canvas.height);
          ctx.strokeStyle = document.getElementById('palette1').value
          ctx.beginPath();

          ctx.rect(last_mouseX, last_mouseY, width, height);

          ctx.stroke();
          draw();
        }
      };
      this.$store.state.existingLines = existingLines;
    },
  },
};
</script>

<style scoped>
</style>
