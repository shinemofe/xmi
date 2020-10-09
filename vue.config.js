const path = require('path')

module.exports = {
  publicPath: './',

  pages: {
    index: {
      entry: 'docs/main.js',
      outputDir: 'docs/dist/',
      template: 'docs/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    demo: {
      entry: 'examples/main.js',
      outputDir: 'examples/dist/',
      template: 'examples/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'demo']
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'text-color': 'red',
          // 'border-color': 'blue'
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.resolve(__dirname, 'xmi.theme.vant.less')}";`
        }
      }
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', `${__dirname}/docs`)
      .set('@@', `${__dirname}/packages`)
      .end()

    config.module.rules.delete('eslint')

    config.module
      .rule('eslint')
      .test(/\.(vue|(j|t)sx?)$/)
      .pre()
      .enforce('pre')
      .exclude
      .add(/node_modules/)
      .add(/docs/)
      .add(/examples/)
      .add(/vant-vue3-es/)
      .add(/\.md/)
      .end()
      .use('eslint')
      .loader('eslint-loader')
      .options({
        extensions: [
          '.js',
          '.jsx',
          '.vue',
          '.ts',
          '.tsx'
        ]
      })

    config.module.rule('md')
      .test(/\.md$/)
      .use('vue-loader-v16')
      .loader('vue-loader-v16')
      .end()
      .use('@vant/markdown-loader')
      .loader('@vant/markdown-loader')
      .end()
  }
}
