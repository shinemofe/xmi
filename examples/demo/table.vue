<template>
  <layout title="Table">
    <p class="c-999 mb10">默认表格</p>
    <xm-table :="data1" />
    <p class="c-999 mb10 mt20">显示序号</p>
    <xm-table :="data2" />
    <p class="c-999 mb10 mt20">显示操作 - 查看全部</p>
    <xm-table :="data3" />
    <p class="c-999 mb10 mt20">边框表格、自定义列宽</p>
    <xm-table :="data4" />
    <p class="c-999 mb10 mt20">自定义表头样式</p>
    <xm-table :="data5" />
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
      data1: {
        head: ['字段1', '字段2', '字段3', '字段4'],
        body: [
          ['值1', 12, 8, 9167],
          ['值2', 696, 6, 6900]
        ]
      },
      data2: {
        head: ['字段1', '字段2', '字段3', '字段4'],
        body: [
          ['值1', 12, 8, 9167],
          ['值2', 696, 6, 6900]
        ],
        showIndex: true
      },
      data3: {
        head: ['字段1', '字段2', '字段3', '字段4'],
        body: [
          ['值1', 12, 8, 9167],
          ['值2', 696, 6, 6900]
        ],
        showIndex: true,
        indexText: '自定义',
        size: 1
      },
      data4: {
        head: ['单位详细名称', '参保人数', '控股企业数', '控股企业总投资额'],
        body: [
          ['中东长春轨迹客车股份有限公司', 12853, 8, 91678.08],
          ['长春华翔轿车消声器有限责任公司', 696, 6, 69000]
        ],
        columnWidth: [30, 80, 80, 70, 70],
        showIndex: true,
        border: true
      },
      data5: {
        head: ['单位详细名称', '参保人数', '控股企业数', '控股企业总投资额'],
        body: [
          ['中东长春轨迹客车股份有限公司', 12853, 8, 91678.08],
          ['长春华翔轿车消声器有限责任公司', 696, 6, 69000]
        ],
        columnWidth: [30, 80, 80, 70, 70],
        showIndex: true,
        border: true,
        size: 1,
        headStyle: 'background:#3b8ff6;color:#fff;border-radius:25px 25px 0 0'
      }
    }
  }
}
</script>

<style lang="less" src="../../packages/table/index.less"></style>
