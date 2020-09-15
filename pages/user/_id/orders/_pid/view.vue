<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" offset-lg="2" offset-md="1" lg="2">
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
                  <p class="text-h6">Product details</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-img :src="product.images[0]" height="200" width="100%"></v-img>
                </v-col>
                <v-col>
                  <p class="text-content">{{product.title}}</p>
                  <p>{{product.details}}</p>
                  <p class="mb-0">Quantitiy : {{product.quantity}}</p>
                  <p class="mb-0">Price : {{product.price}}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-container>
                  <v-btn class="mt-5" tile color="orange" @click="addtocart">Reorder</v-btn>
                  <v-btn class="mt-5" tile color="red" @click="cancelorder">Cancel Order</v-btn>
                </v-container>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <!-- <v-card-text>
        We place your cancel request.An admin will contact with you.
        I'm a dense alert with the
            <strong>outlined</strong> prop and a
            <strong>type</strong> of error
        </v-card-text>-->
        <v-card-text class="pa-0">
          <v-alert  type="warning" class="mb-0">
            We place your cancel request.An admin will contact with you.
          </v-alert>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  components: {
    UserSidebar: () => import("@/components/UserSidebar"),
  },
  data() {
    return {
      loading: true,
      dialog: false,
      product: Object,
      image: "",
      rating: 5,
      review: "",
      file: [],
      formData: Object,
    };
  },
  methods: {
    onFileChange() {
      console.log(this.file);
      this.formData = new FormData();

      this.formData.append("files", this.file, this.file.name);

      console.log(Object.fromEntries(this.formData));
    },
    async uploadReview() {
      this.formData = new FormData();

      this.formData.append("files", this.file, this.file.name);

      let user = {
        rating: this.rating,
        review: this.review,
        formData: this.formData,
      };
      //   let response = await this.$axios.post("/api/auth/updateUser", user);

      // API CALL
      // axios
      //   .post("/upload-files", formData)
      //   .then((response) => {
      //     console.log("Success!");
      //     console.log({ response });
      //   })
      //   .catch((error) => {
      //     console.log({ error });
      //   });
    },
    addtocart() {
      console.log("Cart product ", this.product.title);
    },
    cancelorder() {
      this.dialog = true;
    },
  },
  created() {
    this.$axios.get(`/api/auth/product/1`).then((response) => {
      this.product = response.data.product;
      this.loading = false;
      //   console.log("product", this.product);
    });
  },
};
</script>

<style>
</style>