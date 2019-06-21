<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app dark>
      <v-toolbar flat class="transparent" v-for="(User, idx) in Users" :key="idx">
        <v-list class="pa-6">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="User.image" alt="avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ User.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense>
        <v-divider></v-divider>
        <v-list-tile @click="cv()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="cv()">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="pink" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer;"></v-toolbar-side-icon>

      <v-toolbar-title>Profile</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-on:click="home">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon v-on:click="logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar>
    <article v-for="(User, idx) in Users" :key="idx">
      <v-avatar class="avatar" :tile="false" size="200px" color="grey lighten-4">
        <img :src="User.image" alt="avatar">
      </v-avatar>
      <p>{{ User.name }}</p>
    </article>
    <form @submit="addComic(name, age, country, downloadURL);">
      <v-btn
        class="upload_button"
        @click.native="selectFile"
        v-if="!uploadEnd && !uploading"
      >Upload a cover image
        <v-icon right aria-hidden="true">add_a_photo</v-icon>
      </v-btn>
      <input
        id="files"
        type="file"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event);"
      >
      <v-progress-circular
        v-if="uploading && !uploadEnd"
        :size="100"
        :width="15"
        :rotate="360"
        :value="progressUpload"
        color="primary"
      >{{ progressUpload }}</v-progress-circular>
      <br>
      <input v-model="name" type="text" class="input" placeholder="Name" required>
      <br>
      <input v-model="age" type="text" class="input" placeholder="Age" required>
      <br>
      <input v-model="country" type="text" class="input" placeholder="Country" required>
      <br>
      <v-btn small type="submit" class="button">Update profile</v-btn>
    </form>
    <v-snackbar
      v-model="snackbar"
      color="success"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark flat @click="snackbar = false;">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestorage, db } from '../main';

export default {
  name: 'profile',
  data() {
    return {
      drawer: null,
      snackbar: false,
      mode: '',
      timeout: 5000,
      text: 'Success',
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      Users: [],
      name: '',
      image: '',
      country: '',
      age: '',
      uid: firebase.auth().currentUser.uid,
    };
  },
  props: {
    source: String,
  },
  firestore() {
    return {
      Users: db.collection('users').where('uid', '==', this.uid),
    };
  },
  methods: {
    addComic(name, age, country, downloadURL) {
      const createdAt = new Date();
      // let key = this.key.key;
      // let uid = firebase.auth().currentUser.uid;
      let key = 0;
      for (let i = 0; i < this.uid.length; i += 1) {
        key += this.uid.charCodeAt(i);
      }
      const user = {
        name,
        age,
        country,
        image: downloadURL,
        createdAt,
        key,
        uid: this.uid,
      };
      this.name = '';
      this.age = '';
      this.country = '';
      const data = {
        key,
      };
      db.collection('key')
        .doc('key')
        .set(data);
      db.collection('users')
        .doc(this.uid)
        .set(user);
      db.collection('users')
        .doc(this.uid)
        .collection('MyLikes')
        .doc(this.uid)
        .set(user);
      db.collection('users')
        .doc(this.uid)
        .collection('MyLikes')
        .doc(this.uid)
        .set(
          {
            like: false,
          },
          { merge: true },
        );
    },
    deleteComic(id) {
      db.collection('users')
        .doc(id)
        .delete();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/login');
        });
    },
    home() {
      this.$router.replace('/home');
    },
    selectFile() {
      this.$refs.uploadInput.click();
    },
    detectFiles(e) {
      const fileList = e.target.files || e.dataTransfer.files;
      // eslint-disable-next-line array-callback-return
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      this.fileName = this.uid;
      this.uploading = true;
      this.uploadTask = firestorage.ref(`images/${this.uid}`).put(file);
    },
    deleteImage() {
      firestorage
        .ref(`images/${this.fileName}`)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = '';
        })
        .catch(error => error);
    },
    cv() {
      this.$router.replace('cv');
    },
  },
  watch: {
    uploadTask() {
      this.uploadTask.on(
        'state_changed',
        (sp) => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100,
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.uploadEnd = true;
            this.downloadURL = downloadURL;
            this.$emit('downloadURL', downloadURL);
            this.snackbar = true;
          });
        },
      );
    },
  },
};
</script>

<style scoped>
.avatar {
  margin: 5%;
}
.upload_button {
  text-align: center;
}
.progress-bar {
  margin: 10px 0;
}
input[type='file'] {
  display: none;
}
input {
  align-self: center;
  margin: 2% 0;
  width: auto;
  padding: 15px;
}
</style>
