<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-06 14:13:12
 * @LastEditTime: 2021-07-06 17:11:18
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="photo-ctx">
    <div class="title">
      <div class="right-tag" v-if="photos.length" @click="toPreview">
        全部({{ photos.length }})
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="ctx">
      <div class="photo">
        <div v-for="item in photos" :key="item" @click="onPreview(item)" >
          <img :src="item" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ImagePreview } from 'vant'
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "movies-photo",
  props: {
    photos: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    function onPreview(url: string) {
      ImagePreview({
        images: [url],
        showIndex: true,
      })
    }
    function toPreview() {
      store.commit('app/getPhotos', props.photos);
      router.push('/preview')
    }

    return {
      onPreview,
      toPreview,
    }
  }
});
</script>

<style lang="less" scoped>
.photo-ctx {
  background: #fff;
  margin-top: 10px;
  margin-bottom: 50px;
  .title {
    padding: 15px;
    &::before {
      content: "剧照";
      font-size: 16px;
    }
    .right-tag {
      float: right;
      font-size: 13px;
      color: #797d82;
    }
  }
  .ctx {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 15px;
    .photo {
      display: inline-flex;
      align-items: center;
      padding-left: 15px;
      div {
        width: 150px;
        height: 100px;
        overflow: hidden;
        margin-right: 10px;
        display: flex;
        align-items: center;
        position: relative;
        img {
          width: 100%;
          position: absolute;
        }
      }
    }
  }
}
</style>
