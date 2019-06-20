<template>
  <div class="page page-index">
    <!-- TODO: 由于首页内容比较多，所有将几个界面拆分 -->
    <!-- 首页 -->
    <home :activeId="activeId" ref="qsb"/>

    <!-- 找工作 -->
    <service :activeId="activeId" ref="zgz"/>

    <!-- 赛事 -->
    <event-article :activeId="activeId" ref="qb"/>

    <!-- 我的 -->
    <user-center :activeId="activeId" ref="wd"/>

    <div class="weui-tabbar xg_tabbar fix-iphonex-tabbar">
      <a v-for="item in tabs" :key="item.label" class="weui-tabbar__item" @click="onTabItemClick(item)"
         :class="{'weui-bar__item_on': item.active}">
        <span style="display: inline-block;position: relative;">
          <img :src="'/static/images/' + item.icon + (item.active ? '_active' : '') + '.png'" class="tab__navbar-item-img"/>
        </span>
        <p class="weui-tabbar__label">{{item.label}}</p>
      </a>
    </div>
    <wxc-popup class="J_getUserInfo_Popup" align="center">
      <div class="popup__content">
        <div class="popup__content__hd">错误提示</div>
        <div class="popup__content__bd">无法为您提供服务，请允许我们获取您的 用户信息。</div>
        <div class="popup__content__ft"><button class="userinfo-btn" open-type="getUserInfo" type="primary" @getuserinfo="onGetUserInfo">去授权</button></div>
      </div>
    </wxc-popup>
  </div>
</template>

<script>
  import EventArticle from './event-article'
  import UserCenter from './user-center'
  import Home from './home'
  import Service from './service'
  export default {
    components: {Home, Service, UserCenter, EventArticle},
    data () {
      return {
        activeId: 'qsb',
        tabs: [
          {id: 'qsb', label: '预约', title: '预约记录', icon: 'nav_tab_reservation', active: true},
          {id: 'zgz', label: '服务', title: '球场服务', icon: 'nav_tab_service', active: false},
          {id: 'qb', label: '赛事', title: '高球赛事', icon: 'nav_tab_event', active: false},
          {id: 'wd', label: '会员', title: '会员中心', icon: 'nav_tab_member', active: false}
        ]
      }
    },
    watch: {
      activeId(v){
        if (this.$refs[v] && 'onTabPanelActivated' in this.$refs[v]) {
          this.$refs[v]['onTabPanelActivated'](v)
        }
      }
    },
    onLoad(options){
      setTimeout(async () => {
        try {
          if (this.$store.getters.userCheckLogin && options && options.goToPage) {
            this.$wx.stopPullDownRefresh()
            this.$wx.navigateTo({url: decodeURIComponent(options.goToPage)})
          }
        } catch (e) {
          console.log(e)
        }
      }, 100)
    },
    methods: {
      onBack(e){
        e && e.needRefresh && this.$wx.startPullDownRefresh()
      },
      triggerChildComponentEvent(eventType){
        if (this.$refs[this.activeId] && eventType in this.$refs[this.activeId]) {
          this.$refs[this.activeId][eventType]()
          return true
        }
        return false
      },
      onTabItemClick(item) {
        this.activeId = item.id
        let title = '预约'
        this.tabs.map(tab => {
          if (item === tab) {
            title = tab.title
          }
          tab.active = item === tab
          return tab
        })
        this.$wx.setNavigationBarTitle({
          title: title
        })
      },
      onGetUserInfo(e){
        console.log(e)
        if (e.mp.detail.errMsg === 'getUserInfo:fail auth deny') {
          wx.showToast(
            {
              title: '您拒绝授权我们访问您的用户信息，斜杠伙伴将无法为您提供服务',
              icon: 'none'
            })
        }
        this.$store.dispatch('setWxUserInfo', e.target.userInfo)
      }
    },
    onPullDownRefresh() {
      if (!this.triggerChildComponentEvent('onPullDownRefresh')) {
        this.$wx.stopPullDownRefresh()
      }
    },
    onReachBottom() {
      this.triggerChildComponentEvent('onReachBottom')
    }
  }
</script>
<style lang="less">
  @import "./index.less";
</style>
