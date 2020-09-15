<template>
  <v-container>
    <div class="d-flex flex-row">
      <p class="text-left text-h6">Shopping Details</p>
      <v-spacer></v-spacer>
      <p class="text-left text-h6">{{checkoutProducts.length}} items</p>
    </div>
    <v-divider></v-divider>
    <div v-if="checkoutProducts.length == 0" class="text-center">
      <p class="text-center mt-10 font-weight-bold">Your Cart is empty</p>
      <v-btn outlined tile large color="orange">Add some products</v-btn>
    </div>
    <div v-else style="overflow-x:auto;">
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left text-button">Product Details</th>
              <th class="text-center text-button">Quantity</th>
              <th class="text-center text-button">Price</th>
              <th class="text-center text-button">SubTotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product , index) in checkoutProducts" :key="index">
              <td class="px-0">
                <div class="d-flex flex-row align-center">
                  <v-btn
                    @click="removeFromCartAndCheckout(product)"
                    dark
                    outlined
                    icon
                    color="red"
                    class="mr-2"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-card flat tile class="d-flex mr-5" height="100" width="100">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                      class="grey lighten-2"
                    ></v-img>
                  </v-card>
                  <div>
                    <p>{{product.product_name}}</p>
                    <p>
                      Color:
                      <span>Blue</span>
                    </p>
                    <p>
                      Code:
                      <span>{{product.product_id}}</span>
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex flex-row justify-center align-center">
                  <v-btn
                    class="ma-2"
                    tile
                    small
                    color="teal"
                    icon
                    @click="increaseProductCount(product)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <!-- <v-text-field
                    dense
                    solo-inverted
                    :value="product.total_quantity"
                    @change="updateQuantity(product.product_id , $event)"
                    style="width:50px"
                  ></v-text-field>-->
                  <div>
                    <p class="mb-0 red--text">{{product.total_quantity}}</p>
                  </div>
                  <v-btn
                    class="ma-2"
                    tile
                    small
                    color="teal"
                    icon
                    @click="decreaseProductCount(product)"
                    :disabled="product.total_quantity == 1"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
              </td>
              <td>
                <p class="text-center">{{product.unit_price}}</p>
              </td>
              <td>
                <p class="text-center">{{product.total_price}}</p>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    checkoutProducts: {
      type: Array,
      default: [],
      myQuantity: Number,
    },
  },
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
      ],
    };
  },
  methods: {
    updateQuantity(id, value) {
      $nuxt.$emit("updateQuantityFromCheckout", id, value);
      this.$emit("loadCart");
      //  Make api call
      // this.$axios.get(`/decrease/${product.id}/${this.$auth.user.id}`)
    },

    // Increase item quantity on cart
    async increaseProductCount(product) {
      let response = await this.$axios.put(
        `https://tango99.herokuapp.com/Cart/increase/${product.product_id}/`,
        {
          user_id: 1,
          color: product.product_color,
          size: product.product_size,
          unit: product.product_unit,
        }
      );

      if (response.data.success) {
        $nuxt.$emit("loadCart");
        this.$emit("loadCheckoutCart");
      }
    },

    // Decrease item quantity on cart
    async decreaseProductCount(product) {
      let response = await this.$axios.put(
        `https://tango99.herokuapp.com/Cart/decrease/${product.product_id}/`,
        {
          user_id: 1,
          color: product.product_color,
          size: product.product_size,
          unit: product.product_unit,
        }
      );

      if (response.data.success) {
        $nuxt.$emit("loadCart");
        this.$emit("loadCheckoutCart");
      }
    },

    // Remove item quantity on cart
    async removeFromCartAndCheckout(product) {
      let response = await this.$axios.put(
        `https://tango99.herokuapp.com/Cart/delete/${product.product_id}/`,
        {
          user_id: 1,
          color: product.product_color,
          size: product.product_size,
          unit: product.product_unit,
        }
      );

      if (response.data.success) {
        $nuxt.$emit("loadCart");
        this.$emit("loadCheckoutCart");
      }
    },
  },
};
</script>

<style>
</style>