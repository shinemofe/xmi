<template>
  <layout title="SFC">
    <m-sfc />
  </layout>
</template>

<script>
import Layout from '../Layout'
import MSfc from '../../packages/sfc'

export default {
  name: 'demo-sfc',

  components: {
    Layout,
    MSfc
  },

  data () {
    return {}
  }
}
</script>
