<template>
  <layout title="ColorBlock 色块">
    <p class="c-999">普通示例</p>
    <xm-color-block :blocks="data1" />
  </layout>
</template>

<script>
import Layout from '../Layout'

export default {
  components: {
    Layout
  },

  data () {
    return {
      data1: [
        {
          label: '示例色块1',
          num: '100,000',
          unit: '万元',
          bg: '#ff4d00',
          reverse: true,
          icon: 'http://file.iming.work/f50505d02fab39a2465a.png'
        },
        {
          label: '示例色块2',
          num: '200',
          unit: '家',
          bg: '#66cc32'
        }
      ]
    }
  }
}
</script>
