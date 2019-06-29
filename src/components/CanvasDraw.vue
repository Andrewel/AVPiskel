
<template>
  <div class="canvas-wrapper" ref="canvasWrapper">
    <div class="draw-area">
      <canvas id="canvas" ref="canvas" :width="width" :height="height"></canvas>
      <canvas id="cursor" ref="cursor" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'CanvasDraw',
  components: {},
  props: {
    brushSize: {
      type: Number,
      default: 12,
    },
    width: {
      type: Number,
      default: 700,
    },
    height: {
      type: Number,
      default: 700,
    },
  },
  data() {
    return {};
  },
  /*  mounted() {
    this.setCanvas();
    this.bindEvents();
  }, */
  /*  methods: {
    setCanvas() {
      this.$refs.canvasWrapper.style.gridTemplateColumns = `${
        this.width
      }px 30px`;
      this.$refs.canvasWrapper.style.width = `${this.width + 30}px`;
      this.$refs.canvasWrapper.style.height = `${this.height}px`;

      this.canvasContext = this.$refs.canvas.getContext('2d');
      this.canvasContext.lineJoin = 'round';
      this.canvasContext.lineCap = 'round';
      this.canvasContext.lineWidth = this.brushSize;
      this.canvasContext.strokeStyle = this.tools[this.selectedToolIdx].color;

      this.cursorContext = this.$refs.cursor.getContext('2d');
      // eslint-disable-next-line no-console
      console.log(this.$refs);
    },
    bindEvents() {
      this.$refs.canvas.addEventListener('mousedown', event => {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
      });
      this.$refs.canvas.addEventListener('mousemove', this.draw);
      this.$refs.canvas.addEventListener(
        'mouseup',
        // eslint-disable-next-line no-return-assign
        () => (this.isDrawing = false),
      );
      this.$refs.canvas.addEventListener(
        'mouseout',
        // eslint-disable-next-line no-return-assign
        () => (this.isDrawing = false),
      );
    },
    changeTool(tool) {
      this.selectedToolIdx = tool;
    },
    draw(event) {
      this.drawCursor(event);
      if (!this.isDrawing) return;

      if (this.tools[this.selectedToolIdx].name === 'Eraser') {
        this.canvasContext.globalCompositeOperation = 'destination-out';
      } else {
        this.canvasContext.globalCompositeOperation = 'source-over';
        this.canvasContext.strokeStyle = document.getElementById(
          'palette1',
        ).value;
      }

      this.canvasContext.beginPath();
      this.canvasContext.moveTo(this.lastX, this.lastY);
      this.canvasContext.lineTo(event.offsetX, event.offsetY);
      this.canvasContext.stroke();
      [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
    },
    drawCursor(event) {
      this.cursorContext.beginPath();
      this.cursorContext.ellipse(
        event.offsetX,
        event.offsetY,
        this.brushSize,
        this.brushSize,
        Math.PI / 4,
        0,
        2 * Math.PI,
      );
      this.cursorContext.stroke();
      setTimeout(() => {
        this.cursorContext.clearRect(0, 0, this.width, this.height);
      }, 100);
    },
  }, */
};
</script>
<style scoped>
.canvas-wrapper {
  display: grid;
  position: relative;
}
#canvas {
  background-color: #f9f9f9;
  z-index: 0;
}
#cursor {
  z-index: 1;
  pointer-events: none;
}
.draw-area canvas {
  position: absolute;
  left: 0;
  top: 0;
  border: 2px solid #c8c8c8;
  border-radius: 10px;
}
</style>
