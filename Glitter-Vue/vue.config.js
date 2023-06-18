const webpack = require('webpack');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          compilerOptions: {
            isCustomElement: true
          }
        }
      })
    ]
  }
})
