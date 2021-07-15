<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-15 11:25:32
 * @LastEditTime: 2021-07-15 15:07:19
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <van-tabs v-model:active="active" @click="onCheck" swipeable animated sticky offset-top="121px">
    <van-tab :title="item.title" :name="item.key" v-for="item in tabs" :key="item.key">
      <SchedulesItemVue v-for="row in schedules" :key="row.scheduleId" :schedules="row" />
    </van-tab>
  </van-tabs>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from 'vue';
import type { SchedulesTabs, Schedules } from "@/types";
import SchedulesItemVue from './schedulesItem.vue';

export default defineComponent({
  name: 'schedules',
  setup(props, ctx) {
    const active = ref(0);

    function onCheck(key: number) {
      ctx.emit('getShowData', key)
    };

    watch(() => props.tabs, (data) => {
      if (data.length) {
        nextTick(() => {
          active.value = props.tabs[0].key
        })
      }
    }, {
      immediate: true
    })

    return {
      active,
      onCheck,
    }
  },
  props: {
    tabs: {
      type: Array as PropType<SchedulesTabs[]>,
      default: () => []
    },
    schedules: {
      type: Array as PropType<Schedules[]>,
      default: () => []
    },
  },
  components: {
    SchedulesItemVue
  }
})
</script>

<style lang="less" scoped>
// ::v-deep(.van-tabs) {
//   position: sticky;
//   top: 121px;
// }
</style>
