<template>
  <div class="sfc">
    hello, {{ msg }}
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      msg: ref('world')
    }
  }
}
</script>

<style lang="less">
.sfc {
  color: green;
}
</style>
