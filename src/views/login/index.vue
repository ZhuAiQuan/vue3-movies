<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 16:14:09
 * @LastEditTime: 2021-07-07 17:12:25
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="login">
    <div class="top">
      <img :src="logo" alt="" />
    </div>
    <div class="form">
      <van-form @failed="onFailed">
        <van-cell-group inset>
          <van-field
            v-model="state.mobile"
            name="mobile"
            label="手机号码"
            placeholder="输入手机号码"
            clearable
            :rules="[{ validator: asyncValidator, trigger: 'onBlur' }]"
          >
          <template #button>
            <van-button size="small" type="primary" @click="seedCode">发送验证码</van-button>
          </template>
          </van-field>
          <van-field
            v-model="state.password"
            name="code"
            label="验证码"
            placeholder="输入验证码"
            clearable
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Toast } from "vant";
import { defineComponent, reactive } from "vue";
import logo from "../../assets/images/logo-icon.png";
import useData from './request';

export default defineComponent({
  name: "login",
  setup() {
    const { getCodeRequest } = useData()
    const state = reactive({
      mobile: '',
      password: '',
    });

    function onFailed() {};
    function asyncValidator(val: string) {
      if (val) {
        const regex = /^1[3456789]\d{9}$/;
        if (regex.test(val)) return true
        else return '请输入正确的手机号码格式!'
      } else {
        return '请输入手机号码!'
      }
    }
    function seedCode() {
      if (/^1[3456789]\d{9}$/.test(state.mobile)) {
        getCodeRequest(state.mobile)
      } else {
        Toast.fail('请输入正确的手机号码格式!')
      }
    }

    return {
      logo,
      state,
      onFailed,
      asyncValidator,
      seedCode,
    };
  },
});
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #fff;
  font-size: 13px;
  .top {
    padding: 80px 0 40px;
    text-align: center;
    img {
      width: 60px;
    }
  }
}
</style>
