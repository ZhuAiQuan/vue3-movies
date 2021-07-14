/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:45:37
 * @LastEditTime: 2021-07-13 14:40:16
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
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'mine',
        name: 'name',
        component: () => import('../views/mine/index.vue')
      },
      {
        path: 'cinemas',
        name: 'cinemas',
        component: () => import('@/views/cinemas/index.vue')
      }
    ]
  },
  {
    path: '/movies/:id',
    name: 'movies-detail',
    component: () => import('../views/home/detail/index.vue'),
    props: (route) => ({
      id: route.params.id
    })
  },
  {
    path: '/preview',
    name: 'preview-pic',
    component: () => import('../views/home/preview/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message/index.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/location',
    name: 'location',
    component: () => import('@/views/location/index.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/cinemas/detail/index.vue'),
    props: (route) => ({
      id: route.params.id
    })
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