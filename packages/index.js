import Vant from 'vant'
import 'vant/lib/index.less'
import ColorBlock from './color-block'
import Table from './table'

const componentArr = [ColorBlock, Table]

export default {
  version: '0.1.0',
  install: function (app, options) {
    app.use(Vant)
    componentArr.forEach(com => {
      app.component(com.name, com)
    })
  }
}
