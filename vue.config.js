const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  chainWebpack: config => {
      config.module
        .rule('i18n-resource')
          .test(/\.(json5?|ya?ml)$/)
            .include.add(path.resolve(__dirname, './src/i18n/locales/**'))
            .end()
          .type('javascript/auto')
          .use('i18n-resource')
            .loader('@intlify/vue-i18n-loader')
      config.module
        .rule('i18n')
          .resourceQuery(/blockType=i18n/)
          .type('javascript/auto')
          .use('i18n')
            .loader('@intlify/vue-i18n-loader')
  }
})
