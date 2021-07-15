<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-15 10:53:47
 * @LastEditTime: 2021-07-15 14:40:57
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="film-title">
    <div class="title">
      {{ film.name }}
      <span>
        {{ film.grade }}
      </span>
    </div>
    <div class="descript">
      {{ film.category }} |
      <span class="runtime">
        {{ film.runtime }}
      </span>
      {{ film.director }}
      <span class="actors" v-for="item in film.actors" :key="item.avatarAddress">
        | {{ item.name }}
      </span>
    </div>
    <div class="right-icon" @click="$router.push(`/movies/${film.filmId}`)">
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { FilmInfo } from "@/types";

export default defineComponent({
  name: "film-title",
  setup() {
    return {};
  },
  props: {
    film: {
      type: Object as PropType<FilmInfo>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="less" scoped>
.film-title {
  padding: 15px 0;
  text-align: center;
  position: sticky;
  color: #797d82;
  font-size: 13px;
  top: 44px;
  background: #fff;
  z-index: 9;
  .title {
    font-size: 15px;
    color: #191a1b;
    span {
      padding-left: 5px;
      color: #ffb232;
      font-size: 16px;
      &::after {
        content: '分';
        font-size: 10px;
      }
    }
  }
  .descript {
    padding: 10px 45px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .runtime {
      padding-left: 2px;
      &::after {
        content: '分钟 |';
      }
    }
  }
  .right-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
