<template>
  <div class="page page-order-detail">
    <!-- 报错提示 -->
    <wxc-abnor
      v-if="isError"
      :title="errorMessage"
      type="REQUEST_ERROR"
      @abnortap="onRefreshTap"></wxc-abnor>

    <!-- 无数据提示 -->
    <wxc-abnor v-if="(settleList && settleList.length === 0 || !settleList) && !loading && !isError" title="暂无已结算订单"
               type="ORDER"></wxc-abnor>
    <!-- 有数据正常渲染 -->
    <div class="order_settle_list" v-if="orderId">
      <div style="background:#fff; justify-content:center;display:flex;">
        <div style="flex-direction:column; background: #FCFCFC; width: 684rpx; height: 618rpx; display:flex; justify-content: center;align-items: center;">
          <x-image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1064136055,705163497&fm=27&gp=0.jpg" />
          <div style="text-align: center;">
            <p style="font-size: 32rpx; color: #1ad976;">已确认消费</p>
            <p style="font-size: 24rpx;color: #333333;opacity: 0.6">2018/05/20 13:36</p>
          </div>
        </div>
      </div>
      <div class="weui-flex" style="margin-top: 18px;">
        <div style="width: 100%;">
          <div class="model-title">订单商品</div>
          <div class="weui-cells_after-title">
            <div class=" weui-cell_access"   v-for="(item, index) in settleList.orderProducts" :key="index" >
              <div class="weui-cell__hd">
                <div class="goodImg">
                  <x-image  alt="" :src="item.imgUrl || '/static/images/photo.jpg'"/>
                </div>
              </div>
              <div class="weui-cell__bd dec_line">
                  <div class="item_name">{{item.productName}}</div>
                  <div class="item_des">{{item.productDescribe}}</div>
                  <div class="item_price">
                    <span>
                    <wxc-price :value="item.price " decimal="2"></wxc-price> x {{item.num}}
                    </span>
                    <span style="float: right;">
                    <wxc-price :value="item.price * item.num" decimal="2"></wxc-price>
                  </span> </div>
              </div>
            </div>
          </div>
          <div class="bill-title">
          <div style="display: flex;justify-content: flex-end;  align-items: baseline ">
            <span style="font-size: 14px;padding-right: 5px;">实付金额</span>
            <span style="font-size: 24px;font-weight:bold">
              <wxc-price :value="settleList.totalAmount" decimal="2" symbol="￥"></wxc-price>
            </span>
          </div>
          </div>
        </div>
      </div>
      <div style="background:#fff;padding:17px 0px 23px 17px;margin-top: 17px;">
        <div>
          <div class="model-title" style="margin-bottom:8px; ">订单信息</div>
          <div class="list-title">订单编号：<span class="list-content">{{settleList.orderCode}}</span></div>
          <div class="list-title">下单时间：<span class="list-content">{{settleList.orderTime}}</span></div>
          <div class="list-title">订单金额：<span class="list-content">
          <wxc-price
            :value="settleList.totalAmount"
            decimal="2"
            symbol="￥"
          ></wxc-price>
          </span></div>
          <div class=" list-title" >支付方式：<span class="list-content">{{settleList.payType}}</span></div>
        </div>
      </div>
    </div>

    <!-- 加载中提示 -->
    <wxc-loadmore v-if="loading"></wxc-loadmore>
    <!-- 所有页面加载完毕提示 -->
    <wxc-loadmore is-end v-else-if="isEnd"></wxc-loadmore>
  </div>
</template>

<script>
  import XImage from '../../libs/components/Image'

  export default {
    components: {XImage},
    data() {
      return {
        orderId: 0,
        settleList: {},
        loading: false,
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        isEnd: false,
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
          this.loading = true
          const datas = await this.$$main.productOrderDetail({
            orderId: this.orderId
          })
          console.log(datas, 123123123)
          this.settleList = datas
        } catch (e) {
          this.settleList = {}
          this.isError = true
          this.errorMessage = e.message
        } finally {
          this.loading = false
        }
      }
    },
    mounted(){
      this.settleList = {}
      this.loading = false
      this.$wx.startPullDownRefresh()
    },
    onLoad(option){
      this.orderId = option.orderId || 6
    },
    // 下拉刷新页面
    onPullDownRefresh() {
      this.pageIndex = 1
      this.loadWithdrawalsList().then(() => {
        this.$wx.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="less">
  .page-order-detail{
    div.goodImg
    {
      width:60px;
      height:60px;
      text-align:center;
    }
    div.goodImg img
    {
      width: 100%;
      height: 100%;
      display:inline;
    }
    .order_settle_list{
      padding: 34rpx;
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
    .weui-cell_access{
      display:flex;
      padding: 26rpx 0;
      .dec_line{
        border-bottom: 1rpx solid rgba(51, 51, 51, 0.1);
        padding-left: 13px;
      }
    }
    .weui-cell_access:last-child{
      .dec_line{
        border: none;
      }
     }

    .item_name{
      font-size: 28rpx;color: #33333;
      font-weight: 500px;
    }
    .item_des{
      font-size:22rpx;
      color:#33333;
      opacity:0.6;
      /*padding:6rpx 0 11rpx;*/
    }
    .item_price{
      font-size:26rpx;
      color:#33333;
      font-weight:bold;
      opacity:0.9;
      padding:10rpx 0;
    }
    .list-title{
      padding: 7px 0;
      font-size: 15px;
      color: #333;
    }
    .list-content{
      font-size: 14px;
      color: #858585;
    }
    .model-title{
      /*padding-bottom: 8px;*/
      font-weight: bold;
      color: #333;
      font-size: 16px;
    }
    .weui-cells_after-title{
      margin-top: 18rpx;
    }
  }
</style>
