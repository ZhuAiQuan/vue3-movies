/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 09:56:02
 * @LastEditTime: 2021-07-14 14:30:16
 * @LastEditors: zaq
 * @Reference:
 */
import axios from "../utils";
// import { useStore } from 'vuex';
import store from "../stores/modules/app";
import user from "@/stores/modules/user";
// const store = useStore();

// 获取当前定位
export const getGeoLocation = () => {
  return axios.request({
    url: "",
    method: "get",
    params: {
      k: store.state.k,
    },
    headers: {
      "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"16250377643778866845843457","bc": ${store.state.geo.cityId}}`,
      "X-Host": "mall.film-ticket.city.locate",
    },
  });
};
// 获取所有影院
export const getCinemas = (ticketFlag = 1) => {
  return axios.request({
    url: "",
    method: "get",
    params: {
      cityId: store.state.geo.cityId,
      ticketFlag,
      k: store.state.k,
    },
    headers: {
      "X-Client-Info":
        `{"a":"3000","ch":"1002","v":"5.0.4","e":"16256492114666438426","bc":${store.state.geo.cityId}}`,
      "X-Host": "mall.film-ticket.cinema.list",
    },
  });
};
// 离你最近的影院推荐
export const recommendCinemas = () => {
  return axios.request({
    url: "",
    method: "get",
    params: {
      cityId: store.state.geo.cityId,
      k: store.state.k,
    },
    headers: {
      "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"16256492114666438426","lo":"${user.state.longitude}", "la": "${user.state.latitude}"}`,
      "X-Host": "mall.film-ticket.cinema.recommend",
    },
  });
};
// 获取所有城市
export const getAllCity = () => {
  return axios.request({
    url: "",
    method: "get",
    params: {
      k: store.state.k,
    },
    headers: {
      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.0.4","e":"16256492114666438426"}',
      "X-Host": "mall.film-ticket.city.list",
    },
  });
};
// 影院详情
export const cimemaDetail = (cinemaId: string) => {
  return axios.request({
    url: '',
    method: 'get',
    params: {
      cinemaId,
      k: store.state.k,
    },
    headers: {
      "X-Client-Info":
        `{"a":"3000","ch":"1002","v":"5.0.4","e":"16256492114666438426","bc":"${store.state.geo.cityId}"}`,
      "X-Host": "mall.film-ticket.cinema.info",
    }
  })
}