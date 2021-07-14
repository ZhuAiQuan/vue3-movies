<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 13:14:33
 * @LastEditTime: 2021-07-13 14:49:05
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="search-ctx">
    <van-search
      v-model="keywords"
      show-action
      placeholder="请输入搜索关键词"
      @cancel="onCancel"
      @blur="onSearch"
    />
    <van-divider :style="{ margin: '0', 'margin-bottom': '10px' }" />
    <div class="hot-words" v-if="!keywords">
      <div>离你最近</div>
      <div v-for="item in cinemas.recommend" :key="item.cinemaId" class="hot-word" @click="toDetail(item.cinemaId)">
        <span>{{ item.name }}</span>
      </div>
    </div>
    <CinemasList :cinemas="filterData" />
    <van-empty image="search" description="没有找到匹配的影院" v-show="!filterData.length && keywords">
      <div style="font-size: 11px;color: #bdc0c5;text-align: center;padding: 0 50px">提示：仅支持搜索“影院以及地址”，建议您检查输入的影院名称是否有误？</div>
    </van-empty>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, PropType, ref, watchEffect } from 'vue';
import type { CinemasInfo } from "@/types";
import useData from '../useData';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'search',
  setup(props, ctx) {
    const keywords = ref('');
    const router = useRouter();
    const filterData = ref<CinemasInfo[]>([]);
    const { cinemas, getRecommendCinemas } = useData();

    function onSearch() {
      if (keywords.value)
        filterData.value = props.cinemas.filter(item => item.name.includes(keywords.value) || item.address.includes(keywords.value))
    }
    function onCancel() {
      ctx.emit('onTaggleState')
    }
    function toDetail(id: number) {
      router.push(`/detail/${id}`);
    }

    onMounted(() => {
      getRecommendCinemas();
    })

    watchEffect(() => {
      if (!keywords.value) {
        filterData.value = []
      }
    })

    return {
      keywords,
      cinemas,
      filterData,
      onSearch,
      onCancel,
      toDetail,
    }
  },
  props: {
    cinemas: {
      type: Array as PropType<CinemasInfo[]>,
      default: () => [],
    },
  },
  components: {
    CinemasList: defineAsyncComponent(() => import('../list.vue'))
  }
})
</script>

<style lang="less" scoped>
.search-ctx {
  width: 100%;
  height: calc(100vh - 50px);
  background: #fff;
  .hot-words {
    padding: 8px 12px 10px;
    font-size: 13px;
    color: #bdc0c5;
    .hot-word {
      color: #000;
      span {
        display: inline-block;
        background: hsla(0,0%,95.7%,.6);
        padding: 8px 12px;
        border-radius: 3px;
        margin-top: 10px;
      }
    }
  }
}
</style>

