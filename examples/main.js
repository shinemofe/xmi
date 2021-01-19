import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './vant.copy.css'
import { tconModules } from '../doc.config'
tconModules.forEach(x => {
  require(`tcon/dist/${x}.css`)
})
import '../src/style/index.less'

const app = createApp(App)

app.use(router).mount('#app')

window.demoRouter = router
