<template>
  <div class="demo-nav" style="">
    <div class="demo-nav__title">{{ title }}</div>
    <svg @click="handleBack" viewBox="0 0 1000 1000" class="demo-nav__back"><path fill="#969799" fill-rule="evenodd" d="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z"></path></svg>
  </div>
  <div class="pt20">
    <slot />
  </div>
</template>

<script>
import router from './router'

export default {
  props: {
    title: String
  },
  setup () {
    return {
      handleBack () {
        router.back()
        // 通知 docs 也返回
        window.top.docsRouter && window.top.docsRouter.back()
      }
    }
  }
}
</script>
