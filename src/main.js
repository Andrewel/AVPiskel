// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import App from './App';
import router from './router';


Vue.use(Vuetify);
Vue.use(VueFire);

let app = '';
firebase.initializeApp({
  apiKey: 'AIzaSyDD_GSQ9QQ_AIqUNQGPkk2L0FAj_8gSAdM',
  authDomain: 'avpush-1267f.firebaseapp.com',
  databaseURL: 'https://avpush-1267f.firebaseio.com',
  projectId: 'avpush-1267f',
  storageBucket: 'avpush-1267f.appspot.com',
  messagingSenderId: '109913145060',
});
export const db = firebase.firestore();

export const firestorage = firebase.storage();

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
