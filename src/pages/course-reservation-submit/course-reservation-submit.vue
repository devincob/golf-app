<template>
  <view class="page page-course-reservation-details">
    <view class="banner">
      <view class="banner-left">
        <view class="title">{{courseInfo.gcName}}高尔夫球场</view>
        <view class="date mt20">{{courseInfo.bookDate}}<span class="ml-sm">{{courseInfo.week}}</span></view>
        <view class="date">{{courseInfo.pidName}}</view>
      </view>
      <view class="banner-right">
        <image src="/static/images/course_reservation_banner_person.png" mode="aspectFit"/>
      </view>
    </view>
    <view class="weather weui-flex">
      <view class="weui-flex__item weather-left">28℃</view>
      <view class="weui-flex__item weather-center">28℃</view>
      <view class="weui-flex__item text-right weather-right">
        <view>东南风3-4级</view>
        <view>空气质量指数：26.0 优</view>
      </view>
    </view>
    <view class="reservation-info weui-cells">
      <view class="weui-cell">
        <view class="weui-cell__bd">场次服务</view>
        <view class="weui-cell__ft">{{courseInfo.pIDService}}</view>
      </view>
      <hr/>
      <view class="weui-cell">
        <view class="weui-cell__bd">单价</view>
        <view class="weui-cell__ft">{{courseInfo.price}}元/人</view>
      </view>
      <hr/>
      <view class="weui-cell">
        <view class="weui-cell__bd">人数</view>
        <view class="weui-cell__ft reservation-number">
          <image class="btn-del" src="/static/images/button_del.png" mode="aspectFit" @click="num--"/>
          <view class="num">{{num}}</view>
          <image class="btn-add" src="/static/images/button_add.png" mode="aspectFit" @click="num++"/>
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
    <wxc-popup
      class="pay-dialog"
      animation-mode="bottom"
      align="bottom">
      <view class="pay-dialog-content" @click.stop>
        <view class="title">支付方式</view>
        <view class="sum-amount">￥{{sumAmount}}</view>
        <view class="weui-cells weui-cells_radio pay-choice">
          <label class="weui-cell weui-check__label" @click="payType = 'W'">
            <view class="weui-cell__bd">
              <image src="/static/images/pay_wechat.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;"/>
              <span class="type-name">微信支付</span>
            </view>
            <view class="weui-cell__ft">
              <image v-if="payType === 'W'" src="/static/images/pay_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
              <image v-else src="/static/images/pay_no_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
            </view>
          </label>
          <hr/>
          <label class="weui-cell weui-check__label" @click="payType = 'V'">
            <view class="weui-cell__bd">
              <image src="/static/images/pay_logo.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;"/>
              <view style="display: flex;align-items: baseline">
                <span class="type-name">会员抵扣</span><span class="type-name-tips">（剩余抵扣人次：20人）</span>
              </view>
            </view>
            <view class="weui-cell__ft">
              <image v-if="payType === 'V'" src="/static/images/pay_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
              <image v-else src="/static/images/pay_no_choice.png" mode="aspectFit" style="width: 38rpx;height: 38rpx;"/>
            </view>
          </label>
        </view>
        <div class="tabbar">
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
      payType: 'W'
    }
  },
  watch: {
    num(val){
      let max = this.courseInfo.residueTimes || 0
      if (val < 1) {
        this.num = 1
      } else if (val > max){
        this.num = max
      }
    }
  },
  computed: {
    sumAmount(){
      console.log(this.courseInfo.price)
      let price = this.courseInfo.price || 0
      return (price * this.num).toFixed(1)
    }
  },
  methods: {
    async queryGolfCourseInfo(){
      try {
        this.$loading.show()
        this.courseInfo = await this.$$main.golfCoursePeriodDetail({
          pIDId: this.pid,
          bookDate: this.date
        })
        this.$loading.hide()
      } catch (e) {
        this.$loading.hide()
        e.message && this.$wx.showToast({
          title: e.message,
          icon: 'none'
        })
      }
    },
    onSubmitClick(){
      this.$find('.pay-dialog').show()
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
    .banner{
      height: 316rpx;
      padding-left: 34rpx;
      background: -webkit-gradient(linear, left center, right center, from(#25da91), to(#1ab976));
      display: flex;
      justify-content: space-between;
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
      font-family: PingFangSC;
      flex-wrap: nowrap;
      .weather-left{
        flex: 1;
        font-size: 48rpx;
        color: #333;
      }
      .weather-center{
        flex: 1;
      }
      .weather-right{
        flex: 2;
        font-size: 24rpx;
        color: #333;
        display:flex;
        justify-content:center;
        flex-direction:column;
        view{
          width: auto;
          height: 30rpx;
          line-height: 30rpx;
        }
      }
    }
    .reservation-info{
      border-radius: 12rpx;
      position: unset;
      .weui-cell{
        position: unset;
        display: flex;
        align-items:center;
        justify-content:center;
        vertical-align: middle;
        .weui-cell__bd{
          height: 50rpx;
          line-height: 50rpx;
          font-weight: 500;
          font-size: 30rpx;
          color: #333;
        }
        .weui-cell__ft{
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
          /*position: none;*/
          border-top: 2rpx solid #f4f4f4;
          border-bottom: 2rpx solid #f4f4f4;
          .weui-cell{
            /*position: none;*/
          }
          hr{
            height:2rpx;
            border:none;
            border-top:2rpx solid #f4f4f4;
            margin: 0 34rpx;
          }
          .weui-cell__bd{
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
          .weui-cell__ft{
            display: flex;
            align-items: center;
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
