<template>
  <li
    id="tool-circle"
    :class="{ active: this.$store.state.SelectedTool === 3 }"
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
  methods: {
    CircleTool() {
      // Canvas
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      // Variables
      const canvasx = $(canvas).offset().left;
      const canvasy = $(canvas).offset().top;
      let last_mousex = 0;
      let last_mousey = 0;
      let mousex = 0;
      let mousey = 0;
      let mousedown = false;

      // Mousedown
      $(canvas).on('mousedown', e => {
        last_mousex = e.clientX - canvasx;
        last_mousey = e.clientY - canvasy;
        mousedown = true;
      });

      // Mouseup
      $(canvas).on('mouseup', e => {
        mousedown = false;
      });

      // Mousemove
      $(canvas).on('mousemove', e => {
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
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      });
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
