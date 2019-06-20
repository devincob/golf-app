import Vue from 'vue'
import App from './index'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '预约记录',
    enablePullDownRefresh: true,
    'navigationBarTextStyle': 'black',
    'navigationBarBackgroundColor': '#ffffff',
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
