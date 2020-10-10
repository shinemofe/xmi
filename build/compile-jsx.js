const path = require('path')
const babel = require('@babel/core')
const fs = require('fs-extra')
const es = path.resolve(__dirname, '../es')

const options = {
  plugins: []
}

module.exports = async (file, name, cjs) => {
  if (cjs) {
    options.plugins.push('@babel/plugin-transform-modules-commonjs')
  }
  return new Promise((resolve, reject) => {
    babel.transformFile(file, options, (err, { code }) => {
      if (err) {
        throw err
      }
      fs.outputFileSync(path.resolve(es, name, 'index.js'), code)
      resolve()
    })
  })
}
