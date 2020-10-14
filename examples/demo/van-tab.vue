<template>
  <layout title="Tab">
    <p class="c-999 mb10">默认Tab</p>
    <van-tabs v-model:active="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </layout>
</template>

<script>
import Layout from '../Layout'
import VanTabs from 'vant/es/tabs'
import VanTab from 'vant/es/tab'
import 'vant/es/tabs/index.less'
import 'vant/es/tab/index.less'

export default {
  components: {
    Layout,
    VanTabs,
    VanTab
  },

  data () {
    return {
      active: 1
    }
  }
}
</script>

<style lang="less">
</style>
