/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 14:23:22
 * @LastEditTime: 2021-07-01 16:20:03
 * @LastEditors: zaq
 * @Reference: 
 */
export interface Response {
  data: unknown
  msg: string
  status: number
}
export interface Geo {
  cityId: number
  isHot: number
  name: string
  pinyin: string
}