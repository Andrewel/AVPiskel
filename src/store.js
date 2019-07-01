import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BrushSize: 1,
    SelectedTool: 0,
    KeyCode: {
      KeyI: 73,
      KeyV: 86,
      KeyB: 66,
    },
    existingLines: [],
  },
  mutations: {

  },
  actions: {

  },
});
