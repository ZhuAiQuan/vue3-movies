/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 10:19:32
 * @LastEditTime: 2021-07-06 16:58:51
 * @LastEditors: zaq
 * @Reference: 
 */
import type { State } from './state'
import type { Geo } from '../../../types'

type Mutations<T, U> = {
  [key: string]: (state: T, payload: U) => void;
};

const mutations: Mutations<State, unknown> = {
  getGeoData(state, data) {
    state.geo = data as Geo
  },
  getPhotos(state, list) {
    state.photos = list as string[]
  }
}

export default mutations