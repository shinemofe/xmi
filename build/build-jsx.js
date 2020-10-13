const compile = require('./compile-jsx')

module.exports = components => {
  console.log('  🔧 处理 babel...')
  return Promise.all(components.map(({ dir, name }) => compile(dir, name))).then(() => {
    console.log('  babel 处理完成')
  })
}
