/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 10:09:23
 * @LastEditTime: 2021-07-07 14:29:52
 * @LastEditors: zaq
 * @Reference: 
 */
import { createStore } from 'vuex';
import app from './modules/app';
import user from './modules/user'

export default createStore({
  modules: {
    app,
    user,
  }
})