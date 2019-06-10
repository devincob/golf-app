<template>
  <wxc-popup
    class="contract-rules-popup"
    animation-mode="center"
    align="center">
    <view class="popup__content">
      <view class="popup_content__hd">契约精神守则</view>
      <view class="popup__content__bd">
        <view>契约精神守则契约的实质就是交易，它是商品社会的基础。在交易中，一个人付了钱，就应该得到等价的商品。契约将一个人的权利、责任、义务进行明确划分。</view>
        <view>为了保证平台中企业与兼职之间的权利与义务，兼职与兼职之间的公平性，定义如下契约精神规则。</view>
        <view class="popup_small_title">唯一加分规则：</view>
        <view>兼职人员每完成1单可获得相应契约精神积分。</view>
        <view class="popup_small_title">唯一扣分规则：</view>
        <view>接单人员距订单上班24小时内取消订单，将扣除相应契约精神积分。</view>
        <view class="popup_small_title">使用规则：</view>
        <view>当契约精神低于60分，接单可能需要缴纳临时押金，订单完成后与工资一同退回账户。</view>
      </view>
    </view>
  </wxc-popup>
</template>

<script>
export default {
  name: 'contract-rules-popup',
  methods: {
    show(){
      this.$find('.contract-rules-popup').show()
    }
  }
}
</script>

<style>
  .contract-rules-popup .popup__content {
    width: 80%;
    background: rgba(255, 255, 255, .9);
    text-align: center;
    padding: 10px 15px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .contract-rules-popup .popup__content .popup_content__hd{
    font-size: 16px;
    padding: 5px 0;
    color: #333;
    font-weight: bold;
  }
  .contract-rules-popup .popup__content .popup__content__bd {
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    color: #777;
    text-indent: 27px;
  }
  .contract-rules-popup .popup__content .popup__content__bd .popup_small_title{
    margin-top: 5px;
    color: #333;
    font-weight: bold;
  }
</style>
