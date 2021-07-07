<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 09:34:04
 * @LastEditTime: 2021-07-07 11:07:55
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="message-title"></div>
  <div v-for="item in content.list" :key="`${item.id}-${item.url}-${item.src}`" @click="toDetail(item)" class="message-content">
    <img :src="item.src" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import useData from './request'
import type { MessageInfo } from './request'

export default defineComponent({
  name: 'message',
  setup() {
    const { content } = useData();
    const router = useRouter();
    
    function toDetail(item: MessageInfo) {
      if (item.id) {
        router.push(`/movies/${item.id}`)
      } else if (item.url) {
        window.open(item.url)
      }
    };

    return {
      content,
      toDetail
    }
  },
})
</script>

<style lang="less" scoped>
.message-content {
  width: 100%;
  margin-bottom: 3px;
  img {
    width: 100%;
  }
}
.message-title {
  padding: 7px;
  height: 30px;
  line-height: 30px;
  background: #fff;
  margin-bottom: 8px;
  position: sticky;
  top: 0;
  &::before {
    content: '电影资讯';
    color: #191a1b;
    font-size: 16px;
  }
}
</style>
