<template>
  <li id="tool-download" @click="download()">
    <i class="fas fa-download tool download-icon" id="download"></i>
  </li>
</template>

<script>
export default {
  name: 'Download',
  props: {
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
    return {};
  },
  methods: {
    download() {
      const link = document.createElement('a');
      link.download = `${this.outputName}.png`;
      // link.href = this.$refs.canvas.toDataURL();
      link.href = document.querySelector('#canvas').toDataURL();
      link.click();
    },
  },
};
</script>

<style scoped>
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
