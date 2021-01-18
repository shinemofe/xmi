const path = require('path')
const babel = require('@babel/core')
const fs = require('fs-extra')
const es = path.resolve(__dirname, '../es')

const options = {
  plugins: []
}

function doBabel (file, relativePath, name, isCode) {
  // if (cjs) {
  //   options.plugins.push('@babel/plugin-transform-modules-commonjs')
  // }

  return new Promise((resolve, reject) => {
    const cb = async (err, { code }) => {
      if (err) {
        throw err
      }
      // 递归处理文件
      await fs.outputFile(path.resolve(es, relativePath, name.replace(path.extname(name), '.js')), code)
      resolve()
    }
    isCode ? babel.transform(file, { filename: name }, cb) : babel.transformFile(file, options, cb)
  })
}

module.exports = {
  doBabel
}
