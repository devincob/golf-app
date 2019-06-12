<template>
  <div v-show="activeId === 'wd'" class="weui-tab__panel">
    <div class="member_header">
      <img class="vip_img" src="/static/images/member_vip_bg2x.png" alt="">
      <img class="bottom_img" src="/static/images/member_vip_header_bottom.png" alt="">
      <div class="member_header_panel">
        <div class="member_header_info">
          <div class="userAvatarUrl">
            <open-data type="userAvatarUrl"></open-data>
          </div>
          <div style="font-size: 34rpx;">
            <open-data type="userNickName"></open-data>
            <div style="font-size: 28rpx">剩余次数:<span style="font-size: 30rpx;">{{$user.userInfo.residueTimes || 0}}</span></div>
          </div>
        </div>
        <div class="right_vip_info">
          <img src="/static/images/member_vip_icon.png" style="width: 34rpx;height:32rpx;" alt="">
          <span style="margin-left: 10rpx;font-weight: bold">{{$user.userInfo.membLevelName || ''}}</span>
        </div>
        <div class="bottom_buy_wrap">
          <div style="font-size: 28rpx">{{validityDate}}日到期</div>
          <button class="buy_btn">立即续费</button>
        </div>
      </div>
    </div>
    <div style="margin-top:-26rpx;">
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="../../pages/order-list/main">
          <div class="weui-cell__hd"><img src="/static/images/member_order_icon.png" alt="" style="width:28rpx;height: 35rpx;margin-right:34rpx;display:block"></div>
          <div class="weui-cell__bd">
            <p>我的订单</p>
          </div>
          <div class="weui-cell__ft">
            <img src="/static/images/right_back.png" style="width: 14rpx;height:28rpx;" alt="">
          </div>
        </a>
        <a v-if="$user.userInfo.isAdmin === 'Y'" class="weui-cell weui-cell_access weui-cell_example" href="/pages/consumption-confirmation/main">
          <div class="weui-cell__hd"><img src="/static/images/member_consumption_confrim.png" alt="" style="width:32rpx;height: 32rpx;margin-right:34rpx;display:block"></div>
          <div class="weui-cell__bd">
            <p>消费确认</p>
          </div>
          <div class="weui-cell__ft">
            <img src="/static/images/right_back.png" style="width: 14rpx;height:28rpx;" alt="">
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'user-center',
  props: {
    activeId: String
  },
  data() {
    return {
      haveSystemInfo: 'N',
      systemInfo: '',
      user_center_list_information: [
        { title: '基本信息', icon: 'IDFront', tip: '基本的信息，提升工作匹配 ', url: '/pages/user-information/main' },
        { title: '常住地址', icon: 'suozaichengshi', tip: '您的常住地址', url: '/pages/resident-address/main' },
        { title: '实名认证', icon: 'IDBack', tip: '提现认证，实时到账', url: '/pages/authentication/main' },
        { title: '证书技能', icon: 'jianliyulan_jinengpingjia', tip: '查看已有的证书或者技能信息.', url: '/pages/user-ability-certificate/main' },
        { title: '更换手机', icon: 'phone', tip: '更换新的手机号码', url: '/pages/change-phone/main' }
      ],
      user_center_list_operation: [
        // {title: '在线客服', icon: 'huchukefu', tip: '如果您有问题需要帮助，点击这里', url: ''},
        { title: '用户反馈', icon: 'survey', tip: '提建议，吐吐槽都是可以的', url: '/pages/feedback/main' },
        { title: '常见问题', icon: 'information', tip: '汇集各种可能发生的问题', url: '/pages/common-problem/main' },
        { title: '设置', icon: 'set', tip: '', url: '/pages/set/main' }
      ]
    }
  },
  watch: {
    activeId(v) {
    }
  },
  computed: {
    validityDate(){
      return String(this.$user.userInfo.validityDate).split(' ')[0]
    }
  },
  onShow() {
  },
  onLoad() {
  },
  methods: {
    ...mapActions(['refreshUserInfo']),
    onTabPanelActivated(t){
      this.$wx.setNavigationBarColor({
        backgroundColor: '#25da91',
        frontColor: '#ffffff'
      })
    },
    onPullDownRefresh(){
      this.refreshUserInfo().then(this.$wx.stopPullDownRefresh).catch(this.$wx.stopPullDownRefresh)
    }
  }
}
</script>

<style scoped lang="less">
  .weui-tab__panel {
    padding-top: 0;
    .weui-cells {
      margin-top:0;
    }

    .weui-cells:before {
      border-top: none;
    }

    .weui-cells:after {
      border-bottom: none;
    }
    .weui-cell{
      padding: 28rpx 30rpx;
      font-size: 32rpx;
    }

    .weui-cell:before {
      left: 90rpx;
      height: 0;
      border-color: #f4f4f4;
    }
  }
  .member_header {
    height: 346rpx;
    background-color: #25da91;
    display: flex;
    justify-content:center;
    padding-top: 20rpx;
    position: relative;

    .vip_img {
      width: 682rpx;
      height: 326rpx;
      /*margin: auto;*/
    }
    .bottom_img {
      width: 750rpx;
      height: 130rpx;
      position: absolute;
      bottom: 0;
    }
    .member_header_panel {
      position: absolute;
      /*background-color:#ddd;*/
      width:682rpx;
      height:326rpx;
      color: #815c24;
      .member_header_info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        top:44rpx;
        left:32rpx;
        color: #ffffff;
        .userAvatarUrl {
          height: 110rpx;
          width: 110rpx;
          border-radius: 110rpx;
          /*border: 2px #fff solid;*/
          position: relative;
          z-index: 1;
          overflow: hidden;
          margin-right: 16rpx;
        }
      }
      .right_vip_info {
        position:absolute;
        height:40rpx;
        top:0;
        right:0rpx;
        border-top-right-radius:20rpx;
        border-bottom-left-radius:24rpx;
        background-color: #f7dbad;
        padding-left:20rpx;
        padding-right:20rpx;
        display:flex;
        align-items:center;
        font-size:22rpx;
      }
      .bottom_buy_wrap {
        display: flex;
        position: absolute;
        top: 200rpx;
        left: 158rpx;
        font-size: 36rpx;
        .buy_btn {
          /*width:138rpx;*/
          height:40rpx;
          color:#854400;
          border: 1px #854400 solid;
          background-color: transparent;
          overflow:hidden;
          line-height:40rpx;
          font-size: 28rpx;
          margin:0 0 0 100rpx;
          border-radius: 24rpx;
        }
      }
    }
  }
</style>
