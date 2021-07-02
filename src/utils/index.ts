/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 15:01:16
 * @LastEditTime: 2021-07-01 14:13:36
 * @LastEditors: zaq
 * @Reference: 
 */
import Request from './request'

const baseUrl = import.meta.env.VITE_BASE_URL;

const axios = new Request(baseUrl);

export default axios