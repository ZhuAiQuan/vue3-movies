/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 17:07:17
 * @LastEditTime: 2021-07-07 17:09:51
 * @LastEditors: zaq
 * @Reference: 
 */
import { getCode } from '../../api/login';
import { Toast } from 'vant'

export default function useData() {
  function getCodeRequest(mobile: string) {
    getCode(mobile).then(res => {
      if (res.data.status) {
        Toast.fail(res.data.msg)
      }
    })
  }

  return {
    getCodeRequest
  }
}