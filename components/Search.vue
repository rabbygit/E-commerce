<template>
  <div>
    <v-text-field
      append-icon="mdi-magnify"
      rounded
      hide-details
      solo-inverted
      v-model="terms"
      @keyup.enter="onSearch"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      terms: "",
    };
  },
  methods: {
    // Search function on enter take user to search page
    onSearch() {
      // this.$router.push({
      //   path: "/search/",
      //   params: { terms: this.terms },
      // });
      this.$router.push(`/search/${this.terms}`)
      this.terms = ''
    },
  },
};
</script>

<style>
</style>