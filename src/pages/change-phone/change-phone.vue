<template>
  <div class="page page-change-phone">
    <div class="mod_box">
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__bd">
          <input type="number" class="weui-input" v-model="formData.phone" placeholder="请输入您的新手机号码"/>
        </div>
        <div class="weui-cell__ft">
          <icon v-if="errors.phone" @click="$showToast(errors.phone)" type="warn" size="15" color="#E64340"></icon>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__bd">
          <input type="number" maxlength="4" class="weui-input" v-model="formData.validCode" placeholder="请输入您收到的验证码"/>
        </div>
        <div class="weui-cell__ft">
          <icon v-if="errors.validCode" @click="$showToast(errors.validCode)" type="warn" size="15" color="#E64340"></icon>
          <button class="weui-vcode-btn" :class="{disabled_button: countdown || !formData.phone}" :disabled="countdown || !formData.phone" @tap="sendCode">{{countdown ? ('('+countdown+')重新获取') : '发送短信验证码'}}</button>
        </div>
        <div class="weui-cell__ft" v-if="errors.validCode">
          <icon @click="$showToast(errors.validCode)" type="warn" size="15" color="#E64340"></icon>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <button class="weui-btn" :class="{disabled_button: !formData.phone || !formData.validCode}" type="big-orange" :disabled="!formData.phone || !formData.validCode" @tap="checkForm">确定更换</button>
    </div>
    <div class="text-right bind_fail">
      更换不成功？<button class="btn-link" plain open-type="contact">点击联系客服</button>。
    </div>
  </div>
</template>

<script>
import validator from './validator'

export default {
  data() {
    return {
      validSnCode: '', // 验证码序列
      formData: {
        phone: '', // 手机号码
        validCode: ''// 手机短信验证码
      },
      errors: {}, // 错误信息
      countdown: 0 // 60s验证码倒计时
    }
  },
  methods: {
    async sendCode(){
      this.errors = {}
      let checkPhone = await validator.validate('phone', this.formData.phone)
      if (this.formData.phone && checkPhone) {
        try {
          const result = await this.$$main.userValidCodeSend({
            mobilePhone: this.formData.phone
          })
          if (result && result.isSuccess) {
            this.$wx.showToast({
              title: '短信已发送，请注意查收',
              icon: 'none'
            })
            this.validSnCode = result.validSnCode
            // 倒计时
            if (!this.ct) {
              this.ct = new this.$utils.Countdown(60, () => {
                this.countdown = 0
                this.ct.stop()
              }, (t) => {
                this.countdown = t
              }).start()
            } else {
              this.ct.start()
            }
          }
        } catch (e){
          e.message && this.$wx.showToast({
            title: e.message || '操作失败',
            icon: 'none'
          })
        }
      } else {
        this.errors = validator.getErrors()
      }
    },
    async checkForm(){
      const isValid = await validator.validateAll(this.formData)
      if (!isValid) {
        this.errors = validator.getErrors()
        this.$showToast('请填写正确的信息！')
      } else {
        this.changePhone()
      }
    },
    async changePhone(){
      try {
        this.$loading.show()
        await this.$$main.userUpdateMobile({// 更换手机号接口
          mobile: this.formData.phone,
          validCode: this.formData.validCode,
          validSnCode: this.validSnCode
        })
        await this.$store.dispatch('refreshUserInfo')
        this.$loading.hide()
        this.$wx.showToast({
          title: '更换成功',
          icon: 'success'
        })
        setTimeout(() => {
          if (this.canGoBack()) {
            this.goBack()
          }
        }, 2000)
      } catch (e) {
        this.$loading.hide()
        e.message && this.$wx.showToast({
          title: e.message || '操作失败',
          icon: 'none'
        })
      }
      this.errors = {}
    }
  },
  onLoad() {
    this.formData.phone = ''
    this.formData.validCode = ''
  }
}
</script>

<style lang="less">
  .page-change-phone{
    .textarea-placeholder,
    .input-placeholder{
      color: #cdcdcd;
      font-size: 14px;
    }
    .xgLogo{
      padding: 20px 0;
      img{
        width: 80px;
        height: 80px;
        margin: 5px auto;
        display: block;
      }
      p{
        font-size: 14px;
        text-align: center;
        color: #333;
      }
    }
    .weui-agree{
      font-size: 12px;
      .weui-agree__link{
        color: #0091ea;
      }
      .navigator-hover{
        background: none;
      }
    }
    .bind_fail{
      margin-top: 15px;
      font-size: 12px;
      color: #999;
      .btn-link{
        display: inline-block;
        color: #f60;
        border:0px solid #aaa;
        padding:0;
        line-height: 1;
        overflow:initial;
        font-size: 12px;
      }
      .navigator-hover{
        background: none;
      }
    }
    .mod_box{
      background: #fff;
      padding: 10px 15px;
      .weui-cell:before{
        display: none;
      }
      .weui-cell_input{
        padding: 0;
        border-bottom: 1px solid #ccc;
        padding: 8px 0;
        .weui-input{
          font-size: 16px;
          color: #545454;
        }
        .weui-vcode-btn {
          border-left:0;
          font-size:12px;
          color:#fff;
          background: #FF6600;
          border-radius: 5px;
        }
        .weui-vcode-btn.disabled_button{
          background-color: #dddddd;
        }
      }
      .warning_text{
        font-size: 12px;
        color: #ff0000;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
    button[type="big-orange"]{
      background: #FF6600;
      color: #fff;
      border: 0;
    }
    button.disabled_button[type="big-orange"]{
      background: #ddd;
    }
  }
</style>
