/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 09:51:12
 * @LastEditTime: 2021-07-06 17:02:32
 * @LastEditors: zaq
 * @Reference: 
 */
import { getGeoLocation } from '../../api/geolocation'
import { Geo } from '../../types'
import { reactive, onMounted } from 'vue'

export default function UseRequest() {
  const useInfo: Geo = reactive({
    cityId: 0,
    isHot: 0,
    name: '',
    pinyin: ''
  })
  // 获取当前位置
  function getNowGeo() {
    getGeoLocation().then((res) => {
      if (!res.data.status) {
        const data = (res.data.data as { city: Geo }).city;
        useInfo.cityId = data.cityId;
        useInfo.isHot = data.isHot;
        useInfo.name = data.name;
        useInfo.pinyin = data.pinyin;
      }
      
    })
  }
  onMounted(() => {
    getNowGeo()
  })

  return {
    useInfo,
  }
}