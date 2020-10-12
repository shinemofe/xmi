const path = require('path')
const fs = require('fs-extra')
const { render, FileManager } = require('less')
const { readFileSync } = require('fs-extra')
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const CleanCss = require('clean-css')
const es = path.resolve(__dirname, '../es')

const cleanCss = new CleanCss()

// less plugin to resolve tilde
class TildeResolver extends FileManager {
  loadFile (filename, ...args) {
    filename = filename.replace('~', '')
    return FileManager.prototype.loadFile.apply(this, [filename, ...args])
  }
}

const TildeResolverPlugin = {
  install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver());
  }
}

module.exports = async function compile (filePath, name) {
  const options = {
    filename: filePath,
    plugins: [TildeResolverPlugin]
  }
  if (name === '') {
    // 处理入口 less
    options.modifyVars = {
      hack: `true; @import "${path.resolve(__dirname, '../xmi.theme.vant.less')}";`
    }
  }

  const source = readFileSync(filePath, 'utf-8')
  const { css } = await render(source, options)

  const config = await postcssrc({}, path.resolve(__dirname, './postcss.config.js'))
  const result = await postcss(config.plugins).process(css, {
    from: undefined
  })

  const { styles } = cleanCss.minify(result.css)
  await fs.outputFile(path.join(es, name, 'index.css'), styles)
}
