
<template>
  <div class="login">
    <img src="../assets/edit.svg" width="100px">
    <h3>Piskel</h3>
    <input type="text" v-model="email" placeholder="Email address" class="input" required>
    <br>
    <input type="password" v-model="password" placeholder="Password" class="input" required>
    <br>
    <button v-on:click="login" class="button">Enter</button>
    <p>or Sign In with Google
      <br>
      <button @click="socialLogin" class="social-button">
        <img alt="Google Logo" src="../assets/google-logo.svg">
      </button>
    </p>
    <p>
      <router-link to="/signup">New Here? Create a new account</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../main';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then((user) => {
          this.$router.replace('/home');
        })
        .catch(err => err);
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        // eslint-disable-next-line no-unused-vars
        .then((result) => {
          const createdAt = new Date();
          let key = 0;
          for (let i = 0; i < result.user.uid.length; i += 1) {
            key += result.user.uid.charCodeAt(i);
          }
          const user = {
            name: result.user.displayName,
            image: result.user.photoURL,
            createdAt,
            key,
            uid: result.user.uid,
          };
          const data = {
            key,
          };
          db.collection('key')
            .doc('key')
            .set(data);
          db.collection('users')
            .doc(result.user.uid)
            .set(user);
          this.$router.replace('/home');
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(`Oops. ${err.message}`);
        });
    },
  },
};
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  align-self: center;
  margin: 10px 0;
  width: auto;
  padding: 15px;
}
button {
  margin: 10px 0;
  background-color: #0476f2;
}
a {
  color: black;
  text-decoration: underline;
}

p {
  margin-top: 40px;
  font-size: 13px;
}
h1,
h2 {
  font-weight: normal;
}
.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}
.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.social-button img {
  width: 100%;
}
</style>
