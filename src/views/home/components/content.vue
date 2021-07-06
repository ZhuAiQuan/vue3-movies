<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-05 09:32:02
 * @LastEditTime: 2021-07-05 17:57:33
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <template v-if="list.length">
    <div
      class="movies-list"
      v-for="item in list"
      :key="item.filmId"
      @click="toDetail(item)"
    >
      <div class="avator">
        <img :src="item.poster" alt="" />
      </div>
      <div class="contents">
        <div class="name" :class="{ presale: type === 2 }">
          <div class="title">
            {{ item.name }}
          </div>
          <div class="type">
            {{ item.filmType.name }}
          </div>
        </div>
        <div class="rate" v-if="type === 1">
          观众评分<span>{{ item.grade }}</span>
        </div>
        <div class="actors" :class="{ presale: type === 2 }">
          主演：<span v-for="row in item.actors" :key="row.avatarAddress">
            {{ row.name }}
          </span>
        </div>
        <div v-if="type === 1" class="play-date">
          {{ item.nation }} | {{ item.runtime }}分钟
        </div>
        <div class="play-date presale" v-if="type === 2">
          上映日期：周{{ formatDay(new Date(item.premiereAt * 1000).getDay()) }}
          {{ formatDate(item.premiereAt) }}
        </div>
      </div>
      <div class="buy">
        <van-button
          plain
          hairline
          type="primary"
          size="mini"
          class="orange"
          @click.stop="handleBuy(item)"
          v-if="item.isPresale"
          >{{ type === 1 ? "购买" : "预购" }}</van-button
        >
      </div>
    </div>
  </template>
  <template v-else>
    <van-skeleton avatar round :row="3" avatar-size="66px" avatar-shape="square" v-for="i in 5" :key="i" style="margin: 20px 0" />
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import type { MoviesData } from '../../../types'

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export default defineComponent({
  name: "MoviesList",
  setup() {
    const router = useRouter();
    const formatDay = computed(() => {
      return (num: unknown): string => {
        const obj = {
          0: "日",
          1: "一",
          2: "二",
          3: "三",
          4: "四",
          5: "五",
          6: "六",
        };
        return obj[num as Day];
      };
    });
    const formatDate = computed(() => {
      return (num: number): string => {
        const time = new Date(num * 1000);
        const now = new Date();
        const m =
          time.getMonth() + 1 >= 10
            ? `${time.getMonth() + 1}`
            : `0${time.getMonth() + 1}`;
        const d =
          time.getDate() >= 10 ? `${time.getDate()}` : `0${time.getDate()}`;
        if (time.getFullYear() <= now.getFullYear()) {
          return `${m}月${d}日`;
        } else {
          return `${time.getFullYear()}年${m}月${d}日`;
        }
      };
    });
    function handleBuy(row: MoviesData) {}
    function toDetail(row: MoviesData) {
      router.push(`/movies/${row.filmId}`);
    }

    return {
      formatDay,
      formatDate,
      handleBuy,
      toDetail,
    };
  },
  props: {
    list: {
      type: Array as PropType<MoviesData[]>,
      default: () => [],
    },
    type: {
      type: Number,
      default: 1,
    },
  },
});
</script>

<style lang="less" scoped>
.movies-list {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  position: relative;
  &::after {
    content: " ";
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
  .avator {
    width: 66px;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .contents {
    padding: 0 10px;
    width: calc(100% - 136px);
    font-size: 13px;
    color: #797d82;
    .name {
      display: flex;
      color: #000;
      font-size: 16px;
      line-height: 1.1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      align-items: center;
      .type {
        padding: 0 2px;
        background: #d2d6dc;
        color: #fff;
        margin-left: 5px;
        display: flex;
        align-items: center;
        font-size: 13px;
        max-height: 18px;
      }
    }
    .rate {
      span {
        color: #ffb232;
      }
    }
    .actors {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.5;
      span {
        &::after {
          content: " ";
        }
        &:last-child::after {
          content: "";
        }
      }
    }
    .presale {
      line-height: 2;
    }
  }
  .buy {
    width: 50px;
    text-align: center;
    .orange {
      color: #ff5f16;
      border-color: #ff5f16;
    }
  }
}
</style>

