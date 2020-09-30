import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'tcon/dist/layout.css'
import 'tcon/dist/text.css'
import 'tcon/dist/size.css'
import 'tcon/dist/color.css'
import './vant.css'

const app = createApp(App)

app.use(router).mount('#app')
