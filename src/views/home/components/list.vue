<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-02 17:19:41
 * @LastEditTime: 2021-07-05 17:08:55
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <MoviesList :list="list.data" :type="type" />
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { getMoviesData } from "../../../api/home";
import MoviesList from "./content.vue";
import type { MoviesData } from '../../../types'

interface List {
  current: number;
  total: number;
  data: MoviesData[];
}

export default defineComponent({
  name: "movies-list",
  setup(props) {
    const state = reactive({
      refreshing: false,
      loading: false,
      finished: false,
    });
    const list: List = reactive({
      data: [],
      current: 1,
      total: 0,
    });

    function onRefresh() {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    }
    function onLoad() {
      if (state.refreshing) {
        list.data = [];
        state.refreshing = false;
        list.current = 1;
      }
      getMoviesData(props.type, list.current).then((res) => {
        const data = res.data.data as { films: MoviesData[]; total: number };
        if (!res.data.status && data.films.length) {
          list.data.push(...data.films);
          state.loading = false;
          list.current++;
          if (list.data.length >= data.total) {
            state.finished = true;
          }
        } else {
          state.loading = false;
          state.finished = true;
        }
      });
    }

    watch(
      () => props.type,
      () => onRefresh()
    );

    return {
      state,
      list,
      onRefresh,
      onLoad,
    };
  },
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  components: {
    MoviesList,
  },
});
</script>

<style lang="less" scoped>
.content {
  ::v-deep(.van-pull-refresh) {
    // height: 100%;
  }
}
</style>
