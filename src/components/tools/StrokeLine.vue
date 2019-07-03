<template>
  <li
    id="tool-pencil-ruler"
    :class="{ active: this.$store.state.SelectedTool === 6 }"
    @click="StrokeLine()"
  >
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <i v-on="on" class="fas fa-pencil-ruler tool pencil-ruler-icon" id="pencil-ruler"></i>
      </template>
      <span>Stroke tool ({{this.$store.state.KeyCode.KeyStroke | capitalize}})</span>
    </v-tooltip>
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
  filters: {
    capitalize: function(value) {
      return String.fromCharCode(value);
    },
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
            colorStroke: (ctx.strokeStyle = document.getElementById(
              'palette1',
            ).value),
          });

          isDrawing = false;
        }
      }

      function onmousemove(e) {
        mouseX = e.clientX - bounds.left;
        mouseY = e.clientY - bounds.top;

        if (isDrawing) {
          clearCanvas(canvas.width, canvas.height);
          ctx.strokeStyle = document.getElementById('palette1').value;
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
</style>
