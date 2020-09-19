<template>
  <v-treeview :items="myitems">
    <template slot="label" slot-scope="props">
      <router-link
        :to="{ name: 'category-terms', params: { terms: props.item.title } , query: { item : props.item }}"
        v-if="props.item.title"
      >{{ props.item.title }}</router-link>
      <span v-else>{{ props.item.title }}</span>
    </template>
  </v-treeview>
</template>

<script>
export default {
  data() {
    return {
      myitems: [],
    };
  },
  mounted() {
    // Get all categories
    this.$axios
      .get("https://tango99.herokuapp.com/category/allcategories")
      .then((response) => {
        if (response.data) {
          this.myitems = response.data;
        }
      });
  },
};
</script>

<style scoped>
.v-application a {
  color: black;
  text-decoration: none;
}
</style>