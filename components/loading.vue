<template lang="html">
  <v-overlay v-if="loading" :value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    overlay: false,
  }),
  methods: {
    start() {
      this.overlay = true;
      this.loading = true;
    },
    finish() {
      this.overlay = false;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>