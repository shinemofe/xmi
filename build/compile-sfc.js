const fs = require('fs-extra')
const hash = require('hash-sum')
const { parse, compileTemplate } = require('@vue/compiler-sfc')
const EXPORT = 'export default {'
const RENDER = 'export function render'
const VUE_RENDER = '__vue_render'

async function doParse (file, name) {
  const source = await fs.readFile(file, 'utf8')
  const { descriptor, errors } = parse(source, { filename: name, sourceMap: false })

  if (errors && errors.length) {
    // message, loc: { start: line, column, offset }
  }

  const hasScoped = descriptor.styles.some((s) => s.scoped)
  let scopedId = hasScoped ? `data-v-${hash(source)}` : undefined
  const template = compileTemplate({
    id: scopedId,
    source: descriptor.template.content,
    filename: name
  })

  let script = `${template.code.replace(RENDER, `function ${VUE_RENDER}`)}\n${EXPORT}\n  render: ${VUE_RENDER},`
  if (hasScoped) {
    script = script.replace(EXPORT, `${EXPORT}\n  __scopeId: ${scopedId ? `'${scopedId}'` : undefined},`)
  }

  script = descriptor.script.content.replace(EXPORT, script)
  // await fs.outputFile(
  //   file.replace(path.extname(name), '.js'),
  //   script
  // )
  return {
    script,
    less: descriptor.styles.map(x => x.content).join('\n')
  }
}

module.exports = {
  doParse
}
