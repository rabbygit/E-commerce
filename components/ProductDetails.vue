<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Product Zoom -->

        <client-only>
          <image-magnifier
            :src="image"
            :zoom-src="image"
            width="100%"
            height="600"
            zoom-width="500"
            zoom-height="500"
          ></image-magnifier>
        </client-only>

        <!-- Product Slider -->

        <v-row>
          <!-- <v-container fluid class="pa-0"> -->

          <v-col v-for="(image , index ) in images" :key="index" class="d-flex child-flex" cols="2">
            <v-card flat tile class="d-flex">
              <v-img
                @mouseover="passSrc(image)"
                :src="image"
                :lazy-src="image"
                class="grey lighten-2"
              ></v-img>
            </v-card>
          </v-col>

          <!-- </v-container> -->
        </v-row>
      </v-col>
      <v-col>
        <p class="text-h4">{{product.title}}</p>
        <v-divider></v-divider>
        <div class="d-flex flex-row align-center">
          <p class="red--text text-h4">${{product.new_price}}</p>
          <p class="text-decoration-line-through text-h5 ml-5">${{product.old_price}}</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex flex-row align-center">
          <v-rating
            :value="product.ratings.average_ratings"
            color="amber"
            dense
            half-increments
            readonly
            size="20"
          ></v-rating>
          <p class="ml-5 mt-5">{{product.ratings.total_no_of_reviews || "0"}} reviews</p>
          <v-spacer></v-spacer>
          <p class="text-h6 mt-3 mr-3">Avaibility:</p>
          <v-chip
            :color="product.quantity > 0 ? 'success' : 'red' "
            label
            dark
          >{{product.quantity > 0 ? "In Stock" : "Out of Stock"}}</v-chip>
        </div>
        <v-divider></v-divider>
        <p class="text-button">Quick Overview</p>
        <p>{{product.description}}</p>
        <div>
          <v-row>
            <v-col>
              <p class="text-body-1" v-if="product.specification.colors.length != 0">Color</p>
              <v-btn
                v-for="(colorObj , index ) in product.specification.colors"
                :key="index"
                tile
                class="ml-1"
                @click="colorSelected(colorObj)"
                :color="selectedColor == colorObj ? selectedColor : '' "
              >{{colorObj}}</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <p class="text-body-1" v-if="product.specification.sizes.length != 0">Size</p>
              <v-btn
                v-for="(size , index ) in product.specification.sizes"
                :key="index"
                tile
                :color="selectedSize == size ? 'red' : '' "
                @click="sizeSelected(size)"
                class="ml-1"
              >{{size}}</v-btn>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div v-show="product.quantity > 0">
          <v-row no-gutters>
            <v-col>
              <div class="mt-5 d-flex flex-row">
                <div class="d-flex flex-row mt-1">
                  <p class="text-button">Quantity:</p>
                  <v-btn class="mx-2" tile dark color="indigo" @click="quantity++">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                  <v-text-field
                    class="text-center"
                    style="width:300px"
                    dense
                    flat
                    solo-inverted
                    v-model="quantity"
                  ></v-text-field>
                  <v-btn
                    class="mx-2"
                    tile
                    dark
                    color="indigo"
                    :disabled="quantity == 1"
                    @click="decrease"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                </div>
                <v-spacer></v-spacer>
              </div>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <div>
                <v-btn
                  width="100%"
                  tile
                  color="orange darken-4"
                  dark
                  large
                  @click.prevent="addToCart(product)"
                >
                  <v-icon left>mdi-cart-outline</v-icon>Add to cart
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-container class="mt-5">
            <v-row>
              <v-chip class="ma-2" color="pink" label text-color="white">
                Share With
                <v-icon right>mdi-label</v-icon>
              </v-chip>
              <v-btn
                href="http://www.facebook.com/sharer.php?u=http://www.example.com"
                target="_blank"
                color="primary"
                fab
                dark
                small
                class="mt-1 mr-3"
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn
                href="http://twitter.com/share?url=http://www.example.com&text=Simple Share Buttons&hashtags=simplesharebuttons"
                target="_blank"
                color="primary"
                fab
                dark
                small
                class="mt-1 mr-3"
              >
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>

    <!-- Review and Comments Section -->
    <v-row>
      <v-tabs v-model="tab" background-color="deep-purple accent-4" class="elevation-2" dark>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#Review">Ratings & Reviews</v-tab>
        <v-tab href="#Question">Question and Answer</v-tab>
        <v-tab href="#Description">Description</v-tab>

        <v-tab-item value="Review">
          <v-container align="center">
            <v-row
              v-if="!(Object.keys(product.ratings).length === 0 && product.ratings.constructor === Object)"
            >
              <v-col sm="2">
                <div>
                  <p class="text-h2 ml-1">
                    {{product.ratings.average_ratings}}
                    <span class="text-h4">/5</span>
                  </p>
                  <v-rating :value="4" color="amber" dense half-increments readonly size="40"></v-rating>
                  <p class="text-h5 ml-1">{{product.ratings.total_no_of_ratings}} ratings</p>
                </div>
              </v-col>
              <v-col sm="10">
                <div
                  class="d-flex flex-row"
                  v-for="(rating , index ) in product.ratings.each_ratings"
                  :key="index"
                >
                  <v-rating
                    :value="rating.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                  ></v-rating>
                  <v-progress-linear
                    class="ml-4 mt-1"
                    value="100"
                    color="amber"
                    height="15"
                    style="width:300px"
                  ></v-progress-linear>
                  <p class="text-caption ml-5 mt-1">{{rating.count}}</p>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10">
                <p
                  v-if="product.reviews.length == 0"
                  class="text-center red--text"
                >No review is made for this product</p>
                <v-simple-table fixed-header v-else>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left text-button pl-0">Product Details</th>
                        <v-spacer></v-spacer>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(review , index) in product.reviews" :key="index">
                        <td class="px-0">
                          <v-card flat tile class="d-flex flex-column">
                            <v-rating
                              v-if="review.rating"
                              :value="review.rating"
                              color="amber"
                              dense
                              half-increments
                              readonly
                              size="20"
                              class="mt-2"
                            ></v-rating>
                            <div class="d-flex flex-row">
                              <p class="text-caption mt-3">by {{review.name || "Anonymous" }}</p>
                              <v-icon class="ml-5" medium color="green darken-2">mdi-domain</v-icon>
                              <p
                                class="text-caption mt-3 ml-5 indigo--text"
                              >{{review.name ? "verified purcheaser" : "Unverified purcheaser" }}</p>
                            </div>
                            <p class="text-content-body-1 mt-3">Very good product</p>
                            <v-img
                              v-if="review.image_link"
                              :src="review.image_link"
                              class="grey lighten-2"
                              height="100px"
                              width="100px"
                            ></v-img>
                          </v-card>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item value="Question">
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-form>
                  <v-container>
                    <div class="d-flex flex-row">
                      <v-text-field v-model="question" label="What do you want to know ?" outlined></v-text-field>
                      <v-btn
                        color="orange"
                        tile
                        x-large
                        class="ml-5"
                        @click="askQuestion"
                      >Ask Question</v-btn>
                    </div>
                  </v-container>
                </v-form>

                <p
                  v-if="product.question_answers.length == 0"
                  class="text-center red--text"
                >No question has been placed for this product yet</p>

                <v-card
                  flat
                  tile
                  class="d-flex flex-column"
                  v-for="(comment , index) in product.question_answers"
                  :key="index"
                >
                  <v-divider></v-divider>
                  <div class="d-flex flex-row">
                    <v-icon large color="blue darken-2">mdi-comment-question</v-icon>
                    <p class="text-content-body-1 mt-3 ml-5">
                      {{comment.comment}}
                      <v-spacer></v-spacer>
                      <span class="text-caption">by {{comment.comment_name}}</span>
                    </p>
                  </div>
                  <div class="d-flex flex-row" v-if="comment.replies.length > 0">
                    <v-icon large color="blue darken-2">mdi-forum</v-icon>
                    <p class="text-content-body-1 mt-3 ml-5">
                      {{comment.replies[0].reply}}
                      <v-spacer></v-spacer>
                      <span class="text-caption">by {{comment.replies[0].name}}</span>
                    </p>
                  </div>
                </v-card>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item value="Description">
          <v-card flat>
            <v-container>
              <p class="text-h6 font-weight-bold text-center">Product details</p>
              <v-divider></v-divider>
              <v-row>
                <p class="font-weight-medium ma-5">{{product.description}}</p>
              </v-row>
            </v-container>
            <v-container v-if="product.key_features.length != 0">
              <p class="text-h6 font-weight-bold text-center">Product Specification.</p>
              <v-divider></v-divider>
              <v-row>
                <v-col class="d-flex flex-column">
                  <ul id="example-1">
                    <li
                      v-for="(feature , index) in product.key_features.slice(0,product.key_features.length - (product.key_features.length/2))"
                      :key="index"
                      class="ma-3"
                    >{{feature}}</li>
                  </ul>
                </v-col>
                <v-col class="d-flex flex-column">
                  <ul id="example-1">
                    <li
                      v-for="(feature , index) in product.key_features.slice(product.key_features.length - (product.key_features.length/2) , product.key_features.length)"
                      :key="index"
                      class="ma-3"
                    >{{feature}}</li>
                  </ul>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  props: ["product"],
  data() {
    return {
      tab: null,
      // image: this.product.images[0],
      image: "https://picsum.photos/510/300?random",
      question: "",
      quantity: 1,
      images: [
        "https://picsum.photos/510/300?random",
        "https://picsum.photos/510/300?random",
        "https://picsum.photos/510/300?random",
        "https://picsum.photos/510/300?random",
        "https://picsum.photos/510/300?random",
        "https://picsum.photos/510/300?random",
        "https://picsum.photos/510/300?random",
      ],
      selectedColor: "",
      selectedSize: "",
      unit: "",
    };
  },
  methods: {
    // On hover change the image path for Zoom Image
    passSrc(image) {
      this.image = image;
    },

    // Color Selection
    colorSelected(color) {
      this.selectedColor = color;
    },

    // Color Selection
    sizeSelected(size) {
      this.selectedSize = size;
    },

    decrease() {
      this.quantity = this.quantity - 1;
    },

    // product add to cart emit on default.vue
    addToCart(product) {
      // this.$emit("onAddToCart", product);
      this.$axios
        .put(`https://tango99.herokuapp.com/Cart/addcart/${product.id}/`, {
          user_id: 1,
          quantity: this.quantity,
          color: this.selectedColor,
          size: this.selectedSize,
          unit: this.unit,
        })
        .then((response) => {
          $nuxt.$emit("loadCart");
          this.quantity = 1
        });
    },

    // Ask Qusetion
    async askQuestion() {
      this.$axios
        .post(`https://tango99.herokuapp.com/product/create_comment/`, {
          user_id: 1,
          product_id: this.product.id,
          comment: this.question,
        })
        .then((response) => {
          this.product.question_answers.unshift(response.data);
          this.question = "";
        });
    },
  },
  created() {
    if (this.product.specification.colors.length > 0) {
      this.selectedColor = this.product.specification.colors[0];
    }
    if (this.product.specification.sizes.length > 0) {
      this.selectedSize = this.product.specification.sizes[0];
    }
  },
};
</script>

<style>
.image-magnifier__mask {
  width: 200px !important;
  height: 300px !important;
}
</style>