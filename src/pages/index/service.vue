<template>
  <div v-if="activeId === 'zgz'" class="page-service">
    <view class="goods-list-item" v-for="item in list" :key="item.productId">
      <view class="goods-img-box">
        <x-image :src="item.imgUrl" img-style="width: 170rpx;height: 170rpx;"/>
      </view>
      <view class="goods-info">
        <view class="goods-info-title">{{item.productName}}</view>
        <view class="describe">{{item.productDescribe}}</view>
        <view class="goods-info-ft">
          <view class="goods-info-price">
            <view class="goods-info-price-unit">￥</view>
            <view class="goods-info-price-sum">{{item.price || 0}}</view>
          </view>
          <image src="/static/images/button_add.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;" @click="onAddClick(item)"/>
        </view>
      </view>
    </view>
    <image v-if="list && list.length > 0" class="btn-shopping-cart" src="/static/images/button_shopping_cart.png" mode="aspectFit" @click="onCartClick"/>
    <span v-if="goodsNum" class="weui-badge" @click="onCartClick">{{goodsNum}}</span>
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
               title="暂无服务"
               image="/static/images/home_empty_tips.png"
               abnor-style="position: fixed;bottom: 440rpx;right:0;"
               img-style="width:100%;"
               title-style="font-size: 36rpx;color: #333;opacity: 0.6;font-weight: bold;"
               type="ORDER"></wxc-abnor>
    <wxc-popup
      class="shopping-cart-dialog"
      animation-mode="bottom"
      align="bottom">
      <view class="shopping-cart-dialog-content" @click.stop>
        <view class="shopping-cart-dialog-title">购物车</view>
        <view v-if="goodsNum && goodsNum > 0" class="cart-goods-list">
          <view v-if="item.num && item.num > 0" class="cart-goods-list-item" v-for="item in tempList" :key="item.productId">
            <view class="cart-goods-img-box">
              <x-image :src="item.imgUrl" img-style="width: 120rpx;height: 120rpx;"/>
            </view>
            <view class="cart-goods-info">
              <view class="cart-goods-info-title">{{item.productName}}</view>
              <view class="cart-goods-info-describe">{{item.productDescribe}}</view>
              <view class="cart-goods-info-ft">
                <view class="cart-goods-info-price">
                  <view class="cart-goods-info-price-unit">￥</view>
                  <view class="cart-goods-info-price-sum">{{item.price || 0}}</view>
                </view>
                <view v-if="item.num && item.num > 0" class="cart-goods-info-price-control">
                  <image @click="item.num--" src="/static/images/button_del.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;"/>
                  <view class="goods-num">{{item.num || 0}}</view>
                  <image @click="item.num++" src="/static/images/button_add.png" mode="aspectFit" style="width: 60rpx;height: 60rpx;"/>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else class="cart-goods-list" style="font-weight: 500;color: #333">
          购物车空空如也~
        </view>
        <view class="footer">
          <view class="btn-submit">
            <view class="sum-div">
              <span class="sum">总金额</span><span class="sum-num">￥{{goodsSumAmount}}</span>
            </view>
            <view class="submit" @click="onPayClick">
              微信支付
            </view>
          </view>
        </view>
      </view>
    </wxc-popup>
  </div>
</template>

<script>
  import XImage from '../../libs/components/Image'
  export default {
    name: 'service',
    components: {XImage},
    props: {
      activeId: String
    },
    data() {
      return {
        pageIndex: 0,
        pageSize: 10,
        list: null,
        loading: false,
        isLast: false,
        isError: false,
        errorMessage: '',
        tempList: []
      }
    },
    computed: {
      goodsNum(){
        let sum = 0
        this.list && this.list.forEach((item) => {
          sum = sum + item.num
        })
        return sum
      },
      goodsSumAmount(){
        let sum = 0
        this.list && this.list.forEach((item) => {
          sum = sum + Number((item.price * item.num).toFixed(2))
        })
        return sum
      }
    },
    methods: {
      onTabPanelActivated(t){
        this.$wx.setNavigationBarColor({
          backgroundColor: '#ffffff',
          frontColor: '#000000'
        })
        if (!this.list) {
          this.queryGoodsList()
        }
      },
      onRefreshTap() {
        this.$wx.startPullDownRefresh()
      },
      onPullDownRefresh() {
        let dialog = this.$find('.shopping-cart-dialog')
        if (dialog && dialog.data.status === 'show') {
          this.$wx.stopPullDownRefresh()
          return
        }
        this.pageIndex = 0
        this.isLast = false
        this.queryGoodsList()
      },
      onReachBottom(){
        if (!this.isLast) {
          this.queryGoodsList()
        }
      },
      async queryGoodsList(){
        try {
          this.isError = false
          this.loading = true
          if (this.pageIndex === 0){
            this.list = []
          }
          this.$loading.show()
          let data = await this.$$main.productAll({
            pageIndex: ++this.pageIndex,
            pageSize: this.pageSize
          })
          const datas = data.datas || []
          datas.forEach((item) => {
            item.num = 0
          })
          if (this.pageIndex === 1) {
            this.list = datas
          } else {
            this.list = [...this.list, ...datas]
          }
          this.tempList.forEach((item) => {
            if (item.num > 0) {
              this.list.forEach((el) => {
                if (el.productId === item.productId) {
                  el.num = item.num
                }
              })
            }
          })
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
      onAddClick(item){
        item.num++
        this.tempList = [...this.list]
      },
      onCartClick(){
        this.tempList = [...this.list]
        this.$find('.shopping-cart-dialog') && this.$find('.shopping-cart-dialog').show()
      },
      onDialogHide(){
        this.$find('.shopping-cart-dialog') && this.$find('.shopping-cart-dialog').hide()
      },
      onPayClick(){
        if (!this.goodsNum) {
          this.$wx.showToast({
            title: '请先添加商品',
            icon: 'none'
          })
          return
        }
        let list = this.tempList.filter((item) => {
          return item.num > 0
        })
        if (!list || list.length < 1) {
          this.$wx.showToast({
            title: '请先添加商品',
            icon: 'none'
          })
          return
        }
        this.doCreateOrder(list)
      },
      async doCreateOrder(list){
        try {
          this.$loading.show()
          let data = await this.$$main.productOrderCreate({
            productInfo: list
          })
          this.$loading.hide()
          this.doPay(data.orderId)
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
            orderType: 'P'
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
                    self.onPayFinish('购买成功', 'success')
                    self.clearTempList()
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
              self.onPayFinish('购买失败', 'none')
            }
          }
        })
      },
      onPayFinish(text, icon){
        this.onDialogHide()
        let timer = setTimeout(() => {
          wx.showToast({
            title: text,
            icon: icon,
            duration: 2000
          })
          clearTimeout(timer)
          timer = null
        }, 300)
      },
      clearTempList(){
        this.tempList = []
        this.list && this.list.forEach((item) => {
          item.num = 0
        })
      }
    },
    onLoad() {
    }
  }
</script>

<style lang="less" scoped>
  .page-service{
    height: 100%;
    padding: 0 0 134rpx 0;
    .goods-list-item{
      display: flex;
      align-items: center;
      padding: 30rpx 34rpx;
      background: #fff;
      border-bottom: 2rpx solid #f4f4f4;
      .goods-img-box{
        flex: 0 0 170rpx;
        width: 170rpx;
        height: 170rpx;
      }
      .goods-info{
        width: 100%;
        margin-left: 20rpx;
        padding: 10rpx 0;
        .goods-info-title{
          font-size: 32rpx;
          color: #333;
          font-weight: 500;
        }
        .describe{
          font-size: 22rpx;
          color: #333;
          font-weight: 400;
          opacity: 0.6;
        }
        .goods-info-ft{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20rpx;
          .goods-info-price{
            display: flex;
            align-items: baseline;
            color: #f00;
            font-weight: bold;
            .goods-info-price-unit{
              font-size: 22rpx;
            }
            .goods-info-price-sum{
              font-size: 34rpx;
            }
          }
        }
      }
    }
    .weui-badge{
      position: fixed;
      bottom: 180rpx;
      left: 680rpx;
    }
    .btn-shopping-cart{
      width: 92rpx;
      height: 92rpx;
      position: fixed;
      bottom: 122rpx;
      right: 34rpx;
    }
    .shopping-cart-dialog{
      .shopping-cart-dialog-content{
        width: 100%;
        min-height: 200px;
        height: auto;
        line-height: 100%;
        background: #ffffff;
        font-size: 15px;
        text-align: center;
        padding: 0 34rpx;
        border-radius: 12rpx 12rpx 0 0;
        .shopping-cart-dialog-title{
          width: 100%;
          height: 60rpx;
          line-height: 60rpx;
          margin-top: 58rpx;
          text-align: left;
          font-size: 38rpx;
          font-weight: bold;
          color: #333;
        }
        .cart-goods-list{
          max-height: 516rpx;
          overflow: scroll;
          margin-top: 44rpx;
          margin-bottom: 205rpx;
          .cart-goods-list-item{
            height: 172rpx;
            display: flex;
            align-items: center;
            background: #fff;
            border-bottom: 2rpx solid #f4f4f4;
            .cart-goods-img-box{
              flex: 0 0 120rpx;
              width: 120rpx;
              height: 120rpx;
            }
            .cart-goods-info{
              width: 100%;
              margin-left: 20rpx;
              text-align: left;
              padding: 10rpx 0;
              .cart-goods-info-title{
                font-size: 32rpx;
                color: #333;
                font-weight: 500;
              }
              .cart-goods-info-describe{
                font-size: 22rpx;
                color: #333;
                font-weight: 400;
                opacity: 0.6;
                margin-top: 8rpx;
              }
              .cart-goods-info-ft{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 12rpx;
                .cart-goods-info-price{
                  display: flex;
                  align-items: baseline;
                  color: #f00;
                  font-weight: bold;
                  .cart-goods-info-price-unit{
                    font-size: 22rpx;
                  }
                  .cart-goods-info-price-sum{
                    font-size: 34rpx;
                  }
                }
                .cart-goods-info-price-control{
                  display: flex;
                  align-items: center;
                  .goods-num{
                    width: 100rpx;
                    text-align: center;
                    font-size: 34rpx;
                    color: #000;
                    font-weight: 500;
                  }
                }
              }
            }
          }
        }
        .footer{
          position: fixed;
          width: 682rpx;
          height: 119rpx;
          bottom: 28rpx;
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
      }
    }
  }
</style>
