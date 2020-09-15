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
          <v-container>
            <!-- If products are found -->
            <v-row v-show="products.length">
              <v-col class="d-none d-lg-flex flex-column" lg="2"></v-col>
              <v-col cols="12" lg="10">
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
  <!-- <h4>{{$route.params}}</h4> -->
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
        perPage: 3,
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
        return this.paginate(this.products);
      },
    },

    created() {
      this.searhTerms = this.$route.params.terms;
      this.products = [
        {
          id: 1,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 2,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 3,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 4,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 5,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 1,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 2,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 3,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 4,
          title: "Formal Shirt",
          new_price: 500,
        },
        {
          id: 5,
          title: "Formal Shirt",
          new_price: 500,
        },
      ];
      // /api/auth/products/search/?terms=${this.$route.params.terms}
      // this.$axios
      //   .get(
      //     `https://tango99.herokuapp.com/product/list/?search=${this.$route.params.terms}`
      //   )
      //   .then((res) => {
      //     this.products = res.data;
      //     this.loading = false;
      //   });
    },
  };
</script>

<style>
</style>