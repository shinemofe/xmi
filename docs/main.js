import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './vant.copy.css'
import { tconModules } from './doc.config'
tconModules.forEach(x => {
  require(`tcon/dist/${x}.css`)
})

const app = createApp(App)

app.use(router).mount('#app')

// 用于与示例页面路由通信
window.docsRouter = router
