const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Default',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */

  loading: { color: '#fff' },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: ['nuxt-purgecss', 'nuxt-svg-loader', '@nuxtjs/style-resources'],
  styleResources: {
    scss: ['./assets/css/main.scss']
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        'postcss-nested': false,
        'postcss-responsive-type': {},
        'postcss-hexrgba': {},
        'css-mqpacker': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        // autoprefixer: {
        //   grid: true
        // }
      }
    },

    extend(config, { isDev, isClient }) {
      // adding the new loader as the first in the list
      config.module.rules.unshift({
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            name: 'img/[hash:7]-[width].[ext]',
            min: 350,
            max: 2800,
            steps: 7,
            placeholder: false,
            quality: 85,
            adapter: require('responsive-loader/sharp')
          }
        }
      })
      // remove old pattern from the older loader
      config.module.rules.forEach(value => {
        if (String(value.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
          // reduce to svg and webp, as other images are handled above
          value.test = /\.(svg|webp)$/
          // keep the configuration from image-webpack-loader here unchanged
        }
      })
    }
  }
}
