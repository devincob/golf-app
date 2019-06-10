import Utils from './utils'
import Config from '../config'
import store from '../store'

let $pageCaches = {}

export default {
  Config: Config,
  Utils: Utils,
  // Vue.ues(...)
  install(Vue, options) {
    // Vue.prototype['$native'] = Native;
    Vue.prototype['$config'] = Config
    Vue.prototype['$utils'] = Utils
    Vue.prototype.$store = store

    // 处理微信 wx.xxx，使其支持 Promise 调用
    let $wx = {}
    Object.keys(wx).forEach(key => {
      if (typeof wx[key] === 'function') {
        $wx[key] = (options) => {
          if (key === 'canIUse') {
            return wx.canIUse(options)
          } else if (key.endsWith('Sync') || key.startsWith('create')) {
            return wx[key](options)
          }
          return new Promise((resolve, reject) => {
            wx[key]({
              ...options,
              success: (...args) => {
                resolve(...args)
              },
              fail: (...args) => {
                reject(...args)
              }
            })
          })
        }
      }
    })
    Vue.prototype.$wx = $wx

    let modules = {}
    if (options && options.model) {
      let models = options.model
      for (let k in models) {
        if (!modules['$$' + k]) {
          // let _t = instance.execute
          // instance.execute = function (path, options) {
          //   return _t.apply(instance, [path, options])
          // }
          modules['$$' + k] = new models[k]()
        }
      }
    }

    Vue.mixin({
      computed: {
        $user: () => store.state.user,
        $state: () => store.state
      },
      beforeCreate() {
        Object.assign(this, modules)
        this.getComponentByTag = (tag) => {
          for (let c of this.$children) {
            if (c.$options._componentTag === tag) {
              return c
            }
          }
        }
        /**
         * 在当前页面查找wx组件
         * //TODO: 兼容Vue子组件
         * @param selector
         * @returns {*}
         */
        this.$find = (selector) => {
          const $mp = this.$mp || this.$parent.$mp
          if ($mp) {
            return 'selectComponent' in $mp.page && $mp.page.selectComponent(selector)
          }
          return null
        }

        /**
         * 获取当前页面的Vue对象
         * @param page
         * @returns {*|null}
         */
        this.$getVuePage = (page = null) => {
          if (!page) page = this.$mp.page
          return $pageCaches[page.route] || null
        }

        /**
         * 获取上个页面的Vue对象
         * 此方法可能返回 null，注意判断后再做后续操作!!
         * @returns {*}
         */
        this.$getPrevVuePage = () => {
          let prev = this.getPrevPage()
          return prev ? this.$getVuePage(this.getPrevPage()) : null
        }
        this.getPrevPage = () => {
          const pages = getCurrentPages()
          if (pages.length <= 1) return null
          return pages[pages.length - 2]
        }
        this.getCurrentPage = () => {
          const pages = getCurrentPages()
          return pages[pages.length - 1]
        }

        /**
         * 返回上一页
         * @param options
         * @returns {Promise<any>}
         */
        this.goBack = function (options) {
          // let prev = this.$getPrevVuePage()
          let delta = 1
          if (options && options.delta) {
            delta = options.delta
            delete options.delta
          }
          if (options) this.__back_params = options
          return new Promise((resolve, reject) => {
            wx.navigateBack({
              delta,
              success() {
                // if (prev && 'onBack' in prev) {
                //   prev.onBack(options, currentPage)
                // }
                resolve()
              },
              fail(e) {
                reject(e)
              }
            })
          })
        }

        this.setBackParams = function (params) {
          this.__back_params = params
        }

        /**
         * 判断当前页面是否可返回
         * @returns {*|boolean}
         */
        this.canGoBack = function () {
          const pages = getCurrentPages()
          return pages && pages.length > 1
        }
        /**
         * 跳转页面
         * @param url
         * @returns {*}
         */
        this.goToPage = function (url) {
          return this.$wx.navigateTo({
            url
          })
        }
        this.$loading = {
          show: async (options) => {
            // const loader = this.$find('.J_loading')
            // options = options || {}
            // if (loader) {
            //   loader.setData({...options, isShow: true})
            //   // loader.show(options && options.delay)
            //   if (options.timeout) {
            //     setTimeout(() => {
            //       loader.hide()
            //     }, options.timeout + 500)
            //   }
            // }
            await this.$wx.showLoading(options)
          },
          hide: async () => {
            // this.$find('.J_loading').setData({isShow: false})
            await this.$wx.hideLoading()
          }
        }
        this.$showToast = (options) => {
          const toast = this.$find('.J_toast')
          if (typeof options === 'string') {
            options = {text: options}
          }
          // this.$wx.showToast(options)
          toast.setData({...options})
          if (toast) {
            toast.show()
          }
          return toast || {}
        }
      },
      // created() {
      //   // if (this.$store && this.$store.state) {
      //   //   this.$user = this.$store.state.user
      //   // }
      // },
      mounted() {
        this._timeouts = this._timeouts || []
        this._interval = this._interval || []
        if (this.$mp && this.$mp.mpType === 'page' && this.$mp.page) {
          $pageCaches[this.$mp.page.route] = this
        }
        // TODO: 在mpvue不提供refs支持前提供兼容
        const refs = {}
        this.$children && this.$children.forEach(child => {
          if (child.$vnode.data && child.$vnode.data.ref) {
            refs[child.$vnode.data.ref] = child
          }
        })
        this.$refs = {
          ...this.$refs,
          ...refs
        }
      },
      onUnload() {
        if (this.$mp && this.$mp.mpType === 'page' && this.$mp.page && $pageCaches[this.$mp.page.route]) {
          delete $pageCaches[this.$mp.page.route]
          this._timeouts && this._timeouts.forEach(function (t) {
            clearTimeout(t)
          })
          this._interval && this._interval.forEach(function (t) {
            clearInterval(t)
          })
        }
        if (this.$mp && this.$mp.page) {
          const route = this.$mp.page.route || ''
          const currentPage = {
            route: route,
            name: route.replace(/pages\/(.*?)\/main/, '$1')
          }
          if ('__back_params' in this && this.__back_params){
          }
          let prev = this.$getPrevVuePage()
          if (prev && 'onBack' in prev) {
            const params = '__back_params' in this && this.__back_params
            prev.onBack(params || {}, currentPage)
            delete this.__back_params
          }
        }
      },
      onShareAppMessage: function (res) {
        const params = {
          // title: '自定义转发标题',
          // path: '/page/user?id=123'
        }
        if (this.$mp && this.$mp.page) {
          params.path = '/' + this.$mp.appOptions.path
          if (this.$mp.page.route === 'pages/job-details/main') {
            params.path = Utils.setUrlParameter({
              goToPage: encodeURIComponent('/pages/job-details/main?orderid=' + this.$mp.query.orderid)
            }, params.path)
          }
        }
        return {
          ...params,
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
      },
      destroyed() {
        this._timeouts && this._timeouts.forEach(function (t) {
          clearTimeout(t)
        })
        this._interval && this._interval.forEach(function (t) {
          clearInterval(t)
        })
      },
      methods: {
        /**
         * setTimeout
         * @param fn
         * @param timeout
         */
        setTimeout(fn, timeout) {
          this._timeouts.push(setTimeout(fn, timeout))
        },

        /**
         * setInterval
         * @param fn
         * @param delay
         */
        setInterval(fn, delay) {
          this._interval.push(setInterval(fn, delay))
        }
      }
    })

    /**
     * 获取图片访问url
     * @param {String} key 图片路径
     * @param {String} [size] 可选 large|middle|small
     * @param taskImage
     * @returns {*|String}
     */
    Vue.prototype.getUploadImageUrl = function (key, size = 'small', taskImage = 'N') {
      let query = ''
      if (typeof key === 'function') key = key.call(this)
      if (typeof key === 'string' && key !== '') {
        if (key[0] !== '/') key = '/' + key
        if (size) {
          let dotPos = key.lastIndexOf('.')
          let ext = key.substr(dotPos)
          key = key.substr(0, dotPos) + '_' + size + ext
        }
        query = key
      } else {
        if (taskImage && taskImage === 'Y') {
          return Config.taskErrorImage
        } else {
          return Config.errorImage
        }
      }
      return Config.getImageUrlPath() + query
    }
  }
  /**
   * 获取图片访问url
   * @param {String} key 图片路径
   * @param width
   * @param height
   * @param taskImage
   * @returns {*|String}
   */
  // getImageUrlPath: function (key, width, height, taskImage) {
  //   let query = ''
  //   if (typeof key === 'function') key = key.call(this)
  //   if (typeof key === 'string' && key !== '') {
  //     if (key[0] !== '/') key = '/' + key
  //     query += '?Key=' + key
  //     if (width) {
  //       query += '&width=' + width
  //     }
  //     if (height) {
  //       query += '&height=' + height
  //     }
  //   } else {
  //     if (taskImage && taskImage === 'Y') {
  //       return Config.taskErrorImage
  //     } else {
  //       return Config.errorImage
  //     }
  //   }
  //   return Config.getImageUrlPath() + query
  // }
}
