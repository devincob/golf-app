<template>
  <view class="page page-show-qrcode">
    <view v-if="info && info.qrCodeimg" class="qrcode-body">
      <image class="fixed-tips" :src="'data:image/png;base64,'+info.qrCodeimg" mode="aspectFit" style="width: 400rpx;height: 400rpx;"/>
      <view>请向工作人员出示该二维码</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bookId: '',
      info: {}
    }
  },
  methods: {
    async queryCourseReservationInfo(){
      try {
        this.$loading.show()
        this.info = await this.$$main.bookingBookDetail({
          bookId: this.bookId
        })
        this.$loading.hide()
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
  .page-show-qrcode{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .qrcode-body{
      width: 100%;
      text-align: center;
      view{
        font-size: 32rpx;
        color: rgba(51,51,51,0.6);
        font-weight: bold;
      }
    }
  }
</style>
