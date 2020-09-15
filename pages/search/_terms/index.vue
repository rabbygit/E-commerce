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
            <v-row class="d-flex flex-sm-row flex-column align-center mr-5 mb-10 mb-sm-0">
              <p class="mt-2 text-sm-body-1">
                {{products.length}} items found for
                <span
                  class="font-weight-medium"
                >"{{$route.query.terms}}"</span>
              </p>
              <v-spacer></v-spacer>
              <div class="d-flex d-lg-none">
                <v-btn outlined color="red" @click.stop="dialog = true">
                  <v-icon>mdi-filter-variant</v-icon>Filter
                </v-btn>
              </div>
              <p class="mt-2 mx-5">Sort by</p>
              <div class="mb-sm-8">
                <v-select
                  v-model="defaultSelected.sort"
                  :items="items"
                  item-value="value"
                  item-text="name"
                  label="Outlined style"
                  dense
                  outlined
                  style="width:150px ; height: 5px;"
                  @change="filter"
                ></v-select>
              </div>
            </v-row>
            <v-divider></v-divider>

            <!-- If products are found -->
            <v-row v-show="products.length">
              <v-col class="d-none d-lg-flex flex-column" lg="2">
                <div class="my-3">
                  <p class="text-center font-weight-medium">Price</p>
                  <v-text-field
                    label="min"
                    outlined
                    dense
                    type="number"
                    style="height:50px;"
                    v-model="min"
                  ></v-text-field>
                  <v-text-field label="max" outlined dense style="height:50px;" v-model="max"></v-text-field>
                  <div class="text-center">
                    <v-btn color="orange" @click="filter">Apply</v-btn>
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="my-3">
                  <p class="text-center font-weight-medium my-1">Ratings</p>
                  <v-rating
                    v-model="rating"
                    x-small
                    color="orange"
                    background-color="orange"
                    @input="filter"
                  ></v-rating>
                </div>
                <v-divider></v-divider>
                <div class="my-3">
                  <p class="text-center font-weight-medium">Brand</p>
                  <div @click="filter">
                    <v-checkbox
                      v-for="(brand , index) in brands"
                      :key="index"
                      v-model="selectedbrands"
                      color="warning"
                      :label="brand"
                      :value="brand"
                      hide-details
                    ></v-checkbox>
                  </div>
                </div>
                <v-divider></v-divider>
              </v-col>
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

    <v-dialog v-model="dialog" max-width="60%">
      <v-card>
        <v-card-title>
          <p>Price</p>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false" color="red">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <div class="d-flex flex-row">
            <v-text-field
              label="min"
              outlined
              dense
              type="number"
              style="height:50px; max-width: 40%;"
              v-model="min"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              label="max"
              outlined
              dense
              style="height:50px; max-width: 40%;"
              v-model="max"
            ></v-text-field>
          </div>
          <div class="text-center">
            <v-btn color="orange" @click="filter" block>Apply Filter</v-btn>
          </div>
          <v-divider></v-divider>
          <div class="my-3 d-flex flex-column justify-center align-center">
            <p class="text-center font-weight-medium my-1">Ratings</p>
            <v-rating
              v-model="rating"
              small
              color="orange"
              background-color="orange"
              @input="filter"
            ></v-rating>
          </div>
          <v-divider></v-divider>
          <div class="my-3 text-center">
            <p class="text-center font-weight-medium">Brand</p>
            <div @click="filter" class="ml-5">
              <v-checkbox
                v-for="(brand , index) in brands"
                :key="index"
                v-model="selectedbrands"
                color="warning"
                :label="brand"
                :value="brand"
                hide-details
              ></v-checkbox>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      loading: true,
      rating: 0,
      min: 0,
      max: 0,
      searhTerms: "",
      items: [
        {
          name: "Price low to high",
          value: 0,
        },
        {
          name: "Price high to low",
          value: 1,
        },
      ],
      defaultSelected: {
        sort: 0,
      },
      brands: [],
      products: [],
      selectedbrands: [],
      page: 1,
      perPage: 3,
      pages: [],
    };
  },
  methods: {
    filter() {
      this.$axios
        .get(
          `/api/auth/products/search/?terms=${this.searhTerms}&brands=${this.selectedbrands}&rating=${this.rating}&sort=${this.defaultSelected.sort}&min=${this.min}&max=${this.max}`
        )
        .then((res) => {
          this.products = res.data.products;
        });
    },

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
    this.searhTerms = this.$route.params.terms;
    // /api/auth/products/search/?terms=${this.$route.params.terms}
    this.$axios
      .get(
        `https://tango99.herokuapp.com/product/list/?search=${this.$route.params.terms}`
      )
      .then((res) => {
        this.products = res.data;
        // this.products.forEach(product => {
        //   if(prouct.brand){
        //     this.brands.push()
        //   }
        // })
        this.loading = false;
      });
  },
};
</script>

<style>
</style>