/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 10:13:43
 * @LastEditTime: 2021-07-14 09:27:41
 * @LastEditors: zaq
 * @Reference: 
 */
import type { Geo } from '../../../types'
export type State = {
  geo: Geo
  k: number
  photos: string[]
}

const state: State = {
  geo: {
    cityId: 110100,
    isHot: 1,
    name: '北京',
    pinyin: 'beijing'
  },
  k: Math.floor(Math.random() * 10000000),
  photos: []
};

export default state