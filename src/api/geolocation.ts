/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 09:56:02
 * @LastEditTime: 2021-07-01 14:15:16
 * @LastEditors: zaq
 * @Reference: 
 */
import axios from '../utils'
// import { useStore } from 'vuex';
import store from '../stores/modules/app'
// const store = useStore();

// 获取当前定位
export const getGeoLocation = () => {
  return axios.request({
    url: '',
    method: 'get',
    params: {
      k: store.state.k
    },
    headers: {
      'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16250377643778866845843457","bc": ${store.state.geo.cityId}}`,
      'X-Host': 'mall.film-ticket.city.locate'
    }
  })
}