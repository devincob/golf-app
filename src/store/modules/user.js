import {SET_USER_INFO, CLEAR_USER_INFO, SET_USER_LOCATION, SET_WECHAT_USER_INFO} from '../mutationTypes'
import {getState} from '../plugins'
import {Api} from '../../model'
import {Storage} from '../../libs/utils'

export default {
  state: getState('user') || {
    userInfo: {},
    location: {},
    wxUserInfo: {}
  },
  getters: {
    userCheckLogin: state => {
      return !!(state.userInfo && (state.userInfo.authToken || state.userInfo.sessionId))
    },
    getUserLocation: state => state.location || {}
  },
  actions: {
    setUserInfo({commit}, payload) {
      commit(SET_USER_INFO, payload)
    },
    setWxUserInfo({commit}, payload) {
      commit(SET_WECHAT_USER_INFO, payload)
    },
    /**
     * 获取用户信息并放入Store中
     * @param commit
     * @param {String} [code] 微信登录返回的code, 如果用户已存在sessionId可不填写
     * @returns {Promise<any>}
     */
    fetchUserInfo({commit}, code) {
      let promoterId = Storage.get('promoter_id') || 0
      return new Promise((resolve, reject) => {
        let params = {
          code: code
        }
        if (promoterId) {
          params.promoterId = promoterId
        }
        Api.$main.memberInfo(params).then(userInfo => {
          commit(SET_USER_INFO, userInfo)
          resolve(userInfo)
        }).catch(e => {
          console.log(e.message)
          reject(e)
        })
      })
    },
    async refreshUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        Api.$main.memberInfo().then(userInfo => {
          const mergeInfo = {
            ...state.userInfo,
            ...userInfo
          }
          commit(SET_USER_INFO, mergeInfo)
          resolve(mergeInfo)
        }).catch(reject)
      })
    },
    clearUserInfo({commit}) {
      commit(CLEAR_USER_INFO)
    },
    setUserLocation({commit}, location) {
      commit(SET_USER_LOCATION, location)
    }
  },
  mutations: {
    [SET_USER_INFO](state, userInfo) {
      state.userInfo = userInfo
    },
    [CLEAR_USER_INFO](state) {
      state.userInfo = {}
    },
    [SET_USER_LOCATION](state, location) {
      state.location = location
    },
    [SET_WECHAT_USER_INFO](state, info) {
      state.wxUserInfo = info || {}
    }
  }
}
