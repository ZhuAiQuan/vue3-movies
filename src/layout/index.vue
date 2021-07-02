<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:04:13
 * @LastEditTime: 2021-07-01 09:40:51
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="container">
    <router-view></router-view>
  </div>
  <van-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VanFooter from './footer/index.vue'

export default defineComponent({
  name: '',
  setup() {
    return {}
  },
  components: {
    VanFooter
  }
})
</script>

<style lang="less" scoped>

</style>

