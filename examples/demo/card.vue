<template>
  <layout title="Card 卡片面板" depend-client>
    <p class="c-999 mb10">普通卡片</p>
    <xm-card :="data1">
      <p>hello xmmp !</p>
    </xm-card>
    <p class="c-999 mt20 mb10">带背景操作的卡片</p>
    <xm-card :="data2">
      <p>hello xmmp !</p>
    </xm-card>
    <p class="c-999 mt20 mb10">加载状态</p>
    <xm-card :="data3">
      <p>hello xmmp !</p>
    </xm-card>
  </layout>
</template>

<script>
import Layout from '../Layout'
import XmCard from '../../packages/card/index.jsx'

export default {
  components: {
    Layout,
    XmCard
  },

  data () {
    return {
      data1: {
        label: '卡片标题',
        item: {
          id: 1
        }
      },
      data2: {
        label: '卡片标题',
        bg: 'rgba(246,98,59,0.05)',
        footer: [
          {
            label: '操作1',
            icon: 'data:image/png;base64,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',
            color: '#F6633D',
            action: () => {
            }
          },
          {
            label: '操作2',
            icon: 'data:image/png;base64,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',
            color: '#3C8FF6',
            action: () => {
            }
          },
          {
            label: '操作3',
            icon: 'data:image/png;base64,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',
            color: '#3C8FF6',
            action: () => {
            }
          }
        ]
      },
      data3: {
        label: '卡片标题',
        item: {
          id: 1
        },
        loading: true
      }
    }
  }
}
</script>

<style lang="less" src="../../packages/card/index.less"></style>
