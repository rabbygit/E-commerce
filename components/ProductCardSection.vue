<template>
  <div class="d-flex justify-space-between flex-wrap">
    <!-- <p v-if="$fetchState.pending">Fetching posts...</p> -->
    <card
      v-for="(product , index ) in products"
      :key="index"
      :textHide="textHide"
      :product="product"
      @onAddToCart="addToCartMethod"
    ></card>
  </div>
</template>

<script>
  import axios from "axios";

  import Card from "./Card.vue";
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
    },
    methods: {
      // Add an item to cart
      addToCartMethod(product) {
        let color = ''
        let size = ''
        if(product.specification.colors.length > 0){
          color = product.specification.colors[0]
        }
        if(product.specification.sizes.length > 0){
          size = product.specification.sizes[0]
        }
        this.$axios
          .put(`https://tango99.herokuapp.com/Cart/addcart/${product.id}/`, {
            user_id: 1,
            quantity: 1,
            color,
            size ,
            unit : ''
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