<template>
  <v-container>
    <!-- <v-card height="400" width="256" class="mx-auto"> -->
    <v-card height="400" class="mx-auto">
      <v-navigation-drawer permanent width="100%">
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{name || "user name"}}</v-list-item-title>
            <v-list-item-subtitle>{{email || "user email"}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-menu transition="scale-transition" close-on-content-click>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="pink" icon dark v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-file-input
                  v-model="file"
                  @change="onFileChange"
                  accept="image/*"
                  label="File input"
                  hide-input
                  prepend-icon="mdi-camera"
                ></v-file-input>
                <v-list-item-title class="mt-3">Chnage Photo</v-list-item-title>
              </v-list-item>
              <v-list-item @click.stop="dialog = true">
                <v-btn icon class="ml-0">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>
                <v-list-item-title>Update Profile</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item link nuxt :to="`/user/${1}/profile`">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link nuxt :to="`/user/${1}/wallet`">
            <v-list-item-icon>
              <v-icon>mdi-bank</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Wallet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link nuxt :to="`/user/${1}/orders`">
            <v-list-item-icon>
              <v-icon>mdi-cart-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Orders</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link nuxt :to="`/user/${1}/change-password`">
            <v-list-item-icon>
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Change Password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link nuxt :to="`/user/${1}/tickets`">
            <v-list-item-icon>
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Support Ticket</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <updateProfileDialog
      :dialog="dialog"
      :user="user"
      @onClose="dialog = false"
      @onUpdate="updateGrant"
    />
  </v-container>
</template>

<script>
export default {
  components: {
    updateProfileDialog: () => import("@/components/updateProfileDialog"),
  },
  data() {
    return {
      dialog: false,
      file: null,
      name: "",
      email: "",
      profile_picture: "",
      phone_number: "",
      city: "",
      district: "",
      user: {},
    };
  },
  methods: {
    onFileChange() {
      let formData = new FormData();

      formData.append("profile_picture", this.file, this.file.name);

      // API CALL
      this.$axios
        .post("https://tango99.herokuapp.com/user/update_profile/10", formData)
        .then((response) => {
          this.profile_picture = response.data.profile_picture;
        });
    },
    async updateProfile() {
      let user = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        address: this.address,
      };

      let response = await this.$axios.post("/api/auth/updateUser", user);
    },

    updateGrant(updatedUser) {
      // Update the user in backend
      this.$axios
        .post(
          "https://tango99.herokuapp.com/user/update_profile/10",
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
        });

      // Emit on profile page
      this.$emit("onUpdateFromSidebar", updatedUser);
      this.dialog = false;
    },
  },

  mounted() {
    this.$axios
      .get("https://tango99.herokuapp.com/user/get_profile/10")
      .then((response) => {
        if (response.data) {
          let { name, phone_number, city, district, email } = response.data;

          // Update user information for this component
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