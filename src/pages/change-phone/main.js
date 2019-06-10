import Vue from 'vue'
import App from './change-phone'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '更换手机',
    usingComponents: {
      'wxc-toast': '@wxc-toast'
    }
  }
}

