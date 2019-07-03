<template>
   <v-dialog style="text-align: left" v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <i v-on="on" class="fas fa-keyboard tool keyboard-icon" id="keyboard"></i>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Keyboard
              shortcuts
            </v-card-title>
            <span>
              <input
                class="input-KeyPen"
                value="I"
                @keyup.enter="changeKeyPen()"
                style="width:1.2vw"
              >
              <i class="fas fa-pen pen-icon"></i>
              Pen tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyVPen"
                value="V"
                @keyup.enter="changeKeyVPen()"
                style="width:1.2vw"
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
                style="width:1.2vw"
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
                style="width:1.2vw"
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
                style="width:1.2vw"
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
                style="width:1.2vw"
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
                style="width:1.2vw"
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
                style="width:1.2vw"
              >
              <i class="fas fa-eye-dropper eye-dropper-icon"></i>
              ColorPicker tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyMove"
                value="M"
                @keyup.enter="changeKeyMove()"
                style="width:1.2vw"
              >
              <i class="fas fa-hand-paper hand-paper-icon"></i>
              Move tool
            </span>
            <br>
            <span>
              <input
                class="input-KeyKeyboard"
                value="X"
                @keyup.enter="changeKeyKeyboard()"
                style="width:1.2vw"
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
</template>

<script>
export default {
  name: 'Keyboard',
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
    changeKeyDuplicates(key) {
      if (
        this.$store.state.KeyCode.KeyPen === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyPen').value = '';
        this.$store.state.KeyCode.KeyPen = '';
      } else if (
        this.$store.state.KeyCode.KeyVPen === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyVPen').value = '';
        this.$store.state.KeyCode.KeyVPen = '';
      } else if (
        this.$store.state.KeyCode.KeyEraser === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyEraser').value = '';
        this.$store.state.KeyCode.KeyEraser = '';
      } else if (
        this.$store.state.KeyCode.KeyPicker === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyPicker').value = '';
        this.$store.state.KeyCode.KeyPen = '';
      } else if (
        this.$store.state.KeyCode.KeyRectangle ===
        key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyRectangle').value = '';
        this.$store.state.KeyCode.KeyRectangle = '';
      } else if (
        this.$store.state.KeyCode.KeyCircle === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyCircle').value = '';
        this.$store.state.KeyCode.KeyCircle = '';
      } else if (
        this.$store.state.KeyCode.KeyStroke === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyStroke').value = '';
        this.$store.state.KeyCode.KeyStroke = '';
      } else if (
        this.$store.state.KeyCode.KeyBucket === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyBucket').value = '';
        this.$store.state.KeyCode.KeyBucket = '';
      } else if (
        this.$store.state.KeyCode.KeyBucket === key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyMove').value = '';
        this.$store.state.KeyCode.KeyMove = '';
      } else if (
        this.$store.state.KeyCode.KeyKeyboard ===
        key.toUpperCase().charCodeAt(0)
      ) {
        document.querySelector('.input-KeyKeyboard').value = '';
        this.$store.state.KeyCode.KeyKeyboard = '';
      }
    },
    changeKeyPen() {
      const key = document.querySelector('.input-KeyPen').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyPen = key.toUpperCase().charCodeAt(0);
    },
    changeKeyVPen() {
      const key = document.querySelector('.input-KeyVPen').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyVPen = key.toUpperCase().charCodeAt(0);
    },
    changeKeyEraser() {
      const key = document.querySelector('.input-KeyEraser').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyEraser = key.toUpperCase().charCodeAt(0);
    },
    changeKeyPicker() {
      const key = document.querySelector('.input-KeyPicker').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyPicker = key.toUpperCase().charCodeAt(0);
    },
    changeKeyRectangle() {
      const key = document.querySelector('.input-KeyRectangle').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyRectangle = key.toUpperCase().charCodeAt(0);
    },
    changeKeyCircle() {
      const key = document.querySelector('.input-KeyCircle').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyCircle = key.toUpperCase().charCodeAt(0);
    },
    changeKeyStroke() {
      const key = document.querySelector('.input-KeyStroke').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyStroke = key.toUpperCase().charCodeAt(0);
    },
    changeKeyBucket() {
      const key = document.querySelector('.input-KeyBucket').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyBucket = key.toUpperCase().charCodeAt(0);
    },
    changeKeyKeyboard() {
      const key = document.querySelector('.input-KeyKeyboard').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyKeyboard = key.toUpperCase().charCodeAt(0);
    },
    changeKeyMove() {
      const key = document.querySelector('.input-KeyMove').value;
      this.changeKeyDuplicates(key);
      this.$store.state.KeyCode.KeyMove = key.toUpperCase().charCodeAt(0);
    },
  },
};
</script>

<style scoped>
</style>

