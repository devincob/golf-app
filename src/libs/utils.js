import EventEmitter from './EventEmitter'

let utils = {

  extend: Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  },
  /**
   * 清除字符串两边的空字符
   * @param str
   * @returns {string|*}
   */
  trim: function (str) {
    return String(str).replace(/(^\s*)|(\s*$)/g, '')
  },
  sortBy: function (filed, rev, primer) {
    rev = (rev) ? -1 : 1
    return function (a, b) {
      a = a[filed]
      b = b[filed]
      if (typeof (primer) !== 'undefined') {
        a = primer(a)
        b = primer(b)
      }
      if (a < b) {
        return rev * -1
      }
      if (a > b) {
        return rev * 1
      }
      return 1
    }
  },

  toCamelCase: function (string) {
    string = String(string).toLowerCase().replace(/-(.)/g, function (match, group1) {
      return group1.toUpperCase()
    })
    return this.ucfirst(string)
  },

  ucfirst: function (string) {
    return string.replace(/(\w)/, function (v) {
      return v.toUpperCase()
    })
  },

  /**
   * 时间格式
   * @param date {Date} 时间
   * @param format [String] 格式，默认为yyyy-MM-dd hh:mm:ss
   * @return {String}
   */
  dateFormat: function (date, format) {
    if (this.isString(date)) {
      date = this.dateCreate(date)
    } else if (!this.isDate(date)) {
      return date
    }
    const week = ['日', '一', '二', '三', '四', '五', '六']
    let cfg = {
      yyyy: date.getFullYear(), // 年 : 4位
      yy: date.getFullYear().toString().substring(2), // 年 : 2位
      M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
      MM: this.zeroPad(date.getMonth() + 1, 2), // 月 : 如果1位的时候补0
      d: date.getDate(), // 日 : 如果1位的时候不补0
      dd: this.zeroPad(date.getDate(), 2), // 日 : 如果1位的时候补0
      hh: this.zeroPad(date.getHours(), 2), // 时
      mm: this.zeroPad(date.getMinutes(), 2), // 分
      ss: this.zeroPad(date.getSeconds(), 2), // 秒
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      W: date.getDay(),
      www: week[date.getDay()]
    }
    format || (format = 'yyyy-MM-dd hh:mm:ss')
    return format.replace(/([a-z])(\1)*/ig, function (m) {
      return cfg[m]
    })
  },

  getTimestamp: function (serverTimeString) {
    if (!serverTimeString) return 0
    if (!this.isString(serverTimeString)) {
      serverTimeString = String(serverTimeString)
    }
    let m = serverTimeString.match(/Date\(([\d-]+)\)/)
    if (m && m[1]) {
      return parseInt(m[1])
    }
    return 0
  },
  /**
   * 时间比较
   * @param objDate1
   * @param objDate2
   * @param interval y 年,q  季度,m  月,d  日,w  周,h  小时,n  分钟,s  秒,ms  毫秒
   * @returns {*}
   */
  dateDiff: function (objDate1, objDate2, interval) {
    let d = objDate1
    let i = {}
    let t = d.getTime()
    let t2 = objDate2.getTime()
    i['y'] = objDate2.getFullYear() - d.getFullYear()
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4)
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth()
    i['ms'] = objDate2.getTime() - d.getTime()
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000))
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000)
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000)
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000)
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000)
    return i[interval]
  },
  /**
   * 零填充
   * @param num
   * @param len 填充长度
   * @returns {String}
   */
  zeroPad: function (num, len) {
    num += ''
    len -= num.length
    for (let i = 0; i < len; i++) num = '0' + num
    return num
  },
  /**
   * 字符串重复
   * @param str 源字符
   * @param len 重复次数
   * @returns {*}
   */
  repeat: function (str, len) {
    if (len > 1) {
      let old = str
      for (let i = 1; i < len; i++) str += old
    }
    return str
  },
  setUrlParameter: function (name, value, url) {
    function changeURLPar(url, ref, value) {
      let str = ''
      if (url.indexOf('?') !== -1) {
        str = url.substr(url.indexOf('?') + 1)
      } else {
        return url + (value !== null ? ('?' + ref + '=' + value) : '')
      }
      let returnurl = ''
      let setparam = ''
      let arr
      let modify = '0'
      if (str.indexOf('&') !== -1) {
        arr = str.split('&')
        for (let i in arr) {
          if (arr[i].split('=')[0] === ref) {
            setparam = value
            modify = '1'
          } else {
            setparam = arr[i].split('=')[1]
          }
          if (value !== null) returnurl = returnurl + arr[i].split('=')[0] + '=' + setparam + '&'
        }
        returnurl = returnurl.substr(0, returnurl.length - 1)
        if (modify === '0') {
          if (returnurl === str) {
            returnurl = returnurl + '&' + ref + '=' + value
          }
        }
      } else {
        if (str.indexOf('=') !== -1) {
          arr = str.split('=')
          if (arr[0] === ref) {
            setparam = value
            modify = '1'
          } else {
            setparam = arr[1]
          }
          if (setparam !== null) returnurl = arr[0] + '=' + setparam
          if (modify === '0' && returnurl === str && value !== null) {
            returnurl = returnurl + '&' + ref + '=' + value
          }
        } else {
          if (value !== null) returnurl = ref + '=' + value
        }
      }
      return url.substr(0, url.indexOf('?')) + (String(returnurl).length ? '?' + returnurl : '')
    }

    if (this.isObject(name)) {
      url = url || value || document.URL
      for (let k in name) {
        url = changeURLPar(url || value || document.URL, k, name[k])
      }
      return url
    } else {
      return changeURLPar(url || document.URL, name, value)
    }
  },
  parseQueryString: function (url) {
    let str = url.indexOf('?') !== -1 ? url.split('?')[1] : url
    let items = str.split('&')
    let obj = {}
    for (let i = 0, l = items.length; i < l; i++) {
      let arr = items[i].split('=')
      obj[arr[0]] = arr[1]
    }
    return obj
  },
  /**
   * 创建一个日期
   * @param dateStr
   * @returns {Date}
   */
  dateCreate: function (dateStr) {
    dateStr = dateStr.replace(/-/g, '/')
    return new Date(dateStr)
  },
  str_tags: function (html) {
    if (typeof html !== 'string') return html
    html = html.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')
    html = html.replace(/<\/?[^>]*>/g, '')
    return html
  },
  nl2br: function (str) {
    if (typeof str !== 'string') return str
    return str.replace(/\n/g, '<br>')
  },
  /**
   * 生成范围随机数
   * @param start
   * @param end
   * @returns {*}
   */
  random: function (start, end) {
    end = end || start + start
    return Math.round(Math.random() * (end - start)) + start
  },
  randomString: function () {
    return Math.random().toString(36).substr(2)
  },

  /**
   * 添加千分位符号
   * @returns string
   * @param input
   */
  formatThousandth: function (input) {
    let n = parseFloat(input).toFixed(2)
    let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g
    return n.replace(re, '$1,')
  },

  /**
   * 产生任意长度随机字母数字组合
   * @param randomFlag 是否任意长度
   * @param min 任意长度最小位[固定位数]
   * @param max 任意长度最大位
   * @returns {string}
   */
  randomWord: function randomWord(randomFlag, min, max) {
    let str = ''
    let range = min
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min
    }
    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1))
      str += arr[pos]
    }
    return str
  },
  /**
   * 创建全局临时函数
   * @param {function} func
   * @returns {string}
   */
  createTempFunction: function (func) {
    let key = 'temp_function_' + Math.random().toString(36).substr(2)
    window[key] = func
    return key
  },

  /**
   *
   * @param {string} tmpName
   * @param {Array} [args]
   * @returns {boolean}
   */
  callTempFunction: function (tmpName, args) {
    if (!window[tmpName]) return false
    let tmp = window[tmpName]
    delete window[tmpName]
    if (typeof tmp === 'function') {
      return tmp.call(window, args)
    }
    return null
  },
  /**
   * 严格模式
   * 判断值是否在数组中
   * @param v
   * @param arr
   * @returns {boolean}
   */
  inArray: function (v, arr) {
    if (!this.isArray(arr)) return false
    for (let i = 0; i < arr.length; i++) {
      if (v === arr[i]) {
        return true
      }
    }
    return false
  },
  /**
   * 判断值是否在数组中
   * @param v
   * @param arr
   * @returns {boolean}
   */
  in_array: function (v, arr) {
    if (!this.isArray(arr)) return false
    for (let i = 0; i < arr.length; i++) {
      if (v === arr[i]) {
        return true
      }
    }
    return false
  },
  array_duplicate: function (arr, key) {
    let tmp = {}
    for (let k in arr) {
      if (this.isString(arr[k])) {
        tmp[arr[k]] = arr[k]
      } else {
        tmp[arr[k][key]] = arr[k]
      }
    }
    let tmp2 = []
    for (let k in tmp) {
      tmp2.push(tmp[k])
    }
    return tmp2
  },
  /*
   * JSON数组去重
   * @param: [array] json Array
   * @param: [string] 唯一的key名，根据此键名进行去重
   */
  uniqueArray: function (array, key) {
    let result = [array[0]]
    for (let i = 1; i < array.length; i++) {
      let item = array[i]
      let repeat = false
      for (let j = 0; j < result.length; j++) {
        if (item[key] === result[j][key]) {
          repeat = true
          break
        }
      }
      if (!repeat) {
        result.push(item)
      }
    }
    return result
  },
  cookie: {
    constructor: function cookie(key, value, options) {
      // key and at least value given, set cookie...
      if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = utils.extend({}, options)

        if (value === null || value === undefined) {
          options.expires = -1
        }

        if (typeof options.expires === 'number') {
          let days = options.expires
          let t = options.expires = new Date()
          t.setDate(t.getDate() + days)
        }

        value = String(value)

        return (document.cookie = [
          encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
          options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          options.path ? '; path=' + options.path : '',
          options.domain ? '; domain=' + options.domain : '',
          options.secure ? '; secure' : ''
        ].join(''))
      }

      // key and possibly options given, get cookie...
      options = value || {}
      let decode = options.raw ? function (s) {
        return s
      } : decodeURIComponent

      let pairs = document.cookie.split('; ')
      let pair
      for (let i = 0; (pair = pairs[i]) && pairs[i].split('='); i++) {
        if (decode(pair[0]) === key) return decode(pair[1] || '') // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
      }
      return null
    },
    get: function (name, defaults) {
      let data = this.constructor(name)
      if (!data) data = defaults
      return data
    },
    set: function (name, value, path) {
      return this.constructor(name, value, {path: path || '/'})
    }
  },
  toRad: function (d) {
    return d * Math.PI / 180
  },
  /**
   * 计算坐标间的距离
   * @param lat1
   * @param lng1
   * @param lat2
   * @param lng2
   * @returns {number}
   */
  getDistance: function (lat1, lng1, lat2, lng2) {
    let radLat1 = this.toRad(lat1)
    let radLat2 = this.toRad(lat2)
    let deltaLat = radLat1 - radLat2
    let deltaLng = this.toRad(lng1) - this.toRad(lng2)
    let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)))
    return dis * 6378.137
  }
};

(function () {
  ['String', 'Function', 'Date', 'Array', 'Boolean', 'Null', 'Number', 'Object'].forEach((v, i) => {
    utils['is' + v] = function (obj) {
      return Object.prototype.toString.call(obj) === '[object ' + v + ']'
    }
  })

  /**
   * 判断是否手机号码
   * @param mobile
   * @returns {boolean}
   */
  utils['isMobile'] = function (mobile) {
    mobile = mobile || ''
    return !!mobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)
  }
})();

(function () {
  /**
   * 倒计时
   * @param {Integer} i 计时总秒数
   * @param {Function} callback 计时完成后回调
   * @param {Function} t 每次倒数时回调
   */
  function Countdown(i, callback, t) {
    this.total = this.i = i
    this.callback = callback
    this.t = t
  }

  Countdown.prototype = {
    out: function () {
      let self = this
      if (self.runing && self.i > 0) {
        self.i--
        if (self.t) {
          self.t(self.i)
        }
        setTimeout(function () {
          self.out.apply(self)
        }, 1000)
      } else {
        self.callback.apply(self)
      }
      return self
    },
    start: function () {
      this.runing = true
      return this.out()
    },
    stop: function () {
      this.i = this.total
      this.runing = false
    }
  }

  utils.Countdown = Countdown
})();
(function () {
  /**
   * Storage
   * @type {{storage: Function, get: Function, set: Function}}
   * @return {*}
   */

  function Storage(name, value, expired) {
    if (!name) return null
    let storage = {
      getItem(name){
        return wx.getStorageSync(name)
      },
      setItem(key, value){
        return wx.setStorageSync(key, value)
      }
    }
    let date = new Date()
    let _watch = name
    name = 'STORAGE_' + String(name).toLocaleUpperCase()
    if (value === null) { // 当值为空时删除
      if (storage.hasOwnProperty(name)) {
        storage.removeItem(name)
      }
      Storage._execWatch(_watch, null)
    } else if (!value) {
      let item = storage.getItem(name)
      if (item) {
        item = JSON.parse(item)
        if (item.expired > 0 && item.expired - date.getTime() < 0) {
          storage.removeItem(name)
          Storage._execWatch(_watch, null)
        } else {
          return item.value
        }
      }
    } else {
      let ret = storage.setItem(name, JSON.stringify({
        value: value,
        expired: expired > 0 ? date.getTime() + expired * 1000 : 0
      }))
      Storage._execWatch(_watch, value.ret)
      return ret
    }
    return null
  }

  Storage._watchers = {}

  Storage._execWatch = function (prop, args) {
    let _watch = Storage._watchers[prop] || []
    _watch.forEach((handler, i) => {
      if (handler && typeof handler === 'function') {
        handler(args)
      }
    })
  }

  utils.Storage = Storage

  utils.Storage.watch = function (prop, handler) {
    Storage._watchers[prop] = Storage._watchers[prop] || []
    Storage._watchers[prop].push(handler)
  }

  utils.Storage.watchOne = function (prop, handler) {
    Storage._watchers[prop] && delete Storage._watchers[prop]
    Storage._watchers[prop] = [handler]
  }

  utils.Storage.unwatch = function (prop, handler) {
    let _handlers = Storage._watchers[prop] || []
    if (handler) {
      for (let i = 0; i < _handlers.length; i++) {
        if (_handlers[i] === handler) {
          _handlers.slice(i, 1)
        }
      }
      Storage._watchers[prop] = _handlers
    } else {
      Storage._watchers[prop] = []
    }
  }

  utils.Storage.get = function (name, defaultValue) {
    let value = Storage(name)
    return value || defaultValue
  }

  /**
   *
   * @param {String} name
   * @param {*} value
   * @param {int} expired 过期时间
   * @returns {*}
   */
  utils.Storage.set = function (name, value, expired) {
    if (typeof value === 'undefined') throw new Error('The value must be filled in, may be null!')
    return Storage(name, value || null, expired || 0)
  }
})();

(function () {
  let base64 = {}
  base64.map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  base64.decode = function (s) {
    s += ''
    let len = s.length
    if ((len === 0) || (len % 4 !== 0)) {
      return s
    }

    let pads = 0
    if (s.charAt(len - 1) === base64.map[64]) {
      pads++
      if (s.charAt(len - 2) === base64.map[64]) {
        pads++
      }
      len -= 4
    }

    let i
    let b
    let map = base64.map
    let x = []
    for (i = 0; i < len; i += 4) {
      b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i + 1)) << 12) | (map.indexOf(s.charAt(i + 2)) << 6) | map.indexOf(s.charAt(i + 3))
      x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff, b & 0xff))
    }

    switch (pads) {
      case 1:
        b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12) | (map.indexOf(s.charAt(i)) << 6)
        x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff))
        break
      case 2:
        b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12)
        x.push(String.fromCharCode(b >> 16))
        break
    }
    return unescape(x.join(''))
  }

  base64.encode = function (s) {
    if (!s) {
      return
    }

    s += ''
    if (s.length === 0) {
      return s
    }
    s = escape(s)

    let i
    let b
    let x = []
    let map = base64.map
    let padchar = map[64]
    let len = s.length - s.length % 3

    for (i = 0; i < len; i += 3) {
      b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8) | s.charCodeAt(i + 2)
      x.push(map.charAt(b >> 18))
      x.push(map.charAt((b >> 12) & 0x3f))
      x.push(map.charAt((b >> 6) & 0x3f))
      x.push(map.charAt(b & 0x3f))
    }

    switch (s.length - len) {
      case 1:
        b = s.charCodeAt(i) << 16
        x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + padchar + padchar)
        break
      case 2:
        b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8)
        x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + map.charAt((b >> 6) & 0x3f) + padchar)
        break
    }
    return x.join('')
  }

  utils.base64 = base64
})();

(function () {
  let key = 0x8912

  function encrypt(str) {
    let m = []
    str = String(str)
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i) ^ key
      m.push(String.fromCharCode(c))
    }
    return m.join('')
  }

  function decrypt(str) {
    let m = []
    str = String(str)
    for (let i = 0; i < str.length; i++) {
      let c = key ^ str.charCodeAt(i)
      m.push(String.fromCharCode(c))
    }
    return m.join('')
  }

  utils.encrypt = function (str) {
    return utils.base64.encode(encrypt(str))
  }
  utils.decrypt = function (str) {
    if (str && str.match(/^[a-zA-Z0-9=/+]+?$/)) {
      str = utils.base64.decode(str)
    }
    return decrypt(str)
  }
})()
// 短网址
utils.clearStorage = function (prefix, exclude) {
  if (typeof window.localStorage === 'undefined') return
  let excludes = ['STORAGE_MEMBER_INFO', 'STORAGE_SESSION_ID']
  if (exclude) {
    excludes = excludes.concat(exclude)
  }
  for (let key in window.localStorage) {
    if (utils.inArray(key, excludes)) {
      continue
    }
    if (prefix) {
      if (key.substr(0, prefix.length) === prefix) {
        window.localStorage.removeItem(key)
      }
    } else {
      window.localStorage.removeItem(key)
    }
  }
}

export default utils
export const Storage = utils.Storage
export const base64 = utils.base64
export const encrypt = utils.encrypt
export const decrypt = utils.decrypt
export const getShortUrl = utils.getShortUrl
export const extend = utils.extend
export const clearStorage = utils.clearStorage
export const $event = new EventEmitter()
