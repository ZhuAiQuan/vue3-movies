<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-08 16:25:35
 * @LastEditTime: 2021-07-14 09:07:32
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="location">
    <div class="top">
      <van-icon
        name="cross"
        class="icons"
        size="20px"
        @click="$router.go(-1)"
      />
      当前城市 - {{ geoInfo.name }}
    </div>
    <van-search
      v-model="keyword"
      placeholder="输入地名或者拼音"
      :show-action="showAction"
      @focus="showAction = true"
      @input="onSearch"
      @blur="showAction = false"
    />
    <div class="hot-city" v-show="(!showAction || !keyword) && !searchResult.length">
      <div class="title">GPS定位你所在城市</div>
      <div class="city-ctx">
        <CityTag :data="useInfo" />
      </div>
      <div class="title">热门城市</div>
      <div class="city-ctx">
        <CityTag :data="item" v-for="item in hotCities" :key="item.cityId" />
      </div>
    </div>
    <IndexBar :cities="cities" :indexList="indexList" v-show="(!showAction || !keyword) && !searchResult.length" />
    <SearchContent v-show="showAction" :cities="searchResult" type="search" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import UseRequest from "../home/request";
import CityTag from "./components/city.vue";
import useData from "./useData";
import IndexBar from "./components/indexBar.vue";
import SearchContent from "./components/search.vue";
import type { Geo } from "@/types";

export default defineComponent({
  name: "location",
  setup() {
    const store = useStore();
    const { useInfo } = UseRequest();
    const { getData, cities, hotCities, indexList } = useData();
    const keyword = ref("");
    const showAction = ref(false);
    const searchResult = ref<Geo[]>([]);

    const geoInfo = computed(() => store.state.app.geo);

    function onSearch() {
      if (keyword.value) {
        searchResult.value = cities.value.filter(
          (item) =>
            item.name.includes(keyword.value) ||
            item.pinyin.includes(keyword.value)
        );
      } else searchResult.value = []
    }

    onMounted(() => {
      getData();
    });

    return {
      keyword,
      showAction,
      geoInfo,
      useInfo,
      hotCities,
      cities,
      indexList,
      searchResult,
      onSearch,
    };
  },
  components: {
    CityTag,
    IndexBar,
    SearchContent,
  },
});
</script>

<style lang="less" scoped>
.top {
  background: #fff;
  line-height: 44px;
  text-align: center;
  color: #191a1b;
  font-size: 17px;
  position: relative;
  .icons {
    position: absolute;
    left: 10px;
    top: 0;
    height: 100%;
    line-height: 44px;
  }
}
.location {
  ::v-deep(.van-search) {
    background: #f4f4f4;
    .van-search__content {
      background: #fff;
    }
  }
  .hot-city {
    background: #fff;
    padding: 15px;
    padding-bottom: 0;
    color: #797d82;
    font-size: 13px;
    .city-ctx {
      display: flex;
      // margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .title {
      margin-bottom: 10px;
    }
  }
}
</style>
