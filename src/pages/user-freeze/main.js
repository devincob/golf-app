import Vue from 'vue'
import App from './user-freeze'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '账号被冻结',
    usingComponents: {
      'wxc-abnor': '@wxc-abnor'
    }
  }
}
