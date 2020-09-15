<template>
  <v-app>
    <!-- <v-app-bar fixed app height="200px" class="p-0"> -->

    <v-navigation-drawer v-model="sidebar" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>mdi-{{item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app height="145px">
      <v-row no-gutters>
        
        <v-col sm="2">

          <span class="d-none d-sm-flex d-md-none">
          <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
        </span>

          <nuxt-link to="/">
            <v-toolbar-title>LOGO</v-toolbar-title>
          </nuxt-link>
        </v-col>
        <v-col sm="10">
          <v-row class="d-none d-md-flex ">
            <v-col>
              <div>
                <v-icon small>mdi-phone</v-icon>
                <span class="text-lg-h6 text-caption">0175-7057579</span>
              </div>
            </v-col>
            <v-col>
              <div>
                <v-icon small>mdi-email</v-icon>
                <span class="text-lg-h6 text-caption">example@gmail.com</span>
              </div>
            </v-col>
            <v-col>
              <div>
                <v-select :items="items" label="Outlined style" dense outlined style="width:200px"></v-select>
              </div>
            </v-col>
            <v-col>
              <div v-if="$auth.user" class="d-flex">
                <div class="text-center mr-16">
                  <div class="text-center">
                    <v-menu offset-y transition="slide-x-transition" close-on-content-click>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" text dark v-bind="attrs" v-on="on">My Account</v-btn>
                      </template>
                      <v-list>
                        <v-list-item nuxt :to="`/user/${1}/profile`">
                          <v-list-item-title>My Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>My Wallet</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div>
                <div class="text-center mr-2">
                  <v-btn color="primary" tile text dark @click="$auth.logout()">Log out</v-btn>
                </div>
              </div>
              <div v-else class="d-flex">
                <div class="text-center mr-16">
                  <v-btn text tile color="primary" dark nuxt to="/registration">Register</v-btn>
                </div>
                <div class="text-center mr-2">
                  <v-btn text tile color="primary" dark nuxt to="/login">Login</v-btn>
                </div>
              </div>
            </v-col>
            <!-- <div class="mr-16">
              <v-icon>mdi-phone</v-icon>
              <span class="text-h6">0175-7057579</span>
            </div>
            <div>
              <v-icon>mdi-email</v-icon>
              <span class="text-h6">example@gmail.com</span>
            </div>
            <v-spacer />
            <div>
              <v-select :items="items" label="Outlined style" dense outlined style="width:200px"></v-select>
            </div>
            <div v-if="$auth.user" class="d-flex">
              <div class="text-center mr-16">
                <div class="text-center">
                  <v-menu offset-y transition="slide-x-transition" close-on-content-click>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" text dark v-bind="attrs" v-on="on">My Account</v-btn>
                    </template>
                    <v-list>
                      <v-list-item nuxt :to="`/user/${1}/profile`">
                        <v-list-item-title>My Profile</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>My Wallet</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
              <div class="text-center mr-2">
                <v-btn color="primary" tile text dark @click="$auth.logout()">Log out</v-btn>
              </div>
            </div>
            <div v-else class="d-flex">
              <div class="text-center mr-16">
                <v-btn text tile color="primary" dark nuxt to="/registration">Register</v-btn>
              </div>
              <div class="text-center mr-2">
                <v-btn text tile color="primary" dark nuxt to="/login">Login</v-btn>
              </div>
            </div>-->
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-col cols="2"></v-col>
            <v-col>
              <div>
                <v-text-field append-icon="mdi-magnify" rounded hide-details solo-inverted />
              </div>
            </v-col>
            <v-col>
              <div class="ml-10">
                <v-btn color="success" fab medium dark nuxt to="/cart">
                  <v-icon>mdi-cart-outline</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <template v-slot:extension>
        <v-tabs centered hide-slider>
          <v-tab nuxt to="/">Home</v-tab>
          <v-tab nuxt to="/registration">Sign Up</v-tab>
          <v-tab nuxt to="/login">Login</v-tab>
          <v-tab nuxt to="/about">About Us</v-tab>
          <v-tab nuxt to="/contact">Contact Us</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
export default {
  components: {
    SystemBar: () => import("@/components/SystemBar"),
    Footer: () => import("@/components/Footer"),
  },
  data() {
    return {
      sidebar: false,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/signin", icon: "lock-open" },
      ],
    };
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
