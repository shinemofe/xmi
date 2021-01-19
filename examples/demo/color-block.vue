<template>
  <layout title="ColorBlock 色块">
    <p class="c-999">普通示例</p>
    <xm-color-block :blocks="data1" />
    <p class="c-999">固定宽度</p>
    <xm-color-block :blocks="data2" />
    <p class="c-999">带icon</p>
    <xm-color-block :blocks="data3" />
    <p class="c-999">文本与数字位置对调</p>
    <xm-color-block :blocks="data4" />
  </layout>
</template>

<script>
import Layout from '../Layout'
import XmColorBlock from '../../src/color-block'

export default {
  components: {
    Layout,
    XmColorBlock
  },

  data () {
    return {
      data1: [
        {
          label: '示例色块1',
          value: '100,000',
          unit: '万元',
          bg: '#ff4d00'
        },
        {
          label: '示例色块2',
          value: '200',
          unit: '家',
          bg: '#66cc32'
        }
      ],
      data2: [
        {
          label: '示例色块1',
          value: '100,000',
          unit: '万元',
          bg: '#ff4d00',
          width: 160
        },
        {
          label: '示例色块2',
          value: '200',
          unit: '家',
          bg: '#66cc32',
          width: 160
        },
        {
          label: '示例色块3',
          value: '200',
          unit: '家',
          bg: '#5A9CE5'
        }
      ],
      data3: [
        {
          label: '示例色块1',
          value: '100,000',
          unit: '万元',
          bg: '#ff4d00',
          icon: 'http://file.iming.work/f50505d02fab39a2465a.png'
        },
        {
          label: '示例色块2',
          value: '200',
          unit: '家',
          bg: '#66cc32',
          icon: 'http://file.iming.work/f50505d02fab39a2465a.png'
        }
      ],
      data4: [
        {
          label: '示例色块1',
          value: '100,000',
          unit: '万元',
          bg: '#ff4d00',
          reverse: true
        },
        {
          label: '示例色块2',
          value: '200',
          unit: '家',
          bg: '#66cc32',
          reverse: true
        }
      ]
    }
  }
}
</script>
