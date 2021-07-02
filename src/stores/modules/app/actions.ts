/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 11:17:07
 * @LastEditTime: 2021-07-01 11:25:17
 * @LastEditors: zaq
 * @Reference: 
 */
import type { State } from './state';
import type { Getters } from './getters'

interface Store {
  state: State;
  getters: Getters<State>;
  // 箭头函数定义
  commit: (type: string, payload: unknown) => void;
  // 普通函数定义
  dispatch(type: string, payload: unknown): void;
}

type Actions<T, U> = {
  [key: string]: (store: T, payload: U) => void;
};

const actions: Actions<Store, unknown> = {};

export default actions;
