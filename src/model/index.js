/**
 * Created by wdj on 2017/3/23.
 * index
 */
import MSModel from './MainModel'

let _instances = {}
const models = {
  main: MSModel
}

let server = {
  use (name) {
    if (name in models) {
      if (!(name in _instances)) {
        _instances[name] = new models[name]()
      }
      return _instances[name]
    }
    throw new Error(`not found ${name} model.`)
  }
}

for (let k in models) {
  if (k in models) {
    server['$' + k] = server.use(k)
  }
}

export default models
export const Api = server
