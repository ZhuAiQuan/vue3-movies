<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-08 09:06:04
 * @LastEditTime: 2021-07-14 09:12:00
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <transition name="van-slide-up">
    <div class="cinemas-ctx" v-if="!searchState">
      <div class="head">
        <div class="geo" @click="toLocaltion">
          <span>{{ geoInfo.name }}</span>
          <van-icon name="arrow-down" size="8" />
        </div>
        <div class="title"></div>
        <div class="search" @click="onTaggleState(true)">
          <van-icon name="search" size="20" />
        </div>
      </div>
      <van-dropdown-menu>
        <van-dropdown-item :title="dropdown.title" ref="address">
          <div class="address-ctx">
            <div
              v-for="(item, i) in dropdown.data.address"
              :key="`${item.text}-${item.value}`"
              class="address-ctx-content"
              :class="{
                'address-ctx-right': i % 4 === 3,
                'address-ctx-active': dropdown.title === item.text,
              }"
              @click="onCheck(item)"
            >
              {{ item.text }}
            </div>
          </div>
        </van-dropdown-item>
        <van-dropdown-item
          v-model="dropdown.ticketFlag"
          :options="dropdown.data.ticketFlag"
          @change="onChnage"
        ></van-dropdown-item>
        <van-dropdown-item
          v-model="dropdown.geo"
          :options="dropdown.data.geo"
        ></van-dropdown-item>
        <!-- <van-dropdown-item v-for="item in Object.keys(dropdown.data)" :key="item" :options="dropdown.data[item]" v-model="dropdown[item]"></van-dropdown-item> -->
      </van-dropdown-menu>
      <CinemasList
        :cinemas="cinemas.data"
        :type="dropdown.ticketFlag"
        :title="dropdown.title"
      />
    </div>
    <SearchList v-else :cinemas="cinemas.data" @onTaggleState="onTaggleState" />
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  watchEffect,
  ref,
  defineAsyncComponent,
} from "vue";
import { useStore } from "vuex";
import useData from "./useData";
import CinemasList from "./list.vue";
import { useRouter } from "vue-router";

interface Options {
  text: string;
  value: number;
}
interface DropDowns {
  data: IData;
  address: number;
  ticketFlag: number;
  geo: number;
  title: string;
}
type IData = {
  [key: string]: Options[];
};

export default defineComponent({
  name: "cinemas",
  setup() {
    const store = useStore();
    const router = useRouter();
    const { cinemas, getData } = useData();
    const address = ref<HTMLElement | null>(null);
    const geoInfo = computed(() => store.state.app.geo);
    const searchState = ref(false);
    const dropdown: DropDowns = reactive({
      data: {
        address: [],
        ticketFlag: [
          {
            text: "App订票",
            value: 1,
          },
          {
            text: "前台兑换",
            value: 2,
          },
        ],
        geo: [
          {
            text: "最近去过",
            value: 0,
          },
          {
            text: "离我最近",
            value: 1,
          },
        ],
      },
      address: -1,
      ticketFlag: 1,
      geo: 0,
      title: "全部",
    });

    function onCheck(item: Options) {
      //
      dropdown.address = item.value;
      dropdown.title = item.text;
      (address.value as any).toggle();
    }
    function onChnage() {
      getData(dropdown.ticketFlag);
    }
    function toLocaltion() {
      router.push("/location");
    }
    function onTaggleState(type = false) {
      searchState.value = type;
    }

    watchEffect(() => {
      if (cinemas.data.length) {
        const list: Options[] = [];
        cinemas.data.forEach((item) => {
          if (!list.map((row) => row.text).includes(item.districtName)) {
            list.push({
              text: item.districtName,
              value: list.length,
            });
          }
        });
        dropdown.data.address = list;
        dropdown.data.address.unshift({
          text: "全部",
          value: -1,
        });
      }
    });

    onMounted(() => {
      getData(dropdown.ticketFlag);
    });

    return {
      geoInfo,
      dropdown,
      cinemas,
      address,
      searchState,
      onCheck,
      onChnage,
      toLocaltion,
      onTaggleState,
    };
  },
  components: {
    CinemasList,
    SearchList: defineAsyncComponent(() => import("./search/index.vue")),
  },
});
</script>

<style lang="less" scoped>
.head {
  line-height: 44px;
  display: flex;
  background: #fff;
  padding: 0 15px;
  position: relative;
  .title {
    font-size: 17px;
    flex: 2;
    text-align: center;
    &::after {
      content: "影院";
    }
  }
  .geo,
  .search {
    flex: 1;
    text-align: right;
  }
  .geo {
    text-align: left;
    font-size: 13px;
    display: flex;
    align-items: center;
    span {
      padding-right: 5px;
      display: inline-block;
      max-width: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    -webkit-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.address-ctx {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 0 10px;

  &-content {
    width: calc(25% - 12.5px);
    text-align: center;
    line-height: 30px;
    color: #797d82;
    border: 1px solid #797d8233;
    border-radius: 3px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 13px;
  }
  &-right {
    margin-right: 0;
  }
  &-active {
    border-color: rgb(238, 10, 36);
    color: rgb(238, 10, 36);
  }
}
.cinemas-ctx {
  ::v-deep(.van-dropdown-menu) {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #ededed;
      color: #ededed;
      -webkit-transform-origin: 0 100%;
      -ms-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      -ms-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
</style>
