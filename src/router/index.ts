/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:45:37
 * @LastEditTime: 2021-07-01 09:44:09
 * @LastEditors: zaq
 * @Reference: 
 */
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
} from 'vue-router';
import Main from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;