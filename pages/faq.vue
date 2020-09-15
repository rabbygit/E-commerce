<template>
  <v-container>
    <v-container>
      <v-img src="/About.jpg"></v-img>
      <v-expansion-panels class="mt-10">
        <v-expansion-panel v-for="(faq,i) in faqs" :key="i">
          <v-expansion-panel-header>
            <p class="orange--text text--darken-4 text-button">{{faq.question}}</p>
            <template v-slot:actions>
              <v-icon color="primary">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>{{faq.ans}}</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    faqs: [],
  }),
  mounted() {
    this.$axios
      .get("https://tango99.herokuapp.com/site/show_faq")
      .then((response) => {
        if (response.data) {
          this.faqs = response.data.data;
        }
      });
  },
};
</script>

<style>
</style>