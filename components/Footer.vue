<template>
  <v-container fluid class="black white--text">
    <v-row no-gutters>
      <v-col offset-md="3" class="mr-10">
        <h4 class="my-5">ABOUT US</h4>
        <p>
          <nuxt-link to="/about" class="text-decoration-none white--text">About Us</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/contact" class="text-decoration-none white--text">Contact Us</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/faq" class="text-decoration-none white--text">Frequently Asked Questions</nuxt-link>
        </p>
      </v-col>
      <v-col class="mr-10">
        <h4 class="my-5">INFORMATION</h4>
        <p>
          <nuxt-link to="/privacy" class="text-decoration-none white--text">Privacy & Policy</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/terms" class="text-decoration-none white--text">Terms & Conditions</nuxt-link>
        </p>
      </v-col>
      <v-col class="mr-0">
        <h4 class="my-5">CONTACT US</h4>
        <p v-if="companyInfo">{{companyInfo.name || "Default Name"}}</p>
        <p v-if="companyInfo">{{companyInfo.address || "Default Name"}}</p>
      </v-col>
      <v-col md="2" class="d-none d-md-flex"></v-col>
    </v-row>
    <v-row>
      <div style="height:2px ; width:100%; background-color:white;"></div>
      <v-container fluid>
        <v-row>
          <v-col>
            <div
              class="text-center white--text text-h6"
            >Copyright &copy; {{companyInfo.name || "Default Name"}}</div>
          </v-col>
          <v-col>
            <div class="text-center">
              <v-btn
                v-if="companyInfo.facebook"
                fab
                class="ma-2"
                color="info"
                medium
                :href="companyInfo.facebook"
                target="blank"
              >
                <v-icon dark>mdi-facebook</v-icon>
              </v-btn>
              <v-btn
                v-if="companyInfo.twitter"
                fab
                class="ma-2"
                color="info"
                medium
                :href="companyInfo.twitter"
                target="blank"
              >
                <v-icon dark>mdi-twitter</v-icon>
              </v-btn>
              <v-btn
                v-if="companyInfo.linkedin"
                fab
                class="ma-2"
                color="info"
                medium
                :href="companyInfo.linkedin"
                target="blank"
              >
                <v-icon dark>mdi-linkedin</v-icon>
              </v-btn>
              <v-btn
                v-if="companyInfo.youtube"
                fab
                class="ma-2"
                color="info"
                medium
                :href="companyInfo.youtube"
                target="blank"
              >
                <v-icon dark>mdi-youtube</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col>
            <div class="d-flex justify-center">
              <v-img max-height="100px" max-width="100px" :src="companyInfo.logo_url"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>


<script>
export default {
  props: ["companyInfo"],

  data: () => ({
    items2: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
    ],
  }),
};
</script>