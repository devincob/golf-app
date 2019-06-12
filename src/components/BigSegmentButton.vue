<template>
  <div class="big-button" :class="btnClass"
       :style="styles">
    <div class="wrap" :style="'padding-left:calc('+height+'/2)'">
      <slot></slot>
    </div>
    <div class="text" @click="$emit('click')">{{text}}</div>
  </div>
</template>
<!-- using:
<big-segment-button text="立即预约" @click="onScanQRCode">
      <text style="font-size: 28rpx">共计￥158.00</text>
    </big-segment-button>
-->
<script>
  export default {
    name: 'BigSegmentButton',
    props: {
      btnStyle: String,
      btnClass: String,
      text: String,
      width: {
        type: String,
        default: '685rpx'
      },
      height: {
        type: String,
        default: '100rpx'
      },
      borderRadius: {
        type: String,
        default: '100rpx'
      }
    },
    computed: {
      styles(){
        return (this.btnStyle || '') + `;width:${this.width};height:${this.height};border-radius:${this.borderRadius};`
      }
    }
  }
</script>

<style scoped>
  .big-button {
    display: flex;
    margin: auto;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, .2) 1px 1px 15px;
    color: white;
  }
  .text:active {
    /*opacity: .8;*/
    background-color: #1fb064;
  }
  .text {
    background-color: #28d27b;
    width: 205rpx;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrap {
    background: linear-gradient(to right, #29d67f, #26cc77, #22b96a);
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
