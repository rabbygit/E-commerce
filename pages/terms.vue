<template>
  <v-container>
    <v-container>
      <v-row>
        <v-card color="light-blue lighten-3" width="100%" flat tile>
          <v-container>
            <v-row align="center">
              <v-col sm="10">
                <div class="d-flex align-center justify-center" style="hight:100%;">
                  <p class="text-h4">Terms and Conditions</p>
                </div>
              </v-col>
              <v-col sm="2">
                <v-img src="/eg_legals_tc.png"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
    <v-container v-if="loading">
      <page-loading ></page-loading>
    </v-container>
    <v-container v-else>
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          :color="index%2 !=0 ? 'purple lighten-2' : 'amber lighten-1' "
          fill-dot
          :right="index%2 !=0 ? true : false "
          :left="index%2 !=0 ? false : true "
          v-for="(term , index) in companyInfo.terms_condition"
          :key="index"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col>{{term}}</v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </v-container>
</template>

<script>
export default {
  auth: false,
  components : {
    PageLoading: () => import("~/components/PageLoading.vue"),
  },
  data() {
    return {
      companyInfo: {},
      loading : true
    };
  },
  mounted() {
    this.$axios.get("https://tango99.herokuapp.com/site/info").then((response) => {
      if (response.data) {
        this.companyInfo = response.data.data[0];
        this.loading = false
      }
    });
  },
};
</script>

<style scoped>
ol {
  /* max-width: 350px; */
  counter-reset: my-awesome-counter;
  list-style: none;
  padding-left: 40px;
}
ol li {
  margin: 0 0 0.5rem 0;
  counter-increment: my-awesome-counter;
  position: relative;
}
ol li::before {
  content: counter(my-awesome-counter);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  --size: 32px;
  left: calc(-1 * var(--size) - 10px);
  /* line-height: var(--size); */
  width: var(--size);
  height: var(--size);
  top: 0;
  background: #4a148c;
  border-radius: 50%;
  text-align: center;
  box-shadow: 1px 1px 0 #999;
}
</style>