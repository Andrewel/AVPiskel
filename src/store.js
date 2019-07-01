import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BrushSize: 1,
    SelectedTool: 0,
    KeyCode: {
      KeyPen: 73, // I
      KeyVPen: 86, // V
      KeyBucket: 66, // B
      KeyKeyboard: 88, // X
      KeyPicker: 80, // P
      KeyEraser: 69, // E
      KeyRectangle: 82, // R
      KeyCircle: 67, // C
    },
    existingLines: [],
  },
  mutations: {

  },
  actions: {

  },
});
