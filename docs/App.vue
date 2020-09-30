<template>
  <div class="van-doc-header">
    <div class="van-doc-row">
      <div class="van-doc-header__top">
        <a class="van-doc-header__logo">
          <img src="http://file.iming.work/32e0f78e1da19b305b8c.png">
          <span>Xmi</span>
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
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import router from './router'
import { catelogs } from './doc.config'

export default {
  setup () {
    onBeforeMount(() => {
      // console.log(router.currentRoute.value)
    })
    return {
      catelogs,
      isIndex: computed(() => router.currentRoute.value.name === 'Home')
    }
  }
}
</script>

<style lang="less">
.xmi-doc {
}
</style>
