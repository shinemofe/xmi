const { getComponents, getFixed } = require('./utils')
const buildJs = require('./build-jsx')
const buildCss = require('./build-less')

const components = getComponents()
const args = process.argv
const dirs = args.slice(2)
const processComponents = []

if (dirs.length) {
  dirs.forEach(dir => {
    const item = components.find(x => dir === x.name)
    if (item) {
      processComponents.push(item)
    } else {
      console.log(`组件 ${dir} 不存在！`)
    }
  })
} else {
  Array.prototype.push.apply(processComponents, components)
}

if (processComponents.length) {
  console.log(`共 ${processComponents.length} 个组件待处理`)
  const jsArr = getFixed().concat(processComponents)

  Promise.all([buildJs(jsArr), buildCss(processComponents)]).then(() => {
    console.log('全部完成\n')
  })
}
