import Vant from 'vant'
import 'vant/lib/index.less'
import Button from './button'

export default {
  install: function (app, options) {
    app.use(Vant)
    app.component(Button.name, Button)
  }
}
