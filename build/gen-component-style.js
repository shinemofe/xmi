const path = require('path')
const { pathExistsSync, outputFileSync } = require('fs-extra')
const dependencyTree = require('dependency-tree')
const pkg = path.resolve(__dirname, '../packages')
const es = path.resolve(__dirname, '../es')

function getDepName (obj, res = []) {
  Object.keys(obj).forEach(p => {
    res.push(p)
    getDepName(obj[p], res)
  })
}

function dependency (file) {
  const tree = dependencyTree({
    filename: file,
    directory: pkg,
    filter: path => path.indexOf('node_modules') === -1
  })

  const res = []
  getDepName(tree, res)
  return res.map(x => x.replace(pkg, '').substr(1).split('/')[0])
}

module.exports = ({ file, name }) => {
  const deps = dependency(file)
  const content = deps.map(component => {
    if (pathExistsSync(path.join(es, component, 'index.css'))) {
      return `require('${component === name ? '../index.css' : `../../${component}/index.css`}')`
    }
  }).filter(Boolean).join('\n')
  outputFileSync(path.join(es, name, 'style/index.js'), content)
}
