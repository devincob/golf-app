<template>
  <div class="page page-course-reservation-details">
    <view class="banner">

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
        <view class="weui-cell__bd">
          场次服务
        </view>
        <view class="weui-cell__ft">
          body
        </view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">
          单价
        </view>
        <view class="weui-cell__ft">
          body
        </view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">
          人数
        </view>
        <view class="weui-cell__ft">
          body
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  onLoad: function () {}
}
</script>

<style lang="less">
  .page-course-reservation-details{
    padding: 0 34rpx;
    .banner{
      height: 316rpx;
      background: -webkit-gradient(linear, left center, right center, from(#25da91), to(#1ab976));
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
        .weui-cell__bd{
          font-weight: 500;
          font-size: 30rpx;
          color: #333;
        }
        .weui-cell__ft{
          font-weight: 500;
          font-size: 30rpx;
          color: #333;
        }
      }
    }
  }
</style>
