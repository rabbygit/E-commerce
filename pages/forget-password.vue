  
<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Reset Password</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    label="New Password"
                    name="login"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                    :rules="passwordRules"
                    v-model="password"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Confirm Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                    :rules="confirmPasswordRules"
                    v-model="confirmPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  auth: "guest",
  data: () => ({
    valid: true,
    alert: false,
    error: "",
    password: "",
    confirmPassword: "",
    passwordRules: [
      (v) => !!v || "Password can not be empty",
      (v) =>
        (v && v.length >= 6) || "Password must be grater than 6 characters",
    ],
  }),
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