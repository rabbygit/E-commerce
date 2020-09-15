<template>
  <v-treeview :items="myitems">
    <template slot="label" slot-scope="props">
      <router-link :to="props.item.to" v-if="props.item.to">{{ props.item.name }}</router-link>
      <span v-else>{{ props.item.name }}</span>
    </template>
  </v-treeview>
</template>

<script>
export default {
  data() {
    return {
      myitems: [
        {
          id: 1,
          name: "Electronics",
          to: "/login",
          children: [
            {
              id: 2,
              name: "Mobile",
              children: [
                { id: 3, name: "Samsung" },
                { id: 4, name: "Xiomi" },
              ],
            },
            { id: 3, name: "Laptop" },
          ],
        },
        {
          id: 5,
          name: "Documents :",
          children: [
            {
              id: 6,
              name: "vuetify :",
              children: [
                {
                  id: 7,
                  name: "src :",
                  children: [
                    { id: 8, name: "index : ts" },
                    { id: 9, name: "bootstrap : ts" },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: "material2 :",
              children: [
                {
                  id: 11,
                  name: "src :",
                  children: [
                    { id: 12, name: "v-btn : ts" },
                    { id: 13, name: "v-card : ts" },
                    { id: 14, name: "v-window : ts" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: "Downloads :",
          children: [
            { id: 16, name: "October : pdf" },
            { id: 17, name: "November : pdf" },
            { id: 18, name: "Tutorial : html" },
          ],
        },
        {
          id: 19,
          name: "Videos :",
          children: [
            {
              id: 20,
              name: "Tutorials :",
              children: [
                { id: 21, name: "Basic layouts : mp4" },
                { id: 22, name: "Advanced techniques : mp4" },
                { id: 23, name: "All about app : dir" },
              ],
            },
            { id: 24, name: "Intro : mov" },
            { id: 25, name: "Conference introduction : avi" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.v-application a {
    color: black;
    text-decoration: none;
}
</style>