<template>
  <li
    id="tool-pencil-alt"
    :class="{ active: this.$store.state.SelectedTool === 2 }"
    @click="MirrorPen()"
  >
    <i class="fas fa-pencil-alt tool pencil-alt-icon" id="pencil-alt"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MirrorPen',
  props: {
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
      isDrawing: true,
    };
  },
  created() {
    document.addEventListener('keyup', e => {
      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyVPen)) {
        this.MirrorPen();
      }
    });
  },
  methods: {
    MirrorPen() {
      this.$store.state.SelectedTool = 2;
      let prevX = 0;
      let currX = 0;
      let prevY = 0;
      let currY = 0;
      this.isDrawing = false;

      const canvas = document.querySelector('#canvas');
      const context = canvas.getContext('2d');
      context.strokeStyle = document.getElementById('palette1').value;
      context.lineWidth = this.$store.state.BrushSize;
      context.lineCap = 'round';

      /* canvas.onmousemove = null;
      canvas.onmousedown = null;
      canvas.onmouseup = null;
      canvas.onmouseout = null; */

      function recordPointerLocation(e) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
      }

      function handlePointerMove(e) {
        if (this.isDrawing) {
          recordPointerLocation(e);
          drawLine();
        }
      }

      function handlePointerDown(e) {
        recordPointerLocation(e);
        this.isDrawing = true;
      }

      function drawLine() {
        const w = canvas.width;
        const h = canvas.height;
        const a = prevX;
        let a_ = a;
        const b = prevY;
        let b_ = h - b;
        const c = currX;
        let c_ = c;
        const d = currY;
        let d_ = h - d;

        context.beginPath();

        context.moveTo(a, b);
        context.lineTo(c, d);

        context.moveTo(a_, b_);
        context.lineTo(c_, d_);

        a_ = w - a;
        b_ = b;
        c_ = w - c;
        d_ = d;
        context.moveTo(a_, b_);
        context.lineTo(c_, d_);

        a_ = w - a;
        b_ = h - b;
        c_ = w - c;
        d_ = h - d;
        context.moveTo(a_, b_);
        context.lineTo(c_, d_);

        a_ = w / 2 + h / 2 - b;
        b_ = w / 2 + h / 2 - a;
        c_ = w / 2 + h / 2 - d;
        d_ = w / 2 + h / 2 - c;
        context.moveTo(a_, b_);
        context.lineTo(c_, d_);

        a_ = w / 2 + h / 2 - b;
        b_ = h / 2 - w / 2 + a;
        c_ = w / 2 + h / 2 - d;
        d_ = h / 2 - w / 2 + c;
        context.moveTo(a_, b_);
        context.lineTo(c_, d_);

        a_ = w / 2 - h / 2 + b;
        b_ = w / 2 + h / 2 - a;
        c_ = w / 2 - h / 2 + d;
        d_ = w / 2 + h / 2 - c;
        context.moveTo(a_, b_);
        context.lineTo(c_, d_);

        a_ = w / 2 - h / 2 + b;
        b_ = h / 2 - w / 2 + a;
        c_ = w / 2 - h / 2 + d;
        d_ = h / 2 - w / 2 + c;
        context.moveTo(a_, b_);
        context.lineTo(c_, d_);

        context.stroke();
        context.closePath();
      }

      function stopDrawing() {
        this.isDrawing = false;
      }

      canvas.onmousemove = handlePointerMove;
      canvas.onmousedown = handlePointerDown;
      canvas.onmouseup = stopDrawing;
      canvas.onmouseout = stopDrawing;
      //  canvas.onpointerout = stopDrawing;
      /*  canvas.onpointermove = handlePointerMove;
      canvas.onpointerdown = handlePointerDown;
      canvas.onpointerup = stopDrawing;
      canvas.onpointerout = stopDrawing; */
    },
    changeTool(tool) {
      this.SelectedToolId = tool;
    },
  },
};
</script>

<style>
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
