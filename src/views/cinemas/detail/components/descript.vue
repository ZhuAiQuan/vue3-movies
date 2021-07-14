<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-14 13:30:40
 * @LastEditTime: 2021-07-14 14:02:14
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <van-popup v-model:show="show" position="top" @close="closeModal">
    <div class="top">
      <van-icon name="cross" size="20px" @click="closeModal" />
    </div>
    <div class="title">
      {{ title }}
    </div>
    <div class="cinema-info">
      <div v-for="item in services" :key="item.name">
        <div class="desc-title">
          <span>
            {{ item.name }}
          </span>
        </div>
        <div class="desc">
          {{ item.description }}
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from "vue";
import type { Services } from "@/types";

export default defineComponent({
  name: "",
  setup(props, ctx) {
    const show = ref(false);

    function closeModal() {
      ctx.emit("update:visible", false);
    }

    watchEffect(() => {
      show.value = props.visible;
    });

    return {
      show,
      closeModal,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    services: {
      type: Array as PropType<Services[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.top {
  height: 44px;
  padding-left: 12px;
  line-height: 44px;
  width: calc(100% - 12px);
}
.title {
  text-align: center;
  line-height: 44px;
  height: 44px;
  font-size: 17px;
  color: #191a1b;
  padding: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cinema-info {
  padding: 0 30px;
  padding-bottom: 30px;
  & > div {
    margin-top: 20px;
    color: #797d82;
    position: relative;
    padding-left: 70px;
    .desc-title {
      font-size: 10px;
      color: #ffb232;
      position: absolute;
      left: 0;
      top: 0;
      span {
        padding: 0 6px;
        border-right: 1px solid;
        border-bottom: 1px solid;
      }
    }
    .desc {
      font-size: 12px;
      min-height: 20px;
    }
  }
}
</style>
