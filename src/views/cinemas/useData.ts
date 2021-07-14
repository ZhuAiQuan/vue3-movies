/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-08 10:07:43
 * @LastEditTime: 2021-07-13 13:45:55
 * @LastEditors: zaq
 * @Reference: 
 */
import { getCinemas, recommendCinemas } from '@/api/geolocation';
import type { CinemasInfo } from '@/types';
import { reactive } from 'vue';

interface Cinemas {
  data: CinemasInfo[]
  recommend: CinemasInfo[]
}

export default function useData() {
  const cinemas: Cinemas = reactive({
    data: [],
    recommend: []
  })

  function getData(type: number) {
    getCinemas(type).then(res => {
      if (!res.data.status) {
        cinemas.data = (res.data.data as { cinemas: CinemasInfo[] }).cinemas
      } else {
        cinemas.data = []
      }
    })
  }
  function getRecommendCinemas() {
    recommendCinemas().then(res => {
      if (!res.data.status) {
        cinemas.recommend = (res.data.data as { cinemas: CinemasInfo[] }).cinemas
      } else {
        cinemas.recommend = []
      }
    })
  }

  return {
    cinemas,
    getData,
    getRecommendCinemas,
  }
}