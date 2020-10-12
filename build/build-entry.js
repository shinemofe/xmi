const path = require('path')
const compileLess = require('./compile-less')
const es = path.resolve(__dirname, '../es')
const lib = path.resolve(__dirname, '../lib')
const lessPath = path.join(es, 'index.less')
const spawn = require('cross-spawn')
const { move } = require('fs-extra')

console.log('\n  构建入口 js...')
const stream = spawn('webpack', ['--mode', 'production'], { cwd: path.resolve(__dirname) })
stream.stdout.on('data', data => {
  process.stdout.write(data)
})
stream.stderr.on('data', data => {
  process.stderr.write(data)
})
stream.on('close', async (code) => {
  if (code === 0) {
    console.log('\n  构建入口 less...')
    await compileLess(lessPath, '')
    console.log('  📦 构建完成\n')
    // 移动 index.css 到 lib
    await move(path.join(es, 'index.css'), path.join(lib, 'index.css'), { overwrite: true })
    // 注入 tcon
  }
})


