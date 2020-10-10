const path = require('path')
const { version } = require(path.resolve(__dirname, '../package.json'))
const fs = require('fs-extra')
const { getComponents, nameToCamel } = require('./utils')

const components = getComponents()
const es = path.resolve(__dirname, '../es')
const jsPath = path.join(es, 'index.js')
const lessPath = path.join(es, 'index.less')

const js = `import Vant from 'vant/es/index.js'
${components.map(({ name }) => `import ${nameToCamel(name)} from './${name}'`).join('\n')}

const componentArr = [${components.map(({ name }) => `${nameToCamel(name)}`).join(', ')}]

export default {
  version: '${version}',
  install: function (app, options) {
    app.use(Vant)
    componentArr.forEach(com => {
      app.component(com.name, com)
    })
  }
}
`

const css = components.map(({ name, style }) => {
  if (fs.pathExistsSync(style)) {
    return `@import "../packages/${name}/index.less";`
  }
}).filter(Boolean).join('\n')

fs.outputFileSync(jsPath, js)
fs.outputFileSync(lessPath, `@import "~vant/lib/index.less";\n${css}`)
console.log('生成入口文件')
