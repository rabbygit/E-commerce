import colors from 'vuetify/es5/util/colors'

export default {
  // loading: '~/components/loading.vue',
  server: {
    // port: 3000, // default: 3000
    // host: '0.0.0.0'
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
    { src: "~/plugins/zoom.js", ssr: false }
  ],

  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  router: {
    middleware: ['auth']
  },

  axios: {
    // baseURL: "http://localhost:8080/",
    // baseURL: "http://tango99.herokuapp.com/",
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8',
    //   "Access-Control-Allow-Origin": "*",
    // }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            // url: 'api/auth/login',
            url: "https://tango99.herokuapp.com/user/token/",
            method: 'post',
            propertyName: 'data.access',
            altProperty: 'data.refresh'
          },
          user: {
            // url: 'api/auth/user',
            url: "https://tango99.herokuapp.com/user/user_credential/",
            method: 'get',
            propertyName: 'user',
          },
          logout: false,
        },
        tokenType: 'Bearer',
      },
      // guest: {
      //   endpoints: {
      //     login: {
      //       url: '/api/auth/guest/login',
      //       method: 'post',
      //       propertyName: 'token',
      //     },
      //     user:{
      //       url: 'api/auth/guest/user',
      //       method: 'get',
      //       propertyName: 'user',
      //     },
      //     logout: {
      //       url: 'api/auth/logout',
      //       method: 'post'
      //     },
      //   }
      // },
      google: {
        client_id: '404789237495-41is194c7nomhmb2nf04lmpnhgq48pol.apps.googleusercontent.com',
        redirect_uri: "http://localhost:3000/login",
        token_type: 'Bearer',
      },
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
}
