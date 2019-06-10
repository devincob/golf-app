
Vue.prototype.$wx = {
  /**
   * 批量添加卡券。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  addCard: function(object) {
  },

  /**
   * 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  addPhoneContact: function(object) {
  },

  /**
   * 将 ArrayBuffer 数据转成 Base64 字符串
   * @param {string[]} arraybuffer
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  arrayBufferToBase64: function(arraybuffer) {
  },

  /**
   * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  authorize: function(object) {
  },

  /**
   * 将 Base64 字符串转成 ArrayBuffer 数据
   * @param {string} base64
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  base64ToArrayBuffer: function(base64) {
  },

  /**
   * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
   * @param {string} string
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  canIUse: function(string) {
  },

  /**
   * 返回一个数组，用来描述 canvas 区域隐含的像素数据
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  canvasGetImageData: function(object) {
  },

  /**
   * 将像素数据绘制到画布的方法
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  canvasPutImageData: function(object) {
  },

  /**
   * 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
   * @param {object} object
  * @param {string} $this
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  canvasToTempFilePath: function(object, $this) {
  },

  /**
   * 获取设备内是否录入如指纹等生物信息的接口
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  checkIsSoterEnrolledInDevice: function(object) {
  },

  /**
   * 获取本机支持的 SOTER 生物认证方式
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  checkIsSupportSoterAuthentication: function(object) {
  },

  /**
   * 通过上述接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口**检测当前用户登录态是否有效**。登录态过期后开发者可以再调用wx.login获取新的用户登录态。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  checkSession: function(object) {
  },

  /**
   * 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  chooseAddress: function(object) {
  },

  /**
   * 调起选择手机通讯录联系人界面，返回用户选择的联系人信息。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  chooseContact: function(object) {
  },

  /**
   * 从本地相册选择图片或使用相机拍照。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  chooseImage: function(object) {
  },

  /**
   * 选择用户的发票抬头。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  chooseInvoiceTitle: function(object) {
  },

  /**
   * 打开地图选择位置。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  chooseLocation: function(object) {
  },

  /**
   * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  chooseVideo: function(object) {
  },

  /**
   * 清理本地数据缓存。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  clearStorage: function() {
  },

  /**
   * 同步清理本地数据缓存
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  clearStorageSync: function() {
  },

  /**
   * 断开与低功耗蓝牙设备的连接
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  closeBLEConnection: function(object) {
  },

  /**
   * 关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。建议在使用小程序蓝牙流程后调用，与`wx.openBluetoothAdapter`成对调用。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  closeBluetoothAdapter: function(object) {
  },

  /**
   * 关闭 WebSocket 连接。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  closeSocket: function(object) {
  },

  /**
   * 创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接。**使用前请先阅读[说明](./api-network.md)**。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  connectSocket: function(object) {
  },

  /**
   * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  connectWifi: function(object) {
  },

  /**
   * 创建一个动画实例[animation](#animation)。调用实例的方法来描述动画。最后通过动画实例的`export`方法导出动画数据传递给组件的`animation`属性。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createAnimation: function(object) {
  },

  /**
   * 创建并返回 audio 上下文 `audioContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<audio/>` 组件
   * @param {string} audioid
  * @param {string} $this
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createAudioContext: function(audioid, $this) {
  },

  /**
   * 连接低功耗蓝牙设备。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createBLEConnection: function(object) {
  },

  /**
   * 创建并返回 camera 上下文 `cameraContext` 对象，`cameraContext` 与页面的 `camera` 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 `<camera/>` 组件。
   * @param {string} $this
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createCameraContext: function($this) {
  },

  /**
   * 创建 canvas 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
   * @param {string} canvasid
  * @param {string} $this
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createCanvasContext: function(canvasid, $this) {
  },

  /**
   * 创建并返回绘图上下文。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createContext: function() {
  },

  /**
   * 创建并返回内部 audio 上下文 `innerAudioContext` 对象。*本接口是 `wx.createAudioContext` 升级版。*
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createInnerAudioContext: function() {
  },

  /**
   * 操作对应的 `<live-player/>` 组件。
   * @param {string} domid
  * @param {string} $this
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createLivePlayerContext: function(domid, $this) {
  },

  /**
   * 创建并返回 `live-pusher` 上下文 `LivePusherContext` 对象，`LivePusherContext` 与页面的 `<live-pusher />` 组件绑定，一个页面只能有一个 `live-pusher`，通过它可以操作对应的 `<live-pusher/>` 组件。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createLivePusherContext: function() {
  },

  /**
   * 创建并返回 map 上下文 `mapContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<map/>` 组件
   * @param {string} mapid
  * @param {string} $this
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createMapContext: function(mapid, $this) {
  },

  /**
   * undefined
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createSelectorQuery: function() {
  },

  /**
   * 创建并返回 video 上下文 `videoContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<video/>` 组件
   * @param {string} videoid
  * @param {string} $this
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  createVideoContext: function(videoid, $this) {
  },

  /**
   * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。**使用前请先阅读[说明](./api-network.md)**。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  downloadFile: function(object) {
  },

  /**
   * 蓝牙设备characteristic(特征值)信息
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getBLEDeviceCharacteristics: function(object) {
  },

  /**
   * 获取蓝牙设备所有 service（服务）
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getBLEDeviceServices: function(object) {
  },

  /**
   * 获取**全局唯一**的背景音频管理器 `backgroundAudioManager`。
   *
   * @return {rt.type}
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getBackgroundAudioManager: function() {
  },

  /**
   * 获取后台音乐播放状态。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getBackgroundAudioPlayerState: function(object) {
  },

  /**
   * 获取所有已搜索到的`iBeacon`设备
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getBeacons: function(object) {
  },

  /**
   * 获取本机蓝牙适配器状态
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getBluetoothAdapterState: function(object) {
  },

  /**
   * 获取在小程序蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getBluetoothDevices: function(object) {
  },

  /**
   * 获取系统剪贴板内容
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getClipboardData: function(object) {
  },

  /**
   * 根据 uuid 获取处于已连接状态的设备
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getConnectedBluetoothDevices: function(object) {
  },

  /**
   * 获取已连接中的 Wi-Fi 信息
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getConnectedWifi: function(object) {
  },

  /**
   * 获取第三方平台自定义的数据字段。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getExtConfig: function(object) {
  },

  /**
   * 获取第三方平台自定义的数据字段的同步接口。
   *
   * @return {rt.type}
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getExtConfigSync: function() {
  },

  /**
   * 获取文件信息
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getFileInfo: function(object) {
  },

  /**
   * 判断当前设备是否支持 HCE 能力。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getHCEState: function(object) {
  },

  /**
   * 获取图片信息
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getImageInfo: function(object) {
  },

  /**
   * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getLocation: function(object) {
  },

  /**
   * 获取网络类型。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getNetworkType: function(object) {
  },

  /**
   * 获取微信替设备生成的唯一标识，用于判断设备是否更换。获取的数据为AES加密数据，需要自行解密。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getOpenDeviceId: function(object) {
  },

  /**
   * 获取**全局唯一**的录音管理器 `recorderManager`。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getRecorderManager: function() {
  },

  /**
   * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo](./getFileInfo.md) 接口。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getSavedFileInfo: function(object) {
  },

  /**
   * 获取本地已保存的文件列表
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getSavedFileList: function(object) {
  },

  /**
   * 获取屏幕亮度。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getScreenBrightness: function(object) {
  },

  /**
   * 获取用户的当前设置。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getSetting: function(object) {
  },

  /**
   * 获取转发详细信息
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getShareInfo: function(object) {
  },

  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getStorage: function(object) {
  },

  /**
   * 异步获取当前storage的相关信息
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getStorageInfo: function(object) {
  },

  /**
   * 同步获取当前storage的相关信息
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getStorageInfoSync: function() {
  },

  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   * @param {string} key
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getStorageSync: function(key) {
  },

  /**
   * 获取系统信息。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getSystemInfo: function(object) {
  },

  /**
   * 获取系统信息同步接口
   *
   * @return {rt.type}
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getSystemInfoSync: function() {
  },

  /**
   * 获取用户信息，withCredentials 为 true 时需要先调用 [wx.login](./api-login.md#wxloginobject) 接口。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getUserInfo: function(object) {
  },

  /**
   * 获取用户过去三十天微信运动步数，需要先调用 [wx.login](./api-login.md#wxloginobject) 接口。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getWeRunData: function(object) {
  },

  /**
   * 请求获取 Wi-Fi 列表，在 `onGetWifiList` 注册的回调中返回 wifiList 数据。iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  getWifiList: function(object) {
  },

  /**
   * 隐藏 loading 提示框
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  hideLoading: function() {
  },

  /**
   * 隐藏导航条加载动画。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  hideNavigationBarLoading: function() {
  },

  /**
   * 隐藏转发按钮
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  hideShareMenu: function(object) {
  },

  /**
   * 隐藏 tabBar
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  hideTabBar: function(object) {
  },

  /**
   * 隐藏 tabBar 某一项的右上角的红点
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  hideTabBarRedDot: function(object) {
  },

  /**
   * 隐藏消息提示框
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  hideToast: function() {
  },

  /**
   * 调用接口获取**登录凭证（code）**进而换取用户登录态信息，包括用户的**唯一标识（openid）** 及本次登录的 **会话密钥（session_key）**等。**用户数据的加解密通讯**需要依赖会话密钥完成。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  login: function(object) {
  },

  /**
   * wx.makePhoneCall({
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  makePhoneCall: function(object) {
  },

  /**
   * 调起 VoIP 音视频通话界面。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  makeVoIPCall: function(object) {
  },

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 [`getCurrentPages()`](../framework/app-service/page.md#getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  navigateBack: function(object) {
  },

  /**
   * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  navigateBackMiniProgram: function(object) {
  },

  /**
   * 保留当前页面，跳转到应用内的某个页面，使用`wx.navigateBack`可以返回到原页面。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  navigateTo: function(object) {
  },

  /**
   * 打开同一公众号下关联的另一个小程序。**（注：必须是同一公众号下，而非同个 open 账号下）**
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  navigateToMiniProgram: function(object) {
  },

  /**
   * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持`notify`或者`indicate`才可以成功调用，具体参照 characteristic 的 properties 属性
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  notifyBLECharacteristicValueChange: function(object) {
  },

  /**
   * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `wx.stopAccelerometer` 停止监听。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onAccelerometerChange: function(callback) {
  },

  /**
   * 监听低功耗蓝牙设备的特征值变化。必须先启用`notify`接口才能接收到设备推送的notification。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBLECharacteristicValueChange: function(callback) {
  },

  /**
   * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBLEConnectionStateChange: function(callback) {
  },

  /**
   * 监听音乐暂停。
   * @param {string} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBackgroundAudioPause: function(callback) {
  },

  /**
   * 监听音乐播放。
   * @param {string} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBackgroundAudioPlay: function(callback) {
  },

  /**
   * 监听音乐停止。
   * @param {string} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBackgroundAudioStop: function(callback) {
  },

  /**
   * 监听 `iBeacon` 服务的状态变化
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBeaconServiceChange: function(callback) {
  },

  /**
   * 监听 `iBeacon` 设备的更新事件
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBeaconUpdate: function(callback) {
  },

  /**
   * 监听蓝牙适配器状态变化事件
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBluetoothAdapterStateChange: function(callback) {
  },

  /**
   * 监听寻找到新设备的事件
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onBluetoothDeviceFound: function(callback) {
  },

  /**
   * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用`wx.stopCompass`停止监听。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onCompassChange: function(callback) {
  },

  /**
   * 监听需要评估连上的 Wi-Fi 的请求，在回调里必须返回 `confidence` 字段
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onEvaluateWifi: function(callback) {
  },

  /**
   * 监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onGetWifiList: function(callback) {
  },

  /**
   * 监听 NFC 设备的消息回调，并在回调中处理。返回参数中 `messageType` 表示消息类型，目前有如下值：
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onHCEMessage: function(callback) {
  },

  /**
   * 监听网络状态变化。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onNetworkStatusChange: function(callback) {
  },

  /**
   * 监听WebSocket关闭。
   * @param {string} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onSocketClose: function(callback) {
  },

  /**
   * 监听WebSocket错误。
   * @param {string} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onSocketError: function(callback) {
  },

  /**
   * 监听WebSocket接受到服务器的消息事件。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onSocketMessage: function(callback) {
  },

  /**
   * 监听WebSocket连接打开事件。
   * @param {string} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onSocketOpen: function(callback) {
  },

  /**
   * 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onUserCaptureScreen: function(callback) {
  },

  /**
   * 监听连接上 Wi-Fi 的事件。
   * @param {function} callback
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  onWifiConnected: function(callback) {
  },

  /**
   * 初始化小程序蓝牙模块，生效周期为调用`wx.openBluetoothAdapter`至调用`wx.closeBluetoothAdapter`或小程序被销毁为止。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  openBluetoothAdapter: function(object) {
  },

  /**
   * 查看微信卡包中的卡券。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  openCard: function(object) {
  },

  /**
   * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  openDocument: function(object) {
  },

  /**
   * 使用微信内置地图查看位置。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  openLocation: function(object) {
  },

  /**
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  openSetting: function(object) {
  },

  /**
   * 将页面滚动到目标位置。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  pageScrollTo: function(object) {
  },

  /**
   * 暂停播放音乐。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  pauseBackgroundAudio: function() {
  },

  /**
   * 暂停正在播放的语音。再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 wx.stopVoice。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  pauseVoice: function() {
  },

  /**
   * 使用后台播放器播放音乐，对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  playBackgroundAudio: function(object) {
  },

  /**
   * 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  playVoice: function(object) {
  },

  /**
   * 预览图片。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  previewImage: function(object) {
  },

  /**
   * 关闭所有页面，打开到应用内的某个页面。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  reLaunch: function(object) {
  },

  /**
   * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持`read`才可以成功调用，具体参照 characteristic 的 properties 属性
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  readBLECharacteristicValue: function(object) {
  },

  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  redirectTo: function(object) {
  },

  /**
   * 删除本地存储的文件
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  removeSavedFile: function(object) {
  },

  /**
   * 从本地缓存中异步移除指定 key 。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  removeStorage: function(object) {
  },

  /**
   * 从本地缓存中同步移除指定 key 。
   * @param {string} key
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  removeStorageSync: function(key) {
  },

  /**
   * 移除 tabBar 某一项右上角的文本
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  removeTabBarBadge: function(object) {
  },

  /**
   * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
   * @param {string} eventname
  * @param {string} data
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  reportAnalytics: function(eventname, data) {
  },

  /**
   * 发起网络请求。**使用前请先阅读[说明](./api-network.md)**。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  request: function(object) {
  },

  /**
   * 发起微信支付。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  requestPayment: function(object) {
  },

  /**
   * 保存文件到本地。**注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用**
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  saveFile: function(object) {
  },

  /**
   * 保存图片到系统相册。需要[用户授权](./authorize-index.md) scope.writePhotosAlbum
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  saveImageToPhotosAlbum: function(object) {
  },

  /**
   * 保存视频到系统相册。需要[用户授权](./authorize-index.md) scope.writePhotosAlbum
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  saveVideoToPhotosAlbum: function(object) {
  },

  /**
   * 调起客户端扫码界面，扫码成功后返回对应的结果
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  scanCode: function(object) {
  },

  /**
   * 控制音乐播放进度。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  seekBackgroundAudio: function(object) {
  },

  /**
   * 发送 NFC 消息。仅在安卓系统下有效。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  sendHCEMessage: function(object) {
  },

  /**
   * 通过 WebSocket 连接发送数据，需要先 [wx.connectSocket](#wxconnectsocketobject)，并在 [wx.onSocketOpen](#wxonsocketopencallback) 回调之后才能发送。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  sendSocketMessage: function(object) {
  },

  /**
   * 设置系统剪贴板的内容
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setClipboardData: function(object) {
  },

  /**
   * 设置是否打开调试开关，此开关对正式版也能生效。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setEnableDebug: function(object) {
  },

  /**
   * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setKeepScreenOn: function(object) {
  },

  /**
   * wx.setNavigationBarColor({
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setNavigationBarColor: function(object) {
  },

  /**
   * 动态设置当前页面的标题。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setNavigationBarTitle: function(object) {
  },

  /**
   * 设置屏幕亮度。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setScreenBrightness: function(object) {
  },

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setStorage: function(object) {
  },

  /**
   * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   * @param {string} key
  * @param {object|string} data
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setStorageSync: function(key, data) {
  },

  /**
   * 为 tabBar 某一项的右上角添加文本
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setTabBarBadge: function(object) {
  },

  /**
   * 动态设置 tabBar 某一项的内容
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setTabBarItem: function(object) {
  },

  /**
   * 动态设置 tabBar 的整体样式
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setTabBarStyle: function(object) {
  },

  /**
   * 动态设置置顶栏文字内容，只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容。**注意：调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调 fail，errMsg："setTopBarText: fail invoke too frequently"**
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setTopBarText: function(object) {
  },

  /**
   * 在 `onGetWifiList` 回调后，利用接口设置 wifiList 中 AP 的相关信息。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  setWifiList: function(object) {
  },

  /**
   * 显示操作菜单
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showActionSheet: function(object) {
  },

  /**
   * 显示 loading 提示框, 需主动调用 [wx.hideLoading](#wxhideloading) 才能关闭提示框
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showLoading: function(object) {
  },

  /**
   * 显示模态弹窗
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showModal: function(object) {
  },

  /**
   * 在当前页面显示导航条加载动画。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showNavigationBarLoading: function() {
  },

  /**
   * 显示当前页面的转发按钮
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showShareMenu: function(object) {
  },

  /**
   * 显示 tabBar
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showTabBar: function(object) {
  },

  /**
   * 显示 tabBar 某一项的右上角的红点
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showTabBarRedDot: function(object) {
  },

  /**
   * 显示消息提示框
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  showToast: function(object) {
  },

  /**
   * 开始监听加速度数据。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startAccelerometer: function(object) {
  },

  /**
   * 开始搜索附近的`iBeacon`设备
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startBeaconDiscovery: function(object) {
  },

  /**
   * 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startBluetoothDevicesDiscovery: function(object) {
  },

  /**
   * 开始监听罗盘数据。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startCompass: function(object) {
  },

  /**
   * 初始化 NFC 模块。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startHCE: function(object) {
  },

  /**
   * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startPullDownRefresh: function(object) {
  },

  /**
   * 开始录音。当主动调用`wx.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startRecord: function(object) {
  },

  /**
   * 开始 SOTER 生物认证
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startSoterAuthentication: function(object) {
  },

  /**
   * 初始化 Wi-Fi 模块。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  startWifi: function(object) {
  },

  /**
   * 停止监听加速度数据。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopAccelerometer: function(object) {
  },

  /**
   * 停止播放音乐。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopBackgroundAudio: function() {
  },

  /**
   * 停止搜索附近的`iBeacon`设备
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopBeaconDiscovery: function(object) {
  },

  /**
   * 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopBluetoothDevicesDiscovery: function(object) {
  },

  /**
   * 停止监听罗盘数据。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopCompass: function(object) {
  },

  /**
   * 关闭 NFC 模块。仅在安卓系统下有效。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopHCE: function(object) {
  },

  /**
   * 停止当前页面下拉刷新。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopPullDownRefresh: function() {
  },

  /**
   * 主动调用停止录音。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopRecord: function() {
  },

  /**
   * 结束播放语音。
   *
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopVoice: function() {
  },

  /**
   * 关闭 Wi-Fi 模块。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  stopWifi: function(object) {
  },

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  switchTab: function(object) {
  },

  /**
   * 更新转发属性
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  updateShareMenu: function(object) {
  },

  /**
   * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 `content-type` 为 `multipart/form-data` 。**使用前请先阅读[说明](./api-network.md)**。
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  uploadFile: function(object) {
  },

  /**
   * 使手机发生较长时间的振动（400ms）
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  vibrateLong: function(object) {
  },

  /**
   * 使手机发生较短时间的振动（15ms）
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  vibrateShort: function(object) {
  },

  /**
   * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持`write`才可以成功调用，具体参照 characteristic 的 properties 属性
   * @param {object} object
   *
   * @link https://mp.weixin.qq.com/debug/wxadoc/dev/api/
   */
  writeBLECharacteristicValue: function(object) {
  }
}
