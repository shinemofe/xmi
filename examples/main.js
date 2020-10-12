import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './vant.copy.css'
import Xmi from '../packages/index'
import { tconModules } from '../docs/doc.config'
tconModules.forEach(x => {
  require(`tcon/dist/${x}.css`)
})

const app = createApp(App)

app.use(router).use(Xmi).mount('#app')

window.demoRouter = router
