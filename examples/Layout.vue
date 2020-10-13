<template>
  <div class="demo-nav" style="">
    <div class="demo-nav__title">{{ title }}</div>
    <svg @click="handleBack" viewBox="0 0 1000 1000" class="demo-nav__back"><path fill="#969799" fill-rule="evenodd" d="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z"></path></svg>
    <div v-if="isPc && dependClient" class="absolute r20 t20 cp" style="color: #3b8ff6" @click="showCode = true">扫码</div>
  </div>
  <div class="pt20">
    <slot />
  </div>
  <div v-if="showCode" class="fixed t0 l0 b0 r0 flex-center z9" style="background: rgba(0,0,0,.5)">
    <div class="tc">
      <p class="mb10 c-fff">部分功能依赖客户端容器<br>请扫码查看</p>
      <img v-if="codeUrl" :src="codeUrl" alt="">
      <div class="pt30" @click="showCode = false">
        <img class="cp" src="./assets/close.png" alt="" style="width:20px">
      </div>
    </div>
  </div>
</template>

<script>
import router from './router'
import QRCode from 'qrcode'
import { ref } from 'vue'

export default {
  props: {
    title: String,
    dependClient: Boolean
  },
  setup (props) {
    const isPc = !/hwminiapp/.test(navigator.userAgent)
    const showCode = ref(isPc && props.dependClient)
    const codeUrl = ref('')
    if (showCode.value) {
      QRCode.toDataURL(JSON.stringify({
        data: {
          url: location.href,
          appId: -10000
        },
        target: 'smallApp',
        isExperienceVersion: true
      }))
        .then(url => {
          codeUrl.value = url
        })
    }

    return {
      isPc,
      showCode,
      codeUrl,
      handleBack () {
        router.push('/')
        // 通知 docs 也返回
        window.top.docsRouter && window.top.docsRouter.push('/home')
      }
    }
  }
}
</script>
