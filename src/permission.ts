/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 11:30:04
 * @LastEditTime: 2021-07-07 16:15:29
 * @LastEditors: zaq
 * @Reference: 
 */
import router from './router';
import { GetToken } from './utils/libs'
// import { useStore } from 'vuex'

router.beforeEach((to, from, next) => {
  const loginPage: string[] = ['/order'];
  const token = GetToken();
  if (loginPage.includes(to.path) && token) {
    next()
  } else if (loginPage.includes(to.path) && !token) {
    next('/login')
  } else next()
})