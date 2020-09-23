<template>
  <v-container fluid class="pa-0">
    <v-row>
      <!-- Category Section -->
      <v-col md="2" class="d-none d-md-flex">
        <!-- <v-spacer></v-spacer> -->
        <v-card style="height:100% " id="mydiv" class="ml-8">
          <!-- <div style="border-bottom:1px solid black">
            <v-card-title>categories</v-card-title>
          </div> -->
          <List :collection="categories" />
        </v-card>
      </v-col>
      <!-- Slide Section  -->
      <v-col cols="12" md="10">
        <Carousel />
      </v-col>
      <!-- <v-col cols="12" md="2">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" style="min-height:100%;"></v-img>
      </v-col>-->
    </v-row>

    <!-- <v-container fluid style="background-color:#EEEEEE">
      <v-row no-gutters>
        <v-col></v-col>
        <v-col cols="10">
          <MultiCarousel />
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container> -->

    <!-- Advertisement sections  -->
    <!-- <Advertisement /> -->

    <v-row>
      <v-col cols="2">
        <v-container>
          <div style="border: 1px solid red;">
            <v-img src="addvertisement1.png"></v-img>
          </div>
        </v-container>
        <v-container>
          <div style="border: 1px solid red;" class="text-center">
            <a class="underline text-h6">MAKE UP SET</a>
            <div class="my-5 mx-1" style="border:1px solid black;">
              <v-img src="addvertisement2.png"></v-img>
            </div>

            <a class="underline text-h6">PRODUCTS NAME</a>
            <div class="mt-5 mx-1">
              <v-img src="images/FooterAdd/add1.jpg" class="custom-banner"></v-img>
            </div>
            <p class="my-5 text-h4 font-weight-bold">$500</p>
          </div>
        </v-container>
      </v-col>
      <v-col cols="10">
        <v-container v-for="(section , index ) in sections" :key="index" fluid>
          <v-row>
            <!-- <v-col cols="10" md="8" offset-md="2"> -->
            <v-col cols="12">
              <a class="text-uppercase text-h5 underline">{{section.name}}</a>
              <!-- <v-divider style="border-width:2px; width:159px;" class="red lighten-4"></v-divider> -->
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

        <!-- New Trending Items -->
        <v-container fluid>
          <v-row>
            <v-col v-for=" n in 6" :key="n" cols="6" sm="4" md="2">
              <Cardv2></Cardv2>
            </v-col>
          </v-row>
        </v-container>

        <v-container fluid>
          <v-row>
            <v-col v-for=" n in 6" :key="n" cols="6" sm="4" md="2">
              <Cardv3></Cardv3>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- Product sections  -->
    <!-- <v-container v-for="(section , index ) in sections" :key="index" fluid>
      <v-row>
        <v-col cols="10" md="8" offset-md="2">
        <v-col cols="10">
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
    </v-container>-->

    <!-- Footer Add section -->
    <v-container fluid class="pa-0">
      <footer-add></footer-add>
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
    Cardv2: () => import("~/components/Cardv2.vue"),
    Cardv3: () => import("~/components/Cardv3.vue"),
    ProductCardSection: () => import("~/components/ProductCardSection.vue"),
    List: () => import("~/components/List.vue"),
    CategoryTree: () => import("~/components/CategoryTree"),
    Advertisement: () => import("~/components/Advertisement"),
    MultiCarousel: () => import("~/components/MultiCarousel"),
    FooterAdd: () => import("~/components/FooterAdd"),
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
      advertisements : []
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
      .get("https://tango99.herokuapp.com/product/display/0")
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
          this.categories = response.data;
        }
      });

    // Advertisements of the site
    this.$axios
      .get("https://tango99.herokuapp.com/ad/showallads/")
      .then((response) => {
        if (response.data.success) {
          this.advertisements = response.data.data;
          this.loading = false;
        }
      });
  },
};
</script>

<style scoped>
.underline::after {
  display: block;
  content: "";
  width: 100%;
  height: 2px;
  background: #ff5615;
  position: absolute;
  bottom: -3px;
  left: 0;
}

.underline {
  position: relative;
  color: black;
  cursor: default;
}

.custom-banner {
  border-radius: 20px;
  height: 280px;
}
</style>


