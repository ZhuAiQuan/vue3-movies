/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 14:26:50
 * @LastEditTime: 2021-07-07 14:28:46
 * @LastEditors: zaq
 * @Reference: 
 */
import type { State } from './state';

type Mutations<T, U> = {
  [key: string]: (state: T, payload: U) => void;
};

const mutations: Mutations<State, unknown> = {
  getToken(state, token) {
    state.token = token as string
  }
};

export default mutations
