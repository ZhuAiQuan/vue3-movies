<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:07:08
 * @LastEditTime: 2021-07-06 17:39:57
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <van-tabbar route>
    <van-tabbar-item :to="item.to" :icon="item.icon" v-for="item in router" :key="item.to">{{ item.name }}</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "van-footer",
  setup() {
    const router = [
      {
        to: '/home',
        icon: 'video-o',
        name: '电影'
      },
      {
        to: '/cinemas',
        icon: 'hotel-o',
        name: '影院'
      },
      {
        to: '/message',
        icon: 'comment-o',
        name: '资讯'
      },
      {
        to: '/mine',
        icon: 'manager-o',
        name: '我的'
      }
    ]
    return {
      router
    };
  },
});
</script>

<style lang="less" scoped>
</style>
