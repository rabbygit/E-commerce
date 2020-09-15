<template>
  <div class="cart-wraper" @click="showCart">
    <div style="height:80px;" class="d-flex flex-column align-center justify-center pt-3">
      <v-icon dark large>mdi-cart</v-icon>
      <p>{{length}}</p>
    </div>
    <div
      style="background-color: gray;"
      class="d-flex flex-column align-center justify-center"
    >{{subTotal}}</div>
  </div>
</template>

<script>
export default {
  props: ["length", "subTotal"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    // toggle cart
    showCart() {
      this.show = true;
      // emit on default.vue
      this.$emit("onShowCart", this.show);
    },
  },
  computed: {},
};
</script>

<style>
.cart-wraper {
  background-color: black;
  color: white;
  height: 100px;
  width: 100px;
  position: fixed;
  z-index: 999;
  top: 40vh;
  right: 0;
  cursor: pointer;
}
</style>