<template>
  <li id="tool-pen" :class="{ active: this.$store.state.SelectedTool === 1 }" @click="bindEvents()">
    <i class="fas fa-pen tool pen-icon" id="pen"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Pen',
  props: {
    brushSize: {
      type: Number,
      default: 1,
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
      KeyPen: this.$store.state.KeyCode.KeyPen,
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
      selectedToolIdx: 0,
    };
  },
  mounted() {
    document.addEventListener('keyup', e => {
      if (e.keyCode === parseInt(this.KeyPen)) {
        this.bindEvents();
      }
    });
    this.bindEvents()
  },
  methods: {
    setCanvas() {
      this.canvasContext = document.querySelector('#canvas').getContext('2d');
      this.canvasContext.lineJoin = 'round';
      this.canvasContext.lineCap = 'round';
      this.canvasContext.lineWidth = this.$store.state.BrushSize;
      this.canvasContext.strokeStyle = document.getElementById(
          'palette1',
        ).value;

      this.cursorContext = document.querySelector('#cursor').getContext('2d');
    },
    bindEvents() {
      this.$store.state.SelectedTool = 1;
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
