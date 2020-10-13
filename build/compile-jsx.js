const path = require('path')
const babel = require('@babel/core')
const fs = require('fs-extra')
const es = path.resolve(__dirname, '../es')

const options = {
  plugins: []
}

module.exports = async (dir, name) => {
  await compileDir(dir, name)
}

async function compileDir (dir, relativePath) {
  const res = await fs.readdir(dir)
  for (const name of res) {
    const file = path.join(dir, name)
    const stat = await fs.stat(file)
    if (stat.isDirectory()) {
      await compileDir(file, `${relativePath}/${name}`)
    } else if (/\.js/.test(name)) {
      await doBabel(file, relativePath, name)
    }
  }
}

function doBabel (file, relativePath, name) {
  // if (cjs) {
  //   options.plugins.push('@babel/plugin-transform-modules-commonjs')
  // }
  return new Promise((resolve, reject) => {
    babel.transformFile(file, options, async (err, { code }) => {
      if (err) {
        throw err
      }
      // 递归处理文件
      await fs.outputFile(path.resolve(es, relativePath, name.replace(path.extname(name), '.js')), code)
      resolve()
    })
  })
}
