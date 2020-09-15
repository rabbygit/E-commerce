<template>
  <v-card class="custom-cart d-flex flex-column" height="765">
    <v-container class="blue-grey" style="border-radius:0px;">
      <v-row>
        <v-col>
          <p class="text-center">{{length}} Items</p>
        </v-col>
        <v-col>
          <v-btn @click="closeCart" dark outlined class="float-right" tile>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container style="max-height: 600px" class="overflow-y-auto">
      <div v-if="products.length == 0" class="text-center">
        <p class="text-center mt-10 font-weight-bold">Your Cart is empty</p>
      </div>
      <div v-for="(product , index ) in products" :key="index">
        <div class="d-flex flex-row justify-space-between">
          <div>
            <v-btn icon @click="increaseProductCount(product)" color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <p class="ml-3 pt-4">{{product.total_quantity}}</p>
            <v-btn
              icon
              color="orange"
              @click="decreaseProductCount(product)"
              :disabled="product.total_quantity == 1"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
          <div class="d-flex align-center" style="width:100px;">
            <p class="mb-0 ml-2 text-truncate">{{product.product_name}}</p>
          </div>
          <div class="d-flex align-center">
            <p class="mb-0 ml-2">{{product.total_price}}</p>
          </div>
          <div class="d-flex align-center">
            <v-btn @click="removeFromCart(product)" dark outlined icon color="red">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </v-container>
    <v-btn
      color="warning"
      dark
      tile
      fixed
      bottom
      width="300px"
      @click="closeCart"
      nuxt
      to="/checkout"
      v-if="!products.length == 0"
    >Checkout</v-btn>
  </v-card>
</template>

<script>
export default {
  props: ["length", "products"],
  data() {
    return {
      close: false,
    };
  },
  methods: {
    closeCart() {
      this.close = true;
      this.$emit("close", this.close);
    },

    // Increase item from cart
    increaseProductCount(product) {
      // Emit event in default.vue
      $nuxt.$emit("increaseQuantityFromCheckout", product);
    },

    // Decrease item from cart
    decreaseProductCount(product) {
      // Emit event in default.vue
      $nuxt.$emit("decreaseQuantityFromCheckout", product);
    },

    // Remove item from cart
    removeFromCart(product) {
      // Emit event in default.vue
      $nuxt.$emit("removedProductFromCartAndCheckout",product);
    },

    // take user to checkout page
    checkout() {
      this.close = true;
      this.$emit("close", this.close);
      this.$router.push("/checkout");
    },
  },
};
</script>

<style>
.custom-cart {
  width: 300px;
  z-index: 1000;
  position: fixed;
  top: 194px;
  right: 0px;
}
</style>