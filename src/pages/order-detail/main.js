import Vue from 'vue'
import App from './order-detail'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '订单详情',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#25da91',
    usingComponents: {
      'wxc-loadmore': '@wxc-loadmore',
      'wxc-abnor': '@wxc-abnor',
      'wxc-price': '@wxc-price'
    }
  }
}
