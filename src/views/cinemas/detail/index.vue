<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 14:38:16
 * @LastEditTime: 2021-07-14 14:46:18
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="detail-ctx">
    <div class="top">
      <van-icon name="arrow-left" size="20px" @click="$router.go(-1)" />
    </div>
    <div class="title">
      {{ cinema.name }}
    </div>
    <div class="cinema-tag has-bottom-border" @click="openDescript">
      <span v-for="item in cinema.services" :key="item.name">
        {{ item.name }}
      </span>
      <van-icon name="arrow" size="15px" color="#ffb232" />
    </div>
    <div class="cinema-address">
      <van-icon name="location-o" size="20px" />
      <div class="address">
        {{ cinema.address }}
      </div>
      <van-icon name="phone-o" size="20px" style="padding: 0 10px" />
    </div>
    <FilmBanner :films="films" />
  </div>
  <TopDescript :services="cinema.services" v-model:visible="popup.show" :title="cinema.name" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, reactive } from "vue";
import useData from "./useData";
import FilmBanner from './components/banner.vue'

export default defineComponent({
  name: "cinemas-detail",
  setup(props) {
    const { cinema, films, getData, showFilms, getSchedules } = useData();
    const popup = reactive({
      show: false
    })

    function openDescript() {
      popup.show = true
    }

    onMounted(() => {
      getData(props.id);
      showFilms(props.id);
    })
    
    return {
      cinema,
      popup,
      films,
      openDescript,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    TopDescript: defineAsyncComponent(() => import('./components/descript.vue')),
    FilmBanner,
  }
});
</script>

<style lang="less" scoped>
.detail-ctx {
  padding-top: 44px;
  position: relative;
  background: #fff;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    height: 44px;
    padding-left: 12px;
    line-height: 44px;
    width: calc(100% - 12px);
    z-index: 3;
  }
  .title {
    position: sticky;
    top: 0;
    left: 0;
    text-align: center;
    line-height: 44px;
    height: 44px;
    font-size: 17px;
    color: #191a1b;
    padding: 0 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 9;
  }
  .cinema-tag {
    text-align: center;
    padding: 5px 0 15px;
    color: #ffb232;
    font-size: 15px;
    overflow: hidden;
    span {
      padding: 0 2px;
      margin-right: 2px;
      border-bottom: 1px solid;
      border-right: 1px solid;
    }
  }
  .cinema-address {
    padding: 0 17px;
    font-size: 14px;
    color: #191a1b;
    line-height: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    .address {
      padding: 0 12px;
      width: calc(100% - 60px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
