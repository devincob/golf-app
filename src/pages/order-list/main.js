import Vue from 'vue'
import App from './order-list'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true,
    usingComponents: {
      'wxc-badge': '@wxc-badge',
      'wxc-cc': '@wxc-cc',
      'wxc-elip': '@wxc-elip',
      'wxc-flex': '@wxc-flex',
      'wxc-abnor': '@wxc-abnor',
      'wxc-label': '@wxc-label',
      'wxc-icon': '@wxc-icon',
      'wxc-calendar': '@wxc-calendar',
      'wxc-loadmore': '@wxc-loadmore',
      'wxc-price': '@wxc-price',
      'wxc-dialog': '@wxc-dialog',
      'wxc-avatar': '@wxc-avatar',
      'wxc-popup': '@wxc-popup',
      'wxc-formid': '@wxc-formid'
    }
  }
}
