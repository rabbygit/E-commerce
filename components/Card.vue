<template>
  <v-hover v-slot:default="{ hover }" close-delay="100">
    <v-card class="mt-5" :elevation="hover ? 10 : 1" tile height="350px" width="250">
      <v-img
        class="white--text align-end"
        max-height="60%"
        max-width="100%"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-expand-transition>
          <v-overlay v-if="hover" absolute color="orange lighten-3">
            <v-btn color="orange" tile nuxt :to="`/products/${product.id}/details`">
              <v-icon color="white">mdi-magnify</v-icon>Details
            </v-btn>
          </v-overlay>
        </v-expand-transition>
      </v-img>

      <div v-if="!textHide" class="d-flex flex-column align-center">
        <v-card-title
          class="d-inline-block text-truncate text-content py-0"
          style="max-width: 100%;"
        >{{product.title}}</v-card-title>
        <v-card-title class="text-h6 font-weight-black py-0">${{product.new_price}}</v-card-title>

        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            color="black"
            dark
            style="width:100%"
            @click.prevent="addToCart(product)"
          >Add to cart</v-btn>
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
</style>