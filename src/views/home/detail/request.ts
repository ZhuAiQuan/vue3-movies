/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-05 16:56:06
 * @LastEditTime: 2021-07-06 10:15:09
 * @LastEditors: zaq
 * @Reference: 
 */
import { filmDetail } from '../../../api/home';
import type { MoviesData } from '../../../types';
import { reactive, onMounted } from 'vue';

interface Info {
  list: MoviesData
}

export default function useRequest(id: number | string) {
  const info: Info = reactive({
    list: {
      poster: '',
      name: '',
      filmType: {
        name: '',
        type: 0
      },
      actors: [],
      director: '',
      category: '',
      filmId: 0,
      premiereAt: 0,
      grade: '',
      nation: '',
      runtime: 0,
      isPresale: false,
      isSale: false,
      language: '',
      photos: [],
      synopsis: '',
      timeType: 0,
      videoId: 0,
    }
  })
  // 获取信息
  function getInfo() {
    filmDetail(id).then((res) => {
      if (!res.data.status) {
        info.list = (res.data.data as { film: MoviesData }).film
      }
    })
  }
  onMounted(() => {
    getInfo()
  })

  return {
    info
  }
}