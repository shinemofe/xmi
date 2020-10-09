import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'tcon/dist/size.css'
import './vant.copy.css'
import Xmi from '../packages/index'

const app = createApp(App)

app.use(router).use(Xmi).mount('#app')

window.demoRouter = router
