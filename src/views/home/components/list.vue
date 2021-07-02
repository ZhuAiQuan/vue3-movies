<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-02 17:19:41
 * @LastEditTime: 2021-07-02 17:52:12
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
    ></van-list>
  </van-pull-refresh>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "movies-list",
  setup() {
    const state = reactive({
      refreshing: false,
      loading: false,
      finished: false,
    });

    function onRefresh() {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    }
    function onLoad() {}

    return {
      state,
      onRefresh,
      onLoad,
    };
  },
});
</script>

<style lang="less" scoped>
.content {
  ::v-deep(.van-pull-refresh) {
    height: 100%;
  }
}
</style>
