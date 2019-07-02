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
        <div class="pen-size-container size-picker-container">
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
        </div>
        <ul class="ul-tools">
          <!--  <li id="tool-pen">
            <i class="fas fa-pen tool pen-icon" id="pen"></i>
          </li>-->
          <Pen :SelectedToolId="SelectedToolId"/>
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
          <!--  <li id="tool-eraser">
            <i class="fas fa-eraser tool eraser-icon" id="eraser"></i>
          </li>-->
          <EraserTool/>
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
        <v-dialog style="text-align: left" v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <i v-on="on" class="fas fa-keyboard tool keyboard-icon" id="keyboard"></i>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Keyboard shortcuts</v-card-title>
            <span>
              <input class="input-KeyPen" value="I" @keyup.enter="changeKeyPen()" style="width:1vw">
              <i class="fas fa-pen pen-icon"></i>
              Pen tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyVPen"
                value="V"
                @keyup.enter="changeKeyVPen()"
                style="width:1vw"
              >
              <i class="fas fa-pencil-alt pencil-alt-icon"></i>
              Mirror tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyBucket"
                value="B"
                @keyup.enter="changeKeyBucket()"
                style="width:1vw"
              >
              <i class="fas fa-fill-drip fill-drip-icon"></i>
              Paint bucket tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyEraser"
                value="E"
                @keyup.enter="changeKeyEraser()"
                style="width:1vw"
              >
              <i class="fas fa-eraser eraser-icon"></i>
              Eraser tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyStroke"
                value="L"
                @keyup.enter="changeKeyStroke()"
                style="width:1vw"
              >
              <i class="fas fa-pencil-ruler pencil-ruler-icon"></i>
              Stroke tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyRectangle"
                value="R"
                @keyup.enter="changeKeyRectangle()"
                style="width:1vw"
              >
              <i class="far fa-square square-icon"></i>
              Rectangle tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyCircle"
                value="C"
                @keyup.enter="changeKeyCircle()"
                style="width:1vw"
              >
              <i class="far fa-circle circle-icon"></i>
              Circle tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyPicker"
                value="P"
                @keyup.enter="changeKeyPicker()"
                style="width:1vw"
              >
              <i class="fas fa-eye-dropper eye-dropper-icon"></i>
              ColorPicker tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyKeyboard"
                value="X"
                @keyup.enter="changeKeyKeyboard()"
                style="width:1vw"
              >
              <i class="fas fa-keyboard keyboard-icon"></i>
              Swap primary/secondary colors
            </span>
            <br>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialog = false">Accept</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </section>
      <Frame/>
      <div class="main-canvas-wrapper">
        <CanvasDraw :width="width" :height="height"/>
        <!-- <div class="main-canvas-wrapper">
          <canvas id="canvas" class="main-canvas" width="700" height="700"></canvas>
        </div>-->
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

export default {
  name: 'home',
  components: {
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
      KeyCode: {
        KeyPen: 'P', // I
        KeyVPen: 86, // V
        KeyBucket: 66, // B
        KeyKeyboard: 88, // X
        KeyPicker: 80, // P
        KeyEraser: 69, // E
        KeyRectangle: 82, // R
        KeyCircle: 67, // C
      },
      dialog: false,
      SelectedToolId: 1,
      height: 700,
      width: 700,
    };
  },
  created() {
    document.addEventListener('keyup', e => {
      //  console.log(e.KeyCode)
      if (e.keyCode === parseInt(this.$store.state.KeyCode.KeyKeyboard)) {
        let value = document.getElementById('palette1').value;
        document.getElementById('palette1').value = document.getElementById(
          'palette2',
        ).value;
        document.getElementById('palette2').value = value;
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
    },
    changeKeyDuplicates(key) {
      if (
        this.$store.state.KeyCode.KeyPen === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyPen').value = '';
        this.$store.state.KeyCode.KeyPen = '';
      } else if (this.$store.state.KeyCode.KeyVPen === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyVPen').value = '';
        this.$store.state.KeyCode.KeyVPen = '';
      } else if (this.$store.state.KeyCode.KeyEraser === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyEraser').value = '';
        this.$store.state.KeyCode.KeyEraser = '';
      } else if (this.$store.state.KeyCode.KeyPicker === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyPicker').value = '';
        this.$store.state.KeyCode.KeyPen = '';
      } else if (this.$store.state.KeyCode.KeyRectangle === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyRectangle').value = '';
        this.$store.state.KeyCode.KeyRectangle = '';
      } else if (this.$store.state.KeyCode.KeyCircle === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyCircle').value = '';
        this.$store.state.KeyCode.KeyCircle = '';
      } else if (this.$store.state.KeyCode.KeyStroke === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyStroke').value = '';
        this.$store.state.KeyCode.KeyStroke = '';
      } else if (this.$store.state.KeyCode.KeyBucket === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyBucket').value = '';
        this.$store.state.KeyCode.KeyBucket = '';
      } else if (this.$store.state.KeyCode.KeyKeyboard === key.toUpperCase().charCodeAt(0)) {
        document.querySelector('.input-KeyKeyboard').value = '';
        this.$store.state.KeyCode.KeyKeyboard = '';
      }
    },
    changeKeyPen() {
      let key = document.querySelector('.input-KeyPen').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyPen = key.toUpperCase().charCodeAt(0);
    },
    changeKeyVPen() {
      let key = document.querySelector('.input-KeyVPen').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyVPen = key.toUpperCase().charCodeAt(0);
    },
    changeKeyEraser() {
      let key = document.querySelector('.input-KeyEraser').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyEraser = key.toUpperCase().charCodeAt(0);
    },
    changeKeyPicker() {
      let key = document.querySelector('.input-KeyPicker').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyPicker = key.toUpperCase().charCodeAt(0);
    },
    changeKeyRectangle() {
      let key = document.querySelector('.input-KeyRectangle').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyRectangle = key.toUpperCase().charCodeAt(0);
    },
    changeKeyCircle() {
      let key = document.querySelector('.input-KeyCircle').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyCircle = key.toUpperCase().charCodeAt(0);
    },
    changeKeyStroke() {
      let key = document.querySelector('.input-KeyStroke').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyStroke = key.toUpperCase().charCodeAt(0);
    },
    changeKeyBucket() {
      let key = document.querySelector('.input-KeyBucket').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyBucket = key.toUpperCase().charCodeAt(0);
    },
    changeKeyKeyboard() {
      let key = document.querySelector('.input-KeyKeyboard').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyKeyboard = key.toUpperCase().charCodeAt(0);
    },
    changeTool(tool) {
      this.SelectedToolId = tool;
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
</style>
