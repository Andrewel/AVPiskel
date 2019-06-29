<template>
<div>
<i class="fas fa-palette" id="color-chooser">
    <input type="color" id="palette" value="#808080" style="width:4vw;height: 2vw">
  </i>
  <i class="fas fa-palette" id="color-chooser">
    <input type="color" id="palette" value="#808080" style="width:4vw;height: 2vw">
  </i>
</div>
</template>

<script>
export default {
  name: 'Pen',
  props: {
    brushSize: {
      type: Number,
      default: 22,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    outputName: {
      type: String,
      default: 'canvas',
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
          color: 'red',
        },
        {
          name: 'Eraser',
        },
      ],
      selectedToolIdx: 0,
    };
  },
  mounted() {
    this.setCanvas();
    this.bindEvents();
  },
  methods: {
    setCanvas() {
      document.querySelector('.canvas-wrapper').style.gridTemplateColumns = `${
        this.width
      }px 30px`;
      document.querySelector('.canvas-wrapper').style.width = `${this.width +
        30}px`;
      document.querySelector('.canvas-wrapper').style.height = `${
        this.height
      }px`;

      this.canvasContext = document.querySelector('#canvas').getContext('2d');
      this.canvasContext.lineJoin = 'round';
      this.canvasContext.lineCap = 'round';
      this.canvasContext.lineWidth = this.brushSize;
      this.canvasContext.strokeStyle = this.tools[this.selectedToolIdx].color;

      this.cursorContext = document.querySelector('#cursor').getContext('2d');
      // eslint-disable-next-line no-console
      console.log(this.$refs);
    },
    bindEvents() {
      document.querySelector('#canvas').addEventListener('mousedown', (e) => {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      });
      document
        .querySelector('#canvas')
        .addEventListener('mousemove', this.draw);
      document.querySelector('#canvas').addEventListener(
        'mouseup',
        // eslint-disable-next-line no-return-assign
        () => (this.isDrawing = false),
      );
      document.querySelector('#canvas').addEventListener(
        'mouseout',
        // eslint-disable-next-line no-return-assign
        () => (this.isDrawing = false),
      );
    },
    changeTool(tool) {
      this.selectedToolIdx = tool;
    },
    draw(e) {
      this.drawCursor(e);
      if (!this.isDrawing) return;

      if (this.tools[this.selectedToolIdx].name === 'Eraser') {
        this.canvasContext.globalCompositeOperation = 'destination-out';
      } else if (this.tools[this.selectedToolIdx].name === 'Pencil') {
        this.canvasContext.globalCompositeOperation = 'source-over';
        this.canvasContext.strokeStyle = this.tools[this.selectedToolIdx].color;
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
    showColorPalette() {
      const colorPalette = document.createElement('input');
      colorPalette.addEventListener('change', (e) => {
        this.tools[0].color = e.target.value;
      });
      colorPalette.type = 'color';
      colorPalette.value = this.tools[0].color;
      colorPalette.click();
    },
    download() {
      const link = document.createElement('a');
      link.download = `${this.outputName}.png`;
      // link.href = this.$refs.canvas.toDataURL();
      link.href = document.querySelector('#canvas').toDataURL();
      link.click();
      // eslint-disable-next-line no-console
      console.log(this.$refs);
    },
  },
};
</script>

<style scoped>
</style>
