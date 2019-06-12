import Vue from 'vue'
import {Validator} from 'vee-validate'
import App from './App'
import iCaiwu from './libs/icaiwu'

import './styles/app.less'
import model from './model'

import zhCN from 'vee-validate/dist/locale/zh_CN'
import './libs/validators' // 自定义验证规则
Validator.localize('zh_CN', zhCN)

Vue.use(iCaiwu, {model})

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      'navigationBarTextStyle': 'black',
      'navigationBarTitleText': '人人财务高尔夫',
      'navigationBarBackgroundColor': 'white',
      'backgroundColor': '#f8f8f8'
    },
    permission: {
      'scope.userLocation': {
        'desc': '我们将获取您的位置用于定位所在城市、导航等功能'
      }
    }
  }
}
