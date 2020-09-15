<template>
  <v-container align="center" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="12" offset-lg="2" lg="6">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate v-if="loading"></v-progress-circular>
        <div v-show="!loading">
          <shopping-cart
            :checkoutProducts="checkoutProducts"
            @loadCheckoutCart="getCartInformation"
          ></shopping-cart>
        </div>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <order-summary
          :subTotal="subTotal"
          :productCount="length"
          @loadCheckoutCart="getCartInformation"
        ></order-summary>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  components: {
    ShoppingCart: () => import("@/components/ShoppingCart"),
    OrderSummary: () => import("@/components/OrderSummary"),
  },
  data() {
    return {
      checkoutProducts: [],
      subTotal: 0,
      length: 0,
      loading: true,
    };
  },
  methods: {
    getCartInformation() {
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/cart_view/`, { user_id: 1 })
        .then((response) => {
          if (response.data.success) {
            this.checkoutProducts = response.data.data[0].orders;
            this.length = response.data.data[0].orders.length;
            this.subTotal = Number(response.data.data[0].price_total);
            this.loading = false;
          }
        });
    },
  },
  mounted() {
    let userId = this.$auth.user
      ? this.$auth.user.user_id
      : this.$auth.$storage.getLocalStorage("non_verified_user_id");
  },
  computed: {
    getTotalCheckoutProductsCount() {
      return this.checkoutProducts.length;
    },
  },
  created() {
    this.getCartInformation();

    // If change comes from cart load cart information again
    this.$nuxt.$on("loadCheckout", () => {
      this.getCartInformation();
    });
  },
};
</script>

<style>
</style>