<template>
  <li id="tool-google-drive">
    <file-picker-button :config="gConfig">
      <i class="fab fa-google-drive tool google-drive-icon" id="google-drive"></i>
    </file-picker-button>
  </li>
</template>

<script>
import FilePickerButton from './FilePickerButton';

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
  },
};
</script>

<style scoped>
</style>
