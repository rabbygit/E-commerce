<template>
  <v-container fluid>
    <v-row>
      <!-- Category Section -->
      <v-col md="2" class="d-none d-md-flex">
        <v-spacer></v-spacer>
        <v-card style="height:100% " id="mydiv">
          <List :collection="categories" />
        </v-card>
      </v-col>
      <!-- Slide Section  -->
      <v-col cols="12" md="8">
        <Carousel />
      </v-col>
      <v-col cols="12" md="2">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" style="min-height:100%;"></v-img>
      </v-col>
    </v-row>

    <!-- Advertisement sections  -->
    <Advertisement />

    <!-- Product sections  -->
    <v-container v-for="(section , index ) in sections" :key="index" fluid>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <h3 class="text-uppercase">{{section.name}}</h3>
          <v-divider style="border-width:2px; width:159px;" class="red lighten-4"></v-divider>
          <ProductCardSection :products="section.products" />
          <v-btn
            class="float-right mt-4"
            tile
            outlined
            color="red darken-4"
            nuxt
            :to="`/more/${section.name}`"
          >Show More</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
const Decode = process.client ? require("jwt-decode") : undefined;

export default {
  auth: "guest",
  components: {
    Logo: () => import("~/components/Logo.vue"),
    Carousel: () => import("~/components/Carousel.vue"),
    Card: () => import("~/components/Card.vue"),
    ProductCardSection: () => import("~/components/ProductCardSection.vue"),
    List: () => import("~/components/List.vue"),
    CategoryTree: () => import("~/components/CategoryTree"),
    Advertisement: () => import("~/components/Advertisement"),
  },
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      categories: [
        {
          id: 1,
          label: "Electronics",
          open: false,
          children: [
            {
              id: 2,
              label: "Mobile",
              open: false,
              children: [
                {
                  id: 3,
                  label: "Samsung",
                  open: false,
                },
                {
                  id: 4,
                  label: "Xiomi",
                  open: false,
                },
              ],
            },
          ],
        },
        {
          id: 5,
          label: "Cloth",
          open: false,
          children: [
            {
              id: 6,
              label: "Men",
              open: false,
              children: [
                {
                  id: 7,
                  label: "Pant",
                  open: false,
                },
                {
                  id: 8,
                  label: "Shirt",
                  open: false,
                },
                {
                  id: 9,
                  label: "Jangiya",
                  open: false,
                },
                {
                  id: 10,
                  label: "Shirt",
                  open: false,
                },
              ],
            },
            {
              id: 9,
              label: "Women",
              open: false,
              children: [
                {
                  id: 10,
                  label: "Shari",
                  open: false,
                },
                {
                  id: 11,
                  label: "Kamiz",
                  open: false,
                },
              ],
            },
          ],
        },
      ],
      sections: {},
    };
  },
  mounted() {
    // Email verfication link token decode and then local login
    console.log("token ", this.$route.query);
    if (this.$route.query.token && process.client) {
      // try {
      //   let response = await this.$auth.loginWith("local", {
      //     data: {
      //       email: this.email,
      //       password: this.password,
      //     },
      //   });
      //   if (!response.data.success) {
      //     this.error = response.data.errors[0];
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    }
  },
  created() {
    // Products for section  https://fakestoreapi.com/products?limit=8
    this.$axios
      .get("https://tango99.herokuapp.com/product/display/8")
      .then((response) => {
        if (response.data.success) {
          this.sections = response.data.data;
        }
      });

    // Get all categories
    this.$axios
      .get("https://tango99.herokuapp.com/category/allcategories")
      .then((response) => {
        if (response.data) {
          this.categories = response.data
        }
      });
  },
};
</script>


