import {Validator} from 'vee-validate'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function ValidatorCreate(rules) {
  const validator = Validator.create()
  Object.keys(rules).forEach(field => {
    const rule = rules[field]
    const data = {
      name: field,
      rules: rule.rules
    }
    if (rule.alias) {
      data.alias = rule.alias
    }
    validator.attach(data)
  })

  validator.getErrors = () => {
    const errors = {}
    validator.errors.items.forEach(item => {
      const rule = rules[item.field]
      if (rule && rule.messages && rule.messages[item.rule]) {
        let messages = rules[item.field].messages
        if (item.rule in messages) {
          errors[item.field] = messages[item.rule]
        }
      } else {
        errors[item.field] = item.msg
      }
    })
    return errors
  }
  return validator
}

export function clearObject(obj) {
  if (obj) {
    obj = {...obj}
    Object.keys(obj).forEach(key => {
      switch (typeof obj[key]) {
        case 'string':
          obj[key] = ''
          break
        case 'number':
          obj[key] = 0
          break
        case 'object':
          obj[key] = {}
          break
        default:
          obj[key] = null
      }
    })
  }
  return obj
}
