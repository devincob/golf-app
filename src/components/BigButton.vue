<template>
  <div @click="$emit('click')"
       :style="btnStyle"
       :class="btnClass"
       class="big-button">
<!--    <img src="/static/images/button_big_bg.png" style="width: 704rpx;height: 119rpx;" alt=""/>-->
    <div style="position: absolute;">
      <slot></slot>
    </div>
  </div>
</template>
<!--using:
<big-button @click="onScanQRCode" btn-style="width: 685rpx;height: 100rpx;">扫描二维码</big-button>
-->
<script>
  export default {
    name: 'BigButton',
    props: {
      btnStyle: String,
      btnClass: String
    }
  }
</script>

<style scoped>
  .big-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 16px;
    background: linear-gradient(to right, #29d67f, #1fb064);
    box-shadow: rgba(0, 0, 0, .2) 1px 1px 13px;
    border-radius: 50px;
    margin: 0 auto;
  }
  .big-button:active {
    background: linear-gradient(to top, #29d67f, #1fb064);
    color: #EEEEEE;
  }
</style>
