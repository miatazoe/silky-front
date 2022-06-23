const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    watch: true
  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8080,
    hot: true,
  },
})
