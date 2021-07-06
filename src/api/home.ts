/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 15:07:36
 * @LastEditTime: 2021-07-05 17:00:55
 * @LastEditors: zaq
 * @Reference:
 */
import axios from "../utils";
import store from '../stores/modules/app'

// 获取轮播图
export const getBanner = () => {
  return axios.request({
    url: "",
    method: "get",
    headers: {
      "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"16250377643778866845843457","bc":${store.state.geo.cityId}}`,
      "X-Host": "mall.cfg.common-banner",
    },
    params: {
      type: 2,
      cityId: store.state.geo.cityId,
      k: store.state.k,
    },
  });
};

/**
 * 
 * @param type 1正在热映 2即将上映
 * @param cityId 
 * @param pageNum 
 * @param pageSize 
 * @returns 
 */
export const getMoviesData = (type: number, pageNum = 1, pageSize = 10) => {
  return axios.request({
    url: '',
    method: 'get',
    params: {
      type,
      cityId: store.state.geo.cityId,
      pageNum,
      pageSize,
      k: store.state.k,
    },
    headers: {
      'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16250377643778866845843457","bc":${store.state.geo.cityId}}`,
      'X-Host': 'mall.film-ticket.film.list'
    }
  })
}
/**
 * 
 * @param filmId 电影id
 * @returns 
 */
export const filmDetail = (filmId: number | string) => {
  return axios.request({
    url: '',
    params: {
      filmId,
      k: store.state.k
    },
    method: 'get',
    headers: {
      'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16250377643778866845843457"}`,
      'X-Host': 'mall.film-ticket.film.info'
    }
  })
}