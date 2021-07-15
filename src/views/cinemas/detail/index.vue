<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 14:38:16
 * @LastEditTime: 2021-07-15 15:08:17
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
    <FilmBanner :films="films" @onCheckFilm="checkFilm" />
    <FilmTitle :film="filmData" />
    <FilmSchedules :tabs="schedulesData.tabs" @getShowData="getShowData" :schedules="schedules" />
  </div>
  <TopDescript
    :services="cinema.services"
    v-model:visible="popup.show"
    :title="cinema.name"
  />
</template>

<script lang="ts">
import {
  defineAsyncComponent,
  defineComponent,
  onMounted,
  reactive,
  watch,
} from "vue";
import useData from "./useData";
import FilmBanner from "./components/banner.vue";
import FilmTitle from "./components/filmTitle.vue";
import FilmSchedules from './components/schedules.vue';
import type { MoviesData, FilmInfo, SchedulesTabs } from "@/types";

type Week = {
  [key: number]: string
}
interface Schedules {
  tabs: SchedulesTabs[]
  key: number
}

export default defineComponent({
  name: "cinemas-detail",
  setup(props) {
    const { cinema, films, getData, showFilms, getSchedules, schedules } = useData();
    const popup = reactive({
      show: false,
    });
    const filmData: FilmInfo = reactive({
      filmId: 0,
      grade: "",
      category: "",
      runtime: 0,
      director: "",
      actors: [],
      name: "",
      premiereAt: 0,
      showDate: []
    });
    const schedulesData: Schedules = reactive({
      tabs: [],
      key: 0
    })

    function openDescript() {
      popup.show = true;
    }
    function checkFilm(film: MoviesData) {
      const { filmId, grade, category, runtime, director, actors, name, premiereAt, showDate } = film;
      filmData.name = name;
      filmData.filmId = filmId;
      filmData.grade = grade;
      filmData.category = category;
      filmData.runtime = runtime;
      filmData.director = director;
      filmData.actors = actors;
      filmData.premiereAt = premiereAt * 1000;
      filmData.showDate = showDate.map(item => item * 1000);
      calcTabs(filmData.showDate);
      if (schedulesData.tabs.length) {
        schedulesData.key = schedulesData.tabs[0].key;
        getShowData(schedulesData.key)
      }
    }
    // 获取上映日期
    function calcTabs(list: number[]) {
      const now = new Date().getDate();
      const week: Week = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
      };
      schedulesData.tabs = list.map(key => {
        const time = new Date(key);
        // const y = time.getFullYear();
        const m = time.getMonth() + 1;
        const d = time.getDate();
        const w = time.getDay();
        let title = '';
        switch(+d - now) {
          case 0:
            title = `今天${m}月${d}日`
            break;
          case 1:
            title = `明天${m}月${d}日`;
            break;
          case 2:
            title = `后天${m}月${d}日`;
            break;
          default:
            title = `周${week[w]}${m}月${d}日`;
        }
        return {
          title,
          key
        }
      })
    }
    // 获取上映日期数据
    function getShowData(date: number) {
      schedulesData.key = date;
      getSchedules(filmData.filmId, props.id, date/1000);
    }

    onMounted(() => {
      getData(props.id);
      showFilms(props.id);
    });

    watch(
      () => films.value,
      (data) => {
        if (data.length) checkFilm(data[0]);
      }
    );

    return {
      cinema,
      popup,
      films,
      filmData,
      schedules,
      schedulesData,
      openDescript,
      checkFilm,
      getShowData,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    TopDescript: defineAsyncComponent(
      () => import("./components/descript.vue")
    ),
    FilmBanner,
    FilmTitle,
    FilmSchedules,
  },
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
    background: #fff;
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
