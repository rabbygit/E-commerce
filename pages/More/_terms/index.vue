<template>
  <v-container>
    <v-container v-if="loading">
      <v-row>
        <div style="min-height: 50vh ; min-width: 100%;" class="d-flex align-center justify-center">
          <div>
            <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>
          </div>
        </div>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col cols="12">
          <v-container fluid>
            <p class="mt-2 text-sm-body-1">
              {{products.length || "0"}} items found for
              <span
                class="font-weight-medium"
              >"{{$route.params.terms}}"</span>
            </p>
            <v-divider></v-divider>
            <!-- If products are found -->
            <v-row v-show="products.length">
              <v-col cols="12">
                <ProductCardSection :products="displayedPosts" />
              </v-col>
            </v-row>

            <!-- If no products are found -->
            <v-row justify="center" v-show="!products.length">
              <p>No Products Found</p>
            </v-row>

            <v-row justify="center">
              <div>
                <v-btn fab v-if="page != 1" @click="page--" color="orange">
                  <v-icon>mdi-chevron-double-left</v-icon>
                </v-btn>
                <v-btn
                  color="orange"
                  fab
                  small
                  class="mx-1"
                  v-for="pageNumber in pages.length"
                  :key="pageNumber"
                  @click="page = pageNumber"
                >{{pageNumber}}</v-btn>
                <v-btn @click="page++" fab v-if="page < pages.length" color="orange">
                  <v-icon>mdi-chevron-double-right</v-icon>
                </v-btn>
              </div>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  auth: false,
  loading: true,
  components: {
    ProductCardSection: () => import("~/components/ProductCardSection.vue"),
  },
  data() {
    return {
      dialog: false,
      loading: false,
      page: 1,
      perPage: 8,
      pages: [],
      products: [],
    };
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.products.length / this.perPage);
      this.pages.length = 0;
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    paginate(products) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return products.slice(from, to);
    },
  },
  watch: {
    products() {
      this.setPages();
    },
  },

  computed: {
    displayedPosts() {
      if (this.products.length) {
        return this.paginate(this.products);
      }
    },
  },

  created() {
    if (this.$route.params.terms != "") {
      this.$axios
        .post(`https://tango99.herokuapp.com/product/showmore/`, {
          name: this.$route.params.terms,
        })
        .then((res) => {
          console.log(res.data);
          this.products = res.data.data[0].products;
          this.loading = false;
        });
    }
  },
};
</script>

<style>
</style>