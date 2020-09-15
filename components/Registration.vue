<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-row>
        <v-col md="6" class="d-none d-md-flex">
          <v-card class="elevation-3 pa-3">
            Lorem ipsum dolor sit amet consectetur apisicing elit. Beatae unde, expedita porro eligendi eius sunt? Dicta inventore, tempore consequuntur, asperiores quidem aliquam nam animi odio expedita possimus quae corporis nostrum?
            Lorem ipsum dolor sit amet consectetur apisicing elit. Beatae unde, expedita porro eligendi eius sunt? Dicta inventore, tempore consequuntur, asperiores quidem aliquam nam animi odio expedita possimus quae corporis nostrum?
            Lorem ipsum dolor sit amet consectetur apisicing elit. Beatae unde, expedita porro eligendi eius sunt? Dicta inventore, tempore consequuntur, asperiores quidem aliquam nam animi odio expedita possimus quae corporis nostrum?
            Lorem ipsum dolor sit amet consectetur apisicing elit. Beatae unde, expedita porro eligendi eius sunt? Dicta inventore, tempore consequuntur, asperiores quidem aliquam nam animi odio expedita possimus quae corporis nostrum?
            Lorem ipsum dolor sit amet consectetur apisicing elit. Beatae unde, expedita porro eligendi eius sunt? Dicta inventore, tempore consequuntur, asperiores quidem aliquam nam animi odio expedita possimus quae corporis nostrum?
          </v-card>
        </v-col>

        <v-col sm="1" class="d-none d-sm-flex d-md-none"></v-col>
        <v-col cols="12" sm="10" md="6">
          <v-card class="elevation-3 pa-3">
            <div>
              <v-card-text>
                <p class="display-1 indigo--text">Registration</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dicta tempora asperiores odit unde mollitia!
                  Repellat fugiat, itaque dolores ipsa qui nemo esse. Deserunt sint facere nemo deleniti quis dolore atque.
                </p>
                <v-alert
                  v-if="error"
                  border="left"
                  type="error"
                  dark
                  prominent
                  transition="scale-transition"
                >{{error}}</v-alert>

                <v-alert
                  v-model="alert"
                  border="left"
                  type="success"
                  dark
                  prominent
                  transition="scale-transition"
                >{{successMessage}}</v-alert>

                <v-form ref="form" v-model="valid" v-if="!alert" class="text-center">
                  <v-text-field
                    label="Name(*)"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    required
                    :rules="nameRules"
                    v-model="name"
                  ></v-text-field>

                  <v-text-field
                    label="Email(*)"
                    name="Email"
                    prepend-icon="mdi-account"
                    type="email"
                    required
                    :rules="emailRules"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    label="Phone Number(optional)"
                    name="phoneNumber"
                    prepend-icon="mdi-phone"
                    type="text"
                    required
                    :rules="phoneNumberRules"
                    v-model="phoneNumber"
                  ></v-text-field>

                  <v-text-field
                    label="Password(*)"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                    :rules="passwordRules"
                    v-model="password"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Confirm Password(*)"
                    name="confirmPassword"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                    :rules="confirmPasswordRules"
                    v-model="confirmPassword"
                  ></v-text-field>

                  <v-row class="d-flex">
                    <v-col cols="12" lg="6">
                      <v-checkbox
                        v-model="agree"
                        label="I agree to the terms"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        required
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" lg="6">
                      <div class="text-right text-sm-body-2 pt-lg-1 mt-lg-4">
                        Already have an account ?
                        <nuxt-link to="/login">Login</nuxt-link>
                      </div>
                    </v-col>
                  </v-row>

                  <v-btn
                    color="primary"
                    x-large
                    tile
                    :disabled="!valid"
                    @click.prevent="submitForm"
                  >Registration</v-btn>

                  <v-row>
                    <v-col>
                      <v-divider></v-divider>
                    </v-col>Or
                    <v-col>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>

                  <v-btn
                    class="ma-2 text-lg-h6 text-caption"
                    tile
                    color="indigo"
                    dark
                    x-large
                    @click="googleLogin"
                  >
                    <v-icon left x-large>mdi-alpha-g</v-icon>Sign up with Google
                  </v-btn>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        <v-col sm="1" class="d-none d-sm-flex d-md-none"></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    alert: false,
    error: "",
    successMessage: "",
    name: "rabby",
    email: "rabby@gmail.com",
    phoneNumber: "01757047579",
    password: "123456",
    confirmPassword: "123456",
    agree: false,
    nameRules: [
      (v) => !!v || "Name can not be empty",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail can not be empty",
      (v) => /.+@.+\..+/.test(v) || "Please provide a valid email",
    ],
    phoneNumberRules: [(v) => !!v || "Phone number can not be empty"],
    passwordRules: [
      (v) => !!v || "Password can not be empty",
      (v) =>
        (v && v.length >= 6) || "Password must be grater than 6 characters",
    ],
  }),
  methods: {
    async submitForm() {
      try {
        let user = {
          name: this.name,
          email: this.email,
          phone_number: this.phoneNumber,
          password: this.password,
          confirmPassword: this.confirmPassword,
          agree: this.agree,
        };

        let response = await this.$axios.post(
          "https://tango99.herokuapp.com/user/user_signup/",
          user
        );

        if (response.data.success) {
          this.$refs.form.reset();
          this.successMessage = response.data.message;
          this.alert = true;
        }

        if (!response.data.success) {
          this.alert = false;
          this.error = response.data.message;
        }
      } catch (error) {}
    },

    async googleLogin() {
      this.$auth.loginWith("google");
      await this.$axios.post("api/auth/setUser", this.$auth.user);
    },
  },
  computed: {
    confirmPasswordRules() {
      const rules = [];

      if (this.confirmPassword) {
        if (this.confirmPassword != this.password) {
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