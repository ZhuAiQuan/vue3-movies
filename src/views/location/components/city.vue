<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 16:06:19
 * @LastEditTime: 2021-07-13 16:32:46
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="city-name" @click="onSelect">
    {{ data.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Geo } from '@/types'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'city-tag',
  setup(props) {
    const router = useRouter();
    const store = useStore();

    function onSelect() {
      store.commit("app/getGeoData", props.data);
      router.go(-1)
    }

    return {
      onSelect,
    }
  },
  props: {
    data: {
      type: Object as PropType<Geo>,
      default: () => ({
        cityId: 0,
        isHot: 0,
        name: '',
        pinyin: ''
      })
    }
  }
})
</script>

<style lang="less" scoped>
.city-name {
  width: 100px;
  margin: 0 7.5px;
  line-height: 30px;
  background: #f4f4f4;
  color: #191a1b;
  border-radius: 3px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
