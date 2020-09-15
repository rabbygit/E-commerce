<template>
  <v-container>
    <v-container>
      <v-img src="/About.jpg"></v-img>
    </v-container>

    <v-container>
      <v-card tile>
        <v-row no-gutters>
          <v-col md="6" cols="12">
            <v-img :src="companyInfo.logo_url || '' " max-width="100%" min-height="500px"></v-img>
          </v-col>
          <v-col md="4" cols="12" class="ml-5">
            <p class="text-md-h4 text-body-1 text-center text-md-left mt-5">WHO ARE WE ?</p>
            <p
              class="text-md-body-1 text-body-2 text-center text-md-left"
              transition="scroll-x-transition"
            >{{companyInfo.About}}</p>
          </v-col>
          <v-col md="2" class="d-none d-md-flex"></v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container>
      <v-card tile>
        <v-row justify="center">
          <v-col md="2" class="d-none d-md-flex"></v-col>
          <v-col md="8" cols="12">
            <p class="text-md-h4 text-body-1 text-center">Our Slogan</p>
            <p class="text-center" transition="fade-transition">{{companyInfo.slogan}}</p>
          </v-col>
          <v-col md="2" class="d-none d-md-flex"></v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      companyInfo: {},
    };
  },
  mounted() {
    // Fetch Company information
    this.$axios
      .get("https://tango99.herokuapp.com/site/info")
      .then((response) => {
        if (response.data) {
          this.companyInfo = response.data.data[0];
        }
      });
  },
};
</script>

<style>
</style>