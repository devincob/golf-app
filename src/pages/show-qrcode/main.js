import Vue from 'vue'
import App from './show-qrcode'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '球场预约',
    usingComponents: {
      'wxc-toast': '@wxc-toast'
    }
  }
}

