/** @type {import("snowpack").SnowpackUserConfig } */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-webpack',
      {
        target: [
          'web',
          'es5'
        ],
        sourceMap: false,
        extendConfig: config => {
          config.plugins.push(new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: true
          }))

          return config
        }
      }
    ]
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    clean: true
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  }
}
