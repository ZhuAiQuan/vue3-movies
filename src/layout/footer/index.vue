<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:07:08
 * @LastEditTime: 2021-06-30 16:08:37
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "van-footer",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
</style>
