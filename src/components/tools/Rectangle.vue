<template>
  <li id="tool-square" @click="Rectangle()">
    <i class="far fa-square tool square-icon" id="square"></i>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Rectangle',
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
    Rectangle() {
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

      $(canvas).on('mousedown', e => {
        last_mousex = e.clientX - canvasx;
        last_mousey = e.clientY - canvasy;
        mousedown = true;
      });

      $(canvas).on('mouseup', e => {
        mousedown = false;
      });

      $(canvas).on('mousemove', e => {
        mousex = e.clientX - canvasx;
        mousey = e.clientY - canvasy;
        if (mousedown) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
          ctx.beginPath();
          const width = mousex - last_mousex;
          const height = mousey - last_mousey;
          ctx.rect(last_mousex, last_mousey, width, height);
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 10;
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
