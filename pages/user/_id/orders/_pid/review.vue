<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" offset-md="1" lg="2">
        <user-sidebar></user-sidebar>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-container v-if="loading">
          <v-row>
            <div
              style="min-height: 50vh ; min-width: 100%;"
              class="d-flex align-center justify-center"
            >
              <div>
                <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>
              </div>
            </div>
          </v-row>
        </v-container>

        <v-container v-else class="grey lighten-5">
          <v-card outlined tile>
            <v-container fluid>
              <v-row no-gutters>
                <v-col cols="12">
                  <p class="text-h6">Product Review</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-img :src="product.images[0]" height="200" width="100%"></v-img>
                </v-col>
                <v-col>
                  <p class="text-content">{{product.title}}</p>
                  <p>{{product.details}}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-container>
                  <div class="d-flex flex-row align-center">
                    <p class="mb-0">My ratings out of 5 :</p>
                    <v-rating v-model="rating"></v-rating>
                  </div>
                  <v-textarea
                    name="input-7-1"
                    filled
                    label="Your Review"
                    auto-grow
                    v-model="review"
                  ></v-textarea>
                  <v-file-input
                    label="Upload Image"
                    prepend-icon="mdi-camera"
                    v-model="file"
                    accept="image/*"
                  ></v-file-input>
                  <v-btn class="mt-5" outlined color="indigo" @click="uploadReview">Submit Review</v-btn>
                </v-container>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  components: {
    UserSidebar: () => import("@/components/UserSidebar"),
  },
  data() {
    return {
      loading: true,
      product: Object,
      image: "",
      rating: 5,
      review: "",
      file: null,
      formData: Object,
    };
  },
  methods: {
    uploadReview() {
      let formData = new FormData();

      formData.append("image", this.file);

      let review = {
        user_id: 1,
        product_id: 1,
        rating: this.rating,
        content: this.review,
        image: formData,
      };

      // Create revieew
      this.$axios
        .post("https://tango99.herokuapp.com/product/create_review/", review)
        .then((response) => {
          this.rating = 5;
          this.review = "";
          this.file = null;
        });
    },
  },
  created() {
    // Get the specific product
    // this.$axios.get(`/api/auth/product/1`).then((response) => {
    //   this.product = response.data.product;
    //   this.loading = false;
    // });
  },
};
</script>

<style>
</style>