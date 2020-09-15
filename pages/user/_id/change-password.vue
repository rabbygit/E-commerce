<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3"  offset-md="1" lg="2">
        <user-sidebar></user-sidebar>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-container>
          <v-row no-gutters>
            <v-col lg="10" md="10">
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-text class="pa-0">
                    <v-alert type="success" class="ma-0" v-if="success">{{message}}</v-alert>
                    <v-alert type="error" class="ma-0" v-if="!success">{{message}}</v-alert>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <v-card>
                <v-row>
                  <v-col lg="2" md="1" sm="1" cols="0"></v-col>
                  <v-col lg="6" md="8" sm="10" cols="12">
                    <h3 class="text-center">Reset Password</h3>
                    <v-form ref="form" v-model="valid">
                      <v-col cols="12">
                        <v-text-field
                          id="password"
                          label="Old Password"
                          name="password"
                          type="password"
                          v-model="oldPassword"
                          :rules="oldPasswordRules"
                          filled
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          id="password"
                          label="New Password"
                          name="password"
                          type="password"
                          v-model="newPassword"
                          :rules="newPasswordRules"
                          filled
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          id="password"
                          label="Confirm Password"
                          name="password"
                          type="password"
                          v-model="confirmPassword"
                          :rules="confirmPasswordRules"
                          filled
                          dense
                        ></v-text-field>

                        <div class="text-center">
                          <v-btn
                            rounded
                            color="success"
                            dark
                            large
                            block
                            @click.prevent="resetPassword"
                          >Save Changes</v-btn>
                        </div>
                      </v-col>
                    </v-form>
                  </v-col>
                  <v-col></v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
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
  data: () => ({
    valid: false,
    dialog: false,
    success: false,
    message : "",
    oldPassword: "",
    oldPasswordRules: [(v) => !!v || "Password can not be empty"],
    newPassword: "",
    newPasswordRules: [
      (v) => !!v || "Password can not be empty",
      (v) =>
        (v && v.length >= 2) || "Password must be grater than 6 characters",
    ],
    confirmPassword: "",
  }),
  methods: {
    async resetPassword() {
      try {
        let password = {
          old_password: this.oldPassword,
          new_password: this.newPassword,
          confirm_password: this.confirmPassword,
        };

        let response = await this.$axios.post(
          "https://tango99.herokuapp.com/user/change_password/10/",
          password
        );

        if (response.data.success) {
          this.success = true;
          this.$refs.form.reset();
        }else{
          this.success = false
        }

        this.message = response.data.message;
        this.dialog = true;
      } catch (error) {}
    },
  },
  computed: {
    confirmPasswordRules() {
      const rules = [];

      if (this.confirmPassword) {
        if (this.confirmPassword != this.newPassword) {
          let rule = "Password must be matched";
          rules.push(rule);
        }
        return rules;
      }

      const rule = (v) => !!v || "Confirm Password can not be empty";
      rules.push(rule);

      return rules;
    },
  },
};
</script>

<style>
</style>