import Vue from 'vue'
import App from './article-details'
const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '赛事详情',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ffffff',
    usingComponents: {
      'wxc-toast': '@wxc-toast',
      'wxc-loadmore': '@wxc-loadmore',
      'wxc-abnor': '@wxc-abnor'
    }
  }
}

