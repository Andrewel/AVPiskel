<template>
  <div class="login">
    <img src="../assets/logo.png" width="100px">
    <h3>Piskel</h3>
    <input type="text" v-model="email" placeholder="Email address" class="input" required>
    <br>
    <input type="password" v-model="password" placeholder="Password" class="input" required>
    <br>
    <button v-on:click="login" class="button">Enter</button>
    <p>or Sign In with Google
      <br>
      <button @click="socialLogin" class="social-button">
        <img alt="Google Logo" src="../assets/google-logo.png">
      </button>
    </p>
    <p>
      <router-link to="/signup">New Here? Create a new account</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase';

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
        .then(user => {
          this.$router.replace('/home');
        })
        .catch(err => {
          alert(err.message);
        });
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$router.replace('/home');
        })
        .catch(err => {
          alert('Oops. ' + err.message);
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
