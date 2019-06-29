<template>
  <div class="home">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>PISKEL</v-toolbar-title>
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
        <div class="pen-size-container size-picker-container">
          <ul class="ul-pen-size">
            <li>
              <i class="fas fa-square pen-size-option1 size-picker-opt" id="pen-size-option1"></i>
            </li>
            <li>
              <i class="fas fa-square pen-size-option2 size-picker-opt" id="pen-size-option2"></i>
            </li>
            <li>
              <i class="fas fa-square pen-size-option3 size-picker-opt" id="pen-size-option3"></i>
            </li>
            <li>
              <i class="fas fa-square pen-size-option4 size-picker-opt" id="pen-size-option4"></i>
            </li>
          </ul>
        </div>
        <ul class="ul-tools">
          <Pen :SelectedToolId="SelectedToolId"/>
          <li id="tool-pen">
            <i class="fas fa-pen tool pen-icon" id="pen"></i>
          </li>
          <!--  <li id="tool-pencil-alt">
            <i class="fas fa-pencil-alt tool pencil-alt-icon" id="pencil-alt"></i>
          </li>-->
          <MirrorPen :SelectedToolId="SelectedToolId"/>
          <!-- <li id="tool-fill-drip">
            <i class="fas fa-fill-drip tool fill-drip-icon" id="fill-drip"></i>
          </li>-->
          <Bucket/>
          <li id="tool-fill">
            <i class="fas fa-fill tool fill-icon" id="fill"></i>
          </li>
          <li id="tool-eraser">
            <i class="fas fa-eraser tool eraser-icon" id="eraser"></i>
          </li>
          <!-- <li id="tool-pencil-ruler">
            <i class="fas fa-pencil-ruler tool pencil-ruler-icon" id="pencil-ruler"></i>
          </li>-->
          <StrokeLine/>
          <!--  <li id="tool-square">
            <i class="far fa-square tool square-icon" id="square"></i>
          </li>-->
          <Rectangle/>
          <!-- <li id="tool-circle">
            <i class="far fa-circle tool circle-icon" id="circle"></i>
          </li>-->
          <CircleTool/>
          <li id="tool-hand-paper">
            <i class="fas fa-hand-paper tool hand-paper-icon" id="hand-paper"></i>
          </li>
          <li id="tool-magic">
            <i class="fas fa-magic tool magic-icon" id="magic"></i>
          </li>
          <li id="tool-object-ungroup">
            <i class="fas fa-object-ungroup tool object-ungroup-icon" id="object-ungroup"></i>
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
          <!-- <li id="tool-eye-dropper">
            <i class="fas fa-eye-dropper tool eye-dropper-icon" id="eye-dropper"></i>
          </li>-->
          <ColorPicker/>
        </ul>
        <input type="color" id="palette1" value="#808080" style="width:4vw;height: 4vw">
        <input type="color" id="palette2" value="#808080" style="width:4vw;height: 4vw">
        <v-bottom-sheet v-model="sheet" class="keyboard-shortcuts">
          <template v-slot:activator>
            <i class="fas fa-keyboard tool keyboard-icon" id="keyboard"></i>
          </template>
          <v-list>
            <v-subheader>Keyboard shortcuts</v-subheader>
            <v-list-tile v-for="tile in tiles" :key="tile.title" @click="sheet = false">
              <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                  <img
                    :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                    :alt="tile.title"
                  >
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-bottom-sheet>
      </section>
      <!-- <section class="frames-tools-wrapper">
        <ul id="frame-list" class="frame-list"></ul>
        <button id="add-frame-button" class="add-frame-button">
          <i class="fas fa-plus" style="color: white;font-size:2rem;margin-right: 10px"></i>Add new
          <br>frame
        </button>
      </section>-->
      <Frame/>
      <div class="canvas-wrapper">
        <div class="show-area">
          <CanvasDraw :width="width" :height="height"/>
        </div>
        <!-- <div class="main-canvas-wrapper">
          <canvas id="canvas" class="main-canvas" width="700" height="700"></canvas>
        </div>-->
      </div>
      <section class="canvas-tools-wrapper">
        <!-- <div id="animated-preview-container" class="preview-container">
          <div class="preview-canvas-wrapper">
            <canvas id="preview-canvas" class="preview-canvas" width="200" height="200"></canvas>
          </div>
          <form name="fpsForm">
            <output class="output-fps" id="output-fps" name="fpsOutput">10</output>
            <span>FPS</span>
            <input
              class="input-fps"
              id="fps"
              type="range"
              name="fpsInput"
              value="10"
              min="1"
              max="24"
            >
            <canvas id="canvas"></canvas>
          </form>
        </div>-->
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

export default {
  name: 'home',
  components: {
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
      SelectedToolId: 1,
      height: 700,
      width: 700,
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    };
  },
  created() {
    document.addEventListener('keyup', e => {
      const KeyP = 80;
      const KeyC = 67;
      const KeyM = 77;
      const KeyT = 84;
      const KeyX = 88;

      if (e.keyCode === KeyP) {
        alert('p');
        this.SelectedToolId = 0;
        // PaintBucketTool();
      } else if (e.keyCode === KeyC) {
        alert('c');
        this.SelectedToolId = 1;
        // ChooseColorTool();
      } else if (e.keyCode === KeyM) {
        alert('m');
        this.SelectedToolId = 3;
        // MoveTool();
      } else if (e.keyCode === KeyT) {
        alert('t');
        // TransformTool();
      } else if (e.keyCode === KeyX) {
        let value = document.getElementById('palette1').value;
        document.getElementById('palette1').value = document.getElementById('palette2').value;
        document.getElementById('palette2').value = value
        alert('x');
        // TransformTool();
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
  },
  methods: {
    changeTool(tool) {
      this.SelectedToolId = tool;
    },
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
  },
};
</script>

<style>
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.show-area {
  width: fit-content;
  margin: 0 auto;
}
.logout {
  top: 100%;
}
//
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
#palette1 {
  position: relative;
  z-index: 1;
}
#palette2 {
  position: relative;
  top: 2vw;
  right: 1.5vw;
}
.keyboard-shortcuts {
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
.ul-download {
  padding-left: 15.7vw;
}
</style>
