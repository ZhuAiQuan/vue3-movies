<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:57:30
 * @LastEditTime: 2021-07-02 17:48:57
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="banner"></div>
  <div class="ctx">
    <van-tabs v-model:active="typeList.type" swipeable animated sticky>
      <van-tab v-for="item in typeList.list" :key="item.id" :name="item.id">
        <template #title> {{ item.name }} </template>
        <div class="content">
          <MoviesList :type="typeList.type" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import UseRequest from "./request";
import { Dialog } from "vant";
import MoviesList from './components/list.vue'

export default defineComponent({
  name: "home",
  setup() {
    const { useInfo } = UseRequest();
    const store = useStore();
    const typeList = reactive({
      list: [
        {
          id: 1,
          name: "正在热映",
        },
        {
          id: 2,
          name: "即将上映",
        },
      ],
      type: 1,
    });

    onMounted(() => {
      // getNowGeo()
    });
    watchEffect(() => {
      if (useInfo.cityId && store.state.app.geo.cityId !== useInfo.cityId) {
        Dialog.confirm({
          title: "提示",
          message: `您当前的定位在：${useInfo.name}，是否切换到定位城市？`,
        })
          .then(() => {
            store.commit("app/getGeoData", useInfo);
          })
          .catch(() => {
            //
          });
      }
    });
    return {
      typeList,
    };
  },
  components: {
    MoviesList
  }
});
</script>

<style lang="less" scoped>
.ctx {
  ::v-deep .van-tabs {
    min-height: 100%;
    padding-bottom: 50px;
    &__content {
      .content {
        min-height: 50vh;
        padding: 16px;
        .van-pull-refresh {
          height: 100%;
        }
      }
      // height: calc(100% - 44px);
    }
  }
}

</style>
