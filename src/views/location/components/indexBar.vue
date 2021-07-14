<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 16:47:35
 * @LastEditTime: 2021-07-13 17:06:06
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <van-index-bar :index-list="indexList">
    <IndexBarItem v-for="item in indexList" :key="item" :cities="getCity(item)" :anchor="item" />
  </van-index-bar>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import IndexBarItem from './indexBarItem.vue';
import type { Geo } from '@/types'

export default defineComponent({
  name: 'index-bar',
  setup(props) {
    const getCity = computed(() => {
      return (key: string) => {
        return props.cities.filter(item => key === item.pinyin[0].toLocaleUpperCase())
      } 
    })
    return {
      getCity
    }
  },
  props: {
    indexList: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    cities: {
      type: Array as PropType<Geo[]>,
      default: () => []
    }
  },
  components: {
    IndexBarItem
  }
})
</script>

<style lang="less" scoped>

</style>

