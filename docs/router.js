import { createRouter, createWebHashHistory } from 'vue-router'
import { catelogs } from '../doc.config'

const routes = [
  {
    path: '/',
    redirect: '/home'
  }
]

catelogs.forEach(it => {
  it.items.forEach(cate => {
    routes.push({
      path: '/' + cate.path,
      component: cate.md
        ? () => import(`@/markdown/${cate.path}.md`)
        : () => import(`@@/${cate.path}/README.md`)
    })
  })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
