import {ValidatorCreate} from '@/utils'

export default ValidatorCreate({
  loginName: {
    rules: 'required',
    alias: '会员账号',
    messages: {
      required: '请填写会员账号'
    }
  },
  password: {
    rules: 'required',
    alias: '会员密码',
    messages: {
      required: '请填写会员密码'
    }
  }
})
