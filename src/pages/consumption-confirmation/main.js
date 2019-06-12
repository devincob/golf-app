import Vue from 'vue'
import App from './consumption-confirmation'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '消费确认',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#25da91',
    usingComponents: {
      'wxc-abnor': '@wxc-abnor'
    }
  }
}

