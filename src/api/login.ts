/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 17:03:50
 * @LastEditTime: 2021-07-07 17:06:44
 * @LastEditors: zaq
 * @Reference: 
 */
import axios from '../utils';

export const getCode = (mobile: string) => {
  return axios.request({
    url: '',
    method: 'post',
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"16250377643778866845843457"}',
      'X-Host': 'mall.user.sms-code.send'
    },
    data: {
      mobile,
      type: 1,
      imgKey: '',
      imgCode: '',
    }
  })
}