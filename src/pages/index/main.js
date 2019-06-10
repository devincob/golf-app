import Vue from 'vue'
import App from './index'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的预约',
    enablePullDownRefresh: true,
    usingComponents: {
      'wxc-badge': '@wxc-badge',
      'wxc-cc': '@wxc-cc',
      'wxc-elip': '@wxc-elip',
      'wxc-flex': '@wxc-flex',
      'wxc-abnor': '@wxc-abnor',
      'wxc-loadmore': '@wxc-loadmore',
      'wxc-price': '@wxc-price',
      'wxc-dialog': '@wxc-dialog',
      'wxc-popup': '@wxc-popup'
    }
  }
}
