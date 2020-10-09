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
      v-show="vantPreviewUrl"
      :src="vantPreviewUrl"
      class="height-100"
      frameborder="0"
    />
    <div
      v-show="vantPreviewUrl"
      class="demo-nav"
    >
      <div class="demo-nav__title">{{ $route.path.substr(1) }}</div>
      <svg @click="handleBack" viewBox="0 0 1000 1000" class="demo-nav__back"><path fill="#969799" fill-rule="evenodd" d="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z"></path></svg>
    </div>
    <iframe
      v-show="!vantPreviewUrl"
      :ref="(val) => iframe = val"
      src="/demo.html#/"
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
    const vantPreviewUrl = computed(() => {
      const { path } = router.currentRoute.value
      const isVant = catelogs.some(x => {
        const it = x.items.find(y => y.path === path.substr(1))
        return it && it.vant
      })
      return isVant ? `https://youzan.github.io/vant/mobile.html#/zh-CN${path}` : ''
    })

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

    const handleBack = () => {
      const { demoRouter } = iframe.value.contentWindow
      if (demoRouter) {
        demoRouter.back()
      }
      router.push('/')
    }

    return {
      catelogs,
      info,
      iframe,
      doRouterSync,
      vantPreviewUrl,
      handleBack
    }
  }
}
</script>

<style lang="less">
.xmi-doc {
}
</style>
