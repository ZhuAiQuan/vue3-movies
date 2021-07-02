/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 10:09:23
 * @LastEditTime: 2021-07-01 10:09:24
 * @LastEditors: zaq
 * @Reference: 
 */
import { createStore } from 'vuex';
import app from './modules/app'

export default createStore({
  modules: {
    app
  }
})