<template>
  <div v-if="activeId === 'qsb'" class="weui-tab__panel">
    <navigator url="../../pages/order-list/main" class="weui-tabbar__item">
    <view class="weui-tabbar__icon"><i class="iconfont icon-wode"></i></view>
    <view class="weui-tabbar__label">订单列表</view>
    </navigator>
    <navigator url="../../pages/order-detail/main" class="weui-tabbar__item">
    <view class="weui-tabbar__icon"><i class="iconfont icon-wode"></i></view>
    <view class="weui-tabbar__label">订单详情</view>
    </navigator>
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: {
      activeId: String
    },
    data() {
      return {
      }
    },
    methods: {
    },
    onLoad() {
      if (this.$store.getters.userCheckLogin) {
      }
    },
    onShow(){
    }
  }
</script>

<style scoped>

</style>
