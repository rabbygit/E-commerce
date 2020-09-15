<template>
  <div>
    <v-navigation-drawer
      v-model="sidebar"
      absolute
      temporary
      :style="{ top: window.height + 'px' }"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{companyInfo || "John Leider"}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item nuxt to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item nuxt to="/registration">
          <v-list-item-icon>
            <v-icon>mdi-face</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item nuxt to="/login">
          <v-list-item-icon>
            <v-icon>mdi-lock-open</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item nuxt :to="`/user/${1}/profile`">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item nuxt to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About Us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item nuxt to="/contact">
          <v-list-item-icon>
            <v-icon>mdi-card-account-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Contact Us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app height="120px">
      <v-row no-gutters>
        <v-col cols="1" sm="1">
          <span class="d-xs-flex d-md-none drawer-icon">
            <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
          </span>

          <!-- <nuxt-link to="/">
            <v-toolbar-title>LOGO</v-toolbar-title>
           https://cdn.searchenginejournal.com/wp-content/uploads/2019/11/e8d53e91-3831-4429-8ba7-b5c290a5ba98-5dc0b9c0642a3.gif
          </nuxt-link>-->

          <div class="d-none d-md-flex drawer-icon" v-if="typeof companyInfo !== 'undefined' ">
            <v-img
              :src="companyInfo.logo_url"
              alt="Company Logo"
              height="100px"
              width="100px"
              class="grey darken-4"
            ></v-img>
          </div>
        </v-col>

        <v-col cols="11" sm="11">
          <v-row class="d-none d-md-flex">
            <v-col class="d-flex flex-row">
              <div class="mr-10">
                <v-icon medium>mdi-phone</v-icon>
                <span class="text-lg-h6 text-caption">0175-7057579</span>
              </div>
              <div>
                <v-icon medium>mdi-email</v-icon>
                <span class="text-lg-h6 text-caption">example@gmail.com</span>
              </div>
            </v-col>

            <v-col class="d-flex justify-end">
              <div v-if="$auth.user" class="d-flex">
                <div class="text-center mr-auto">
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
                <div class="text-center mr-auto">
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
          </v-row>
          <v-row no-gutters justify="center">
            <v-col sm="3" class="d-none d-sm-flex"></v-col>
            <v-col sm="6">
              <div class="search">
                <Search />
              </div>
            </v-col>

            <v-col sm="3" class="d-none d-sm-flex"></v-col>
          </v-row>
        </v-col>
      </v-row>

      <template v-slot:extension v-show="!handleTabs">
        <v-tabs centered hide-slider>
          <v-tab v-if="$router.history.current.name != 'index' || innerHeight > 500">
            <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
              <template v-slot:activator="{ on , attrs }">
                <v-icon text v-bind="attrs" v-on="on">mdi-format-list-bulleted-square</v-icon>
              </template>
              <v-card min-height="300px" width="650px" style="overflow:auto" tile>
                <List class="d-none d-sm-flex" :collection="collection" />
                <!-- <small-list class="d-flex d-sm-none" :collection="collection"></small-list> innerHeight > 500-->
                <div class="d-flex d-sm-none">
                  <category-tree></category-tree>
                </div>
              </v-card>
            </v-menu>
          </v-tab>
          <v-tab nuxt to="/">Home</v-tab>

          <div class="demo d-flex">
            <v-tab class="d-none d-md-flex" nuxt to="/registration">Sign Up</v-tab>
            <v-tab class="d-none d-md-flex" nuxt to="/login">Login</v-tab>
            <v-tab class="d-none d-md-flex" nuxt to="/about">About Us</v-tab>
            <v-tab class="d-none d-md-flex" nuxt to="/contact">Contact Us</v-tab>
          </div>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    companyInfo: {
      type: Object,
    },
    window: {
      type: Object,
    },
    innerHeight: {
      type: Number,
    },
  },
  components: {
    Search: () => import("@/components/Search"),
    CategoryTree: () => import("~/components/CategoryTree"),
    List: () => import("~/components/List.vue"),
    SmallList: () => import("~/components/SmallList.vue"),
  },
  data: () => ({
    showCategory: true,
    sidebar: false,
    showTabs: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    menuItems: [
      { title: "Home", path: "/home", icon: "home" },
      { title: "Sign Up", path: "/signup", icon: "face" },
      { title: "Sign In", path: "/signin", icon: "lock-open" },
    ],
    collection: [
      {
        id: 1,
        label: "Electronics",
        open: false,
        children: [
          {
            id: 2,
            label: "Mobile",
            open: false,
            children: [
              {
                id: 3,
                label: "Samsung",
                open: false,
              },
              {
                id: 4,
                label: "Xiomi",
                open: false,
              },
            ],
          },
        ],
      },
      {
        id: 5,
        label: "Cloth",
        open: false,
        children: [
          {
            id: 6,
            label: "Men",
            open: false,
            children: [
              {
                id: 7,
                label: "Pant",
                open: false,
              },
              {
                id: 8,
                label: "Shirt",
                open: false,
              },
              {
                id: 9,
                label: "Jangiya",
                open: false,
              },
              {
                id: 10,
                label: "Shirt",
                open: false,
              },
            ],
          },
          {
            id: 9,
            label: "Women",
            open: false,
            children: [
              {
                id: 10,
                label: "Shari",
                open: false,
              },
              {
                id: 11,
                label: "Kamiz",
                open: false,
              },
            ],
          },
        ],
      },
    ],
  }),
};
</script>

<style >
.search {
  max-width: 700px;
}
@media only screen and (max-width: 600px) {
  /* .v-toolbar__extension {
            display: none;
          }
          .v-toolbar {
            height: 100px !important;
          } */
  .v-main {
    padding-top: 150px !important;
  }
  .search {
    width: 90%;
    margin-left: 20px;
  }
}
@media only screen and (max-width: 360px) {
  .search {
    width: 255px;
    margin-left: 20px;
  }
}
</style>