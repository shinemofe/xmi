<template>
  <div class="demo-home__title">
    <img :src="info.logo" alt="">
    <span>{{info.title }}</span>
  </div>
  <h2 class="demo-home__desc">{{ info.desc }}</h2>
  <div
    v-for="(group, i) in list"
    :key="i"
    class="demo-home-nav"
  >
    <div class="demo-home-nav__title">{{ group.title }}</div>
    <div class="demo-home-nav__group">
      <a
        v-for="(item, j) in group.items"
        :key="j"
        class="demo-home-nav__block"
        :href="`#/${item.path}`"
        @click="handleTo(item)"
      >
        <span>{{ item.title }}</span>
        <svg viewBox="0 0 1024 1024" class="demo-home-nav__icon"><path fill="#B6C3D2" d="M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"></path><path fill="#B6C3D2" d="M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"></path></svg>
      </a>
    </div>
  </div>
</template>

<script>
import { catelogs, info } from '../doc.config'

export default {
  setup () {
    return {
      list: catelogs.slice(1),
      info,
      handleTo (item) {
        // 通知 docs 也跳转
        window.top.docsRouter && window.top.docsRouter.push(`/${item.path}`)
      }
    }
  }
}
</script>

<style lang="less">

</style>
