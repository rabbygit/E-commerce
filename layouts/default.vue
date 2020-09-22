<template>
  <v-app>
    <Navbar :companyInfo="companyInfo" :window="window" :innerHeight="innerHeight" />

    <v-main>
      <v-container fluid class="grey lighten-5 pa-0">
        <CartButton @onShowCart="showNow" :length="length" :subTotal="subTotal" />
        <nuxt />
        <transition name="slide" mode="out-in">
          <Cart v-if="selecetedShow" @close="onClose" :length="length" :products="products"></Cart>
        </transition>
      </v-container>
    </v-main>

    <Footer :companyInfo="companyInfo" />
  </v-app>
</template>

<script>
export default {
  components: {
    SystemBar: () => import("@/components/SystemBar"),
    Footer: () => import("@/components/Footer"),
    Navbar: () => import("@/components/Navbar"),
    CartButton: () => import("@/components/CartButton"),
    CartDemo: () => import("@/components/CartDemo"),
    Cart: () => import("@/components/Cart"),
  },
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/signin", icon: "lock-open" },
      ],
      selecetedShow: false,
      length: 0,
      products: [],
      subTotal: 0,
      companyInfo: {},
      window: {
        width: 0,
        height: 0,
      },
      innerHeight: 0,
    };
  },
  methods: {
    showNow(value) {
      this.selecetedShow = true;
    },
    onClose() {
      this.selecetedShow = false;
    },
    userLogin(ip) {
      this.$auth
        .loginWith("guest", {
          data: {
            ip: ip,
          },
        })
        .then((response) => {});
    },

    handleHeightAndWidth() {
      this.window.width = window.innerWidth;
      this.window.height = window.scrollY;
    },

    handleInnerHeight() {
      this.innerHeight = window.scrollY;
    },

    getCartInformation() {
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/cart_view/`, { user_id: 1 })
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.data[0].orders;
            this.length = response.data.data[0].orders.length;
            // this.getSubTotal(this.products);
            this.subTotal = response.data.data[0].price_total;
          }
        });
    },
  },
  mounted() {
    // Fetching company info
    this.$axios
      .get("https://tango99.herokuapp.com/site/info")
      .then((response) => {
        if (response.data) {
          this.companyInfo = response.data.data[0];
        }
      });
  },
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.handleHeightAndWidth);

      window.addEventListener("scroll", this.handleInnerHeight);
    }
    // console.log("AUth User ", this.$auth.user);
    // Guest USer Login with IP address
    // if (!this.$auth.user) {
    //   this.$axios.get("https://api.ipify.org?format=json").then((response) => {

    //     this.$axios
    //       .post("/api/auth/guest/login", { ip: response.data.ip })
    //       .then((response) => {
    //         console.log("Non verified", response.data.non_verified_user_id);
    //         this.$auth.$storage.setLocalStorage(
    //           "non_verified_user_id",
    //           response.data.non_verified_user_id,
    //           true
    //         );

    //         console.log(
    //           "non_verified_user_id_RETRIVE",
    //           this.$auth.$storage.getLocalStorage("non_verified_user_id")
    //         );
    //       });
    //   });
    // }

    // Set user after google login
    if (
      process.client &&
      this.$auth.strategy.name == "google" &&
      this.$auth.user &&
      !this.$auth.user.hasOwnProperty("user_id")
    ) {
      let tokenStr = this.$auth.$storage.getLocalStorage("_token.google");
      let webApiUrl = "/api/auth/setUser";

      const headers = {
        Authorization: tokenStr,
      };

      this.$axios
        .post(webApiUrl, { user: this.$auth.user }, { headers: headers })
        .then((response) => {
          // Set new user id for log in user
          this.$auth.user.user_id = response.data.user_id;
          localStorage.removeItem("non_verified_user_id");
        });
    }

    // Fetching user cart information
    this.getCartInformation();

    // Load Cart Information
    this.$nuxt.$on("loadCart", () => {
      this.getCartInformation();
    });

    // Increment item on cart
    this.$nuxt.$on("increaseQuantityFromCheckout", (product) => {
      this.$axios
        .put(
          `https://tango99.herokuapp.com/Cart/increase/${product.product_id}/`,
          {
            user_id: 1,
            color: product.product_color,
            size: product.product_size,
            unit: product.product_unit,
          }
        )
        .then((response) => {
          if (response.data.success) {
            this.getCartInformation();
            $nuxt.$emit("loadCheckout");
          }
        });
    });

    // Decrease item on cart
    this.$nuxt.$on("decreaseQuantityFromCheckout", async (product) => {
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
        this.getCartInformation();
        $nuxt.$emit("loadCheckout");
      }
    });

    // Update item quantity for specific quantity
    this.$nuxt.$on("updateQuantityFromCheckout", (id, value) => {
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/addcart/${id}/`, {
          user_id: 1,
          quantity: value,
        })
        .then((response) => {
          this.getCartInformation();
          $nuxt.$emit("loadCheckout");
        });
    });

    // Remove item from cart
    this.$nuxt.$on("removedProductFromCartAndCheckout", (product) => {
      console.log(product);
      this.$axios
        .put(
          `https://tango99.herokuapp.com/Cart/delete/${product.product_id}/`,
          {
            user_id: 1,
            color: product.product_color,
            size: product.product_size,
            unit: product.product_unit,
          }
        )
        .then((response) => {
          if (response.data.success) {
            this.getCartInformation();
            $nuxt.$emit("loadCheckout");
          }
        });
    });
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("resize", this.handleResize);
      window.removeEventListener("scroll", this.handleInnerHeight);
    }
  },
};
</script>

<style >
.v-toolbar__extension {
  background-color: #ffcdd2;
}
.demo {
  color: #311b92;
}
.cart-wraper {
  background-color: red;
  height: 100px;
  width: 100px;
  position: fixed;
  z-index: 999;
  top: 40vh;
  right: 0;
}

.slide-enter-active {
  /* transition: right 300ms ease; */
  transition: all 400ms ease;
}

.slide-leave-active {
  /* transition: right 500ms cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  transition: all 200ms ease;
}

.slide-enter,
.slide-leave-to {
  right: 0px;
  top: 194px;
}

.slide-enter-to,
.slide-leave {
  right: -360px;
  top: 194px;
}
</style>
