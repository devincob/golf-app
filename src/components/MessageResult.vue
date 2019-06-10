<template>
  <div v-if="show" class="message_result_content">
    <div class="weui-msg">
      <div class="weui-msg__icon-area">
        <icon :type="type" :size="iconSize"></icon>
      </div>
      <div class="weui-msg__text-area">
        <div class="weui-msg__title">
          <label>{{title}}</label>
          <slot name="title"></slot>
        </div>
        <div class="weui-msg__desc">
          {{desc || ''}}
          <slot name="desc">
            <!--内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现-->
            <!--<navigator url="" class="weui-msg__link">文字链接</navigator>-->
          </slot>
        </div>
      </div>
      <slot name="default"></slot>
      <div class="weui-msg__opr-area">
        <div class="weui-btn-area">
            <button v-for="button in getButtons" class="weui-btn"
                    :type="button.type"
                    :key="button.name"
                    @click="handleButtonClick(button.name)">{{button.title}}</button>
        </div>
      </div>
      <div class="weui-msg__extra-area">
        <div class="weui-footer">
          <div class="weui-footer__links">
            <!--<navigator url="" class="weui-footer__link">底部链接文本</navigator>-->
          </div>
          <!--<div class="weui-footer__text">Copyright © 2008-2016 weui.io</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const btns = {
    confirm: {title: '确认', type: 'primary'},
    cancel: {title: '取消', type: 'default'}
  }
  export default {
    name: 'MessageResult',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      // 可参照 https://developers.weixin.qq.com/miniprogram/dev/component/icon.html
      type: {
        type: String,
        default: 'success' // 可选  success, success_no_circle, info, warn, waiting, cancel, download, search, clear
      },
      iconSize: {
        type: Number,
        default: 93
      },
      buttons: {
        type: Array,
        default: ['confirm', 'cancel']
      },
      title: {
        type: String
      },
      desc: {
        type: String
      }
    },
    computed: {
      getButtons(){
        return this.buttons.map(button => {
          if (typeof button === 'string'){
            return {
              name: button,
              ...btns[button]
            }
          }
          return button
        })
      }
    },
    methods: {
      handleButtonClick(key){
        this.$emit('btn-click', key)
      }
    }
  }
</script>

<style scoped>
  .message_result_content {
    position: absolute;
    background-color:#fff;
    top:0;
    width: 100%;
    height:100%;
    z-index:99999;
    left:0;
  }
  button[type="big-orange"]{
    background: #ff6600;
    color: #fff;
    border: 0;
  }
</style>
