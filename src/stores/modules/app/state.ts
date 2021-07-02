/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 10:13:43
 * @LastEditTime: 2021-07-01 16:20:35
 * @LastEditors: zaq
 * @Reference: 
 */
import type { Geo } from '../../../types'
export type State = {
  geo: Geo
  k: number
}

const state: State = {
  geo: {
    cityId: 110100,
    isHot: 1,
    name: '北京',
    pinyin: 'beijing'
  },
  k: Math.floor(Math.random() * 10000000)
};

export default state