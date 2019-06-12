<template>
  <view class="page page-course-reservation-details">
    <view v-if="!isError">
      <view class="banner" :class="{'banner-border-radius': !courseInfo || !courseInfo.weatherInfo}">
        <view class="banner-left">
          <view class="title">{{courseInfo.gcName}}高尔夫球场</view>
          <view class="date mt20">{{courseInfo.bookDate}}<span class="ml-sm">{{courseInfo.week}}</span></view>
          <view class="date">{{courseInfo.pidName}}</view>
        </view>
        <view class="banner-right">
          <image src="/static/images/course_reservation_banner_person.png" mode="aspectFit"/>
        </view>
      </view>
      <view v-if="courseInfo && courseInfo.weatherInfo" class="weather">
        <view class="weather-line">
          <view>{{courseInfo.weatherInfo.weatherInfo}}</view>
          <view>{{courseInfo.weatherInfo.windDirection}}{{courseInfo.weatherInfo.windSize}}</view>
        </view>
        <view class="weather-line">
          <view>{{courseInfo.weatherInfo.minTemp}}~{{courseInfo.weatherInfo.maxTemp}}</view>
          <view>空气质量指数：{{courseInfo.weatherInfo.aqi}} {{aqiFormat}}</view>
        </view>
      </view>
      <view class="reservation-info">
        <view class="reservation-info-item">
          <view class="reservation-info-item-left">场次服务</view>
          <view class="reservation-info-item-right">{{courseInfo.pidService || '无'}}</view>
        </view>
        <hr/>
        <view class="reservation-info-item">
          <view class="reservation-info-item-left">单价</view>
          <view class="reservation-info-item-right">{{courseInfo.price}}元/人</view>
        </view>
        <hr/>
        <view class="reservation-info-item">
          <view class="reservation-info-item-left">人数</view>
          <view class="reservation-info-item-right reservation-number">
            <image class="btn-del" src="/static/images/button_del.png" mode="aspectFit" @click="onNumClick(-1)"/>
            <view class="num">{{num}}</view>
            <image class="btn-add" src="/static/images/button_add.png" mode="aspectFit" @click="onNumClick(1)"/>
          </view>
        </view>
      </view>
      <view class="footer">
        <view class="btn-submit">
          <view class="sum-div">
            <span class="sum">共计</span><span class="sum-num">￥{{sumAmount}}</span>
          </view>
          <view class="submit" @click="onSubmitClick">
            立即预定
          </view>
        </view>
      </view>
    </view>
    <wxc-abnor
      v-if="isError"
      :title="errorMessage"
      type="REQUEST_ERROR"
      abnor-style="position: fixed;bottom: 440rpx;right:0;"
      @abnortap="queryGolfCourseInfo"></wxc-abnor>
    <wxc-popup
      class="pay-dialog"
      animation-mode="bottom"
      align="bottom">
      <view class="pay-dialog-content" @click.stop>
        <view class="title">支付方式</view>
        <view class="sum-amount">￥{{sumAmount}}</view>
        <view class="pay-choice">
          <view class="pay-choice-item" @click="payType = '1'">
            <view class="pay-choice-item-left">
              <image src="/static/images/pay_wechat.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;"/>
              <span class="type-name">微信支付</span>
            </view>
            <view class="pay-choice-item-right">
              <image v-if="payType === '1'" src="/static/images/pay_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
              <image v-else src="/static/images/pay_no_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
            </view>
          </view>
          <hr/>
          <view class="pay-choice-item" @click="onVipItemClick" :class="{'disable': residueTimes < num}">
            <view class="pay-choice-item-left">
              <image src="/static/images/pay_logo.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;"/>
              <span class="type-name">会员抵扣</span><span class="type-name-tips">（剩余抵扣人次：{{residueTimes}}人）</span>
            </view>
            <view class="pay-choice-item-right">
              <image v-if="payType === '2'" src="/static/images/pay_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
              <image v-else src="/static/images/pay_no_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
            </view>
          </view>
        </view>
        <div class="tabbar" @click="onPayClick">
          <a class="weui-tabbar__item weui-bar__item_on">立即支付</a>
        </div>
      </view>
    </wxc-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pid: '',
      date: '',
      courseInfo: {},
      num: 1,
      payType: '1',
      isError: false,
      errorMessage: ''
    }
  },
  computed: {
    sumAmount(){
      let price = this.courseInfo.price || 0
      return (price * this.num).toFixed(2)
    },
    residueTimes(){
      return this.$user && this.$user.userInfo && this.$user.userInfo.residueTimes || 0
    },
    aqiFormat(){
      let text = ''
      const aqi = this.courseInfo && this.courseInfo.weatherInfo && this.courseInfo.weatherInfo.aqi || -1
      if (aqi >= 0 && aqi <= 50) {
        text = '优'
      } else if (aqi > 50 && aqi <= 100) {
        text = '良'
      } else if (aqi > 100 && aqi <= 150) {
        text = '轻微污染'
      } else if (aqi > 150 && aqi <= 200) {
        text = '轻度污染'
      } else if (aqi > 200 && aqi <= 250) {
        text = '中度污染'
      } else if (aqi > 250 && aqi <= 300) {
        text = '中度重污染'
      } else if (aqi > 300) {
        text = '重污染'
      }
      return text
    }
  },
  methods: {
    onNumClick(i){
      this.num = this.num + i
      let max = this.courseInfo && this.courseInfo.residueTimes || 1
      if (this.num < 1) {
        this.num = 1
      } else if (this.num > max){
        this.num = max
      }
    },
    async queryGolfCourseInfo(){
      try {
        this.isError = false
        this.$loading.show()
        await this.$store.dispatch('refreshUserInfo')
        this.num = 1
        this.courseInfo = await this.$$main.golfCoursePeriodDetail({
          pIDId: this.pid,
          bookDate: this.date
        })
        this.$loading.hide()
      } catch (e) {
        this.$loading.hide()
        this.isError = true
        this.errorMessage = e.message
      }
    },
    onDialogHide(){
      this.$find('.pay-dialog') && this.$find('.pay-dialog').hide()
    },
    onSubmitClick(){
      this.payType = '1'
      this.$find('.pay-dialog') && this.$find('.pay-dialog').show()
    },
    onVipItemClick(){
      if (this.residueTimes < this.num) {
        return
      }
      this.payType = '2'
    },
    onPayClick(){
      this.doReservation()
    },
    async doReservation(){
      try {
        this.$loading.show()
        let data = await this.$$main.bookingBook({
          gCId: this.courseInfo.gcId, // 球场Id
          pIDId: this.pid, // 场次Id
          bookDate: this.date, // 预定日期
          bookNum: this.num, // 预定人数
          payType: this.payType, // 支付方式
          amount: this.sumAmount // 支付金额
        })
        this.$loading.hide()
        if (this.payType === '1') {
          this.doPay(data.bookId)
        } else {
          this.onPayFinish('场次预定成功', 'success')
          // wx.navigateBack({
          //   delta: 2
          // })
        }
      } catch (e) {
        this.$loading.hide()
        e.message && this.$wx.showToast({
          title: e.message,
          icon: 'none'
        })
      }
    },
    async doPay(id){
      try {
        this.$loading.show()
        let data = await this.$$main.paymentPay({
          orderId: id,
          orderType: 'B'
        })
        this.$loading.hide()
        const self = this
        wx.requestPayment({
          ...JSON.parse(data.jsApiParams),
          success () {
            wx.showModal({
              title: '提示',
              content: `支付成功`,
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  self.onPayFinish('场次预定成功', 'success')
                }
              }
            })
          },
          fail () {
            self.onPayFail(id)
          }
        })
      } catch (e) {
        this.$loading.hide()
        e.message && this.$wx.showToast({
          title: e.message,
          icon: 'none'
        })
      }
    },
    onPayFail(id){
      const self = this
      wx.showModal({
        title: '提示',
        content: `支付失败，是否需要重新支付？`,
        cancelText: '退出支付',
        confirmText: '重新支付',
        success (res) {
          if (res.confirm) {
            self.doPay(id)
          } else if (res.cancel) {
            self.onPayFinish('场次预定失败', 'none')
          }
        }
      })
    },
    onPayFinish(text, icon){
      this.onDialogHide()
      this.queryGolfCourseInfo()
      let timer = setTimeout(() => {
        wx.showToast({
          title: text,
          icon: icon,
          duration: 2000
        })
        icon === 'success' && this.setBackParams({
          needRefresh: true
        })
        clearTimeout(timer)
        timer = null
      }, 300)
    }
  },
  onLoad: function (options) {
    this.pid = options && options.pid || ''
    this.date = options && options.date || ''
    this.queryGolfCourseInfo()
  }
}
</script>

<style lang="less">
  .page-course-reservation-details{
    padding: 0 34rpx;
    .banner-border-radius{
      border-radius: 0 0 12rpx 12rpx;
    }
    .banner{
      height: 316rpx;
      padding-left: 34rpx;
      background: -webkit-gradient(linear, left center, right center, from(#25da91), to(#1ab976));
      display: flex;
      justify-content: space-between;
      box-shadow:0rpx 5rpx 15rpx 5rpx rgba(228,228,228,0.43);
      .banner-left{
        .title{
          font-size: 42rpx;
          color: #fff;
          padding-right: 20rpx;
          font-weight: 600;
          margin-top: 60rpx;
          line-height: 50rpx;
          height: 100rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient: vertical;
        }
        .date{
          font-size: 28rpx;
          color: #fff;
          font-weight: 500;
        }
        .mt20{
          margin-top: 20rpx;
        }
      }
      .banner-right{
        padding-right: 17rpx;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        image{
          width: 215rpx;
          height: 171rpx;
        }
      }
    }
    .weather{
      height: 124rpx;
      line-height: 124rpx;
      padding: 0 34rpx;
      background: #fff;
      border-radius: 0 0 12rpx 12rpx;
      flex-wrap: nowrap;
      box-shadow:0rpx 5rpx 15rpx 5rpx rgba(228,228,228,0.43);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .weather-line{
        font-size: 24rpx;
        color: #333;
        height: 42rpx;
        line-height: 42rpx;
        display: flex;
        justify-content: space-between;
      }
    }
    .reservation-info{
      border-radius: 12rpx;
      background: #fff;
      margin: 36rpx 0;
      box-shadow:0rpx 5rpx 15rpx 5rpx rgba(228,228,228,0.43);
      .reservation-info-item{
        padding: 27rpx 28rpx;
        display: flex;
        justify-content: space-between;
        .reservation-info-item-left{
          height: 50rpx;
          line-height: 50rpx;
          font-weight: 500;
          font-size: 30rpx;
          color: #333;
        }
        .reservation-info-item-right{
          height: 50rpx;
          line-height: 50rpx;
          font-weight: 500;
          font-size: 30rpx;
          color: #333;
          image{
            width: 60rpx;
            height: 60rpx;
          }
          .num{
            width: 50rpx;
            text-align: center;
          }
          .btn-del{
            margin-right: 30rpx;
          }
          .btn-add{
            margin-left: 30rpx;
          }
        }
        .reservation-number{
          display: flex;
          align-items:center;
          justify-content:center;
        }
      }
      hr{
        height:2rpx;
        border:none;
        border-top:2rpx solid #f4f4f4;
        margin: 0 34rpx;
      }
    }
    .footer{
      position: fixed;
      width: 682rpx;
      height: 119rpx;
      bottom: 64rpx;
      .btn-submit{
        width: 100%;
        height: 100%;
        background-image: url("../../../static/images/button_big_bg_submit.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        .sum-div{
          padding-left: 50rpx;
          padding-bottom:10rpx;
          height: 120rpx;
          line-height: 120rpx;
          text-align: center;
          vertical-align: middle;
          display: flex;
          align-items: center;
          .sum{
            font-size: 32rpx;
            font-weight: bold;
          }
          .sum-num{
            margin-left: 10rpx;
            font-size: 42rpx;
            font-weight: 500;
          }
        }
        .submit{
          font-size: 32rpx;
          font-weight: bold;
          width: 210rpx;
          height: 120rpx;
          line-height: 120rpx;
          text-align: center;
          vertical-align: middle;
          padding-bottom: 12rpx;
          padding-right: 10rpx;
        }
      }
    }
    .pay-dialog{
      .pay-dialog-content{
        width: 100%;
        min-height: 200px;
        height: auto;
        line-height: 100%;
        background: #ffffff;
        font-size: 15px;
        text-align: center;
        padding: 0 34rpx;
        border-radius: 12rpx 12rpx 0 0;
        .title{
          width: 100%;
          height: 60rpx;
          line-height: 60rpx;
          margin-top: 58rpx;
          text-align: center;
          font-size: 44rpx;
          font-weight: bold;
          color: #333;
        }
        .sum-amount{
          width: 100%;
          height: 60rpx;
          line-height: 60rpx;
          margin-top: 80rpx;
          text-align: center;
          font-size: 70rpx;
          font-weight: bold;
          color: #f00000;
        }
        .pay-choice{
          margin-top: 70rpx;
          margin-bottom: 200rpx;
          border-top: 2rpx solid #f4f4f4;
          border-bottom: 2rpx solid #f4f4f4;
          .pay-choice-item:active{
            background: #eee;
          }
          .disable{
            background: #ccc;
          }
          .pay-choice-item.disable:active{
            background: #ccc;
          }
          .pay-choice-item{
            padding: 27rpx 28rpx;
            display: flex;
            justify-content: space-between;
            .pay-choice-item-left{
              display: flex;
              align-items: center;
              .type-name{
                color: #000;
                font-size: 32rpx;
                margin-left: 34rpx;
              }
              .type-name-tips{
                color: #999;
                font-size: 24rpx;
              }
            }
            .pay-choice-item-right{
              display: flex;
              align-items: center;
            }
          }
          hr{
            height:2rpx;
            border:none;
            border-top:2rpx solid #f4f4f4;
            margin: 0 34rpx;
          }
        }
        .tabbar {
          height: 119rpx;
          line-height: 119rpx;
          width: 682rpx;
          position: fixed;
          bottom: 20rpx;
          background: #fff;
          .weui-bar__item_on {
            background: url("../../../static/images/button_big_bg.png");
            background-size: 100% 100%;
            color: #fff;
            padding-top: 0;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
