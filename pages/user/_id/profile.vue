<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" offset-md="1" lg="2">
        <user-sidebar @onUpdateFromSidebar="updateUser" :key="id"></user-sidebar>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-container fluid>
          <p class="text-button font-weight-bold">Personal Information</p>
          <v-divider></v-divider>
          <v-container class="pa-0">
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-3">Full Name</p>
                <v-spacer></v-spacer>
                <p class="text-button mt-5">{{name || "NULL"}}</p>
                <v-btn icon color="pink" class="mt-5 ml-5" @click.stop="dialog = true">
                  <v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
              <v-divider></v-divider>
            </v-card>
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-3">Phone Number</p>
                <v-spacer></v-spacer>
                <p class="text-button mt-5">{{phone_number || "NULL"}}</p>
                <v-btn icon color="pink" class="mt-5 ml-5" @click.stop="dialog = true">
                  <v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
              <v-divider></v-divider>
            </v-card>
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-3">Email</p>
                <v-spacer></v-spacer>
                <p class="text-mute mt-5 mr-2">{{email || "NULL"}}</p>
              </div>
              <v-divider></v-divider>
            </v-card>
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-3">City</p>
                <v-spacer></v-spacer>
                <p class="text-button mt-5">{{city || "NULL"}}</p>
                <v-btn icon color="pink" class="mt-5 ml-5" @click.stop="dialog = true">
                  <v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
              <v-divider></v-divider>
            </v-card>
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-3">District</p>
                <v-spacer></v-spacer>
                <p class="text-button mt-5">{{district || "NULL"}}</p>
                <v-btn icon color="pink" class="mt-5 ml-5" @click.stop="dialog = true">
                  <v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
              <v-divider></v-divider>
            </v-card>
          </v-container>
          <updateProfileDialog
            :dialog="dialog"
            :user="user"
            @onClose="dialog = false"
            @onUpdate="updateUser"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    // middleware: "auth",
    auth: false,
    components: {
      updateProfileDialog: () => import("@/components/updateProfileDialog"),
      UserSidebar: () => import("@/components/UserSidebar"),
    },
    data() {
      return {
        id: 0,
        dialog: false,
        name: "",
        email: "",
        phone_number: "",
        city: "",
        district: "",
        user: {},
      };
    },
    methods: {
      updateUser(updatedUser) {
        // Update the user in backend
        this.$axios
          .post(
            "https://tango99.herokuapp.com/user/update_profile/10 ",
            updatedUser
          )
          .then((response) => {
            let { name, phone_number, city, district, email } = response.data;

            // Update user information of profile page
            this.name = name;
            this.email = email;
            this.phone_number = phone_number;
            this.district = district;
            this.city = city;

            // update information for update profile dialog
            this.user = {
              name,
              phone_number,
              district,
              city,
            };

            this.id++; // Update the sidebar component forcelly
          });

        this.dialog = false;
      },
    },
    mounted() {
      // Get the user with this.$route.params.id
      this.$axios
        .get("https://tango99.herokuapp.com/user/get_profile/10")
        .then((response) => {
          if (response.data) {
            let { name, phone_number, city, district, email } = response.data;

            // Update user information of profile page
            this.name = name;
            this.email = email;
            this.phone_number = phone_number;
            this.district = district;
            this.city = city;

            // update information for update profile dialog
            this.user = {
              name,
              phone_number,
              district,
              city,
            };
          }
        });
    },
  };
</script>

<style>
</style>