<template>
  <div class="page page-order-detail">
    <!-- 有数据正常渲染 -->
    <view class="bg_green"></view>
    <view class="order_settle_list" v-if="settleList.orderStatus && !isError">
      <view class="qrcode-body">
        <view class="QR_code_box">
          <image  class="qrcode"  alt="二维码" :src="'data:image/png;base64,'+settleList.qrCodeimg" mode="aspectFit"/>
          <view class="confirm_box">
            <view class="confirm_pay">{{settleList.orderStatus}}</view>
            <view class="confirm_date">{{settleList.orderTime}}</view>
          </view>
        </view>
      </view>

      <div class="weui-flex model-order-list">
        <div style="width: 100%;">
          <div class="model-title">订单商品</div>
          <div class="weui-cells_after-title">
            <div class=" weui-cell_access"  v-for="(item, index) in settleList.orderProducts" :key="index" >
              <div class="weui-cell__hd">
                <div class="order_img">
                  <x-image  alt="" :src="item.imgUrl || '/static/images/photo.jpg'"/>
                </div>
              </div>
              <div class="weui-cell__bd dec_line">
                  <div class="order_item_name">{{item.productName}}</div>
                  <div class="order_item_dsc">{{item.productDescribe}}</div>
                  <div class="order_item_price">
                    <span>
                    <wxc-price :value="item.price " decimal="2"></wxc-price> x {{item.num}}
                    </span>
                    <span style="float: right;">
                    <wxc-price :value="item.price * item.num" decimal="2"></wxc-price>
                  </span>
                  </div>
              </div>
            </div>
          </div>
          <div class="bill-title">
              <span class="order_pay_title">实付金额</span>
              <span class="order_pay_price">
                <wxc-price :value="settleList.totalAmount" decimal="2" symbol="￥"></wxc-price>
              </span>
          </div>
        </div>
      </div>

      <div class="order_desc">
        <div>
          <div class="model-title" style="margin-bottom:8px; ">订单信息</div>
          <div class="info_list">订单编号：<span class="list-content">{{settleList.orderCode}}</span></div>
          <div class="info_list">下单时间：<span class="list-content">{{settleList.orderTime}}</span></div>
          <div class="info_list">订单金额：<span class="list-content">
          <wxc-price
            :value="settleList.totalAmount"
            decimal="2" symbol="￥"></wxc-price>
          </span></div>
          <div class=" info_list" >支付方式：<span class="list-content">{{settleList.payType}}</span></div>
        </div>
      </div>
    </view>
    <!-- 报错提示 -->
    <wxc-abnor
      v-if="isError"
      :title="errorMessage"
      type="REQUEST_ERROR"
      @abnortap="onRefreshTap"></wxc-abnor>
    <!-- 加载中提示 -->
  </div>
</template>

<script>
  import XImage from '../../libs/components/Image'

  export default {
    components: {XImage},
    name: 'order_detail',
    data() {
      return {
        orderId: 0,
        settleList: {
          businessType: '',
          orderCode: '',
          orderId: 0,
          orderProducts: [],
          orderStatus: '',
          productDescribe: '',
          productName: '',
          orderTime: '',
          payConfirmtime: '',
          qrCodeimg: '',
          totalCount: 0,
          totalAmount: 0,
          payType: ''
        },
        totalCount: 0,
        isError: false,
        errorMessage: ''
      }
    },
    methods: {
      onRefreshTap() {
        this.$wx.startPullDownRefresh()
      },
      async loadWithdrawalsList(){
        try {
          this.isError = false
          this.$loading.show()
          const datas = await this.$$main.productOrderDetail({
            orderId: this.orderId
          })
          this.settleList = datas
          this.$loading.hide()
        } catch (e) {
          this.$loading.hide()
          this.isError = true
          this.errorMessage = e.message
        }
      }
    },
    mounted(){
    },
    onLoad(option){
      this.orderId = option.orderId || 0
      this.settleList = {
        businessType: '',
        orderCode: '',
        orderId: 0,
        orderProducts: [],
        orderStatus: '',
        productDescribe: '',
        productName: '',
        orderTime: '',
        payConfirmtime: '',
        qrCodeimg: '',
        totalCount: 0,
        totalAmount: 0,
        payType: ''
      }
      this.loadWithdrawalsList()
    },
    // 下拉刷新页面
    onPullDownRefresh() {
      this.loadWithdrawalsList().then(() => {
        this.$wx.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="less">
  .bg_green{
    background: #25da91;
    height: 100px;
    /*margin-top: -8rpx;*/
  }
  .qrcode{
    width: 304rpx;
    height: 304rpx;
    margin-bottom: 40rpx;
  }
  .page-order-detail{
    .order_settle_list{
      position:relative;
      top:-180rpx;
      margin-top:0;
      padding: 34rpx;
      .qrcode-body{
        margin-bottom:36rpx;
        background:#fff;
        justify-content:center;
        display:flex;
        border-radius:10rpx;
        .QR_code_box{
        flex-direction:column;  width: 684rpx; height: 618rpx;
        display:flex; justify-content: center;align-items: center;
      }
      .confirm_box{
          text-align: center;
          .confirm_pay{
            font-size: 32rpx; color: #1ad976;
          }
          .confirm_date {
            font-size: 24rpx;color: #333333;opacity: 0.6;
          }
        }
      }
      .model-order-list{
        /*margin-top: 18px;*/
        .bill-title{
          display: flex;justify-content: flex-end;  align-items: baseline;
          .order_pay_price {
            font-size: 14px; padding-right: 5px;
          }
          .order_pay_price{
            font-size: 48rpx; font-weight:bold;
          }
        }
        .weui-cell_access{
          display:flex;
          padding: 26rpx 0;
          div.order_img
          {
            width:60px;
            height:60px;
            text-align:center;
          }
          div.order_img img
          {
            width: 100%;
            height: 100%;
            display:inline;
          }
          .dec_line{
            border-bottom: 1rpx solid rgba(51, 51, 51, 0.1);
            padding-left: 13px;
            .order_item_name{
              font-size: 28rpx;color: #33333;
              font-weight: 500px;
            }
            .order_item_dsc{
              font-size:22rpx;
              color:#33333;
              opacity:0.6;
              /*padding:6rpx 0 11rpx;*/
            }
            .order_item_price{
              font-size:30rpx;
              color:#33333;
              font-weight:bold;
              opacity:0.8;
              padding:10rpx 0;
            }
          }
        }
        .weui-cell_access:last-child{
          .dec_line{
            border: none;
          }
        }
      }
      .order_desc{
        background:#fff;padding:17px 0px 23px 17px;margin-top: 36rpx;
        .model-title{
          /*padding-bottom: 8px;*/
          font-weight: bold;
          color: #333;
          font-size: 16px;
        }
        .info_list{
          padding: 7px 0;
          font-size: 15px;
          color: #333;
          .list-content{
            font-size: 14px;
            color: #858585;
          }
        }
      }
    }
    .weui-flex{
      display:flex;
      align-items:center;
      box-sizing:border-box;
      font-size:32rpx;
      /*border:2rpx solid #f8f8f8;*/
      border-radius:10rpx;
      background:#fff;
      padding:34rpx 34rpx 46rpx 34rpx;
    }
    .weui-cells_after-title{
      margin-top: 18rpx;
    }
  }
</style>
