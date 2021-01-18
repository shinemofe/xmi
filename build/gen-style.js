// const { pathExistsSync } = require('fs-extra')
// const compile = require('./compile-less')
const genStyle = require('./gen-component-style')

module.exports = components => {
  console.log('  🔧 处理 style...')
  return Promise.all(components.map(async ({ style, name, file }) => {
    // if (pathExistsSync(style)) {
    //   await compile(style, name)
    // }
    genStyle({ file, name })
    console.log('  style 处理完成')
  }))
}
