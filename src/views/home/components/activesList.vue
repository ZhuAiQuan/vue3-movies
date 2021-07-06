<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-06 13:33:18
 * @LastEditTime: 2021-07-06 16:27:48
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="actors-ctx">
    <div class="title"></div>
    <div class="actors-body">
      <div class="actors-info">
        <div v-for="item in actors" :key="item.avatarAddress">
          <img :src="item.avatarAddress" alt="" />
          <div class="text _top">
            {{ item.name }}
          </div>
          <div class="text">
            {{ item.role || item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Actors } from "../../../types";

export default defineComponent({
  name: "actors-list",
  setup() {
    return {};
  },
  props: {
    actors: {
      type: Array as PropType<Actors[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.actors-ctx {
  background: #fff;
  .title {
    padding: 15px;
    &::after {
      content: "演职人员";
      font-size: 16px;
    }
  }
  .actors-body {
    width: 100%;
    overflow-x: auto;
    .actors-info {
      display: inline-flex;
      padding: 0 0 10px 15px;
      width: auto;
      overflow-x: auto;
      align-items: center;
      scrollbar-width: none;
      -ms-overflow-style: none;
      & > div {
        margin-right: 10px;
        width: 85px;
        min-height: 100px;
        img {
          width: 100%;
        }
        .text {
          text-align: center;
          font-size: 10px;
          color: #797d82;
        }
        ._top {
          color: #191a1b;
          font-size: 12px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
    }
  }
}
</style>
