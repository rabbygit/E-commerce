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
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-container>
            <v-row>
              <p class="mt-2">
                {{products.length}} items found for
                <span
                  class="font-weight-medium"
                >"{{$route.query.terms}}"</span>
              </p>
              <v-spacer></v-spacer>
              <p class="mr-3 mt-2">Sort by</p>
              <div>
                <v-select
                  v-model="defaultSelected.sort"
                  :items="items"
                  item-value="value"
                  item-text="name"
                  label="Outlined style"
                  dense
                  outlined
                  style="width:200px ; height: 10px;"
                  @change="filter"
                ></v-select>
              </div>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="2">
                <div class="my-3">
                  <p class="text-center font-weight-medium">Price</p>
                  <v-text-field label="min" outlined dense type="number" style="height:50px;" v-model="min"></v-text-field>
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
                    small
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
              <v-col cols="10">
                <ProductCardSection :products="displayedPosts" />
              </v-col>
            </v-row>
            <v-row justify="center">
              <div>
                <v-btn  icon v-if="page != 1" @click="page--">
                    <v-icon>mdi-chevron-double-left</v-icon>
                </v-btn>
                <v-btn
                  color="orange"
                  class="mx-1"
                  v-for="pageNumber in pages.length"
                  :key="pageNumber"
                  @click="page = pageNumber"
                >{{pageNumber}}</v-btn>
                <v-btn @click="page++" v-if="page < pages.length" color="orange">>></v-btn>
              </div>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="2"></v-col>
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
      loading: true,
      rating: 0,
      min : 0,
      max : 0,
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
      brands: ["Samsumng", "Redme", "iphone"],
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
          `/api/auth/products/catalog/?category=${this.$route.query.terms}&brands=${this.selectedbrands}&rating=${this.rating}&sort=${this.defaultSelected.sort}`
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

    setMinMaxValue(){
        this.min = this.products[0].price 
        this.max = this.products[this.products.length - 1].price 

        console.log("Miin max")
    }
  },
  watch: {
    products() {
      this.setPages();
      this.setMinMaxValue()
    },
  },

  computed: {
    displayedPosts() {
      return this.paginate(this.products);
    },
  },

  created() {
    this.$axios
      .get(`/api/auth/products/catalog/?category=${this.$route.query.terms}`)
      .then((res) => {
        this.products = res.data.products;
        this.loading = false;
      });
  },
};
</script>

<style>
</style>