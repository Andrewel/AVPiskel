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
</style>
