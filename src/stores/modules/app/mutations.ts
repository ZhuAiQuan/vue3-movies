/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 10:19:32
 * @LastEditTime: 2021-07-01 11:08:37
 * @LastEditors: zaq
 * @Reference: 
 */
import type { State, Geo } from './state'

type Mutations<T, U> = {
  [key: string]: (state: T, payload: U) => void;
};

const mutations: Mutations<State, unknown> = {
  getGeoData(state, data) {
    state.geo = data as Geo
  }
}

export default mutations