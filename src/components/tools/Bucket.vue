<template>
  <li
    id="tool-fill-drip"
    :class="{ active: this.$store.state.SelectedTool === 3 }"
    @click="Bucket()"
  >
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <i v-on="on" class="fas fa-fill-drip tool fill-drip-icon" id="fill-drip"></i>
      </template>
      <span>Bucket tool ({{this.$store.state.KeyCode.KeyBucket | capitalize}})</span>
    </v-tooltip>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Bucket',
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  filters: {
    capitalize: function(value) {
      return String.fromCharCode(value);
    },
  },
  data() {
    return {};
  },
  created() {
    document.addEventListener('keyup', e => {
      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyBucket)) {
        this.Bucket();
      }
    });
  },
  methods: {
    Bucket() {
      this.$store.state.SelectedTool = 3;
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      let PaletteColor = document.getElementById('palette1').value;
      let color = document.getElementById('palette1').value;

      function hex2rgb(hex, opacity = 1) {
        hex = hex.trim();
        hex = hex[0] === '#' ? hex.substr(1) : hex;
        var bigint = parseInt(hex, 16),
          h = [];
        if (hex.length === 3) {
          h.push((bigint >> 4) & 255);
          h.push((bigint >> 2) & 255);
        } else {
          h.push((bigint >> 16) & 255);
          h.push((bigint >> 8) & 255);
        }
        h.push(bigint & 255);
        if (arguments.length === 2) {
          h.push(opacity);
          return 'rgba(' + h.join() + ')';
        } else {
          return 'rgb(' + h.join() + ')';
        }
      }

      function getRGB(str) {
        var match = str.match(
          /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/,
        );
        return match
          ? {
              r: match[1],
              g: match[2],
              b: match[3],
            }
          : {};
      }
      let RGB = getRGB(hex2rgb(color));

      const getPixelPos = function(x, y) {
        return (y * canvas.width + x) * 4;
      };

      const matchStartColor = function(data, pos, startColor) {
        return (
          data[pos] === startColor.r &&
          data[pos + 1] === startColor.g &&
          data[pos + 2] === startColor.b &&
          data[pos + 3] === startColor.a
        );
      };

      const colorPixel = function(data, pos, color) {
        data[pos] = color.r || RGB.r;
        data[pos + 1] = color.g || RGB.g;
        data[pos + 2] = color.b || RGB.b;
        data[pos + 3] = color.hasOwnProperty('a') ? color.a : 255;
      };

      // http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
      const floodFill = function(startX, startY, fillColor) {
        const dstImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const dstData = dstImg.data;

        const startPos = getPixelPos(startX, startY);
        const startColor = {
          r: dstData[startPos],
          g: dstData[startPos + 1],
          b: dstData[startPos + 2],
          a: dstData[startPos + 3],
        };
        const todo = [[startX, startY]];

        while (todo.length) {
          const pos = todo.pop();
          const x = pos[0];
          let y = pos[1];
          let currentPos = getPixelPos(x, y);

          while (y-- >= 0 && matchStartColor(dstData, currentPos, startColor)) {
            currentPos -= canvas.width * 4;
          }

          currentPos += canvas.width * 4;
          ++y;
          let reachLeft = false;
          let reachRight = false;

          while (
            y++ < canvas.height - 1 &&
            matchStartColor(dstData, currentPos, startColor)
          ) {
            colorPixel(dstData, currentPos, fillColor);

            if (x > 0) {
              if (matchStartColor(dstData, currentPos - 4, startColor)) {
                if (!reachLeft) {
                  todo.push([x - 1, y]);
                  reachLeft = true;
                }
              } else if (reachLeft) {
                reachLeft = false;
              }
            }

            if (x < canvas.width - 1) {
              if (matchStartColor(dstData, currentPos + 4, startColor)) {
                if (!reachRight) {
                  todo.push([x + 1, y]);
                  reachRight = true;
                }
              } else if (reachRight) {
                reachRight = false;
              }
            }

            currentPos += canvas.width * 4;
          }
        }

        ctx.putImageData(dstImg, 0, 0);
      };

      canvas.onclick = function(e) {
        const startX = e.clientX - canvas.offsetLeft;
        const startY = e.clientY - canvas.offsetTop;
        floodFill(startX, startY, { r: RGB.r });
        canvas.onclick = null;
      };
    },
  },
};
</script>

<style scoped>
</style>
