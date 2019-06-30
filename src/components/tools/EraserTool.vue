<template>
    <li
      id="tool-eraser"
      :class="{ active: this.$store.state.SelectedTool === 5 }"
      @click="bindEvents()"
    >
      <i class="fas fa-eraser tool eraser-icon" id="eraser"></i>
    </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'EraserTool',
  props: {
    brushSize: {
      type: Number,
      default: 22,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    SelectedToolId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      canvasContext: null,
      cursorContext: null,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      tools: [
        {
          name: 'Pencil',
        },
        {
          name: 'Eraser',
        },
      ],
      selectedToolIdx: 1,
    };
  },
  created() {
    document.addEventListener('keyup', e => {
      const KeyE = 69;

      if (e.keyCode === KeyE) {
        this.bindEvents();
      }
    });
  },
  methods: {
    setCanvas() {
      this.canvasContext = document.querySelector('#canvas').getContext('2d');
      this.canvasContext.lineJoin = 'round';
      this.canvasContext.lineCap = 'round';
      this.canvasContext.lineWidth = this.$store.state.BrushSize;
      this.cursorContext = document.querySelector('#cursor').getContext('2d');
    },
    bindEvents() {
      this.$store.state.SelectedTool = 5;
      this.setCanvas();
      document.querySelector('#canvas').onmousedown = e => {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      };

      document.querySelector('#canvas').onmousemove = this.draw;

      document.querySelector('#canvas').onmouseup = () => {
        this.isDrawing = false;
      };
      document.querySelector('#canvas').onmouseout = () => {
        this.isDrawing = false;
      };
    },
    changeTool(tool) {
      this.selectedToolIdx = tool;
    },
    draw(e) {
      // this.drawCursor(e);
      if (!this.isDrawing) return;

      if (this.tools[this.selectedToolIdx].name === 'Eraser') {
        this.canvasContext.globalCompositeOperation = 'destination-out';
      } else if (this.tools[this.selectedToolIdx].name === 'Pencil') {
        this.canvasContext.globalCompositeOperation = 'source-over';
      }

      this.canvasContext.beginPath();
      this.canvasContext.moveTo(this.lastX, this.lastY);
      this.canvasContext.lineTo(e.offsetX, e.offsetY);
      this.canvasContext.stroke();
      [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      this.canvasContext.globalCompositeOperation = 'source-over';
    },
    drawCursor(e) {
      this.cursorContext.beginPath();
      this.cursorContext.ellipse(
        e.offsetX,
        e.offsetY,
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
  },
};
</script>

<style>
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
</style>
