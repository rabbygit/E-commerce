<template>
  <v-app>
     <Navbar :companyInfo="companyInfo"/>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3" offset-lg="2" offset-md="1" lg="2">
            <user-sidebar></user-sidebar>
          </v-col>
          <v-col cols="12" md="8" lg="8">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Footer :companyInfo="companyInfo"/>
  </v-app>
</template>

<script>
export default {
  components: {
    SystemBar: () => import("@/components/SystemBar"),
    Footer: () => import("@/components/Footer"),
    UserSidebar: () => import("@/components/UserSidebar"),
    Navbar: () => import("@/components/Navbar"),
  },
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/signin", icon: "lock_open" },
      ],
      dialog: false,
      companyInfo:{}
    };
  },
  mounted() {
    // Fetching Company information if not exist in local storage
    this.$axios.get("/api/auth/site/info").then(response =>{
        if(response.data){
          this.companyInfo = response.data
        }})
  },
};
</script>

<style >
.v-toolbar__extension {
  background-color: #ffcdd2;
}
.demo {
  color: #311b92;
}
</style>
