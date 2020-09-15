<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" offset-lg="2" offset-md="1" lg="2">
        <user-sidebar></user-sidebar>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-container>
          <v-card>
            <v-row>
              <v-col>
                <v-tabs background-color="white" color="deep-purple accent-4" left>
                  <v-tab @click="Clicked('')">All</v-tab>
                  <v-tab @click="Clicked('to pay')">To pay</v-tab>
                  <v-tab @click="Clicked('recieved')">Resceived</v-tab>
                </v-tabs>
              </v-col>
              <v-col>
                <v-select
                  v-model="limit"
                  :items="items"
                  item-text="state"
                  item-value="value"
                  label="Last 5 Orders"
                  solo
                  style="width:200px"
                  class="float-right"
                ></v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-card>
            <v-simple-table fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left text-button">Product Details</th>
                    <th class="text-center text-button">Quantity</th>
                    <th class="text-center text-button">Order Status</th>
                    <th class="text-center text-button">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in filtered" :key="product.id">
                    <td class="px-0">
                      <div class="d-flex flex-row">
                        <v-card flat tile class="d-flex mr-5" height="135" width="125">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                            class="grey lighten-2"
                          ></v-img>
                        </v-card>
                        <div>
                          <p class="text-subtitle-2 mt-3">{{product.name}}</p>
                          <p>
                            Order ID:
                            <span class="text-subtitle-2">983247683246874</span>
                          </p>
                          <p>
                            Delivery Status:
                            <span>{{product.deliveryStatus}}</span>
                          </p>
                          <p>
                            Code:
                            <span>98374683476</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-subtitle-2 text-center">{{product.quantity}}</div>
                    </td>
                    <td>
                      <p class="text-center">{{product.orderStatus}}</p>
                    </td>
                    <td>
                      <div class="text-center">
                        <v-btn
                          text
                          color="red"
                          v-if="product.orderStatus == 'cancelled'"
                          @click.stop="passProduct(product)"
                        >Manage</v-btn>
                        <v-btn v-else text color="red" @click.stop="passProduct(product)">View</v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>

          <v-dialog v-model="dialog" persistent scrollable width="800px">
            <v-card flat>
              <v-card-title dark class="primary">
                <span class="headline ml-5 white--text">Product Details</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <div>
                      <p class="text-h6">Order Id :{{singleProduct.id}}</p>
                      <p class="text-content-body-2">Total: 100</p>
                      <p class="text-content-body-2">Placed On: 100</p>
                    </div>
                  </v-row>
                  <v-row align="center">
                    <v-col class="pa-0">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                        height="100"
                        width="100"
                      ></v-img>
                    </v-col>
                    <v-col>
                      <p class="text-content-body-2 text-center">
                        Product Name:
                        <strong>{{singleProduct.name}}</strong>
                      </p>
                    </v-col>
                    <v-col>
                      <p class="text-content-body-2">
                        Quantity:
                        <strong>{{singleProduct.quantity}}</strong>
                      </p>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container>
                  <v-row>
                    <div>
                      <p class="text-h6">Order Id :{{singleProduct.id}}</p>
                      <p class="text-content-body-2">Total: 100</p>
                      <p class="text-content-body-2">Placed On: 100</p>
                    </div>
                  </v-row>
                  <v-row align="center">
                    <v-col class="pa-0">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                        height="100"
                        width="100"
                      ></v-img>
                    </v-col>
                    <v-col>
                      <p class="text-content-body-2 text-center">
                        Product Name:
                        <strong>{{singleProduct.name}}</strong>
                      </p>
                    </v-col>
                    <v-col>
                      <p class="text-content-body-2">
                        Quantity:
                        <strong>{{singleProduct.quantity}}</strong>
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="red"
                  width="100px"
                  large
                  dark
                  @click="dialog = false"
                  class="ml-5 mb-10"
                >Close</v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  color="deep-purple lighten-1 white--text"
                  tile
                  large
                  nuxt
                  to="/checkout"
                  :disabled="singleProduct.orderStatus && !singleProduct.outOfStock ? true : false"
                  class="mr-5"
                >Reorder</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-col>
    </v-row>
  </v-container>

  <!-- <v-container>
    <v-card>
     <v-row>
       <v-col>
          <v-tabs background-color="white" color="deep-purple accent-4" left>
        <v-tab @click="Clicked('')">All</v-tab>
        <v-tab @click="Clicked('to pay')">To pay</v-tab>
        <v-tab @click="Clicked('recieved')">Resceived</v-tab>
      </v-tabs>
       </v-col>
       <v-col>
         <v-select
            v-model="limit"
            :items="items"
            item-text="state"
            item-value="value"
            label="Last 5 Orders"
            solo
            style="width:200px"
            class="float-right"
          ></v-select>
       </v-col>
     </v-row>
    </v-card>
    <v-card>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left text-button">Product Details</th>
              <th class="text-center text-button">Quantity</th>
              <th class="text-center text-button">Order Status</th>
              <th class="text-center text-button">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filtered" :key="product.id">
              <td class="px-0">
                <div class="d-flex flex-row">
                  <v-card flat tile class="d-flex mr-5" height="135" width="125">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                      class="grey lighten-2"
                    ></v-img>
                  </v-card>
                  <div>
                    <p class="text-subtitle-2 mt-3">{{product.name}}</p>
                    <p>
                      Order ID:
                      <span class="text-subtitle-2">983247683246874</span>
                    </p>
                    <p>
                      Delivery Status:
                      <span>{{product.deliveryStatus}}</span>
                    </p>
                    <p>
                      Code:
                      <span>98374683476</span>
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div class="text-subtitle-2 text-center">{{product.quantity}}</div>
              </td>
              <td>
                <p class="text-center">{{product.orderStatus}}</p>
              </td>
              <td>
                <div class="text-center">
                  <v-btn
                    text
                    color="red"
                    v-if="product.orderStatus == 'cancelled'"
                    @click.stop="passProduct(product)"
                  >Manage</v-btn>
                  <v-btn v-else text color="red" @click.stop="passProduct(product)">View</v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-dialog v-model="dialog" persistent scrollable width="800px">
      <v-card flat>
        <v-card-title dark class="primary">
          <span class="headline ml-5 white--text">Product Details</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <div>
                <p class="text-h6">Order Id :{{singleProduct.id}}</p>
                <p class="text-content-body-2">Total: 100</p>
                <p class="text-content-body-2">Placed On: 100</p>
              </div>
            </v-row>
            <v-row align="center">
              <v-col class="pa-0">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                  height="100"
                  width="100"
                ></v-img>
              </v-col>
              <v-col>
                <p class="text-content-body-2 text-center">
                  Product Name:
                  <strong>{{singleProduct.name}}</strong>
                </p>
              </v-col>
              <v-col>
                <p class="text-content-body-2">
                  Quantity:
                  <strong>{{singleProduct.quantity}}</strong>
                </p>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <v-row>
              <div>
                <p class="text-h6">Order Id :{{singleProduct.id}}</p>
                <p class="text-content-body-2">Total: 100</p>
                <p class="text-content-body-2">Placed On: 100</p>
              </div>
            </v-row>
            <v-row align="center">
              <v-col class="pa-0">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                  height="100"
                  width="100"
                ></v-img>
              </v-col>
              <v-col>
                <p class="text-content-body-2 text-center">
                  Product Name:
                  <strong>{{singleProduct.name}}</strong>
                </p>
              </v-col>
              <v-col>
                <p class="text-content-body-2">
                  Quantity:
                  <strong>{{singleProduct.quantity}}</strong>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            width="100px"
            large
            dark
            @click="dialog = false"
            class="ml-5 mb-10"
          >Close</v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="deep-purple lighten-1 white--text"
            tile
            large
            nuxt
            to="/checkout"
            :disabled="singleProduct.orderStatus && !singleProduct.outOfStock ? true : false"
            class="mr-5"
          >Reorder</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>-->
</template>

<script>
export default {
  middleware: "auth",
  // layout: "profile",
  components: {
    updateProfileDialog: () => import("@/components/updateProfileDialog"),
    UserSidebar: () => import("@/components/UserSidebar"),
  },
  data() {
    return {
      search: "",
      dialog: false,
      limit: 1,
      items: [
        { state: "Last 1 orders", value: 1 },
        { state: "Last 2 orders", value: 2 },
        { state: "Last 3 orders", value: 3 },
        { state: "Last 4 orders", value: 4 },
      ],
      products: [
        {
          id: 1,
          name: "Shirt",
          deliveryStatus: "to pay",
          quantity: 3,
          orderStatus: "unpaid",
        },
        {
          id: 2,
          name: "Pant",
          deliveryStatus: "recieved",
          quantity: 5,
          orderStatus: "paid",
        },
        {
          id: 3,
          name: "Pant 2",
          deliveryStatus: "cancelled",
          quantity: 10,
          orderStatus: "cancelled",
          outOfStock: true,
        },
        {
          id: 4,
          name: "Pant 3",
          deliveryStatus: "recieved",
          quantity: 5,
          orderStatus: "paid",
        },
        {
          id: 5,
          name: "Pant 4",
          deliveryStatus: "recieved",
          quantity: 5,
          orderStatus: "paid",
        },
      ],
      singleProduct: {},
    };
  },
  methods: {
    Clicked(value) {
      this.search = value;
    },
    passProduct(product) {
      (this.singleProduct = product), (this.dialog = true);
    },
  },
  computed: {
    filtered() {
      return this.products
        .filter((product) => {
          return product.deliveryStatus
            .toLowerCase()
            .includes(this.search.toLowerCase());
        })
        .slice(1)
        .slice(-this.limit);
    },
  },
};
</script>

<style>
</style>