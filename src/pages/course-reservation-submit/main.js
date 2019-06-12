import Vue from 'vue'
import App from './course-reservation-submit'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '球场预约',
    usingComponents: {
      'wxc-popup': '@wxc-popup',
      'wxc-abnor': '@wxc-abnor'
    }
  }
}

