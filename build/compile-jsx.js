const path = require('path')
const babel = require('@babel/core')
const fs = require('fs-extra')
const es = path.resolve(__dirname, '../es')

const options = {
  babelrc: false,
  configFile: false,
  presets: [
    // '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        modules: false,
        debug: false,
        useBuiltIns: 'usage',
        // shippedProposals: true
        corejs: {
          version: '3.8',
          proposals: true
        }
      }
    ]
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      '@babel/plugin-transform-runtime',
      {
        'absoluteRuntime': false,
        'corejs': false,
        'helpers': true,
        'regenerator': true,
        'useESModules': false
      }
    ]
  ]
}

function doBabel (file, relativePath, name, isCode) {
  return new Promise((resolve, reject) => {
    const cb = async (err, res) => {
      if (err) {
        throw err
      }
      const { code } = res
      // 递归处理文件
      await fs.outputFile(path.resolve(es, relativePath, name.replace(path.extname(name), '.js')), code)
      resolve()
    }
    isCode ? babel.transform(file, { filename: name, ...options }, cb) : babel.transformFile(file, options, cb)
  })
}

module.exports = {
  doBabel
}
