<template>
  <div class="page page-ticketOrder">
    <view class="weui-tab">
      <view class="weui-navbar">
        <block v-for="tab in tabs" :key="tab">
          <view :id="index" class="weui-navbar__item" :class="activeIndex === index ? 'weui-bar__item_on' : ''"
                @click="tabClick">
            <view class="weui-navbar__title">{{tab}}</view>
          </view>
        </block>
      </view>
      <view class="weui-tab__panel">
        <view class="weui-tab__content" :hidden="activeIndex !== 0">
          <view class="bg_blue"></view>
          <view class="card_list">
            <view class="weui-cells card_box" v-for="(list,index) in waitHandleInfo" :key="index">
              <!--<navigator @click="goNext(list)">-->
              <navigator :href="'/pages/order-detail/main?orderId='+list.orderId">
                <view class="weui-cell customer_number">
                  <view class="weui-cell__bd order_title">
                    <span class="order_title_label">订单号：{{list.orderCode}}</span>
                  </view>
                  <view class="order_time"><span class="order_time_label">{{list.orderTime}}</span></view>
                </view>
                <view style="display: flex;padding:14rpx 30rpx; " class="ect_ect_ect">
                  <view class="weui-cell__bd ">
                    <div class="goodImg" v-for="(item, index1) in list.productImgs" :key="index1">
                      <x-image width="80" height="80" alt="" :src="item || '/static/images/photo.jpg'"/>
                    </div>
                    <div class="desc_ellipsis" v-if="list.productImgs.length === 4">
                      ...
                    </div>
                  </view>
                </view>
                <view style="display: flex;padding:14rpx 30rpx;" class=" customer_price">
                </view>
                <view style="display: flex;padding:14rpx 30rpx;float: right" class=" customer_step">
                  <view>共<span class="auditor"> {{list.sumNum}}</span> 商品</view>
                </view>
              </navigator>
            </view>
          </view>
        </view>
        <div class="weui-tab__content" :hidden="activeIndex !== 1">
          <view class="bg_blue"></view>
          <view class="card_list">
            <view class="weui-cells card_box"  v-for="(list,index) in  completeInfo " :key="index">
              <navigator :href="'/pages/order-detail/main?orderId='+list.orderId">
                <view class="weui-cell customer_number">
                  <view class="weui-cell__bd order_title">
                    <span class="order_title_label">订单号：{{list.orderCode}}</span>
                  </view>
                  <view class="order_time"><span class="order_time_label">{{list.orderTime}}</span></view>
                </view>
                <view style="display: flex;padding:14rpx 30rpx;">
                  <view class="weui-cell__bd ect_ect_ect">
                    <div class="goodImg" v-for="(item, index1) in list.productImgs" :key="index1">
                      <x-image width="80" height="80" alt="" :src="item || '/static/images/photo.jpg'"/>
                    </div>
                    <div class="desc_ellipsis" v-if="list.productImgs.length === 4">
                      ...
                    </div>
                  </view>
                </view>
                <view style="display: flex;padding:14rpx 30rpx;" class=" customer_price">
                </view>
                <view style="display: flex;padding:14rpx 30rpx;float: right" class=" customer_step">
                  <view>共<span class="auditor"> {{list.sumNum}}</span> 商品</view>
                </view>
              </navigator>
            </view>
          </view>
        </div>
      </view>
    </view>

    <!--<wxc-abnor v-if="ioOrders && aoOrders && !ioOrders.length && !aoOrders.length" type="DATA" title="没有未处理订单哦"></wxc-abnor>-->
    <wxc-abnor
      v-if="isError"
      :title="errorMessage"
      type="DATA"
      @abnortap="onRefreshTap"></wxc-abnor>
    <wxc-loadmore is-end v-else-if="isLast"></wxc-loadmore>
  </div>
</template>

<script>
  // const sliderWidth = 53
  import XImage from '../../libs/components/Image'

  export default {
    components: {XImage},
    name: 'ticketOrder',
    data () {
      return {
        isError: false,
        isLast: false,
        errorMessage: '',
        membId: 0,
        pageIndex: 0,
        pageSize: 5,
        waitHandleInfo: [],
        completeInfo: [],
        tabs: ['未使用', '已使用'],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
      }
    },
    methods: {
      fomateCreateTime(val){
        return this.$utils.dateFormat(val, 'yyyy-MM-dd')
      },
      goNext(list){
        if (list.workflowId !== 0) {
          this.$wx.navigateTo({
            // url: `/pages/ticketOrdersDetails/main?orderId=${list.orderId}`
          })
        } else {
          this.$wx.navigateTo({
            // url: `/pages/newTicket/main?orderId=${list.orderId}&type=2`
          })
        }
      },
      clear(){
        this.waitHandleInfo = []
        this.completeInfo = []
      },
      onRefreshTap() {
        this.clear()
        this.queryDetails()
      },
      async queryDetails() {
        console.log(this.pageIndex, 'pageIndex')
        console.log(this.activeIndex, 'activeIndex')
        try {
          this.isError = false
          this.$loading.show()
          if (this.activeIndex === 0) { // 待处理
            await this.$$main.productOrderList({
              pageIndex: ++this.pageIndex,
              pageSize: this.pageSize,
              isUsed: 'N',
              membId: this.membId
            }).then((res) => {
              console.log(this.pageIndex, 'pageIndex')
              if (this.pageIndex === 1 && (!res.datas || !res.datas.length)){
                this.waitHandleInfo = res.datas || []
                this.isLast = true
                this.isError = true
                this.errorMessage = '您暂时没有待处理订单'
                return
              }
              if (res.datas.length < this.pageSize){
                this.isLast = true
              }
              this.waitHandleInfo = this.waitHandleInfo.concat(res.datas)
              this.waitHandleInfo && this.waitHandleInfo.forEach((item) => {
                item.productImgs = item.productImgs.splice(0, 4)
              })
              console.log(this.waitHandleInfo, '1231321321312')
            })
          } else if (this.activeIndex === 1) { // 已完成
            await this.$$main.productOrderList({
              pageIndex: ++this.pageIndex,
              pageSize: this.pageSize,
              isUsed: 'N',
              membId: this.membId
            }).then((res) => {
              if (this.pageIndex === 1 && (!res.datas || !res.datas.length)){
                this.completeInfo = res.datas || []
                this.isLast = true
                this.isError = true
                this.errorMessage = '您暂时没有已完成订单'
                return
              }
              if (res.datas.length < this.pageSize){
                this.isLast = true
              }
              // this.completeInfo = [...this.completeInfo, ...res.datas]
              this.completeInfo = this.completeInfo.concat(res.datas)
              console.log(this.completeInfo, 1)
              this.completeInfo && this.completeInfo.forEach((item) => {
                item.productImgs = item.productImgs.splice(0, 4)
              })
              console.log(this.completeInfo, 2)
            })
          } else { // 待处理
            // let waitHandleInfo = await this.$$main.iOListWaitHandle({})
            // this.waitHandleInfo = waitHandleInfo
            // if (!waitHandleInfo){
            //   this.isError = true
            //   this.errorMessage = '您暂时没有待处理订单'
            // }
          }
          console.log(this.waitHandleInfo, '11111')
          console.log(this.completeInfo, '2222')
          this.$loading.hide()
        } catch (e) {
          this.$loading.hide()
          e.message && this.$showToast(e.message)
          this.isError = true
          this.errorMessage = e.message
        }
      },
      tabClick (e) {
        this.pageIndex = 0
        this.isLast = false
        this.sliderOffset = e.currentTarget.offsetLeft
        this.activeIndex = Number(e.currentTarget.id)
        this.clear()
        this.queryDetails()
      }
    },
    onLoad(option) {
      this.pageIndex = 0
      this.isLast = false
      if (this.$user && this.$user.userInfo && this.$user.userInfo.membId) {
        this.membId = this.$user.userInfo.membId || 0
      }
      this.clear()
      this.queryDetails()
    },
    onReachBottom() {
      if (this.isLast) {
        return
      }
      this.loading = true
      this.queryDetails()
    },
    async onPullDownRefresh() {
      this.pageIndex = 0
      this.isLast = false
      this.waitHandleInfo = []
      this.completeInfo = []
      await this.queryDetails()
      this.$wx.stopPullDownRefresh()
    }
  }
</script>
<style lang="less">
  ect_ect_ect{
    text-overflow:ellipsis;overflow: hidden;
    width: 250px;white-space: nowrap;
  }
  .order_title{
    text-overflow:ellipsis;overflow: hidden;
    width: 150px;white-space: nowrap;
    .order_title_label{
    }
  }
  div.goodImg
  {
    width:60px;
    height:60px;
    margin:7rpx;
    border:1px solid #bebebe;
    float:left;
    text-align:center;
  }
  div.goodImg img
  {
    display:inline;
  }
  div.goodImg a:hover img
  {
    border:1px solid #333333;
  }
  div.desc
  {
    text-align:center;
    font-weight:normal;
    width:150px;
    font-size:12px;
    margin:10px 5px 10px 5px;
  }
  .desc_ellipsis{
    float:left;
    text-align:end;
    margin-top:30px;
    margin-left:10px;
  }
  .page-ticketOrder{
    .weui-tab{
      .weui-navbar{
        background: #1ab976;
        border: none;
        padding: 20rpx 0 20rpx;
        .weui-navbar__item{
          font-size: 32rpx;
          color: rgba(255,255,255,.7);
          font-weight: 400;
          padding: 0;
          .weui-navbar__title{
            font-size: 28rpx;
          }
        }
        .weui-navbar__item:after{
          display: none;
          content: '';
          background: rgba(255,255,255,0);
          height: 5rpx;
          width: 100rpx;
          position: absolute;
          top: 50rpx;
          left: 50%;
          margin-left: -50rpx;
          color: rgba(255,255,255,0);
        }
        .weui-bar__item_on{
          background: none;
          font-weight: bold;
          color: rgba(255,255,255,1);
        }
        .weui-bar__item_on.weui-navbar__item:after{
          background: rgba(255,255,255,1);
          display: block;
        }
        .weui-navbar__item:active {
          background-color: #1ab976;
        }
      }
      .weui-navbar:after {
        display: none;
      }
      .weui-tab__panel{
        padding-top: 90rpx;
        view[hidden]{
          display: none;
        }
        .weui-tab__content{
          display: block;
          .bg_blue{
            background: #1ab976;
            height: 70rpx;
            margin-top: -8rpx;
          }
          .card_list{
            position: relative;
            top: -50rpx;
            margin-top: 0;
            .card_box{
              margin: 20rpx;
              background: #fff;
              box-shadow: 0 0 10rpx #e4ecf4;
              border-radius: 20rpx;
              overflow: hidden;
              padding-top: 0;
              box-sizing: border-box;
              .customer_number:after,
              .customer_price:after{
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                /*height: 2rpx;*/
                color: #D9D9D9;
              }
              .customer_number:after{
                /*border-bottom: 2rpx solid #f2f2f2;*/
              }
              .customer_price:after{
                /*border-bottom: 2rpx dashed #f2f2f2;*/
              }
              .customer_number{
                font-size: 24rpx;
                color: #666666;
                font-weight: 300;
                .customer_tip{
                  font-size: 20rpx;
                  color: #fff;
                  padding: 4rpx 16rpx;
                  border-radius: 22rpx;
                  position: relative;
                  top: -6rpx;
                }
                .tip_bg_blue{
                  background: #daecff;
                }
                .tip_bg_violet{
                  background: #9b58eb;
                }
                .order_time{
                  .order_time_label{
                    padding: 10rpx 20rpx;
                    /*background: #daecff;*/
                    color: #000;
                    opacity: 0.6;
                    font-size: 24rpx;
                    position: relative;
                  }
                }
              }
              .customer_name{
                font-size: 32rpx;
                color: #333333;
                font-weight: 600;
              }
              .customer_product{
                font-size: 28rpx;
                color: #333;
                padding: 6rpx 30rpx;
                .cl_666{
                  color: #666;
                }
              }
              .customer_price{
                font-size: 30rpx;
                color: #333;
                font-weight: 600;
                padding: 6rpx 0;
                margin: 0 30rpx;
              }
              .customer_step{
                font-size: 24rpx;
                color: #666;
                font-weight: 600;
                .auditor{
                  color: #333;
                }
                .weui-cell__bd{
                  ._span{
                    font-weight: 200;
                    font-size: 24rpx;
                    color: #666;
                    margin-right: 10px;
                  }
                }
              }
            }
          }
          .weui-cells:before,
          .weui-cells:after,
          .weui-cell:before{
            display: none;
          }
        }
      }
    }
  }
</style>
