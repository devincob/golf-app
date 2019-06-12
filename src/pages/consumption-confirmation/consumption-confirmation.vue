<template>
  <div class="page page-consumption-confirmation">
    <wxc-abnor v-if="result && !errorMessage"
               type="ORDER"
               button="确认消费"
               :buttonStyle="buttonStyle"
               title="点击下方按钮，以确认用户消费"
               :tip="result"
               @abnortap="payRecordConfirm"></wxc-abnor>
    <wxc-abnor type="NOT_FOUND"
               v-else-if="result && errorMessage"
               :buttonStyle="buttonStyle"
               button="重新扫描二维码"
               @abnortap="onScanQRCode"
               title="确认消费失败"
               :tip="errorMessage"></wxc-abnor>
    <wxc-abnor type="TAG"
               v-else-if="confirmSuccess"
               button="扫描二维码"
               :buttonStyle="buttonStyle"
               @abnortap="onScanQRCode"
               title="消费成功"
               tip="确认消费成功，您可以继续扫码确认"></wxc-abnor>
    <wxc-abnor v-else type="SHOP"
               button="扫描二维码"
               title="点击下方按钮，然后扫描客户的预定二维码 "
               tip="或者订单二维码以便确认消费。"
               :buttonStyle="buttonStyle"
               @abnortap="onScanQRCode"></wxc-abnor>
  </div>
</template>

<script>
import MessageResult from '../../components/MessageResult'
import BigButton from '../../components/BigButton'
import BigSegmentButton from '../../components/BigSegmentButton'
export default {
  name: 'page-consumption-confirmation',
  components: {BigSegmentButton, BigButton, MessageResult},
  data() {
    return {
      result: null,
      errorMessage: null,
      confirmSuccess: false,
      buttonStyle: `
        height:100rpx;
        line-height:100rpx;
        width: 550rpx;
        border-radius: 50rpx;
        background: linear-gradient(to right, #29d67f, #26cc77, #22b96a);
        box-shadow: rgba(0, 0, 0, .2) 3rpx 2rpx 30rpx;
        font-size: 36rpx;
      `
    }
  },
  methods: {
    async onScanQRCode(){
      this.errorMessage = null
      this.confirmSuccess = false
      this.result = null
      try {
        const res = await this.$wx.scanCode({
          onlyFromCamera: true
        })
        console.log(res.result) // 扫码结果
        this.result = res.result
      } catch (e) {
        console.log(e)
      }
    },
    async payRecordConfirm(){
      try {
        this.$loading.show()
        const res = await this.$$main.payRecordConfirm({
          confirmCode: this.result
        })
        console.log(res)
        this.confirmSuccess = true
      } catch (e) {
        this.errorMessage = e.message
      } finally {
        this.$loading.hide()
      }
    }
  },
  mounted() {
    this.errorMessage = null
    this.confirmSuccess = false
    this.result = null
  }
}
</script>

<style lang="less">
  .page-consumption-confirmation .abnor__btn {
    height: 100rpx;
  }
</style>
