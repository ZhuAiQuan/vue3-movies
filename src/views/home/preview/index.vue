<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-06 16:39:42
 * @LastEditTime: 2021-07-07 09:14:05
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="title">
    <div class="back-icon" @click="$router.go(-1)">
      <van-icon name="arrow-left" size="24px" color="#333" />
    </div>
    剧照（{{ photos.length }}）
  </div>
  <div class="pic-content">
    <div v-for="(item, i) in photos" :key="item" @click="onPreview(i)">
      <img :src="item" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { ImagePreview } from 'vant'

export default defineComponent({
  name: 'preview-pic',
  setup() {
    const store = useStore();

    function onPreview(i: number | string | symbol) {
      if (typeof i === 'number' || typeof i === 'string')
        ImagePreview({
          images: store.state.app.photos,
          startPosition: +i,
          showIndicators: true
        })
    }

    return {
      photos: store.state.app.photos,
      onPreview,
    }
  },
})
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  padding: 7px;
  height: 30px;
  position: relative;
  background: #fff;
  line-height: 30px;
  .back-icon {
    position: absolute;
    left: 7px;
    top: 7px;
    width: 30px;
    height: 30px;
  }
}
.pic-content {
  display: flex;
  flex-wrap: wrap;
  div {
    width: 33%;
    height: calc(100vw / 3);
    padding-left: calc(1% / 3);
    padding-bottom: calc(1% / 3);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
