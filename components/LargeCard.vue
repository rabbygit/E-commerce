<template>
  <v-hover v-slot:default="{ hover }" close-delay="100">
    <v-card class="mt-5" elevation="0" tile height="400px" width="100%">
      <v-img height="70%" max-width="100%" src="images/product1.jpg">
        <v-avatar color="orange" size="50" class="ma-5">
        </v-avatar>
        <!-- <v-container style="height:100%;" class="d-flex align-start justify-start">
          <p class="white--text">About Us</p>
        </v-container>-->
        <v-expand-transition>
          <v-overlay v-if="hover" absolute color="#D6531F">
            <v-btn color="orange darken-4" nuxt :to="`/products/${product.id}/details`">Details</v-btn>
          </v-overlay>
        </v-expand-transition>
      </v-img>

      <div v-if="!textHide" class="d-flex flex-column align-center custom-card" style="height:30%;">
        <v-spacer></v-spacer>
        <v-card-title
          class="d-inline-block text-truncate text-content pa-0 text-uppercase"
          style="max-width: 100%;"
        >{{product.title}}</v-card-title>
        <v-card-title class="text-h5 pa-0">${{product.new_price}}</v-card-title>

        <v-card-actions class="pa-0 pb-2 mt-1">
          <v-btn class="mb-0" color="#FF7743" dark style="width:100%" >
            <p class="ma-0 text-button font-weight-bold">Add to cart</p>
          </v-btn>
          <!-- @click.prevent="addToCart(product)" -->
        </v-card-actions>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    textHide: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
    },
  },
  methods: {
    // Emit on card section
    addToCart(product) {
      this.$emit("onAddToCart", product);
    },
  },
};
</script>

<style>
.custom-card {
  border-left: 1px solid #FF5615 !important;
  border-right: 1px solid #FF5615 !important;
  border-bottom: 1px solid #FF5615 !important;
}
</style>