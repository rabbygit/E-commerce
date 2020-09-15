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
        <v-col class="d-none d-lg-flex" lg="1"></v-col>
        <v-col cols="12" lg="10">
          <v-container fluid>
            <p class="mt-2 text-sm-body-1">
              {{products.length}} items found for
              <span
                class="font-weight-medium"
              >"{{$route.params.terms}}"</span>
            </p>
            <v-divider></v-divider>

            <!-- If products are found -->
            <v-row v-show="products.length">
              <!-- <v-col class="d-none d-lg-flex flex-column" lg="2">
              </v-col>-->
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
        <v-col class="d-none d-lg-flex" lg="1"></v-col>
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
      loading: true,
      searhTerms: "",
      products: [],
      page: 1,
      perPage: 6,
      pages: [],
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

    setMinMaxValue() {
      // this.min = this.products[0].price;
      // this.max = this.products[this.products.length - 1].price;
    },
  },
  watch: {
    products() {
      this.setPages();
      this.setMinMaxValue();
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
    if (this.$route.query.item.level != "" && this.$route.query.item.id != "") {
      this.$axios
        .post(`https://tango99.herokuapp.com/category/show/`, {
          id: this.$route.query.item.id,
          level: this.$route.query.item.level,
        })
        .then((res) => {
          console.log(res.data);
          this.products = res.data.data;
          this.loading = false;
        });
    }
  },
};
</script>

<style>
</style>