<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-05 16:51:58
 * @LastEditTime: 2021-07-06 17:29:10
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="desc">
    <div class="normal-style" :style="{ top: `${opactiy}px`, opacity: bgOpactiy }">
      <div class="back-icon" @click="$router.go(-1)">
        <van-icon name="arrow-left" size="24px" color="#fff" />
      </div>
      {{ info.list.name }}
    </div>
    <img :src="info.list.poster" alt="" />
    <div class="info">
      <div class="name">
        <div class="name-n">
          {{ info.list.name }}
          <span class="type">{{ info.list.filmType.name }}</span>
        </div>
        <div class="rate" v-if="info.list.grade">
          {{ info.list.grade }}
          <span>分</span>
        </div>
      </div>
      <div class="cate">
        {{ info.list.category }}
      </div>
      <div class="cate">
        {{ formatDate(info.list.premiereAt) }}
      </div>
      <div class="cate">
        {{ info.list.nation }} | {{ info.list.runtime }}分钟
      </div>
      <div class="cate info-desc" :class="{ 'hide-text': !toggle }">
        {{ info.list.synopsis }}
      </div>
      <div
        style="text-align: center"
        :class="{ 'icon-rorato': toggle }"
        @click="onToggle"
      >
        <van-icon name="arrow-down" />
      </div>
    </div>
  </div>
  <ActorsList :actors="info.list.actors" />
  <MoviesPhoto :photos="info.list.photos" />
  <div class="bottom-nav">
    <van-button color="#ff5f16" size="large" block>选座购票</van-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import useRequest from "./request";
import ActorsList from "../components/activesList.vue";
import MoviesPhoto from "../components/photos.vue";

export default defineComponent({
  name: "movies-detail",
  setup(props) {
    const { info } = useRequest(props.id);
    const toggle = ref(false);
    const opactiy = ref(0);
    const formatDate = computed(() => {
      return (n: number): string => {
        const date = new Date(n * 1000);
        const y = date.getFullYear();
        const m =
          date.getMonth() > 8
            ? `${date.getMonth() + 1}`
            : `0${date.getMonth() + 1}`;
        const d =
          date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
        return `${y}年${m}月${d}日 上映`;
      };
    });
    const bgOpactiy = computed(() => {
      if (opactiy.value < 200) return opactiy.value * .005
      else return 1
    })

    function onToggle() {
      toggle.value = !toggle.value;
    }
    function addScroll(e: Event) {
      opactiy.value = e.target?.scrollingElement?.scrollTop;
    }

    onMounted(() => {
      window.addEventListener("scroll", addScroll);
    });

    return {
      info,
      formatDate,
      toggle,
      opactiy,
      bgOpactiy,
      onToggle,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    ActorsList,
    MoviesPhoto,
  },
});
</script>

<style lang="less" scoped>
.desc {
  position: relative;
  padding-top: 210px;
  overflow: hidden;
  margin-bottom: 10px;
  img {
    position: absolute;
    z-index: 1;
    width: 100%;
    top: -50%;
    left: 0;
  }
  .info {
    padding: 12px 15px 15px;
    font-size: 18px;
    position: relative;
    z-index: 9;
    background: #fff;
    .name {
      display: flex;
      align-items: center;
      .rate {
        color: orange;
        span {
          font-size: 10px;
        }
      }
      &-n {
        color: #191a1b;
        flex: 1;
        display: flex;
        align-items: center;
        .type {
          background: #d2d6dc;
          color: #fff;
          padding: 0 2px;
          font-size: 9px;
          margin-left: 7px;
          border-radius: 2px;
          line-height: 14px;
        }
      }
    }
    .cate {
      font-size: 13px;
      color: #797d82;
      padding: 2px 0;
    }
    .info-desc {
      padding-top: 12px;
    }
    .hide-text {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .icon-rorato {
      transform: rotate(180deg);
      transition: all 0.3s linear;
    }
  }
  
  .normal-style {
    position: absolute;
    width: 100%;
    z-index: 99;
    top: 0;
    left: 0;
    padding: 7px;
    text-align: center;
    height: 30px;
    background: #fff;
    transition: opacity .25s ease-out;
    line-height: 30px;
    .back-icon {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgb(129, 125, 125);
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  // .top-nav {
  //   z-index: 9;
  //   position: sticky;
  //   width: 100%;
  //   min-height: 30px;
  //   top: 0;
  //   left: 0;
  //   padding: 7px;
  //   opacity: v-bind(opactiy);
  //   background: #fff;
  //   transition: opacity 0.2s ease-out;
  // }
  
}
.bottom-nav {
    position: fixed;
    bottom: 0;
    padding-top: 10px;
    width: 100%;
    background: #f4f4f4;
  }
</style>
