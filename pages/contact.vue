<template>
  <v-container>
    <v-row>
      <v-col lg="1" class="d-none d-md-flex"></v-col>
      <v-col lg="3" cols="12">
        <v-card class="pa-5" elevation="1" color tile>
          <div class="d-flex flex-row align-center mb-2">
            <v-icon color="blue">mdi-phone</v-icon>
            <p class="ml-5 mt-3 text-caption font-weight-medium">{{companyInfo.phone}}</p>
          </div>
          <div class="d-flex flex-row align-center mb-2">
            <v-icon color="blue">mdi-email</v-icon>
            <p class="ml-5 mt-3 text-caption font-weight-medium">{{companyInfo.email}}</p>
          </div>
        </v-card>
      </v-col>
      <v-col lg="7" cols="12">
        <v-card tile class="pa-10 pt-2">
          <v-card-title>Get In Touch</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="name" :rules="nameRules" label="Name*" required></v-text-field>

              <v-text-field v-model="email" :rules="emailRules" label="E-mail*" required></v-text-field>
              <v-text-field v-model="subject" :rules="subjectRules" label="Subject*" required></v-text-field>
              <v-textarea
                outlined
                name="input-7-4"
                label="Your Message *"
                v-model="content"
                class="mt-2"
              ></v-textarea>

              <v-btn :disabled="!valid" color="success" rounded class="mr-4" @click="submit">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="1" class="d-none d-md-flex"></v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{message ? "Thank You." : "Sorry"}}</v-card-title>

        <v-card-text v-if="message">{{message}}!</v-card-text>
        <v-card-text v-if="errorMessage">{{errorMessage}}!</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      companyInfo: {},
      dialog: false,
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      subject: "",
      subjectRules: [(v) => !!v || "Subject is required"],
      content: "",
      message: "",
      errorMessage: "",
    };
  },
  methods: {
    submit() {
      let data = {
        sender_name: this.name,
        sender_email: this.email,
        subject: this.subject,
        message: this.content,
      };
      this.$axios
        .post("https://tango99.herokuapp.com/site/contact/", data)
        .then((response) => {
          if (response.data.success) {
            this.message = "We will get you soon";
          } else {
            this.errorMessage = "Something went wrong";
          }
          this.dialog = true;
        });

      this.$refs.form.reset();
    },
  },
  mounted() {
    this.$axios
      .get("https://tango99.herokuapp.com/site/info")
      .then((response) => {
        if (response.data) {
          this.companyInfo = response.data.data[0];
        }
      });
  },
};
</script>

<style>
</style>