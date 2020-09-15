<template>
  <div>
    <v-card class="mx-auto" max-width="374">
      <!-- Shipping and Billing area -->
      <div>
        <v-card-title>Sipping & Billing</v-card-title>
        <v-divider></v-divider>
        <div v-if="showBillingForm" class="text-center mb-2">
          <v-form v-model="valid" class="pa-5 pb-0">
            <v-text-field
              label="Address"
              outlined
              dense
              required
              v-model="address"
              :rules="addressRules"
            ></v-text-field>
            <v-text-field
              label="Phone Number"
              outlined
              dense
              required
              v-model="phoneNumber"
              :rules="phoneNumberRules"
            ></v-text-field>
          </v-form>
          <v-spacer></v-spacer>
          <v-btn color="success" tile @click="addAddress" :disabled="!valid">Add Address</v-btn>
        </div>

        <div class="pa-5" v-else>
          <div class="d-flex flex-row">
            <div class="text-body-1">Billing Address:</div>
          </div>
          <div class="text-body-1 font-weight-black d-flex flex-row align-center">
            {{address}}
            <v-spacer></v-spacer>
            <v-btn small icon color="primary" @click="dialog = true">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </div>

          <div class="text-body-1 font-weight-black d-flex flex-row align-center mt-3">
            <v-btn icon x-small tile color="success">
              <v-icon>mdi-phone</v-icon>
            </v-btn>
            <span class="ml-2 text-body-1">{{phoneNumber}}</span>
            <v-spacer></v-spacer>
            <v-btn small icon color="primary" @click="dialog = true">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </div>
        </div>

        <v-divider></v-divider>
      </div>

      <div>
        <v-card-title>Order Summary</v-card-title>
        <v-divider></v-divider>

        <div class="pa-5 pb-2">
          <div class="d-flex flex-row">
            <p class="text-body-1">
              Items:
              <span class="font-weight-black">{{productCount}}</span>
            </p>
            <v-spacer></v-spacer>
            <div class="text-body-1 font-weight-black">Sub total: {{subTotal}}$</div>
          </div>

          <div class="d-flex flex-row mb-5">
            <div class="text-body-1">
              Shipping Cost:
              <span class="font-weight-black">{{shippingCost}}</span>
            </div>
          </div>

          <div>
            <div class="text-body-1">Promo Code:</div>
            <v-text-field solo style="height:60px;" v-model="coupon"></v-text-field>
            <div class="text-center mt-0">
              <v-btn tile color="success" @click="applyCopoun">Apply</v-btn>
            </div>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="d-flex flex-row justify-center pt-2">
          <div class="text-body-1 font-weight-black">
            Total Cost:
            <span
              class="font-weight-black"
            >{{parseFloat(parseFloat(subTotal) + shippingCost)}}</span>
          </div>
        </div>

        <v-card-actions>
          <v-btn
            color="orange lighten-1"
            height="40px"
            block
            tile
            :disabled="!confirmOrderShow"
            @click="confirmOrder"
          >Procced to pay</v-btn>
        </v-card-actions>
      </div>
    </v-card>

    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title class="headline text-center">Billing Address</v-card-title>

        <v-card-text>
          <v-container>
            <v-form v-model="validChangeAddress">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Phone Number*"
                    required
                    placeholder="Ex:-01757047579"
                    v-model="phoneNumber"
                    :rules="phoneNumberRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Address*"
                    required
                    placeholder="Ex: House-21,Moghbazar,Dhaka"
                    v-model="address"
                    :rules="addressRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeAddress"
            :disabled="!validChangeAddress"
          >Change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="showCheckoutResult" centered color="error">
      {{confirOrderMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showCheckoutResult = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="snackbar" centered :color="color">
      {{snackbarMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    subTotal: {
      type: Number,
      defualt: 0,
    },
    productCount: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    loading: false,
    dialog: false,
    validChangeAddress: false,
    showCheckoutResult: false,
    selection: 1,
    showBillingForm: false,
    valid: true,
    address: "",
    addressRules: [(v) => !!v || "Address is required"],
    phoneNumber: "",
    phoneNumberRules: [
      (v) => !!v || "Phone Number is required",
      (v) =>
        /(^(\+88|0088)?(01){1}[56789]{1}(\d){8})$/.test(v) ||
        "Provide a valid phone number",
    ],
    confirmOrderShow: false,
    shippingCost: 500,
    snackbar: false,
    coupon: "",
    snackbarMessage: "",
    color: "",
    confirOrderMessage: "",
  }),

  methods: {
    // Get Billing Address from API
    getBillingAddress() {
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/show_address/`, {
          user_id: 1,
        })
        .then((response) => {
          if (response.data.success) {
            let { phone_number, address } = response.data.data[0];
            if (phone_number != "" || address != "") {
              this.phoneNumber = phone_number;
              this.address = address;
              this.showBillingForm = false;
              this.confirmOrderShow = true;
            } else {
              this.showBillingForm = true;
            }
          }
        });
    },

    // Add address if user doesn't have any address
    addAddress() {
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/edit_address/`, {
          user_id: 1,
          phone_number: this.phoneNumber,
          address: this.address,
        })
        .then((response) => {
          if (response.data) {
            this.showBillingForm = false;
            this.confirmOrderShow = true;
          }
        });
    },

    // Change address by user
    changeAddress() {
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/edit_address/`, {
          user_id: 1,
          phone_number: this.phoneNumber,
          address: this.address,
        })
        .then((response) => {
          this.dialog = false;
          this.confirmOrderShow = true;
        });
    },

    // Check and Apply coupn
    applyCopoun() {
      // Coupon check
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/check_coupon/`, {
          user_id: 1,
          coupon_code: this.coupon,
        })
        .then((response) => {
          if (response.data.success) {
            this.$emit("loadCheckoutCart");
            this.color = "success";
          } else {
            this.color = "error";
          }
          this.snackbarMessage = response.data.message;
          this.snackbar = true;
        });
    },

    // Confirm Order Check
    confirmOrder() {
      this.$axios
        .post(`https://tango99.herokuapp.com/Cart/checkout/`, { user_id: 1 })
        .then((response) => {
          if (!response.data.success) {
            this.confirOrderMessage = response.data.message;
            this.showCheckoutResult = true;
          }
        });
    },
  },

  created() {
    // Get The Billing and Shipping address if exists
    this.getBillingAddress();
  },
};
</script>

<style>
</style>