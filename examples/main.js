import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'tcon'
import './vant.copy.css'

const app = createApp(App)

app.use(router).mount('#app')

window.demoRouter = router
