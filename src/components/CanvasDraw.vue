
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
};
</script>
<style scoped>
.canvas-wrapper {
  display: grid;
  position: relative;
}
#canvas {
  background-image: url(../assets/images/large.png);
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
