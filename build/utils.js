const path = require('path')
const { catelogs } = require('../doc.config')
const pkgs = path.resolve(__dirname, '../src')

const utils = {
  upperFirst: str => str[0].toUpperCase() + str.substr(1),
  nameToCamel: name => name.split('-').map(utils.upperFirst).join(''),
  getComponents: () => {
    const components = []
    catelogs.forEach(group => {
      group.items.forEach(item => {
        if (!item.md && !item.vant) {
          const dir = path.join(pkgs, item.path)
          components.push({
            dir,
            file: path.join(dir, 'index.jsx'),
            style: path.join(dir, 'index.less'),
            name: item.path
          })
        }
      })
    })
    return components
  },
  getFixed: () => {
    return ['utils'].map(x => ({
      dir: path.join(pkgs, x),
      name: x
    }))
  }
}

module.exports = utils
