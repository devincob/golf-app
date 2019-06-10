/**
 * Created by wdj on 16/5/30.
 * Model
 */

import Config from '../config'
import {Storage, $event} from './utils'

class Model {
  constructor (options) {
    this.__propertys__()
    this.__initialize(options)
  }

  __propertys__ () {
    // 默认http协议
    this.protocol = 'http'
    // 默认的请求方法
    this.method = 'POST'
    // 参数
    this.param = {}
    // url
    this.url = Config.getRestfulUrl()
    // path
    this.path = ''
    // 是否使用缓存，如果启用缓存必须设置result值为响应的store存储器
    this.useCache = false
    // 请求模式，true 异步 false 同步
    this.async = true
    // 超时时间
    this.timeout = 30 * 1000

    // $.ajax代理
    // this.ajax = $.ajax;
    // Dom7 ? Dom7.ajax : function (options) {
    //     fetch(options.url, {
    //         method: options.type || 'GET',
    //         timeout: options.timeout || 60,
    //         headers: {
    //             "Content-Type": options.contentType || "application/x-www-form-urlencoded"
    //         },
    //         body: options.data
    //     }).then(res=>{
    //         options.complete(res);
    //         return res.json()
    //     }).then(json=>{
    //         options.success(json);
    //     }).catch(e=>{
    //         options.error(e);
    //     });
    // };
    // this.ajax = function (options) {
    //   AjaxPlugin.$http.request({
    //     url: options.url,
    //     method: options.type || 'GET',
    //     timeout: options.timeout || 60,
    //     headers: {
    //       'Content-Type': options.contentType || 'application/x-www-form-urlencoded'
    //     },
    //     data: options.data,
    //     validateStatus: (status) => {
    //       return status === 200
    //     }
    //   }).then(res => {
    //     options.complete(res)
    //     options.success(res.data)
    //   }).catch(e => {
    //     options.error(e)
    //     options.complete()
    //   })
    // }
    this.ajax = function (options) {
      const requestTask = wx.request({
        url: options.url,
        method: options.type || 'GET',
        dataType: options.dataType || 'json',
        timeout: options.timeout || 60,
        headers: {
          'Content-Type': options.contentType || 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': options.method
        },
        data: options.data,
        success: function (res) {
          options.success(res.data, res.statusCode, res.header)
        },
        fail: function (e) {
          options.error(e)
        },
        complete: function () {
          options.complete()
        }
      })
      options.beforeSend && options.beforeSend(requestTask)
    }
    // response || store
    this.result = null
    // ajax代理
    this.proxy = null
    this.proxys = []
    // 版本
    this.ver = Config && Config.versionCode ? Config.versionCode : 0
    // 来源
    this.source = 'MS'
  }

  __initialize (options) {
    // Utils.extend(this, options)
    Object.assign(this, options)
    this._assert()
    this.initialize()
  }

  _assert () {
    if (!/^http[s]*$/i.test(this.protocol)) {
      throw new Error('AJAX协议必须为http或者https')
    }

    if (!/^post|delete|get|put|options$/i.test(this.method)) {
      throw new Error('AJAX的方法设置不正确')
    }

    if (!this.url) {
      throw new Error('AJAX的URL设置不正确')
    }
  }

  initialize () {
  }

  /**
   * 获取请求的实际参数
   * @returns {{header: {auth: string, ver: (number|*), source: string, act: string}, body: ({}|*)}}
   */
  getParam () {
    const state = Storage.get('VUEX_STATE')
    let session = (state && state.user && state.user.userInfo && state.user.userInfo.sessionId) || null
    return {
      header: {
        auth: session || '',
        method: null,
        ver: this.ver,
        source: this.source,
        act: this.path
      },
      body: this.param
    }
  }

  /**
   * 执行请求
   * @param path
   * @param options
   */
  execute (path, options) {
    if (typeof path === 'string') {
      this.path = path
    } else if (typeof path !== 'string' && !options) {
      options = path
    }

    // 是否使用同步模式
    if (options.body._useSync) {
      options.async = false
      delete options.body._useSync
    }

    // 使用ajax获取数据
    this.proxy = this.ajax(this._getOptions(options))
    this.proxys.push(this.proxy)

    if (Config.appMode === 'D') {
      try {
        console.groupCollapsed(`%c[MODEL]: %crequest: ${path} @ ${new Date().toLocaleString()}`, 'color:blue', 'color:#000;font-weight:bold')
        console.log('%cparams:', 'color: green', options.body)
        console.log('%cproxy:', 'color: green', this.proxy)
        console.groupEnd()
      } catch (e) {}
    }

    return this.proxy
  }

  /**
   * 使用Promise执行请求
   * @param path
   * @param params
   * @returns {Promise}
   */
  executePromise (path, params) {
    let _this = this
    return new Promise(function (resolve, reject) {
      _this.execute(path, {
        body: params || {},
        onSuccess: function (data) {
          resolve(data)
        },
        onError: function (err) {
          let e = new Error(err.message)
          e.name = err
          e.source = err
          reject(e)
        }
      })
    })
  }

  /**
   * 执行
   * @param path
   * @param params
   * @param {Function} callBack
   * @returns {*}
   */
  modelExecute (path, params, callBack) {
    if (typeof callBack === 'function') {
      return this.execute(path, {
        body: params || {},
        onSuccess (data) {
          if (typeof callBack === 'function') callBack(true, data)
        },
        onError (err) {
          if (typeof callBack === 'function') callBack(false, err)
        }
      })
    } else {
      return this.executePromise(path, params)
    }
  }

  /**
   * 终止请求
   */
  abort () {
    // this.proxy && this.proxy.abort && this.proxy.abort();
    if (this.proxys) {
      this.proxys.forEach(function (proxy) {
        proxy.abort()
      })
    }
  }

  /**
   * 设置缓存
   * @param data
   * @private
   */
  _setCache (data) {
    if (this._isUseCache()) {
      this.result.setValue(data)
    }
  }

  /**
   * 是否可以设置缓存
   * @returns {boolean}
   * @private
   */
  _isUseCache () {
    return (this.useCache && this.result && 'getValue' in this.result)
  }

  /**
   * 获取请求参数
   * @param options
   * @private
   */
  _getOptions (options) {
    let self = this
    let async = self.async
    if (typeof options.async !== 'undefined') {
      async = options.async
      delete options.async
    }
    if (options && typeof options.header === 'object') {
      options.header = {
        ...this.getParam().header,
        ...options.header
      }
    }
    return {
      type: self.method,
      url: self._getUrl(),
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      data: JSON.stringify(Object.assign(this.getParam(), options || {})),
      beforeSend: function (request) {
        options.onBeforeSend && options.onBeforeSend(request)
      },
      success: function (response) {
        response = self._validResponse(response)
        // 系统级错误
        if (!response.isSuccess) {
          if (response.code === 'LG301' || response.code === 'LG302' || response.code === 'LG303') {
            // 登录已超时
            // Native.trigger('login_expired');
            // $eventor.trigger('login_expired', Error(response.message))
            $event.emit('login_expired', Error(response.message))
            // return
          }

          if (response.code === 'BCS15' || response.code === 'S303') {
            // Native.trigger('user_access_disable');
            // $eventor.trigger('user_access_disable')
            $event.emit('user_access_disable', Error(response.message))
            // return
          }

          if (options.onError) {
            options.onError(response, {custom: true})
          } else {
            console.log(response)
          }
          return
        }

        // if (self._isUseCache()) {
        //   self.result.setValue(response.body)
        // }
        if (options.useCache) {
          // CacheManager.setValue(options.cacheKey, response.body, options.cacheExpired)
        }

        try {
          options.onSuccess && options.onSuccess(response.body)
        } catch (e) {
          console.error(e)
        }
      },
      error: function (res, status) {
        let result = {}
        if (status === 'abort') return
        if (!('isSuccess' in res)) {
          if (!status) {
            result = {message: '操作失败！请稍候再试。', isSuccess: false, code: 'J01'}
          } else if (res && res.responseText) {
            result = {message: res.responseText, isSuccess: false, code: 'J03'}
          } else if (typeof status === 'string') {
            switch (status) {
              case 'timeout':
                result.message = '请求超时!'
                break
              default :
                // window.alert(status)
            }
          } else {
            result = {message: '发生未知错误', isSuccess: false, code: 'J02'}
          }
        }
        if (res && res.responseURL) {
          result.message += res.responseURL
        }
        options.onError && options.onError(result, res)
      },
      complete: function () {
        options.onComplete && options.onComplete()
      },
      abort: function () {
        options.abort && options.abort()
      },
      async: async,
      timeout: self.timeout
    }
  }

  getUrl(path){
    if (typeof path === 'string') {
      this.path = path
      return this._getUrl()
    }
    return null
  }

  /**
   * 拼装Url
   * @returns {string}
   * @private
   */
  _getUrl () {
    let protocol = this.protocol + '://'
    if (this.url.substr(0, 10).indexOf('://') !== -1){
      protocol = ''
    }
    return protocol + this.url + this.path + '.json'
  }

  _validResponse (response) {
    if (response && typeof response.isSuccess !== 'undefined') {
      return response
    } else {
      return {message: '发生未知错误', isSuccess: false, code: 'J01'}
    }
  }

  _errorHTTPSatus (status) {
    return {
      404: '请求失败，请求所希望得到的资源未被在服务器上发现',
      500: '服务器遇到了一个未曾预料的状况',
      501: '服务器无法支持其对任何资源的请求。',
      502: ''
    }
  }
}

export default Model
