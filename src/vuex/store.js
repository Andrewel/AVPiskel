/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    storage: ['ggwp'],
    current_route: '',
    firebaseConfig: {
      apiKey: 'AIzaSyCM7BS4mal3CCAHI6iS4wWjbXT4ZzcxyHI',
      authDomain: 'aiproject-1541859847085.firebaseapp.com',
      databaseURL: 'https://aiproject-1541859847085.firebaseio.com',
      projectId: 'aiproject-1541859847085',
      storageBucket: 'aiproject-1541859847085.appspot.com',
      messagingSenderId: '463964342483',
    },
  },
});
