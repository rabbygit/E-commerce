<template>
  <v-hover v-slot:default="{ hover }" close-delay="100">
    <v-card class="mt-5" elevation="1" tile height="350px" width="100%" color="white">
      <v-img height="60%" max-width="100%" src="images/product-17.jpg">
        <v-layout fill-height column ma-0>
          <v-row align="start" justify="start">
            <v-btn style="margin-left:12px;" color="black" dark tile outlined small>-10%</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="black" style="margin-right:12px;" dark tile outlined small>New</v-btn>
          </v-row>
        </v-layout>

        <v-expand-x-transition>
          <v-overlay v-if="hover" absolute color="#535151">
            <v-btn color="orange" nuxt :to="`/products/${product.id}/details`">
              Details
              <v-icon color="white">mdi-magnify</v-icon>
            </v-btn>
          </v-overlay>
        </v-expand-x-transition>
      </v-img>

      <div class="d-flex justify-end flex-column align-start pa-2" style="height:40%;">
        <v-spacer></v-spacer>
        <p
          class="d-inline-block text-truncate text-content mb-0"
          style="max-width: 100%;"
        >{{product.title}}</p>
        <div class="d-flex flex-row justify-center" style="width:100%;">
          <p class="mb-0 mt-1 font-weight-bold">${{product.new_price}}</p>
          <v-spacer></v-spacer>
          <v-rating
            v-model="product.rating"
            background-color="orange lighten-4"
            color="orange"
            small
            dense
          ></v-rating>
        </div>

        <!-- <v-card-actions class="pa-0 mt-1"> -->
        <!-- <v-btn
            class="mb-0"
            color="#FF7743"
            dark
            block
            @click.prevent="addToCart(product)"
        >Add to cart</v-btn>-->
        <v-btn block color="#FF7743" dark style="max-height:40px;">Add to cart</v-btn>
        <!-- </v-card-actions> -->
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