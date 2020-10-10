const path = require('path')
const { catelogs } = require('../docs/doc.config')
const pkgs = path.resolve(__dirname, '../packages')

const utils = {
  upperFirst: str => str[0].toUpperCase() + str.substr(1),
  nameToCamel: name => name.split('-').map(utils.upperFirst).join(''),
  getComponents: () => {
    const components = []
    catelogs.forEach(group => {
      group.items.forEach(item => {
        if (!item.md && !item.vant) {
          components.push({
            file: path.resolve(pkgs, item.path, 'index.jsx'),
            style: path.resolve(pkgs, item.path, 'index.less'),
            name: item.path
          })
        }
      })
    })
    return components
  }
}

module.exports = utils
