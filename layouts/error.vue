<template>
  <v-container>
    <v-container v-if="error.statusCode === 404">
      <v-row justify="center">
        <v-col>
          <h1>OOOPS!</h1>
          <p>{{pageNotFound}}</p>
          <v-img src="/error.png" height="40vh"></v-img>
          <v-btn tile outlined color="orange" nuxt to="/">Back To Home</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="center">
        <v-col>
          <h1>OOOPS!</h1>
          <p>{{otherError}}</p>
          <v-img src="/other.png" height="40vh"></v-img>
          <v-btn tile outlined color="orange" nuxt to="/">Back To Home</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
