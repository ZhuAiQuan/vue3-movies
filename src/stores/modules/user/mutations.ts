/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 14:26:50
 * @LastEditTime: 2021-07-08 14:37:44
 * @LastEditors: zaq
 * @Reference: 
 */
import { getDistance } from '@/utils/libs';
import type { State } from './state';

type Mutations<T, U> = {
  [key: string]: (state: T, payload: U) => void;
};

const mutations: Mutations<State, unknown> = {
  getToken(state, token) {
    state.token = token as string
  },
  getDistance(state, distance) {
    const [latitude, longitude] = distance as number[];
    state.latitude = latitude;
    state.longitude = longitude;
  }
};

export default mutations
