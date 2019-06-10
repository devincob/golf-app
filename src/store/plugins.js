import {Storage} from '../libs/utils'

const filters = ['addRouteChain', 'setPageDirection', 'popRouteChain']

export const StorageStore = (store) => {
  store.subscribe((mutation, state) => {
    try {
      if (filters.indexOf(mutation.type) === -1) {
        let obj = {}
        Object.keys(store['_modules']['root']['_children']).forEach(moduleName => {
          if (['region'].indexOf(moduleName) === -1) {
            obj[moduleName] = state[moduleName]
          }
        })
        Storage.set('VUEX_STATE', obj)
      }
    } catch (e) {
      console.log(e)
    }
  })
}

/**
 * 获取保存在Storage中的state
 * @param moduleName 模块名
 * @returns {*}
 */
export const getState = (moduleName) => {
  const state = Storage.get('VUEX_STATE')
  if (state) return moduleName ? state[moduleName] : state
  return state
}
