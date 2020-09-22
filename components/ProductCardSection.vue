<template>
  <div class="d-flex justify-space-between flex-wrap">
    <!-- <p v-if="$fetchState.pending">Fetching posts...</p> -->
    <v-row>
      <v-col v-for=" n in 6" :key="n" cols="6" sm="4" md="2">
        <large-card :textHide="textHide" :product="product" @onAddToCart="addToCartMethod"></large-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

import Card from "./Card.vue";
import LargeCard from "./LargeCard.vue";

export default {
  props: {
    count: {
      type: Number,
      default: 10,
    },
    textHide: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
    },
  },
  components: {
    Card,
    LargeCard,
  },
  data() {
    return {
      product: {
        id: 1,
        title: "Product xyz",
        new_price: 500,
      },
    };
  },
  methods: {
    // Add an item to cart
    addToCartMethod(product) {
      let color = "";
      let size = "";
      if (product.specification.colors.length > 0) {
        color = product.specification.colors[0];
      }
      if (product.specification.sizes.length > 0) {
        size = product.specification.sizes[0];
      }
      this.$axios
        .put(`https://tango99.herokuapp.com/Cart/addcart/${product.id}/`, {
          user_id: 1,
          quantity: 1,
          color,
          size,
          unit: "",
        })
        .then((response) => {
          $nuxt.$emit("loadCart");
        });

      // localStorage.setItem('OID', JSON.stringify(response1.data.order.id));
    },
  },
};
</script>

<style>
</style>