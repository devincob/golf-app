import Vue from 'vue'
import App from './bind-phone'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '绑定手机',
    usingComponents: {
      'wxc-toast': '@wxc-toast'
    }
  }
}

