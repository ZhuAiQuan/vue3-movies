/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 11:30:04
 * @LastEditTime: 2021-07-01 11:32:42
 * @LastEditors: zaq
 * @Reference: 
 */
import router from './router';
// import { useStore } from 'vuex'

router.beforeEach((to, from, next) => {
  // const store = useStore();
  next()
})