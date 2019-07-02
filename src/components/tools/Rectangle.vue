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
      // Variables
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
        //       ctx.beginPath();

        for (let i = 0; i < existingLines.length; ++i) {
          const line = existingLines[i];
          ctx.strokeStyle = line.colorRectangle;
          console.log(ctx.strokeStyle);
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
        // ctx.stroke();
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
          clearCanvas(canvas.width, canvas.height); // clear canvas
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
