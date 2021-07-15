<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-14 14:13:52
 * @LastEditTime: 2021-07-15 14:47:05
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="banner">
    <div class="shadows" :style="{ backgroundImage: `url(${bg})` }"></div>
    <div
      class="banner-ctx"
      :style="{
        width: `${(films.length - 1) * 88 + 106}px`,
        transform: `translateX(${moveFilm.offsetX}px)`,
      }"
      @touchstart="onStart"
      @touchmove="onMove"
      @touchend="onEnd"
    >
      <div
        v-for="(item, i) in films"
        :key="item.filmId"
        class="banner-item"
        @click.stop="onChecked(i)"
        :class="{ 'banner-item-active': item.poster === bg }"
      >
        <img :src="item.poster" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, watch } from "vue";
import type { MoviesData } from "@/types";

export default defineComponent({
  name: "film-banner",
  setup(props, ctx) {
    const bg = computed(() => {
      if (props.films.length) return props.films[moveFilm.index].poster;
      else return "";
    });
    const moveFilm = reactive({
      left: 0,// 拖动开始坐标
      offsetX: 0,// 偏移量
      index: 0,// 点击图片的索引
      default: 0, // 默认偏移、最小偏移
      tempX: 0,// 拖动偏移长度
    });

    function onStart(e: any) {
      const touch: any = e.targetTouches[0];
      moveFilm.left = touch.pageX;
    }
    function onEnd() {
      const maxL = -((props.films.length - 1) * 88 - moveFilm.default);
      if (moveFilm.offsetX > moveFilm.default)
        moveFilm.offsetX = moveFilm.default;
      else if (moveFilm.offsetX < maxL) moveFilm.offsetX = maxL;
      const offset = moveFilm.default - moveFilm.offsetX - 53;
      onChecked(Math.round(offset / 88) + 1);
      moveFilm.tempX = moveFilm.offsetX;
    }
    function onMove(e: any) {
      const touch: any = e.targetTouches[0];
      const move = touch.pageX - moveFilm.left; // 移动宽度
      moveFilm.offsetX = moveFilm.tempX + move;
    }
    function onChecked(i: number) {
      moveFilm.offsetX = moveFilm.default - i * 88;
      moveFilm.tempX = moveFilm.offsetX;
      moveFilm.index = i;
      
    }

    onMounted(() => {
      const w = document.body.offsetWidth;
      moveFilm.offsetX = w / 2 - 45;
      moveFilm.default = moveFilm.offsetX;
      moveFilm.tempX = moveFilm.offsetX;
    });

    watch(() => moveFilm.index, (i: number) => {
      if (props.films.length) ctx.emit('onCheckFilm', props.films[i])
    }, {
      immediate: true
    })

    return {
      bg,
      moveFilm,
      onStart,
      onEnd,
      onChecked,
      onMove,
    };
  },
  props: {
    films: {
      type: Array as PropType<MoviesData[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.banner {
  padding: 15px 0;
  position: relative;
  overflow: hidden;
  .shadows {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    filter: blur(10px);
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    background-size: cover;
  }
  .banner-item {
    margin-right: 16px;
    width: 72px;
    height: 104px;
    transition: all 0.2s linear 0.2s;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .banner-ctx {
    width: auto;
    height: 160px;
    overflow-y: hidden;
    position: relative;
    z-index: 8;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    overflow-x: auto;
    transition: all 0.3s ease-out;
    .banner-item-active {
      width: 90px;
      height: 130px;
    }
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -7.5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 15px;
    height: 15px;
    z-index: 9;
    background: #fff;
  }
}
</style>
