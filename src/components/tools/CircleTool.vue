<template>
  <li
    id="tool-circle"
    :class="{ active: this.$store.state.SelectedTool === 8 }"
    @click="CircleTool()"
  >
    <i class="far fa-circle tool circle-icon" id="circle"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'CircleTool',
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
      const KeyC = 67;

      if (e.keyCode === KeyC) {
        this.CircleTool();
      }
    });
  },
  methods: {
    CircleTool() {
      this.$store.state.SelectedTool = 8;
      // Canvas
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = document.getElementById('palette1').value;
      ctx.lineWidth = this.$store.state.BrushSize;
      // Variables
      const canvasx = $(canvas).offset().left;
      const canvasy = $(canvas).offset().top;
      let last_mousex = 0;
      let last_mousey = 0;
      let mousex = 0;
      let mousey = 0;
      let mousedown = false;

      canvas.onmousedown = function(e) {
        last_mousex = e.clientX - canvasx;
        last_mousey = e.clientY - canvasy;
        mousedown = true;
      };

      canvas.onmouseup = function(e) {
        mousedown = false;
      };
      canvas.onmouseout = function(e) {
        mousedown = false;
      };
      canvas.onmousemove = function(e) {
        mousex = e.clientX - canvasx;
        mousey = e.clientY - canvasy;
        if (mousedown) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
          // Save
          ctx.save();
          ctx.beginPath();
          // Dynamic scaling
          const scalex = 1 * ((mousex - last_mousex) / 2);
          const scaley = 1 * ((mousey - last_mousey) / 2);
          ctx.scale(scalex, scaley);
          // Create ellipse
          const centerx = last_mousex / scalex + 1;
          const centery = last_mousey / scaley + 1;
          ctx.arc(centerx, centery, 1, 0, 2 * Math.PI);
          // Restore and draw
          ctx.restore();
          ctx.stroke();
        }
      };
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
