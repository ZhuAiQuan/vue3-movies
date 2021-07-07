/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 09:34:58
 * @LastEditTime: 2021-07-07 09:41:38
 * @LastEditors: zaq
 * @Reference: 
 */
import axios from "../utils";

export const getMessage = () => {
  return axios.request({
    url: '',
    method: 'get',
    params: {
      actId: 'ElzMZU125260'
    },
    headers: {
      'X-Host': 'mall.act.static-page.info',
      'X-Client-Info': ''
    }
  })
}