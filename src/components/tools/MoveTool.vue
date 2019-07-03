<template>
  <li
    id="tool-hand-paper"
    :class="{ active: this.$store.state.SelectedTool === 9 }"
    @click="MoveTool()"
  >
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <i v-on="on" class="fas fa-hand-paper tool hand-paper-icon" id="hand-paper"></i>
      </template>
      <span>Move tool ({{this.$store.state.KeyCode.KeyMove | capitalize}})</span>
    </v-tooltip>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MoveTool',
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
  created() {
    document.addEventListener('keyup', e => {
      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyMove)) {
        this.MoveTool();
      }
    });
  },
  methods: {
    MoveTool() {
      this.$store.state.SelectedTool = 9;
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
          ctx.moveTo(line.startX + mouseX, line.startY + mouseY);
          ctx.lineTo(line.endX + mouseX, line.endY + mouseY);
          ctx.stroke();
          ctx.strokeStyle = line.colorRectangle;
          ctx.rect(
            line.last_mouseX + mouseX,
            line.last_mouseY + mouseY,
            line.width,
            line.height,
          );
          ctx.stroke();
          ctx.strokeStyle = line.colorCircle;
          ctx.save();
          ctx.scale(line.scaleX, line.scaleY);
          ctx.arc(
            line.centerX + mouseX / line.scaleX,
            line.centerY + mouseY / line.scaleY,
            1,
            0,
            2 * Math.PI,
          );
          ctx.restore();
          ctx.stroke();
        }
      }

      function clearCanvas(width, height) {
        ctx.clearRect(0, 0, width, height);
      }

      canvas.onmousedown = function(e) {
        for (let i = 0; i < existingLines.length; ++i) {
          const line = existingLines[i];
          line.last_mouseX -= mouseX;
          line.last_mouseY -= mouseY;
          line.startX -= mouseX;
          line.startY -= mouseY;
          line.endX -= mouseX;
          line.endY -= mouseY;
          line.centerX -= mouseX / line.scaleX;
          line.centerY -= mouseY / line.scaleY;
        }
        mousedown = true;
      };

      canvas.onmouseup = function(e) {
        for (let i = 0; i < existingLines.length; ++i) {
          const line = existingLines[i];
          line.last_mouseX += mouseX;
          line.last_mouseY += mouseY;
          line.startX += mouseX;
          line.startY += mouseY;
          line.endX += mouseX;
          line.endY += mouseY;
          line.centerX += mouseX / line.scaleX;
          line.centerY += mouseY / line.scaleY;
        }
        mousedown = false;
      };
      canvas.onmouseout = function(e) {
        mousedown = false;
      };
      canvas.onmousemove = function(e) {
        mouseX = e.clientX - canvasx;
        mouseY = e.clientY - canvasy;
        if (mousedown) {
          clearCanvas(canvas.width, canvas.height);
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
