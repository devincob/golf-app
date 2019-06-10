import {Validator} from 'vee-validate'

/**
 * 验证手机号码格式
 * mobile 只验证是否是手机号码
 * mobile:phone 验证是否是手机/座机号码
 */
Validator.extend('mobile', { // /^[0-9]+$/
  getMessage: (field, params) => {
    return `请填写一个正确的${field}`
  },
  validate: (value, params) => {
    // let isMobile = /^1[34578]\d{9}$/.test(value), isPhone = false;
    let isMobile = /^1\d{10}$/.test(value)
    let isPhone = false // 号码改成１开头的１１位
    if (params[0] === 'phone'){
      isPhone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)
    }
    return isMobile || isPhone
  }
})

/**
 * 验证正整数
 */
Validator.extend('positive_integer', {
  getMessage: (field, params) => {
    return `${field}必须是正整数`
  },
  validate: (value, params) => {
    return /^[0-9]+$/.test(value)
  }
})
