<template>
  <li
    id="tool-eye-dropper"
    :class="{ active: this.$store.state.SelectedTool === 15 }"
    @click="ColorPicker2()"
  >
    <i class="fas fa-eye-dropper tool eye-dropper-icon" id="eye-dropper"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ColorPicker',
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  created() {
    document.addEventListener('keyup', e => {

      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyPicker)) {
        this.ColorPicker2();
      }
    });
  },
  methods: {
    ColorPicker() {
      this.$store.state.SelectedTool = 15;
      const canvas = document.getElementById('canvas');
      function getPosition(obj) {
        let curleft = 0;
        let curtop = 0;
        if (obj.offsetParent) {
          do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
          } while ((obj = obj.offsetParent));
          return { x: curleft, y: curtop };
        }
        return undefined;
      }

      function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255) {
          throw 'Invalid color component';
        }
        return ((r << 16) | (g << 8) | b).toString(16);
      }

      canvas.addEventListener(
        'mousemove',
        function(e) {
          const pos = getPosition(this);
          const x = e.pageX - pos.x;
          const y = e.pageY - pos.y;
          let coord = `x=${x}, y=${y}`;
          const c = this.getContext('2d');
          const p = c.getImageData(x, y, 1, 1).data;

          // If transparency on the image
          if (p[0] == 0 && p[1] == 0 && p[2] == 0 && p[3] == 0) {
            coord +=
              ' (Transparent color detected, cannot be converted to HEX)';
          }

          const hex = `#${`000000${rgbToHex(p[0], p[1], p[2])}`.slice(-6)}`;

          // document.getElementById('coord-status').innerHTML = coord;
          document.getElementById('palette1').value = hex;
        },
        false,
      );
    },
    ColorPicker2() {
      this.$store.state.SelectedTool = 15;
      const colorBlock = document.getElementById('canvas');
      const ctx1 = colorBlock.getContext('2d');

      let x = 0;
      let y = 0;
      let drag = false;
      let rgbaColor = 'rgba(255,0,0,1)';

      function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255) {
          throw 'Invalid color component';
        }
        return ((r << 16) | (g << 8) | b).toString(16);
      }

      function click(e) {
        x = e.offsetX;
        y = e.offsetY;
        const imageData = ctx1.getImageData(x, y, 1, 1).data;
        rgbaColor = `rgba(${imageData[0]},${imageData[1]},${imageData[2]},0.2)`;
        // rgbaColor = `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`;
        const hex = `#${`000000${rgbToHex(
          imageData[0],
          imageData[1],
          imageData[2],
        )}`.slice(-6)}`;
        document.getElementById('palette2').value = document.getElementById(
          'palette1',
        ).value;
        document.getElementById('palette1').value = hex;
        console.log(rgbaColor);
      }

      function mousedown(e) {
        drag = true;
        changeColor(e);
      }

      function mousemove(e) {
        if (drag) {
          changeColor(e);
        }
      }

      function mouseup(e) {
        drag = false;
        changeColor(e);
      }

      function changeColor(e) {
        x = e.offsetX;
        y = e.offsetY;
        const imageData = ctx1.getImageData(x, y, 1, 1).data;
        rgbaColor = `rgba(${imageData[0]},${imageData[1]},${imageData[2]},0.5)`;
        // rgbaColor = `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`;
        // document.getElementById('palette').value = rgbaColor;
        console.log(rgbaColor);
      }

      colorBlock.onclick = click;
      colorBlock.onmousedown = mousedown;
      colorBlock.onmousemove = mousemove;
      colorBlock.onmouseup = mouseup;
    },
  },
};
</script>

<style scoped>
</style>
