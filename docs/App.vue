<template>
  <div class="van-doc-header">
    <div class="van-doc-row">
      <div class="van-doc-header__top">
        <a class="van-doc-header__logo">
          <img :src="info.logo">
          <span>{{ info.title }}</span>
        </a>
        <ul class="van-doc-header__top-nav">
          <li class="van-doc-header__top-nav-item">
            <a target="_blank" href="https://github.com/shinemofe/xmmp-ui" class="van-doc-header__logo-link">
              <img src="https://b.yzcdn.cn/vant/logo/github.svg">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="van-doc-nav" style="top: 60px; bottom: 0px;">
    <div
      v-for="(item, i) in catelogs"
      :key="i"
      class="van-doc-nav__group"
    >
      <div class="van-doc-nav__title">{{ item.title }}</div>
      <div
        v-for="(child, j) in item.items"
        :key="j"
        class="van-doc-nav__item"
      >
        <a
          :href="`#/${child.path}`"
          :class="{
            active: $route.path === `/${child.path}`
          }"
        >
          {{ child.title }}
          <span></span>
        </a>
      </div>
    </div>
  </div>

  <div class="van-doc-container van-doc-container--with-simulator">
    <div class="van-doc-content">
      <router-view/>
    </div>
  </div>

  <div class="van-doc-simulator">
    <iframe
      :ref="(val) => iframe = val"
      src="/demo.html"
      class="height-100"
      frameborder="0"
      @load="doRouterSync"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import router from './router'
import { catelogs, info } from './doc.config'

export default {
  setup () {
    const iframe = ref(null)

    // 通知 demo 路由到同样的路由
    const doRouterSync = () => {
      const _w = (path) => {
        const isFixedMd = catelogs[0].items.map(x => `/${x.path}`).includes(path)
        const { demoRouter } = iframe.value.contentWindow
        if (!demoRouter) {
          return
        }
        if (isFixedMd) {
          if (demoRouter.currentRoute.value.path !== '/') {
            demoRouter.push('/')
          }
        } else {
          demoRouter.push(path)
        }
      }
      router.beforeEach((to, from, next) => {
        _w(to.path)
        next()
      })
      _w(router.currentRoute.value.path)
    }

    return {
      catelogs,
      info,
      iframe,
      isIndex: computed(() => router.currentRoute.value.name === 'Home'),
      doRouterSync
    }
  }
}
</script>

<style lang="less">
.xmi-doc {
}
</style>
