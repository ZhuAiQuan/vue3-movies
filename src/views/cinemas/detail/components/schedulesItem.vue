<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-15 13:49:59
 * @LastEditTime: 2021-07-15 14:37:22
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="schedules-item van-hairline--bottom">
    <div class="left">
      <div>
        {{ timeStramp(schedules.showAt) }}
      </div>
      <div class="end-at bottom-size">
        {{ timeStramp(schedules.endAt) }}
      </div>
    </div>
    <div class="middle">
      <div>
        {{ schedules.filmLanguage }}
      </div>
      <div class="bottom-size">
        {{ schedules.hallName }}
      </div>
    </div>
    <div class="right">
      <div class="price">
        {{ schedules.salePrice/100 }}
      </div>
      <div class="buy">
        购票
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import type { Schedules } from "@/types";

export default defineComponent({
  name: 'SchedulesItem',
  setup() {
    const timeStramp = computed(() => {
      return (timestamp: number) => {
        const time = new Date(timestamp * 1000);
        const m = time.getMinutes() > 9 ? `${time.getMinutes()}` : `0${time.getMinutes()}`;
        const h = time.getHours() > 9 ? `${time.getHours()}` : `0${time.getHours()}`;
        return `${h}:${m}`
      }
    })
    return {
      timeStramp
    }
  },
  props: {
    schedules: {
      type: Object as PropType<Schedules>,
      default: () => {}
    }
  }
})
</script>

<style lang="less" scoped>
.schedules-item {
  width: calc(100% - 30px);
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  font-size: 15px;
  color: #191a1b;
  align-items: center;
  .left {
    width: 84px;
    .end-at {
      &::after {
        content: '散场';
      }
    }
  }
  .middle {
    width: calc(100% - 210px);
  }
  .right {
    width: 126px;
    display: flex;
    align-items: center;
    color: #ff5f16;
    .price {
      padding-right: 20px;
      &::before {
        content: '￥';
        font-size: 10px;
      }
    }
    .buy {
      // padding: ;
      border: 1px solid #ff5f16;
      border-radius: 3px;
      line-height: 25px;
      min-width: 50px;
      text-align: center;
    }
  }
  .bottom-size {
    font-size: 13px;
    color: #797d82;
    margin-top: 3px;
  }
}
</style>
