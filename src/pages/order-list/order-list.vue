<template>
  <div class="page page_order_list">
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
          <view class="bg_green"></view>
          <view class="card_list">
            <view class="weui-cells card_box" v-for="(list,index) in waitHandleInfo" :key="index">
              <navigator :href="'/pages/order-detail/main?orderId='+list.orderId">
                <view class="weui-cell order_number">
                  <view class="weui-cell__bd order_title">订单号：
                    <span class="order_title_label">{{list.orderCode}}</span>
                  </view>
                  <view class="order_time"><span class="order_time_label">{{list.orderTime}}</span></view>
                </view>
                <view class="ect_ect_ect">
                  <view class="weui-cell__bd">
                    <div class="goods_imgs" v-for="(item, index1) in list.productImgs" :key="index1">
                      <x-image width="80" height="80" alt="" :src="item || '/static/images/photo.jpg'"/>
                    </div>
                    <div class="goods_desc_ellipsis" v-if="list.productImgs.length === 4">...</div>
                  </view>
                </view>
                <view class="goods_blank"></view>
                <view class="goods_total">
                  <view>共<span class="auditor"> {{list.sumNum}}</span> 件商品</view>
                </view>
              </navigator>
            </view>
          </view>
        </view>
        <div class="weui-tab__content" :hidden="activeIndex !== 1">
          <view class="bg_green"></view>
          <view class="card_list">
            <view class="weui-cells card_box"  v-for="(list,index) in  completeInfo " :key="index">
              <navigator :href="'/pages/order-detail/main?orderId='+list.orderId">
                <view class="weui-cell order_number">
                  <view class="weui-cell__bd order_title">订单号：
                    <span class="order_title_label">{{list.orderCode}}</span>
                  </view>
                  <view class="order_time"><span class="order_time_label">{{list.orderTime}}</span></view>
                </view>
                <view class="ect_ect_ect">
                  <view class="weui-cell__bd">
                    <div class="goods_imgs" v-for="(item, index1) in list.productImgs" :key="index1">
                      <x-image width="80" height="80" alt="" :src="item || '/static/images/photo.jpg'"/>
                    </div>
                    <div class="goods_desc_ellipsis" v-if="list.productImgs.length === 4">...</div>
                  </view>
                </view>
                <view class="goods_blank">
                </view>
                <view class="goods_total">
                  <view>共<span class="auditor">{{list.sumNum}}</span> 件商品</view>
                </view>
              </navigator>
            </view>
          </view>
        </div>
      </view>
    </view>
    <wxc-abnor v-if="activeIndex === 0 && !waitHandleInfo.length && !isError ||activeIndex === 1 && !completeInfo.length && !isError " type="DATA" title="没有订单哦"></wxc-abnor>
    <wxc-abnor v-if="isError" :title="errorMessage"  type="REQUEST_ERROR" @abnortap="onRefreshTap"></wxc-abnor>
    <wxc-loadmore is-end v-if="isLast&&isEmpty"></wxc-loadmore>
  </div>
</template>

<script>
  import XImage from '../../libs/components/Image'

  export default {
    components: {XImage},
    name: 'order_list',
    data () {
      return {
        isEmpty: false,
        isError: false,
        isLast: false,
        errorMessage: '发生未知错误',
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
            // url: `/pages/order_listsDetails/main?orderId=${list.orderId}`
          })
        } else {
          this.$wx.navigateTo({
            // url: `/pages/newTicket/main?orderId=${list.orderId}&type=2`
          })
        }
      },
      clear(){
        this.pageIndex = 0
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
          this.isError = true
          this.$loading.show()
          if (this.activeIndex === 0) { // 待处理
            let res = await this.$$main.productOrderList({
              pageIndex: ++this.pageIndex,
              pageSize: this.pageSize,
              isUsed: 'N',
              membId: this.membId
            })
            if (this.pageIndex === 1 && (!res.datas || !res.datas.length)){
              this.waitHandleInfo = res.datas || []
              this.isLast = true
              this.$loading.hide()
              this.isError = false
              this.isEmpty = !!this.completeInfo.length
              return
            }
            if (res.datas.length < this.pageSize){
              this.isLast = true
            }
            let datas = res.datas.map((item) => {
              item.productImgs = item.productImgs.splice(0, 4)
              return item
            })
            this.waitHandleInfo = [...this.waitHandleInfo, ...datas]
            this.isEmpty = !!this.waitHandleInfo.length
            // console.log(this.waitHandleInfo, 'waitHandleInfo')
          } else if (this.activeIndex === 1) { // 已完成
            let res = await this.$$main.productOrderList({
              pageIndex: ++this.pageIndex,
              pageSize: this.pageSize,
              isUsed: 'Y',
              membId: this.membId
            })
            if (this.pageIndex === 1 && (!res.datas || !res.datas.length)){
              this.completeInfo = res.datas || []
              this.isLast = true
              this.$loading.hide()
              this.isError = false
              this.isEmpty = !!this.completeInfo.length
              return
            }
            if (res.datas.length < this.pageSize){
              this.isLast = true
            }
            let datas = res.datas.map((item) => {
              item.productImgs = item.productImgs.splice(0, 4)
              return item
            })
            this.completeInfo = [...this.completeInfo, ...datas]
            this.isEmpty = !!this.completeInfo.length
            // console.log(this.completeInfo, 'completeInfo')
          }
          this.$loading.hide()
          this.isError = false
          // console.log('activeIndex', this.activeIndex, '!waitHandleInfo.length', !this.waitHandleInfo.length, '!this.isError', !this.isError, 'this.isLast', this.isLast, 'this.isEmpty', this.isEmpty)
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
  .ect_ect_ect{
    display: flex;padding:14rpx 30rpx;
  }

  div.goods_imgs
  {
    width:60px;
    height:60px;
    margin:7rpx;
    border:1px solid #bebebe;
    float:left;
    text-align:center;
  }
  div.goods_imgs img
  {
    display:inline;
  }
  div.goods_imgs a:hover img
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
  .goods_desc_ellipsis{
    float:left;
    text-align:end;
    margin-top:30px;
    margin-left:10px;
  }
  .page_order_list{
    .weui-tab{
      .weui-navbar{
        background: #25da91;
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
          background-color: #25da91;
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
          .bg_green{
            background: #25da91;
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
              border-radius: 16rpx;
              overflow: hidden;
              padding-top: 0;
              box-sizing: border-box;
              .order_number:after,
              .goods_blank {
                display: flex;padding:14rpx 30rpx;
              }
              .goods_blank:after{
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                /*height: 2rpx;*/
                color: #D9D9D9;
              }
              .order_number{
                font-size: 24rpx;
                /*color: #666666;*/
                .order_title{
                  font-size: 26rpx;
                  text-overflow:ellipsis;overflow: hidden;
                  width: 150px;white-space: nowrap;
                  .order_title_label{
                    color: #000;
                    opacity: 0.9;
                  }
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
              .goods_blank{
                font-size: 30rpx;
                color: #333;
                font-weight: 600;
                padding: 6rpx 0;
                margin: 0 30rpx;
              }
              .goods_total{
                display: flex;padding:14rpx 30rpx;float: right;
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
