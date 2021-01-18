import { createRouter, createWebHashHistory } from 'vue-router'
import { catelogs } from '@/doc.config'

const routes = [
  {
    path: '/',
    component: () => import('./Home.vue')
  }
]

catelogs.forEach(it => {
  it.items.forEach(cate => {
    if (!cate.md) {
      routes.push({
        path: '/' + cate.path,
        component: () => import(`./demo/${cate.path}.vue`)
      })
    }
  })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
