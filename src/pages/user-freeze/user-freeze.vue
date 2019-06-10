<template>
  <div class="page page-user-freeze">
    <wxc-abnor :title="msg"
               type="NOT_FOUND"
               buttonType="contact"
               button="联系客服"></wxc-abnor>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '您的账户已被冻结，请联系客服。'
      }
    },
    methods: {},
    onLoad(options) {
      if (options && options.msg) {
        this.msg = decodeURIComponent(options.msg).replace('联系管理员', '联系客服')
      }
    }
  }
</script>
<style lang="less">
  .weui-cells:before,.weui-cells:after{display: none;}
  .money_list{
    .weui-cell:before{
      display: none;
    }
    .weui-cell:last-child{border-bottom: 0;}
    .weui-cell{
      border-bottom: 1px dashed #e5e5e5;
      margin: 0 10px;
      box-sizing: border-box;
      .weui-cell__hd{
        .iconfont{
          font-size: 20px;
          color: #919191;
          padding-right: 5px;
        }
      }
      .weui-cell__bd{
        font-size: 16px;
        color: #545454;
        padding: 8px 0;
      }
      .weui-cell__ft{
        font-size: 12px;
        color: #919191;
      }
    }
  }
</style>
