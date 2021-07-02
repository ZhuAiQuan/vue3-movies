/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 11:10:31
 * @LastEditTime: 2021-07-01 11:14:19
 * @LastEditors: zaq
 * @Reference: 
 */
import type { State } from './state'

export type Getters<T> = {
  [key: string]: (state: T) => void;
};

const getters: Getters<State> = {};

export default getters;
