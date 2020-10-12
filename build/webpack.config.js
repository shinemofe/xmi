const path = require('path')
const lib = path.resolve(__dirname, '../lib')
const es = path.resolve(__dirname, '../es')
const jsPath = path.join(es, 'index.js')

module.exports = {
  entry: jsPath,
  output: {
    filename: 'index.js',
    path: lib,
    libraryTarget: 'commonjs2'
  }
}
