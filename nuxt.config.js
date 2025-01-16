export default {
  // loading: "~/components/loading.vue",
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Responsive Bootstrap 5 Admin Dashboard"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  router: {
    prefetchLinks: false
  },

  pageTransition: 'page',
  layoutTransition:"slide",



  /*
   ** Global CSS
   */
  css: ["~/assets/scss/app.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    
    '~/plugins/i18n.js',
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vue-apexcharts.js",
    "~/plugins/vuelidate.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/vue-chartist.js",
    "~/plugins/vue-mask.js",
    '~/plugins/moment.js'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue', 'jsx'],
    }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
    '@nuxtjs/markdownit',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    "vue-toastification/nuxt" ,
    "nuxt-vue-multiselect"
  ],

  /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
  axios: {
    baseURL: process.env.API_AUTH_URL
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/clientConfig.js',
    },
  },
  


  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
          type: 'Bearer'
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: 'api/auth/local', method: 'post' },
          logout: false,
          user: { url: 'api/users/me?populate=role', method: 'get' }
        }
      }
    }
  },


  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},


  publicRuntimeConfig: {
    CMS_API_URL: process.env.CMS_API_URL,
  },
};
