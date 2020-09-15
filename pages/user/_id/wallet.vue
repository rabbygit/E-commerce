<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" offset-md="1" lg="2">
        <user-sidebar></user-sidebar>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-container fluid>
          <v-row class="grey lighten-5" no-gutters>
            <v-col cols="12">
              <v-card outlined tile height="400px">
                <div
                  style="min-height:100%;"
                  class="pa-6 d-flex flex-column justify-center align-center"
                >
                  <p class="text-h6">Your Balance is {{balance}} tk</p>
                  <v-btn tile large color="orange" @click.stop="dialog = true">Add Balance</v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="350px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    label="Enter Amount"
                    required
                    outlined
                    v-model="amount"
                    :rules="amountRules"
                    type="text"
                  ></v-text-field>
                </v-form>

                <v-btn color="primary" tile @click="dialog = false">Close</v-btn>
                <v-btn
                  class="ml-12"
                  color="orange"
                  tile
                  @click="addBalance"
                  :disabled="!valid"
                >Add Amount</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="2000" top>
      {{ errorText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    auth: false,
    components: {
      updateProfileDialog: () => import("@/components/updateProfileDialog"),
      UserSidebar: () => import("@/components/UserSidebar"),
    },
    data() {
      return {
        valid: true,
        dialog: false,
        snackbar: false,
        errorText: "",
        amount: "",
        balance: 0,
        amountRules: [
          (v) => !!v || "Amount is required",
          (v) => /^[0-9]+$/.test(v) || "Provide valid amount",
        ],
      };
    },
    methods: {
      addBalance() {
        this.dialog = false;
      },
    },

    mounted() {
      this.$axios
        .get("https://tango99.herokuapp.com/user/user_balance/1")
        .then((response) => {
          this.balance = response.data.wallet;
        })
        .catch((err) => {
          this.errorText = "Something went wrong";
          this.snackbar = true;
        });
    },
  };
</script>

<style>
</style>