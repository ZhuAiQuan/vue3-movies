/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-08 14:21:29
 * @LastEditTime: 2021-07-08 14:36:16
 * @LastEditors: zaq
 * @Reference: 
 */
import type { State } from './state';

interface Store {
  state: State;
  // 箭头函数定义
  commit: (type: string, payload: unknown) => void;
  // 普通函数定义
  dispatch(type: string, payload: unknown): void;
}

type Actions<T, U> = {
  [key: string]: (store: T, payload: U) => void;
};

const actions: Actions<Store, unknown> = {
  getGeoDistance({ commit }) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((res) => {
        commit('getDistance', [res.coords.latitude, res.coords.longitude])
        resolve(res.coords)
      }, err => {
        reject(err)
      })
    })
  }
};

export default actions;