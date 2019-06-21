<template>
  <div class="home">
    <h1>vue-draw</h1>
    <button class="button profile" @click="likes()">My Gallery</button>
    <button class="button profile" @click="profile()">Profile</button>
    <button class="button logout" @click="logout()">Sign out</button>
    <div class="show-area">
      <CanvasDraw :width="640" :height="480" :outputName="'example'"/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import CanvasDraw from '../components/CanvasDraw';

export default {
  name: 'home',
  components: {
    CanvasDraw,
  },
  data() {
    return {};
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
  },
};
</script>

<style scoped>
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.show-area {
  width: fit-content;
  margin: 0 auto;
}
button {
  background-color: #0476f2;
}
.logout {
  top: 100%;
}
</style>
