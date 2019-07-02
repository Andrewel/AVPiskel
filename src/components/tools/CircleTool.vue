<template>
  <li
    id="tool-circle"
    :class="{ active: this.$store.state.SelectedTool === 8 }"
    @click="CircleTool()"
  >
    <i class="far fa-circle tool circle-icon" id="circle"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'CircleTool',
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

      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyCircle)) {
        this.CircleTool();
      }
    });
  },
  methods: {
    CircleTool() {
      this.$store.state.SelectedTool = 8;
      // Canvas
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = document.getElementById('palette1').value;
      ctx.lineWidth = this.$store.state.BrushSize;
      // Variables
      const canvasx = $(canvas).offset().left;
      const canvasy = $(canvas).offset().top;
      let last_mouseX = 0;
      let last_mouseY = 0;
      let mouseX = 0;
      let mouseY = 0;
      let centerX = 0;
      let centerY = 0;
      let scaleX = 0;
      let scaleY = 0;
      let mousedown = false;
      let existingLines = this.$store.state.existingLines;


      function draw() {
        ctx.beginPath();

        for (let i = 0; i < existingLines.length; ++i) {
          const line = existingLines[i];
          ctx.strokeStyle = line.colorRectangle;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
          ctx.rect(line.last_mouseX, line.last_mouseY, line.width, line.height);
          ctx.scale(line.scaleX, line.scaleY);
          ctx.arc(line.centerX, line.centerY, 1, 0, 2 * Math.PI);
          // Restore and draw
          ctx.restore();
         // ctx.strokeStyle
          ctx.stroke();
        }

        ctx.stroke();
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
          centerX,
          centerY,
          scaleX,
          scaleY,
          colorCircle: document.getElementById('palette1').value
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
          clearCanvas(canvas.width, canvas.height); // clear canvas
          ctx.strokeStyle = document.getElementById('palette1').value;
          // Save
          ctx.save();
          ctx.beginPath();
          // Dynamic scaling
          scaleX = 1 * ((mouseX - last_mouseX) / 2);
          scaleY = 1 * ((mouseY - last_mouseY) / 2);
          ctx.scale(scaleX, scaleY);
          // Create ellipse
          centerX = last_mouseX / scaleX + 1;
          centerY = last_mouseY / scaleY + 1;
          ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI);
          // Restore and draw
          ctx.restore();
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
