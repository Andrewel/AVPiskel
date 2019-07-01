<template>
  <div id="animated-preview-container" class="preview-container">
    <div class="preview-canvas-wrapper">
      <i class="fas fa-compress circle-compress"></i>
      <canvas id="preview-canvas" class="preview-canvas" width="200" height="200"></canvas>
    </div>
    <form name="fpsForm">
      <output class="output-fps" id="output-fps" name="fpsOutput">10</output>
      <span>FPS</span>
      <input
        class="input-fps"
        id="input-fps"
        type="range"
        name="fpsInput"
        value="10"
        min="1"
        max="24"
      >
    </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Animation',
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.circle-compress {
  position:absolute;
  left: 15.5vw;
  /* padding: relative;
  margin: auto 90%; */
  color: white;
  font-size: 20px;
  text-align: left;
  z-index: 3;
}
.canvas-tools-wrapper {
  position: absolute;
  left: 80vw;
}

.preview-canvas-wrapper {
  margin: 0 30px;
  height: 200px;
  width: 200px;
  background-image: url(../assets/images/midle.png);
}

.preview-canvas {
  background-position: center;
  background-size: 100%;
}

.input-fps {
  width: 125px;
  height: 15px;
  padding: 5px;
  margin: 5px 10px;
  border-radius: 2px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: 0.2s;
  transition: opacity 0.2s;
}

.input-fps::slider-thumb {
  width: 17px;
  height: 17px;
  background: white;
  border-radius: 2px;
  cursor: pointer;
}

.output-fps,
span {
  width: 20px;
  padding: 0;
  margin: 5px;
  font-size: 20px;
  color: black;
}

.animation-tools-container {
  margin: 30px auto;
}
</style>
