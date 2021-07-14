<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 17:14:24
 * @LastEditTime: 2021-07-14 09:14:11
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div>
    <van-cell :title="item.name" v-for="item in cities" :key="item.cityId" @click="onSelect(item)" />
    <van-empty description="没有找到匹配的城市" v-if="type === 'search' && !cities.length" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Geo } from '@/types';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'search-content',
  setup() {
    const store = useStore();
    const router = useRouter()

    function onSelect(item: Geo) {
      store.commit("app/getGeoData", item);
      router.go(-1)
    }
    
    return {
      onSelect
    }
  },
  props: {
    cities: {
      type: Array as PropType<Geo[]>,
      default: () => ([])
    },
    type: {
      type: String,
      default: 'normal'
    }
  }
})
</script>

<style lang="less" scoped>

</style>
