export default {
  head: {
    title: '3BOB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
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
      {src: '/vendor/apexchart/apexchart-init.js'}
    ]
  },

 
  css: [
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
