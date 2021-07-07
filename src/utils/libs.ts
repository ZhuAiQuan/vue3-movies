/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 14:40:35
 * @LastEditTime: 2021-07-07 15:57:11
 * @LastEditors: zaq
 * @Reference: 
 */
// import Cookies from 'js-cookie';
import { setCookies, getCookies } from './cookies'
import config from '../config';
export const TOKEN = 'token';

export function SetToken(value: string) {
  setCookies(TOKEN, value, config.expires)
}
export function GetToken() {
  return getCookies(TOKEN)
}
