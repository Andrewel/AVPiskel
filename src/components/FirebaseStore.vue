
<template>
  <li id="tool-firebase-firestore">
    <i
      class="fas fa-cloud-upload-alt tool cloud-upload-alt-icon upload_button"
      id="cloud-upload-alt"
      @click="selectFile()"
      v-if="!uploadEnd && !uploading"
    ></i>
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
  </li>
</template>

<script>
/* eslint-disable no-alert */
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestorage, db } from '../main';

export default {
  name: 'FirebaseStore',
  data() {
    return {
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
    addComic(downloadURL) {
      const createAt = new Date();
      let key = 0;
      for (let i = 0; i < this.uid.length; i += 1) {
        key += this.uid.charCodeAt(i);
      }
      const user = {
        image: downloadURL,
        createAt,
        key,
        uid: this.uid,
      };
      db.collection('users')
        .doc(this.uid)
        .collection('MyGallery')
        .doc()
        .set(user);
    },
    deleteComic(id) {
      db.collection('users')
        .doc(id)
        .delete();
    },
    selectFile() {
      this.$refs.uploadInput.click();
    }, //
    detectFiles(e) {
      const fileList = e.target.files || e.dataTransfer.files;
      // eslint-disable-next-line array-callback-return
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x]);
      });
    },
    //
    upload(file) {
      this.fileName = file.name;
      this.uploading = true;
      this.uploadTask = firestorage.ref(`images/${this.fileName}`).put(file);
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
            this.addComic(downloadURL);
          });
        },
      );
    },
  },
};
</script>

<style scoped>
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
  margin: 1% 0;
  width: auto;
  padding: 15px;
}
</style>
