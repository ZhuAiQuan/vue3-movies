/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 16:45:37
 * @LastEditTime: 2021-07-07 09:34:28
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
        path: 'movies/:id',
        name: 'movies-detail',
        component: () => import('../views/home/detail/index.vue'),
        props: (route) => ({
          id: route.params.id
        })
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