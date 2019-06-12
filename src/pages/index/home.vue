<template>
  <view v-if="activeId === 'qsb'" class="course-reservation-record">
    <view class="list-item" v-for="item in list" :key="i" @click="goToPage('/pages/course-reservation-details/main?bookid='+item.bookId)">
      <view class="list-item-top">
        <view class="list-item-top-left">
          <image src="/static/images/icon_time.png" mode="aspectFit" style="width: 28rpx;height: 28rpx;"/>
          <view class="ml-sm">{{item.bookDate}}</view><view class="ml-lg">{{item.bookWeek}}</view>
        </view>
        <view class="list-item-top-right" :class="{'disable': item.bookStatusShort > 2}">
          {{item.bookStatus}}
        </view>
      </view>
      <view class="list-item-center">
        <view class="list-item-center-left">
          <image src="/static/images/icon_course.png" mode="aspectFit" style="width: 132rpx;height: 132rpx;"/>
          <view class="list-item-center-left-content">
            <view class="title">
              {{item.gcName}}高尔夫球场
            </view>
            <view class="content">
              <view class="label">场次：</view><view class="label-content">{{item.pidName}}</view>
              <view class="label ml-lg">人数：</view><view class="label-content">{{item.bookNum}}人</view>
            </view>
          </view>
        </view>
        <view @click.stop="onQRCodeClick(item)" class="list-item-center-right" :class="{'disable': item.bookStatusShort !== '2'}">
          <image src="/static/images/icon_qrcode.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;"/>
          <view>二维码</view>
        </view>
      </view>
      <view v-if="item.bookStatusShort === '2'" class="list-item-bottom">
        <image @click.stop="onCancelClick(item)" src="/static/images/button_cancel.png" mode="aspectFit" style="width: 151rpx;height: 52rpx;"/>
        <image @click.stop="onNavigateClick(item)" src="/static/images/button_navigate.png" mode="aspectFit" style="width: 151rpx;height: 52rpx;margin-left: 40rpx"/>
      </view>
    </view>
    <!-- 加载中提示 -->
    <wxc-loadmore v-if="loading"></wxc-loadmore>
    <!-- 所有页面加载完毕提示 -->
    <wxc-loadmore is-end v-if="isLast && list && list.length > 0" text="已经到底了"></wxc-loadmore>
    <!-- 报错提示 -->
    <wxc-abnor
      v-if="isError"
      :title="errorMessage"
      type="REQUEST_ERROR"
      abnor-style="position: fixed;bottom: 440rpx;right:0;"
      @abnortap="onRefreshTap"></wxc-abnor>
    <!-- 无数据提示 -->
    <wxc-abnor v-if="(list && list.length === 0 || !list) && !loading && !isError"
               title="暂无球场预约信息"
               image="/static/images/home_empty_tips.png"
               abnor-style="position: fixed;bottom: 440rpx;right:0;"
               img-style="width:100%;"
               title-style="font-size: 36rpx;color: #333;opacity: 0.6;font-weight: bold;"
               type="ORDER"></wxc-abnor>
    <image v-if="(list && list.length === 0 || !list) && !loading && !isError" class="home-tips" src="/static/images/home_tips.png" mode="aspectFit"/>
    <image class="btn-add" src="/static/images/button_add.png" mode="aspectFit" @click="goToPage('/pages/course-reservation/main')"/>
  </view>
</template>

<script>
  export default {
    name: 'home',
    props: {
      activeId: String
    },
    data() {
      return {
        pageIndex: 0,
        pageSize: 10,
        list: [],
        loading: false,
        isLast: false,
        isError: false,
        errorMessage: '',
        dialogTips: '',
        cancelForm: {
          bookId: '',
          cancelReason: ''
        }
      }
    },
    methods: {
      onTabPanelActivated(){
        this.$wx.setNavigationBarColor({
          backgroundColor: '#ffffff',
          frontColor: '#000000'
        })
      },
      onRefreshTap() {
        this.$wx.startPullDownRefresh()
      },
      onPullDownRefresh() {
        this.pageIndex = 0
        this.isLast = false
        this.queryRecordList()
      },
      onReachBottom(){
        if (!this.isLast) {
          this.queryRecordList()
        }
      },
      async queryRecordList(){
        try {
          this.isError = false
          this.loading = true
          if (this.pageIndex === 0){
            this.list = []
          }
          this.$loading.show()
          let data = await this.$$main.bookingMembBooking({
            pageIndex: ++this.pageIndex,
            pageSize: this.pageSize
          })
          const datas = data.datas || []
          if (this.pageIndex === 1) {
            this.list = datas
          } else {
            this.list = [...this.list, ...datas]
          }
          this.isLast = datas.length < this.pageSize
          this.loading = false
          this.$loading.hide()
          this.$wx.stopPullDownRefresh()
        } catch (e) {
          this.$loading.hide()
          e.message && this.$wx.showToast({
            title: e.message,
            icon: 'none'
          })
          this.isError = true
          this.loading = false
          this.errorMessage = e.message
          this.$wx.stopPullDownRefresh()
        }
      },
      onQRCodeClick(item){
        if (item.bookStatusShort !== '2') {
          return
        }
        this.goToPage(`/pages/show-qrcode/main?bookid=${item.bookId}`)
      },
      onCancelClick(item){
        let self = this
        this.cancelForm.bookId = item.bookId
        this.cancelForm.cancelReason = ''
        wx.showModal({
          title: '提示',
          content: `是否要取消${this.$utils.dateFormat(item.bookDate, 'MM月dd日')}${item.pidName}的预约？`,
          success (res) {
            if (res.confirm) {
              self.doCancel()
            }
          }
        })
      },
      async doCancel(){
        try {
          this.$loading.show()
          await this.$$main.bookingCancel(this.cancelForm)
          this.$loading.hide()
          this.$wx.showToast({
            title: '预约已取消'
          })
          let timer = setTimeout(() => {
            this.onRefreshTap()
            clearTimeout(timer)
            timer = null
          }, 1500)
        } catch (e) {
          this.$loading.hide()
          e.message && this.$wx.showToast({
            title: e.message,
            icon: 'none'
          })
        }
      },
      onNavigateClick(item){
        if (!item.coordinate || item.coordinate === '') {
          this.$wx.showToast({
            title: '该球场暂无定位',
            icon: 'none',
            duration: 2000
          })
          return
        }
        this.$wx.openLocation({
          latitude: Number(item.coordinate.split(',')[0]),
          longitude: Number(item.coordinate.split(',')[1])
        })
      }
    },
    onLoad() {
      if (this.$store.getters.userCheckLogin) {
        this.queryRecordList()
      }
    },
    onShow(){
    }
  }
</script>

<style scoped lang="less">
  .course-reservation-record{
    padding: 0 34rpx 134rpx 34rpx;
    height: 100%;
    .list-item:active{
      background: #eee;
    }
    .list-item{
      margin-top: 36rpx;
      padding: 26rpx 34rpx;
      border-radius: 12rpx;
      background: #fff;
      .list-item-top{
        display: flex;
        justify-content: space-between;
        .list-item-top-left{
          font-size: 28rpx;
          color: #000;
          display: flex;
          align-items: center;
        }
        .list-item-top-right{
          font-size: 28rpx;
          color: #1ab976;
          display: flex;
          align-items: center;
          font-weight: bold;
        }
        .disable{
          color: rgba(51,51,51,0.6);
        }
      }
      .list-item-center{
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;
        .list-item-center-left{
          display: flex;
          align-items: center;
          .list-item-center-left-content{
            margin: 0 20rpx;
            display: flex;
            align-items: left;
            flex-direction: column;
            .title{
              font-size: 32rpx;
              font-weight: bold;
              color: #333;
              height: auto;
              line-height: 46rpx;
            }
            .content{
              display: flex;
              height: 60rpx;
              line-height: 60rpx;
              .label{
                font-size: 24rpx;
                font-weight: 500;
                color: #949494;
              }
              .label-content{
                font-size: 24rpx;
                font-weight: 500;
                color: #000;
              }
            }
          }
        }
        .list-item-center-right{
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          view{
            font-size: 18rpx;
            color: #000;
            font-weight: 500;
            margin-top: 5rpx;
          }
        }
        .disable{
          opacity: 0.3;
        }
      }
      .list-item-bottom{
        text-align: right;
        margin-top: 40rpx;
        height: 52rpx;
      }
    }

    .home-tips{
      width: 163rpx;
      height: 155rpx;
      position: fixed;
      bottom: 242rpx;
      right: 20rpx;
    }
    .btn-add{
      width: 92rpx;
      height: 92rpx;
      position: fixed;
      bottom: 124rpx;
      right: 34rpx;
    }
  }
</style>
