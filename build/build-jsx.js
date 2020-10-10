const compile = require('./compile-jsx')

module.exports = components => {
  console.log('  🔧 处理 babel...')
  return Promise.all(components.map(({ file, name }) => compile(file, name))).then(() => {
    console.log('  babel 处理完成')
  })
}
