import { createRouter, createWebHashHistory } from 'vue-router'
import MdRender from '../views/md-render.vue'
import { catelogs } from '../doc.config'

const routes = [
  {
    path: '/',
    name: 'md-content',
    component: MdRender
  }
]

catelogs.forEach(it => {
  it.items.forEach(cate => {
    routes.push({
      path: '/' + cate.path,
      component: () => import(`../markdown/${cate.path}.md`)
    })
  })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
