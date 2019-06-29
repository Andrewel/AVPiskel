<template>
  <ul class="tools">
    <!-- <li id="tool-pen" :class="{ active: SelectedToolId === 0 }" @click="changeTool(0)">
      <i class="fas fa-pen tool pen-icon" id="pen"></i>
    </li>
    <li id="tool-eraser" :class="{ active: SelectedToolId === 1 }" @click="changeTool(1)">
      <i class="fas fa-eraser tool eraser-icon" id="eraser"></i>
    </li> -->
    <li id="tool-pen" :class="{ active: SelectedToolId === 0 }" @click="bindEvents()">
      <i class="fas fa-pen tool pen-icon" id="pen"></i>
    </li>
    <li id="tool-eraser" :class="{ active: SelectedToolId === 1 }" @click="changeTool(1)">
      <i class="fas fa-eraser tool eraser-icon" id="eraser"></i>
    </li>
  </ul>
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
  created() {
    /*    document.addEventListener('keyup', (e) => {
      const KeyP = 80;
      const KeyC = 67;
      const KeyM = 77;
      const KeyT = 84;

      if (e.keyCode === KeyP) {
        alert('p');
        this.SelectedToolId = 0;
        // PaintBucketTool();
      } else if (e.keyCode === KeyC) {
        alert('c');
        this.SelectedToolId = 1;
        // ChooseColorTool();
      } else if (e.keyCode === KeyM) {
        alert('m');
        // MoveTool();
      } else if (e.keyCode === KeyT) {
        alert('t');
        // TransformTool();
      }
    }); */
  },
/*   mounted() {
    this.setCanvas();
    this.bindEvents();
  }, */
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
      this.canvasContext.strokeStyle = this.tools[this.SelectedToolId].color;

      this.cursorContext = document.querySelector('#cursor').getContext('2d');
    },
    bindEvents() {
      this.setCanvas()
      document.querySelector('#canvas').onmousedown = e => {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      };
      /* document.querySelector('#canvas').addEventListener('mousedown', e => {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      }); */
      document.querySelector('#canvas').onmousemove = this.draw;
      /*  document
        .querySelector('#canvas')
        .addEventListener('mousemove', this.draw); */
      document.querySelector('#canvas').onmouseup = () => {
        this.isDrawing = false;
      };
      /* document.querySelector('#canvas').addEventListener(
        'mouseup',
        // eslint-disable-next-line no-return-assign
        () => (this.isDrawing = false),
      ); */
      document.querySelector('#canvas').onmouseout = () => {
        this.isDrawing = false;
      };
      /* document.querySelector('#canvas').addEventListener(
        'mouseout',
        // eslint-disable-next-line no-return-assign
        () => (this.isDrawing = false),
      ); */
    },
    changeTool(tool) {
      this.SelectedToolId = tool;
    },
    draw(e) {
      // this.drawCursor(e);
      if (!this.isDrawing) return;

      if (this.tools[this.SelectedToolId].name === 'Eraser') {
        this.canvasContext.globalCompositeOperation = 'destination-out';
      } else if (this.tools[this.SelectedToolId].name === 'Pencil') {
        this.canvasContext.globalCompositeOperation = 'source-over';
        this.canvasContext.strokeStyle = document.getElementById(
          'palette1',
        ).value;
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
.active {
  background-color: #dea878 !important;
}
.tools {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
}
.tools li {
  padding: 3px;
  background-color: white;
}
</style>
