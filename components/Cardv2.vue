<template>
  <v-hover v-slot:default="{ hover }" close-delay="100">
    <v-card class="mt-5" elevation="0" tile height="300px" width="100%" color="transparent">
      <v-img height="65%" max-width="100%" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
        <v-layout fill-height column ma-0 v-if="!hover">
          <v-row align="start" justify="start">
            <v-btn color="green" dark tile>Sale on</v-btn>
          </v-row>
          <v-spacer></v-spacer>
          <v-row align="end" justify="end">
            <div>
              <v-btn dark tile color="#FF7743" >Add to cart</v-btn>
            </div>
          </v-row>
        </v-layout>

        <v-expand-transition>
          <!-- <v-overlay  absolute color="#D6531F"> -->
          <!-- <v-layout fill-height column ma-0 v-if="hover">
              <v-row align="start" justify="start">
                <v-btn color="green" dark tile>Sale on</v-btn>
              </v-row>
              <v-row justify="center" align="center">
                <v-btn dark fab color="orange" nuxt :to="`/products/${product.id}/details`">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-row>
              <v-row align="end" justify="end">
                <div>
                  <v-btn dark tile>Add to cart</v-btn>
                </div>
              </v-row>
          </v-layout>-->
          <!-- </v-overlay> -->
          <div
            v-if="hover"
            class="d-flex v-card--reveal transparent"
            style="height: 100%;"
          >
            <v-layout fill-height column ma-0 v-if="hover">
              <v-row align="start" justify="start">
                <v-btn color="green" dark tile>Sale on</v-btn>
              </v-row>
              <v-row justify="center" align="center">
                <v-btn dark fab color="orange" nuxt :to="`/products/${product.id}/details`">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-row>
              <v-row align="end" justify="end">
                <div>
                  <v-btn dark tile color="#FF7743" >Add to cart</v-btn>
                </div>
              </v-row>
            </v-layout>
          </div>
        </v-expand-transition>
      </v-img>

      <div class="d-flex justify-end flex-column align-start pb-1" style="height:35%;">
        <v-spacer></v-spacer>
        <v-card-title
          class="d-inline-block text-truncate text-content pa-0"
          style="max-width: 100%;"
        >{{product.title}}</v-card-title>
        <v-card-title class="text-h6 pa-0">${{product.new_price}}</v-card-title>

        <v-rating v-model="product.rating" background-color="orange lighten-4" color="orange"></v-rating>

        <!-- <v-card-actions class="pa-0 mt-1">
              <v-btn
                class="mb-0"
                color="black"
                dark
                style="width:100%"
                @click.prevent="addToCart(product)"
              >Add to cart</v-btn>
        </v-card-actions>-->
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      product: {
        id: 1,
        title: "Product 1",
        new_price: 500,
        rating: 4,
      },
      hover1: true,
    };
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  /* opacity: 0.5; */
  position: absolute;
  width: 100%;
}
</style>