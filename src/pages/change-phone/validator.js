import {ValidatorCreate} from '@/utils'

export default ValidatorCreate({
  phone: {
    rules: 'required|mobile',
    alias: '手机号',
    messages: {
      required: '请填写手机号码',
      mobile: '手机号码格式有误'
    }
  },
  validCode: {
    rules: 'required|max: 4',
    alias: '验证码',
    messages: {
      required: '请填写验证码',
      max: '验证码为4位数'
    }
  }
})
