/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 10:11:57
 * @LastEditTime: 2021-07-06 17:11:03
 * @LastEditors: zaq
 * @Reference: 
 */
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}