<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 11:36:01
 * @LastEditTime: 2021-07-07 16:19:50
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="top-bg">
    <div class="avator">
      <img :src="token ? '' : none" alt="" />
    </div>
    <div class="username" @click="toLogin">{{ token ? '' : '立即登录' }}</div>
  </div>
  <div class="order-list">
    <div v-for="item in config.list" :key="item.icon">
      <div class="order-icon">
        <img :src="item.icon" alt="" />
      </div>
      <div class="order-name">{{ item.name }}</div>
    </div>
  </div>
  <div class="option-list">
    <div v-for="item in config.option" :key="item.name" class="option-ctx">
      <img :src="item.icon" alt="" />
      <div class="option-name">
        {{ item.name }}
      </div>
      <div class="right-icon">
        <span v-if="item.price">
          {{ item.price }}
        </span>
        <van-icon color="#33333333" name="arrow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import none from "../../assets/images/none.png";
import moviesOrder from "../../assets/images/movies-order.png";
import goodsOrder from "../../assets/images/goods-order.png";
import mzq from "../../assets/images/mzq.png";
import zhhb from "../../assets/images/zhhb.png";
import ye from "../../assets/images/ye.png";
import setting from "../../assets/images/setting.png";
import { GetToken } from '../../utils/libs'
import { useRouter } from "vue-router";

export default defineComponent({
  name: "mine",
  setup() {
    const router = useRouter();
    const config = reactive({
      list: [
        {
          icon: moviesOrder,
          name: "电影订单",
          path: "",
        },
        {
          icon: goodsOrder,
          name: "商品订单",
          path: "",
        },
      ],
      option: [
        {
          icon: mzq,
          name: "卖座券",
        },
        {
          icon: zhhb,
          name: "组合红包",
        },
        {
          icon: ye,
          name: "余额",
          price: "0",
        },
        {
          icon: setting,
          name: "设置",
        },
      ],
    });
    const token = computed(() => GetToken());

    function toLogin() {
      if (token.value) {
        //
      } else {
        router.push('/login')
      }
    }

    return {
      none,
      config,
      token,
      toLogin,
    };
  },
});
</script>

<style lang="less" scoped>
.top-bg {
  background-image: url(../../assets/images/banner.png);
  height: 158px;
  padding: 20px 0 0 22px;
  display: flex;
  align-items: center;
  .avator {
    width: 67px;
    height: 67px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin-right: 20px;
    border: 2px solid #fff;
    img {
      width: 100%;
    }
  }
  .username {
    font-size: 16px;
    color: #fff;
  }
}
.order-list {
  display: flex;
  padding: 16px;
  flex-wrap: wrap;
  background: #fff;
  font-size: 13px;
  color: #797d82;
  margin-bottom: 10px;
  div {
    flex: 1;
    text-align: center;
    .order-icon {
      width: 26px;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
  }
}
.option-list {
  background: #fff;
  color: #191a1b;
  font-size: 15px;
  .option-ctx {
    display: flex;
    align-items: center;
    padding: 0 15px;
    line-height: 49px;
    position: relative;
    img {
      width: 20px;
      margin-right: 15px;
    }
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
      left: 13px;
    }
    .option-name {
      flex: 4;
    }
    .right-icon {
      flex: 1;
      text-align: right;
      span {
        padding-right: 10px;
        color: #797d82;
        &::before {
          content: '￥';
          font-size: 11px;
        }
      }
    }
  }
}
</style>
