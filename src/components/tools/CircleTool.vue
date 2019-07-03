<template>
  <li
    id="tool-circle"
    :class="{ active: this.$store.state.SelectedTool === 8 }"
    @click="CircleTool()"
  >
   <v-tooltip right>
      <template v-slot:activator="{ on }">
         <i v-on="on" class="far fa-circle tool circle-icon" id="circle"></i>
      </template>
      <span>Circle tool ({{this.$store.state.KeyCode.KeyCircle | capitalize}})</span>
    </v-tooltip>

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
   filters: {
    capitalize: function(value) {
      return String.fromCharCode(value);
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
      let centerX = 0;
      let centerY = 0;
      let scaleX = 0;
      let scaleY = 0;
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
          ctx.strokeStyle = line.colorCircle
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
          ctx.save();
          ctx.beginPath();
          scaleX = 1 * ((mouseX - last_mouseX) / 2);
          scaleY = 1 * ((mouseY - last_mouseY) / 2);
          ctx.scale(scaleX, scaleY);
          centerX = last_mouseX / scaleX + 1;
          centerY = last_mouseY / scaleY + 1;
          ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI);
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
</style>
