<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-08 13:30:01
 * @LastEditTime: 2021-07-13 14:43:48
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="cinemas-list">
    <div
      v-for="item in temp"
      :key="item.cinemaId"
      class="cinemas-content"
      @click="toDetail(item.cinemaId)"
    >
      <div>
        <div class="cinema-name">
          {{ item.name }}
        </div>
        <div>
          {{ item.address }}
        </div>
      </div>
      <div>
        <div class="price" v-if="type === 1">
          {{ item.lowPrice / 100 }}
        </div>
        <div v-else class="price-locat">
          <van-icon name="location-o" size="18" />
        </div>
        <div class="distance">
          {{ calcDistance(item.latitude, item.longitude) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from "vue";
import type { CinemasInfo } from "@/types";
import { getDistance } from "@/utils/libs";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "cinemas-list",
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const temp = ref<CinemasInfo[]>([]);

    const calcDistance = computed(() => {
      const latitude = store.state.user.latitude;
      const longitude = store.state.user.longitude;
      return (lat: number, long: number) => {
        return getDistance(latitude, longitude, lat, longitude);
      };
    });
    function toDetail(id: number) {
      router.push(`/detail/${id}`);
    }

    watchEffect(() => {
      if (props.title !== "全部") {
        temp.value = props.cinemas.filter(
          (item) => item.districtName === props.title
        );
      } else {
        temp.value = props.cinemas;
      }
    });

    return {
      calcDistance,
      temp,
      toDetail,
    };
  },
  props: {
    cinemas: {
      type: Array as PropType<CinemasInfo[]>,
      default: () => [],
    },
    type: {
      type: Number,
      default: 1,
    },
    address: {
      type: Number,
      default: -1,
    },
    title: {
      type: String,
      default: "全部",
    },
  },
});
</script>

<style lang="less" scoped>
.cinemas-content {
  padding: 15px;
  position: relative;
  background: #fff;
  display: flex;
  font-size: 12px;
  color: #797d82;
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
  & > div:first-child {
    width: calc(100% - 65px);
    .cinema-name {
      font-size: 15px;
      color: #191a1b;
      padding-bottom: 5px;
    }
    & > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  & > div:last-child {
    width: 65px;
    text-align: center;
    .price {
      font-size: 15px;
      color: #ff5f16;
      padding-bottom: 5px;
      &::before {
        content: "￥";
        font-size: 11px;
      }
      &::after {
        content: "起";
        font-size: 11px;
      }
    }
    .price-locat {
      padding-bottom: 5px;
    }
  }
  &:last-child {
    margin-bottom: 50px;
  }
}
.cinemas-list {
  max-height: calc(100vh - 92px);
  overflow-y: auto;
  overflow-y: touch;
}
</style>
