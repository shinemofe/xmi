<template>
  <layout title="Button">
    <p class="c-999 mb10">默认按钮</p>
    <div class="demo__button">
      <van-button>定制按钮</van-button>
      <van-button type="primary">定制按钮</van-button>
    </div>
    <p class="c-999 mtb10">小按钮</p>
    <div class="demo__button">
      <van-button size="small">定制按钮</van-button>
      <van-button size="small" type="primary">定制按钮</van-button>
    </div>
    <p class="c-999 mtb10">大按钮</p>
    <div class="demo__button">
      <van-button type="primary" block>块级元素</van-button>
      <van-button size="large" type="primary" block>块级元素</van-button>
    </div>
  </layout>
</template>

<script>
import Layout from '../Layout'
import VanButton from 'vant/es/button'
import 'vant/es/button/index.less'

export default {
  components: {
    Layout,
    VanButton
  }
}
</script>

<style lang="less">
.demo__button {
  button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
