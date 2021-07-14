/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-14 14:25:36
 * @LastEditTime: 2021-07-14 14:34:45
 * @LastEditors: zaq
 * @Reference: 
 */
import axios from '@/utils';
import store from "../stores/modules/app";

export const cinemaShowFilms = (cinemaId: string) => {
  return axios.request({
    url: '',
    method: 'get',
    params: {
      cinemaId,
      k: store.state.k,
    },
    headers: {
      "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"16250377643778866845843457","bc": ${store.state.geo.cityId}}`,
      "X-Host": "mall.film-ticket.film.cinema-show-film",
    }
  })
}

export const schedules = (filmId: number, cinemaId: string, date: number) => {
  return axios.request({
    url: '',
    method: 'get',
    params: {
      filmId,
      cinemaId,
      date,
      k: store.state.k,
    },
    headers: {
      "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"16250377643778866845843457","bc": ${store.state.geo.cityId}}`,
      "X-Host": "mall.film-ticket.schedule.list",
    }
  })
}
