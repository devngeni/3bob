export default {
  head: {
    title: '3BOB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `Africa's most powerful web3 and defi tech stack powered by 
        solana blockchain integrating on/off exchange ramp with mobile mobile networks (mPesa, Airtel, MTN & etc) via compability for both USSD, SMS and Web methods. Fully operateable wallets for exchanging,
         buy, sell, trade, lend, borrow and exchange all without internet connection`
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css'
      }
    ],
    script: [
      {src: '/vendor/jquery/jquery.min.js'}, 
      {src: '/vendor/bootstrap/js/bootstrap.bundle.min.js'}, 
      {src: '/vendor/waves/waves.min.js'},
      {src: '/vendor/toastr/toastr.min.js'},
      {src: '/vendor/toastr/toastr-init.js'},
      {src: '/vendor/apexchart/apexcharts.min.js'},
      {src: '/js/plugins.js'},
      {src: '/modernizr.js'},
      {src: '/js/main.js'},
      {src: '/client/vendor/jquery.easing/jquery.easing.min.js'},
      {src: '/client/vendor/isotope-layout/isotope.pkgd.min.js'},
      {src: '/client/vendor/owl.carousel/owl.carousel.min.js'},
      {src: '/client/vendor/venobox/venobox.min.js'},
      {src: '/client/vendor/aos/aos.js'},
    ]
  },
  css: [
    './assets/client/vendor/icofont/icofont.min.css',
    './assets/client/vendor/boxicons/css/boxicons.min.css',
    './assets/client/vendor/owl.carousel/assets/owl.carousel.min.css',
    './assets/client/vendor/venobox/venobox.css',
    './assets/client/vendor/venobox/venobox.css',
    './assets/client/vendor/aos/aos.css',
    './assets/client/css/style.css',
    './assets/vendor/waves/waves.min.css',
    './assets/vendor/toastr/toastr.min.css',
    './assets/css/style.css'
  ],

  plugins: ["./plugins/filters.js"],
  loading: "~/components/loading.vue",
  components: true,

  buildModules: [
  ],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    "@nuxtjs/auth",
    "@nuxtjs/toast"
  ],

  toast: {
    position: "top-right",
    duration: 5000
  },
  axios: {
    baseURL: "http://localhost:4000/api/"
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/users/signin",
            method: "post",
            propertyName: "token"
          },
          logout: {
            url: "/users/signout",
            method: "post"
          },
          user: {
            url: "/users/currentuser",
            method: "get",
            propertyName: "user"
          }
        },
        tokenType: "Bearer"
      }
    }
  },

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  build: {
    babel: {
      compact: true
    }
  }
}
