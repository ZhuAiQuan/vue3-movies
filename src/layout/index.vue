<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:04:13
 * @LastEditTime: 2021-07-13 15:24:14
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="container">
    <transition name="van-fade">
      <router-view></router-view>
    </transition>
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

