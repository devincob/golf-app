import Vue from 'vue'
import App from './order-list'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true,
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#25da91',
    usingComponents: {
      'wxc-abnor': '@wxc-abnor',
      'wxc-loadmore': '@wxc-loadmore',
      'wxc-price': '@wxc-price',
      'wxc-flex': '@wxc-flex',
      'wxc-label': '@wxc-label',
      'wxc-icon': '@wxc-icon',
      'wxc-dialog': '@wxc-dialog',
      'wxc-formid': '@wxc-formid'
    }
  }
}
