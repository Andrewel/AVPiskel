<template>
  <div class="home">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>PISKEL by Andrewel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="likes()">My Gallery</v-btn>
        <v-btn flat @click="profile()">Profile</v-btn>
        <v-btn flat @click="logout()">Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div id="coord-status" style="position:relative;height: 1vw;font-size:1.2vw">
      <span>
        [
        <input v-model.lazy="width" placeholder="width" style="width:2.5vw">
        :
        <input v-model.lazy="height" placeholder="height" style="width:2.5vw">
        ]
      </span>

      <span id="coord"></span>
    </div>
    <section class="center-section-wrapper">
      <section class="section-left-tools">
        <div class="pen-size-container size-picker-container tooltip">
          <ul class="ul-pen-size">
            <li :class="{ active: this.$store.state.BrushSize === 1 }" @click="ChangeBrushSize(1)">
              <i class="fas fa-square pen-size-option1 size-picker-opt" id="pen-size-option1"></i>
            </li>
            <li :class="{ active: this.$store.state.BrushSize === 2 }" @click="ChangeBrushSize(2)">
              <i class="fas fa-square pen-size-option2 size-picker-opt" id="pen-size-option2"></i>
            </li>
            <li :class="{ active: this.$store.state.BrushSize === 4 }" @click="ChangeBrushSize(4)">
              <i class="fas fa-square pen-size-option3 size-picker-opt" id="pen-size-option3"></i>
            </li>
            <li :class="{ active: this.$store.state.BrushSize === 8 }" @click="ChangeBrushSize(8)">
              <i class="fas fa-square pen-size-option4 size-picker-opt" id="pen-size-option4"></i>
            </li>
          </ul>
          <span class="tooltiptext">
            Pen size
            <br>from 1 to 4 pixels
          </span>
        </div>
        <ul class="ul-tools">
          <Pen :SelectedToolId="SelectedToolId"/>
          <MirrorPen :SelectedToolId="SelectedToolId"/>
          <Bucket/>
          <li id="tool-fill">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <i v-on="on" class="fas fa-fill tool fill-icon" id="fill"></i>
              </template>
              <span>Fill tool</span>
            </v-tooltip>
          </li>
          <EraserTool/>
          <StrokeLine/>
          <Rectangle/>
          <CircleTool/>
          <MoveTool/>
          <li id="tool-magic">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <i v-on="on" class="fas fa-magic tool magic-icon" id="magic"></i>
              </template>
              <span>Magic tool</span>
            </v-tooltip>
          </li>
          <li id="tool-object-ungroup">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <i
                  v-on="on"
                  class="fas fa-object-ungroup tool object-ungroup-icon"
                  id="object-ungroup"
                ></i>
              </template>
              <span>Ungroup tool</span>
            </v-tooltip>
          </li>
          <li id="tool-spinner">
            <i class="fas fa-spinner tool spinner-icon" id="spinner"></i>
          </li>
          <li id="tool-adjust">
            <i class="fas fa-adjust tool adjust-icon" id="adjust"></i>
          </li>
          <li id="tool-chess-board">
            <i class="fas fa-chess-board tool chess-board-icon" id="chess-board"></i>
          </li>
          <ColorPicker/>
        </ul>
        <input
          type="color"
          id="palette1"
          value="#ffffff"
          style="width:4vw;height: 4vw"
          @click="InputColor()"
        >
        <input type="color" id="palette2" value="#ff0000" style="width:4vw;height: 4vw">
        <Keyboard/>
      </section>
      <Frame/>
      <div class="main-canvas-wrapper">
        <CanvasDraw :width="width" :height="height"/>
      </div>
      <section class="canvas-tools-wrapper">
        <Animation/>
        <section class="section-download">
          <ul class="ul-download">
            <Download :outputName="'canvas_example'"/>
            <GoogleDrive/>
            <FirebaseStore/>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase';
import Pen from '../components/tools/Pen';
import EraserTool from '../components/tools/EraserTool';
import GoogleDrive from '../components/tools/GoogleDrive';
import Animation from '../components/Animation';
import Frame from '../components/Frame';
import Download from '../components/tools/Download';
import CanvasDraw from '../components/CanvasDraw';
import FirebaseStore from '../components/FirebaseStore';
import StrokeLine from '../components/tools/StrokeLine';
import MirrorPen from '../components/tools/MirrorPen';
import ColorPicker from '../components/tools/ColorPicker';
import Bucket from '../components/tools/Bucket';
import CircleTool from '../components/tools/CircleTool';
import Rectangle from '../components/tools/Rectangle';
import MoveTool from '../components/tools/MoveTool';
import Keyboard from '../components/tools/Keyboard';

export default {
  name: 'home',
  components: {
    Keyboard,
    MoveTool,
    EraserTool,
    Pen,
    GoogleDrive,
    Animation,
    Frame,
    CanvasDraw,
    FirebaseStore,
    StrokeLine,
    MirrorPen,
    ColorPicker,
    Bucket,
    CircleTool,
    Rectangle,
    Download,
  },
  data() {
    return {
      dialog: false,
      SelectedToolId: 1,
      height: 700,
      width: 700,
    };
  },
  created() {
    document.addEventListener('keyup', e => {
      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyKeyboard)) {
        let value = document.getElementById('palette1').value;
        document.getElementById('palette1').value = document.getElementById(
          'palette2',
        ).value;
        document.getElementById('palette2').value = value;
        this.$store.state.SelectedTool = 0;
        document.querySelector('#canvas').onmousedown = null;
        document.querySelector('#canvas').onmouseup = null;
        document.querySelector('#canvas').onmouseout = null;
        document.querySelector('#canvas').onmousemove = null;
      }
    });
  },
  mounted() {
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
    canvas.addEventListener(
      'mousemove',
      function(e) {
        const pos = getPosition(this);
        const x = e.pageX - pos.x;
        const y = e.pageY - pos.y;
        let coord = `${x}:${y}`;
        let CanvasStatus = `${coord}`;

        document.getElementById('coord').innerHTML = CanvasStatus;
      },
      false,
    );
    document.querySelector('#palette1').addEventListener(
      'input',
      function(e) {
        localStorage.setItem(
          `palette1`,
          `${document.querySelector('#palette1').value}`,
        );
        localStorage.setItem(
          `palette2`,
          `${document.querySelector('#palette2').value}`,
        );
      },
      false,
    );
    if (localStorage.getItem(`palette1`) !== null) {
      document.querySelector('#palette1').value = localStorage.getItem(
        'palette1',
      );
      document.querySelector('#palette2').value = localStorage.getItem(
        'palette2',
      );
    }
    if (localStorage.getItem(`BrushSize`) !== null) {
      this.$store.state.BrushSize = parseInt(localStorage.getItem('BrushSize'));
      this.ChangeBrushSize(this.$store.state.BrushSize);
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    },
    profile() {
      this.$router.replace('profile');
    },
    likes() {
      this.$router.replace('likes');
    },
    InputColor() {
      this.$store.state.SelectedTool = 0;
      document.querySelector('#canvas').onmousedown = null;
      document.querySelector('#canvas').onmouseup = null;
      document.querySelector('#canvas').onmouseout = null;
      document.querySelector('#canvas').onmousemove = null;
    },
    ChangeBrushSize(size) {
      this.$store.state.BrushSize = size;
      this.$store.state.SelectedTool = 0;
      document.querySelector('#canvas').onmousedown = null;
      document.querySelector('#canvas').onmouseup = null;
      document.querySelector('#canvas').onmouseout = null;
      document.querySelector('#canvas').onmousemove = null;
      localStorage.setItem(`BrushSize`, `${size}`);
    },
  },
};
</script>

<style>
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.logout {
  top: 100%;
}

body {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
}

.section-left-tools {
  width: 10vw;
}

h2 {
  font-size: 36px;
  margin: 15px;
  color: #d8d8d8;
}
.ul-pen-size {
  display: flex;
  flex-direction: row;
  padding: 0;
}
.pen-size-option1 {
  margin: 2px 2px;
  padding: 10px;
  height: 2vw;
  width: 2vw;
  background-color: grey;
  box-shadow: 0px 0px 0px 0px rgba(255, 252, 80, 1);
  font-size: 0.5vw;
  color: white;
}
.pen-size-option2 {
  margin: 2px 2px;
  padding: 7px;
  height: 2vw;
  width: 2vw;
  background-color: grey;
  box-shadow: 0px 0px 0px 0px rgba(255, 252, 80, 1);
  font-size: 1vw;
  color: white;
}
.pen-size-option3 {
  margin: 2px 2px;
  padding: 4px;
  height: 2vw;
  width: 2vw;
  background-color: grey;
  box-shadow: 0px 0px 0px 0px rgba(255, 252, 80, 1);
  font-size: 1.5vw;
  color: white;
}

.pen-size-option4 {
  margin: 2px 2px;
  padding: 0;
  height: 2vw;
  width: 2vw;
  background-color: grey;
  box-shadow: 0px 0px 0px 0px rgba(255, 252, 80, 1);
  font-size: 2vw;
  color: white;
}
.size-picker-opt:hover {
  background-color: black;
}

.ul-tools {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding-left: 0px;
}

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
.active {
  background-color: rgba(255, 252, 80, 1) !important;
}
#palette1 {
  position: relative;
  z-index: 1;
}
#palette2 {
  position: relative;
  top: 2vw;
  right: 1.5vw;
}
#keyboard {
  position: relative;
  left: -2.8vw;
  margin-top: 2.5vw;
}
.center-section-wrapper {
  display: flex;
  width: inherit;
  padding: 0;
  text-align: center;
  font-size: 0;
  margin-top: 1vw;
}

.application-action-section {
  width: 10vw;
}

.frames-tools-wrapper {
  padding: 0px 10px;
  max-width: 150px;
}

::-webkit-scrollbar {
  display: none;
}

.frame-list {
  max-height: 70vh;
  padding: 0;
  overflow: scroll;
}

.frame-list > li {
  background-image: url(../assets/images/small.png);
  border-radius: 5px;
}

.frame {
  height: 130px;
  width: 130px;
  margin-bottom: 8px;
  border-width: 3px;
  border-color: #888888;
  border-style: solid;
  border-radius: 5px;
  color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.frame:hover {
  border-color: white;
  color: white;
}

.frame-detail {
  height: 33px;
  width: 33px;
  padding: 5px;
  background-color: transparent;
  display: inline-block;
  border-radius: 3px;
  font-size: 23px;
  color: inherit;
}

.frame-number {
  margin: -2px 30px 30px -2px;
  font-weight: 900;
  color: white;
}

.frame-delete {
  margin: -2px -2px 30px 30px;
}

.frame-move {
  margin: 31px 30px -2px -2px;
}

.frame-copy {
  margin: 31px -2px -2px 30px;
}

.add-frame-button {
  height: 50px;
  width: 130px;
  padding: 5px;
  display: flex;
  margin-bottom: 10px;
  border-width: 3px;
  border-color: #888888;
  border-style: solid;
  border-radius: 5px;
  color: #2c3e50;
  font-size: 14px;
  background-color: #cfcfcf;
}

.add-frame-button:hover {
  border-color: #fffc50;
}

.main-canvas-wrapper {
  margin: 0;
  background-image: url(../assets/images/large.png);
  background-position: center;
  background-size: 100%;
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

.preview-canvas:fullscreen {
  background-position: center;
  background-size: 60%;
  background-color: rgb(87, 81, 81);
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
.ul-download {
  padding-left: 15.7vw;
}
.v-tooltip {
  margin: 0;
}
.v-tooltip span {
  color: white;
}
.tooltip {
  position: relative;
  margin: 0;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  font-size: 15px;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
