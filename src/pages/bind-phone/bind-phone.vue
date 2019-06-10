<template>
  <div class="page page-binding-phone">
    <div class="xgLogo">
      <div class="weui-cell__bd">
        <img src="/static/images/reg_page_logo.png" alt="">
      </div>
    </div>
    <div class="mod_box">
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__bd">
          <input type="number" class="weui-input" v-model="formData.loginName" placeholder="请输入您的会员账号"/>
        </div>
        <div class="weui-cell__ft">
          <icon v-if="errors.loginName" @click="$showToast(errors.loginName)" type="warn" size="15" color="#E64340"></icon>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__bd">
          <input type="password" class="weui-input" v-model="formData.password" placeholder="请输入您的会员账号密码"/>
        </div>
        <div class="weui-cell__ft" v-if="errors.password">
          <icon @click="$showToast(errors.password)" type="warn" size="15" color="#E64340"></icon>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <button class="weui-btn bind-phone-btn"
              :class="{disabled_button: !isAgree || !formData.loginName || !formData.password}"
              :disabled="!isAgree || !formData.loginName || !formData.password" @tap="checkForm">登录</button>
    </div>
  </div>
</template>

<script>
import validator from './validator'
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      validSnCode: '',
      formData: {
        loginName: '',
        password: ''
      },
      errors: {},
      countdown: 0,
      isAgree: true
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    async checkForm(){
      const isValid = await validator.validateAll(this.formData)
      if (!isValid) {
        this.errors = validator.getErrors()
        this.$showToast('请填写正确的信息！')
      } else {
        this.bindPhone()
      }
    },
    async bindPhone(){
      try {
        const result = await this.$wx.login()
        const userInfo = await this.$$main.memberWXBind({
          loginName: this.formData.loginName,
          password: this.formData.password,
          code: result.code
        })
        this.setUserInfo(userInfo)
        this.$wx.showToast({
          title: '绑定成功',
          icon: 'success'
        })
        // 如果是从首页跳转过来，保存成功后跳转到完善资料页面
        if (!this.canGoBack()) {
          this.$wx.reLaunch({
            url: '/pages/index/main'
          })
        }
      } catch (e) {
        e.message && this.$wx.showToast({
          title: e.message || '操作失败',
          icon: 'none'
        })
      }
      this.errors = {}
    },
    bindAgreeChange: function (e) {
      this.isAgree = !!e.target.value.length
    }
  },
  onReady: function () {}
}
</script>

<style lang="less">
  .page-binding-phone{
    .textarea-placeholder,
    .input-placeholder{
      color: rgba(51, 51, 51, .6);
      font-size: 14px;
    }
    .xgLogo{
      padding: 20px 0;
      img{
        width: 138rpx;
        height: 138rpx;
        margin: 5px auto;
        display: block;
      }
      p{
        font-size: 14px;
        text-align: center;
        color: #333;
      }
    }
    .bind_fail{
      margin-top: 15px;
      font-size: 12px;
      color: #999;
      .navigator-hover{
        background: none;
      }
    }
    .mod_box{
      padding: 10px 31px;
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
      }
      .warning_text{
        font-size: 12px;
        color: #ff0000;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
    .bind-phone-btn {
      background-color: #23d38b;
      color: #ffffff;
      border-radius: 50px;
      width: 630rpx;
      height: 100rpx;
      line-height: 50px;
      font-size: 19px;
      font-family: "PingFang SC";
    }
    .bind-phone-btn[disabled] {
      background-color: rgba(26, 185, 118, .5);
      color: #ffffff;
    }
  }
</style>
