<template>
  <li id="tool-google-drive">
    <file-picker-button :config="gConfig" @picked="showDetails">
      <i class="fab fa-google-drive tool google-drive-icon" id="google-drive"></i>
    </file-picker-button>
  </li>
</template>

<script>
import FilePickerButton from 'vue-google-picker';

export default {
  /* eslint-disable */
  name: 'GoogleDrive',
  components: {
    FilePickerButton,
  },
  created() {
    this.gConfig = {
      // The Browser API key obtained from the Google API Console.
      developerKey: 'AIzaSyCUC6eHK-tPitK42D3ZPMcPBb7tODjoQQc',

      // The Client ID obtained from the Google API Console. Replace with your own Client ID.
      clientId:
        '824221023993-555cbi36qlr96si216g7kvj47ti8qo43.apps.googleusercontent.com',

      // Scope to use to access user's drive.
      scope: 'https://www.googleapis.com/auth/drive.file',
    };
  },
  methods: {
    showDetails(data) {
      if (data.picked === 'picked') {
        console.log(data.docs);
      }
    },
  },
};
</script>

<style>
.tool {
  margin: 2px 2px;
  padding: 10px 5px;
  height: 4vw;
  width: 4vw;
  background-color: grey;
  box-shadow: 0px 0px 0px 0px rgba(255, 252, 80, 1);
  font-size: 2vw;
  color: white;
}

.tool:hover {
  background-color: black;
}
</style>
