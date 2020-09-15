<template>
  <v-container fluid>
    <v-container v-if="advertisements.length > 0">
      <v-row>
        <v-col v-for="(adv , index ) in advertisements" :key="index" cols="12" sm="4">
          <!-- If advertisement has link -->
          <a :href="adv.ad_link" v-if="adv.ad_link">
            <v-img :src="adv.image_url" max-height="180px"></v-img>
          </a>
          <!-- else -->
          <v-img :src="adv.image_url" max-height="180px" v-else></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="loading">
      <v-row justify="center">
        <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      advertisements: [],
      loading: true,
    };
  },
  mounted() {
    // Advertisements of the site
    this.$axios
      .get("https://tango99.herokuapp.com/ad/showallads/")
      .then((response) => {
        if (response.data.success) {
          this.advertisements = response.data.data;
          this.loading = false;
        }
      });
  },
};
</script>

<style>
</style>