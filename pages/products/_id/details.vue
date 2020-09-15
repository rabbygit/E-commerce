<template>
  <v-container fluid>
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>
    </v-row>
    <v-row v-else>
      <v-col cols="1"></v-col>
      <v-col>
        <product-details :product="product" @onAddToCart="addItemsToCart"></product-details>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  auth: false,
  components: {
    ProductDetails: () => import("~/components/ProductDetails.vue"),
  },
  data() {
    return {
      // product: {
      //   id: "",
      //   title: "",
      //   quantity: 0,
      //   description: "",
      //   key_features: [],
      //   old_price: 0,
      //   specification: {
      //     success: true,
      //     message: "",
      //     data: [],
      //   },
      //   new_price: "",
      //   ratings: {
      //     product_id: 0,
      //     total_no_of_ratings: 0,
      //     total_no_of_reviews: 0,
      //     average_ratings: 0,
      //     each_ratings: [],
      //   },
      //   reviews: [],
      //   question_answers: [],
      //   images: [],
      //   imagez: [],
      // },
      loading: true,
      product: {},
      defaultColor: "",
    };
  },
  methods: {
    async addItemsToCart(product) {
      this.$nuxt.$emit("onAddItemsToCart", product);

      this.product = response.product;
    },

    async getProduct() {
      this.$axios
        .get(
          `https://tango99.herokuapp.com/productdetails/detail/${this.$route.params.id}/`
        )
        .then((response) => {
          this.product = response.data.data;
          this.loading = false;
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style>
</style>