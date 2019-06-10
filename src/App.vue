<script>
import { mapActions } from 'vuex'
import { $event } from './libs/utils'
let init = false

export default {
  methods: {
    ...mapActions(['fetchUserInfo', 'refreshUserInfo', 'setWxUserInfo', 'clearUserInfo']),
    async login() {
      try {
        const result = await this.$wx.login()
        await this.fetchUserInfo(result.code)
        // await this.getWxUserInfo()
        if (this.checkUserInfo()) {
          const page = this.getCurrentPage()
          const url = '/' + (page ? page.route : 'pages/index/main')
          this.$wx.redirectTo({ url })
        }
      } catch (e) {
        console.error(e)
      }
    },
    checkUserInfo() {
      const userInfo = this.$user.userInfo
      const currentUrl = '/' + this.$mp.app.globalData.appOptions.path
      let isOk = false
      // 判断用户是否已绑定手机号码
      if (!userInfo || !userInfo.membId) {
        // 是否绑定手机号
        currentUrl !== '/pages/bind-phone/main' && this.$wx.reLaunch({
          url: '/pages/bind-phone/main'
        })
      } else {
        isOk = true
      }
      return isOk
    },
    async init() {
      // 增加接口，checkLogin 每次登录时使用checkLogin 检查会话状态
      // 如果会话无效，则调用login接口
      try {
        // let result = await this.$$main.userLoginCheck()
        let result = this.$store.getters.userCheckLogin
        if (!result) {
          await this.login()
        } else {
          await this.refreshUserInfo()
          this.checkUserInfo()
        }
      } catch (e) {
        console.log(e)
      }
    },
    uploadFormId() {
      // const formIds = wx.getStorageSync('formIds')
      // if (formIds && formIds.length) {
      //   wx.removeStorageSync('formIds')
      //   this.$$main.commonUploadFormId({
      //     formDatas: formIds
      //   }).then(res => {
      //     console.log(res)
      //   }).catch(console.error)
      // }
    }
  },
  onShow(options) {
    // 先缓存promoter_id
    if (options && options.query && options.query.scene) {
      let s = decodeURIComponent(options.query.scene)
      let scene = this.$utils.parseQueryString(s)
      if (scene && scene.JAct) {
        if (scene.JAct === 'p') {
          this.$utils.Storage.set('promoter_id', scene.JPId)
        }
      }
    }
    // 再调用init初始化数据，否则可能导致注册是promoter_id 丢失
    init && this.init()
    // this.__interval = setInterval(this.uploadFormId, 3000)
  },
  onHide() {
    // if (this.__interval) {
    //   clearInterval(this.__interval)
    //   this.__interval = null
    // }
  },
  async mounted() {
    try {
      // 获取用户信息
      init || await this.init()
      init = true
    } catch (e) {
      console.error(e)
    } finally {
      $event.on('login_expired', () => {
        this.clearUserInfo()
        this.login()
      })
      $event.on('user_access_disable', (e) => {
        if (this.getCurrentPage().route !== 'pages/user-freeze/main') this.goToPage('/pages/user-freeze/main?msg=' + encodeURIComponent(e.message))
      })
    }
  }
}
</script>

<style>
/*@import "~weui-wxss/dist/style/weui.wxss";*/
</style>
