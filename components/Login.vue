<template>
  <v-app id="inspire">
    <!-- <v-main> -->
    <v-container fluid>
      <v-row>
        <v-col md="6" class="d-none d-md-flex">
          <v-card
            class="elevation-3"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae unde, expedita porro eligendi eius sunt? Dicta inventore, tempore consequuntur, asperiores quidem aliquam nam animi odio expedita possimus quae corporis nostrum?</v-card>
        </v-col>

        <v-col sm="1" class="d-none d-sm-flex d-md-none"></v-col>
        <v-col cols="12" sm="10" md="6">
          <v-card class="elevation-3 d-flex align-start">
            <div class="text-center">
              <v-card-text>
                <p class="display-1 indigo--text">Welcome to Shop</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dicta tempora asperiores odit unde mollitia!
                  Repellat fugiat, itaque dolores ipsa qui nemo esse. Deserunt sint facere nemo deleniti quis dolore atque.
                </p>

                <v-btn
                  class="ma-2 text-lg-h6 text-caption"
                  x-large
                  tile
                  color="indigo"
                  dark
                  @click.prevent="googleLogin"
                >
                  <v-icon left x-large>mdi-alpha-g</v-icon>Sign up with Google
                </v-btn>

                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>Or
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-alert
                  v-if="linkSent"
                  border="left"
                  type="info"
                  dark
                  prominent
                  transition="scale-transition"
                >Check Your Email</v-alert>
                <v-form v-model="valid" v-if="forgetpassword && !linkSent">
                  <p>Enter your email address below and we’ll send you a link to reset your password</p>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="emailRules"
                    v-model="email"
                  ></v-text-field>

                  <v-btn
                    class="ma-2 text-lg-h6 text-caption"
                    x-large
                    tile
                    color="primary"
                    :disabled="!valid"
                    @click.prevent="onSendLink"
                  >Send a verfication link</v-btn>
                </v-form>
                <v-form v-model="valid" v-if="!forgetpassword">
                  <v-alert
                    v-if="error"
                    border="left"
                    type="error"
                    dark
                    prominent
                    transition="scale-transition"
                  >{{error}}</v-alert>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="emailRules"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passwordRules"
                    v-model="password"
                  ></v-text-field>

                  <v-row class="d-flex">
                    <v-col cols="12" lg="6">
                      <v-checkbox v-model="remember" label="Remember Me"></v-checkbox>
                    </v-col>

                    <v-col cols="12" lg="6">
                      <div class="text-right text-sm-body-2 pt-lg-1 mt-lg-4">
                        <!-- <nuxt-link >Forget Password ?</nuxt-link> -->
                        <v-btn
                          class="ma-2 text-lg-body-2 text-caption"
                          tile
                          color="primary"
                          @click.prevent="onForgetpassword"
                        >Forget Password</v-btn>
                      </div>
                    </v-col>
                  </v-row>

                  <v-row class="d-flex">
                    <v-col cols="12" lg="6" class="text-left">
                      <v-btn
                        class="ma-2 text-lg-h6 text-caption"
                        x-large
                        tile
                        color="primary"
                        :disabled="!valid"
                        @click.prevent="userLogin"
                      >Login</v-btn>
                    </v-col>

                    <v-col cols="12" lg="6">
                      <div class="text-right text-sm-body-2 pt-lg-1 mt-lg-4">
                        Don't have an account ?
                        <nuxt-link to="/registration">Create Account</nuxt-link>
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        <v-col sm="1" class="d-none d-sm-flex d-md-none"></v-col>
      </v-row>
    </v-container>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    alert: false,
    error: "",
    email: "",
    password: "",
    remember: false,
    emailRules: [
      (v) => !!v || "E-mail can not be empty",
      (v) => /.+@.+\..+/.test(v) || "Please provide a valid email",
    ],
    passwordRules: [(v) => !!v || "Password can not be empty"],
    gError: "",
    forgetpassword: false,
    linkSent: false,
  }),
  methods: {
    async userLogin() {
      try {
        let user = {
          email: this.email,
          password: this.password,
        };

        let response = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        // const headers = {
        //   "Authorization": "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk5MDIxOTY1LCJqdGkiOiIwZDU3Y2ViNTJjNGM0NDg5ODY5MjQ4OTRlNmNlNTM2ZSIsInVzZXJfaWQiOjEyfQ._un5tlSXB54aXf0_I3Qj8JOzlkzYz2cKVEFsWVJ-0k0",
        // };

        // let response = await this.$axios.get(
        //   "https://tango99.herokuapp.com/user/user_credential/",
        //   {headers : headers}
        // );

        if (!response.data.success) {
          this.error = "Invalid Credential";
        }
      } catch (err) {
        // Global error handeler
      }
    },
    async googleLogin() {
      await this.$auth.loginWith("google");

      // console.log(this.$auth.user)
      // await this.$axios.post("/api/auth/setUser", this.$auth.user);

      // this.$router.push("/");
    },
    onForgetpassword() {
      this.forgetpassword = true;
    },
    onSendLink() {
      this.linkSent = true;
    },
  },
};
</script>