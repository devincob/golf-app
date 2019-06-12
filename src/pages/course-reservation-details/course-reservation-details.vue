<template>
  <view class="page page-course-reservation-details">
    <view v-if="!isError">
      <view class="banner" :class="{'banner-border-radius': !info || !info.weatherInfo}">
        <view class="banner-left">
          <view class="title">{{info.gcName}}高尔夫球场</view>
          <view class="date mt20">{{info.bookDate}}<span class="ml-sm">{{info.bookWeek}}</span></view>
          <view class="date">{{info.pidName}} ({{info.beginTime}}-{{info.beginTime}})</view>
        </view>
        <view class="banner-right">
          <image src="/static/images/course_reservation_banner_person.png" mode="aspectFit"/>
        </view>
      </view>
      <view v-if="info && info.weatherInfo" class="weather">
        <view class="weather-line">
          <view>{{info.weatherInfo.weatherInfo}}</view>
          <view>{{info.weatherInfo.windDirection}}{{info.weatherInfo.windSize}}</view>
        </view>
        <view class="weather-line">
          <view>{{info.weatherInfo.minTemp}}~{{info.weatherInfo.maxTemp}}</view>
          <view>空气质量指数：{{info.weatherInfo.aqi}} {{aqiFormat}}</view>
        </view>
      </view>
      <view class="qr-code-info">
        <image v-if="info.bookStatusShort === '3'" class="fixed-tips" src="/static/images/tips_cancelled.png" mode="aspectFit"/>
        <image v-if="info.bookStatusShort === '4'" class="fixed-tips" src="/static/images/tips_consumed.png" mode="aspectFit"/>
        <image v-if="info.bookStatusShort === '5'" class="fixed-tips" src="/static/images/tips_expired.png" mode="aspectFit"/>
        <image class="qrcode" :class="{'opacity3': info.bookStatusShort > 2}" :src="'data:image/png;base64,'+info.qrCodeimg" mode="aspectFit"/>
        <view v-if="info.bookStatusShort === '2'" class="time">请向工作人员出示该二维码</view>
        <view v-else class="time">{{info.payConfirmtime}}</view>
        <view v-if="info.bookStatusShort === '2'" @click="onCancelClick" class="status">取消预约</view>
        <view v-else class="status">{{info.bookStatus}}</view>
      </view>
      <view class="reservation-info">
        <view class="reservation-info-item">
          <view class="reservation-info-item-left">场次服务</view>
          <view class="reservation-info-item-right">{{info.pidService || '无'}}</view>
        </view>
        <hr/>
        <view class="reservation-info-item">
          <view class="reservation-info-item-left">单价</view>
          <view class="reservation-info-item-left">{{info.price || 0}}元/人</view>
        </view>
        <hr/>
        <view class="reservation-info-item">
          <view class="reservation-info-item-left">人数</view>
          <view class="reservation-info-item-left reservation-number">
            <view class="num">{{info.bookNum || 0}}</view>
          </view>
        </view>
      </view>
    </view>
    <wxc-abnor
      v-if="isError"
      :title="errorMessage"
      type="REQUEST_ERROR"
      abnor-style="position: fixed;bottom: 440rpx;right:0;"
      @abnortap="queryCourseReservationInfo"></wxc-abnor>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bookId: '',
      info: {},
      isError: false,
      errorMessage: ''
    }
  },
  computed: {
    aqiFormat(){
      let text = ''
      const aqi = this.info && this.info.weatherInfo && this.info.weatherInfo.aqi || -1
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
    async queryCourseReservationInfo(){
      try {
        this.isError = false
        this.$loading.show()
        this.info = await this.$$main.bookingBookDetail({
          bookId: this.bookId
        })
        this.$loading.hide()
      } catch (e) {
        this.$loading.hide()
        this.isError = true
        this.errorMessage = e.message
      }
    },
    onCancelClick(){
      let self = this
      wx.showModal({
        title: '提示',
        content: `是否要取消${this.info.bookDate}${this.info.pidName}的预约？`,
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
        await this.$$main.bookingCancel({
          bookId: this.bookId,
          cancelReason: ''
        })
        this.$loading.hide()
        this.queryCourseReservationInfo()
        this.$wx.showToast({
          title: '预约已取消'
        })
        this.setBackParams({
          needRefresh: true
        })
      } catch (e) {
        this.$loading.hide()
        e.message && this.$wx.showToast({
          title: e.message,
          icon: 'none'
        })
      }
    }
  },
  onLoad: function (options) {
    this.bookId = options && options.bookid || ''
    this.queryCourseReservationInfo()
  }
}
</script>

<style lang="less">
  .page-course-reservation-details{
    padding: 0 34rpx 34rpx 34rpx;
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
    .qr-code-info{
      height: 560rpx;
      text-align: center;
      background: #fff;
      border-radius: 12rpx;
      margin-top: 36rpx;
      position: relative;
      box-shadow:0rpx 5rpx 15rpx 5rpx rgba(228,228,228,0.43);
      .fixed-tips{
        width: 182rpx;
        height: 152rpx;
        position: absolute;
        top: 60rpx;
        right: 40rpx;
      }
      .qrcode{
        width: 304rpx;
        height: 304rpx;
        margin-top: 100rpx;
      }
      .opacity3{
        opacity: 0.3;
      }
      .time{
        font-weight: 400;
        font-size: 26rpx;
        color: #333;
        opacity: 0.6;
      }
      .status{
        font-weight: 500;
        font-size: 32rpx;
        color: #333;
        opacity: 0.6;
        margin-top: 20rpx;
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
  }
</style>
