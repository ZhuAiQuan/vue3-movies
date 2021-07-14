<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 16:46:27
 * @LastEditTime: 2021-07-13 17:20:01
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <van-index-anchor :index="anchor" class="anchor-title">{{ anchor }}</van-index-anchor>
  <CityCell :cities="cities" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Geo } from '@/types'
import CityCell from './search.vue';

export default defineComponent({
  name: 'index-bar-item',
  setup() {
    return {
    }
  },
  props: {
    anchor: {
      type: String,
      default: 'A'
    },
    cities: {
      type: Array as PropType<Geo[]>,
      default: () => ([])
    }
  },
  components: {
    CityCell
  }
})
</script>

<style lang="less" scoped>
.anchor-title {
  background: #f4f4f4
}
</style>
