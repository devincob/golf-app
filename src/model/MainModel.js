/*
**本代码由生成器自动生成，请勿手动修改
**生成时间：2019-06-06 12:09:26
*/
import Model from '../libs/model'
export default class MSModel extends Model {
  /**
   *名称：文章.获取 路由：/Article/Get
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //文章Id
       "articleId":int
   }

   *Response:
   {
       //文章Id
       "articleId":int
       //文章标题
       "articleTitle":string
       //发布日期
       "createDate":string
       //分享图片
       "shareImg":string
       //文章内容
       "articleContent":string
   }

   */
  articleGet(params, callback){
    return this.modelExecute('/Article/Get', params, callback)
  }
  /**
   *名称：文章.列表 路由：/Article/QueryList
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //
       "":
   }

   *Response:
   {
       //文章Id
       "articleId":int
       //文章标题
       "articleTitle":string
       //发布日期
       "createDate":string
       //浏览次数
       "viewTimes":string
       //分享图片
       "shareImg":string
       //是否置顶
       "isTop":int
   }

   */
  articleQueryList(params, callback){
    return this.modelExecute('/Article/QueryList', params, callback)
  }
  /**
   *名称：预约.预约 路由：/Booking/Book
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //会员Id
       "membId":int
       //球场Id
       "gCId":int
       //场次Id
       "pIDId":int
       //预定日期
       "bookDate":DateTime
       //预定人数
       "bookNum":int
       //支付方式
       "payType":string
       //支付金额
       "amount":decimal
       //周几
       "week":int
   }

   *Response:
   {
       //返回结果
       "result":int
       //返回信息
       "msg":string
       //付款编号
       "payCode":string
   }

   */
  bookingBook(params, callback){
    return this.modelExecute('/Booking/Book', params, callback)
  }
  /**
   *名称：预约.预约详情 路由：/Booking/BookDetail
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //预定Id
       "bookId":int
   }

   *Response:
   {
       //预定Id
       "bookId":int
       //球场名称
       "gCName":string
       //场次信息
       "pIDInfo":string
       //天气信息
       "weatherInfo":string
       //场次服务
       "pIDService":string
       //预约人数
       "bookNum":int
       //预约状态
       "bookStatus":string
       //确认消费时间
       "payConfirmtime":string
       //业务类型
       "businessType":string
   }

   */
  bookingBookDetail(params, callback){
    return this.modelExecute('/Booking/BookDetail', params, callback)
  }
  /**
   *名称：预约.取消预约 路由：/Booking/Cancel
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //预定Id
       "bookId":int
       //会员Id
       "membId":int
       //取消原因
       "cancelReason":string
   }

   *Response:
   {
       //返回结果
       "result":int
       //返回信息
       "msg":string
   }

   */
  bookingCancel(params, callback){
    return this.modelExecute('/Booking/Cancel', params, callback)
  }
  /**
   *名称：预约.我的预约 路由：/Booking/MembBooking
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //会员Id
       "membId":int
       //预约状态
       "bookStatus":string
   }

   *Response:
   {
       //预定Id
       "bookId":int
       //球场名称
       "gCName":string
       //场次名称
       "pIDName":string
       //预定日期
       "bookDate":string
       //周几
       "bookWeek":int
       //预定人数
       "bookNum":int
       //球场坐标
       "coordinate":string
       //业务类型
       "businessType":string
       //预约状态
       "bookStatus":string
   }

   */
  bookingMembBooking(params, callback){
    return this.modelExecute('/Booking/MembBooking', params, callback)
  }
  /**
   *名称：球场.列表 路由：/GolfCourse/List
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //
       "":
   }

   *Response:
   {
       //球场Id
       "gCId":int
       //球场名称
       "gCName":string
   }

   */
  golfCourseList(params, callback){
    return this.modelExecute('/GolfCourse/List', params, callback)
  }
  /**
   *名称：球场.一周场次 路由：/GolfCourse/PeriodWeekGet
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //球场Id
       "gCId":int
   }

   *Response:
   {
       //场次信息
       "gCPeriods":GCPeriodBookInfo[]
       //球场Id
       "gCId":int
       //球场名称
       "gCName":string
       //预约日期
       "bookDate":string
       //周几
       "week":stirng
   }

   */
  golfCoursePeriodWeekGet(params, callback){
    return this.modelExecute('/GolfCourse/PeriodWeekGet', params, callback)
  }
  /**
   *名称：会员.会员信息 路由：/Member/Info
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //临时Code
       "code":string
   }

   *Response:
   {
       //会员姓名
       "membName":string
       //会员类型
       "membLevelName":string
       //剩余次数
       "residueTimes":int
       //会员Id
       "membId":int
       //会话Id
       "sessionId":string
       //系统角色
       "membRole":string
   }

   */
  memberInfo(params, callback){
    return this.modelExecute('/Member/Info', params, callback)
  }
  /**
   *名称：会员.微信绑定 路由：/Member/WXBind
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //会员账号
       "loginName":string
       //会员密码
       "password":string
       //临时Code
       "code":string
   }

   *Response:
   {
       //结果
       "result":int
       //提示信息
       "msg":string
       //会员姓名
       "membName":string
       //会员类型
       "membLevelName":string
       //剩余次数
       "residueTimes":int
       //会员Id
       "membId":int
       //会话Id
       "sessionId":string
       //系统角色
       "membRole":string
   }

   */
  memberWXBind(params, callback){
    return this.modelExecute('/Member/WXBind', params, callback)
  }
  /**
   *名称：支付.支付结果通知 路由：/Payment/Callback
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //
       "":
   }

   *Response:
   bool
   */
  paymentCallback(params, callback){
    return this.modelExecute('/Payment/Callback', params, callback)
  }
  /**
   *名称：支付.订单支付 路由：/Payment/Pay
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //订单Id
       "orderId":int
       //订单类型(P:商品订单，B：预约订单)
       "orderType":string
   }

   *Response:
   {
       //支付参数
       "jsApiParams":string
   }

   */
  paymentPay(params, callback){
    return this.modelExecute('/Payment/Pay', params, callback)
  }
  /**
   *名称：消费.确认消费 路由：/PayRecord/Confirm
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //商务类型
       "businessType":string
       //业务Id
       "businessId":int
       //会员Id
       "membId":int
   }

   *Response:
   {
       //返回结果
       "result":int
       //返回信息
       "msg":string
   }

   */
  payRecordConfirm(params, callback){
    return this.modelExecute('/PayRecord/Confirm', params, callback)
  }
  /**
   *名称：消费.微信支付 路由：/PayRecord/WxPay
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //业务类型
       "businessType":string
       //业务Id
       "businessId":int
       //会员Id
       "memberId":int
       //微信OpenId
       "wxopenId":string
   }

   *Response:
   {
       //返回结果
       "result":int
       //返回信息
       "msg":string
   }

   */
  payRecordWxPay(params, callback){
    return this.modelExecute('/PayRecord/WxPay', params, callback)
  }
  /**
   *名称：商品.列表 路由：/Product/ProductAll
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //
       "":
   }

   *Response:
   {
       //商品Id
       "productId":int
       //商品名称
       "productName":string
       //价格
       "price":decimal
       //商品主图
       "imgUrl":string
       //商品描述
       "productDescribe":string
   }

   */
  productAll(params, callback){
    return this.modelExecute('/Product/ProductAll', params, callback)
  }
  /**
   *名称：商品.加入购物车 路由：/Product/EnterCart
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //商品Id
       "productId":int
       //会员Id
       "membId":int
       //数量
       "num":int
   }

   *Response:
   {
       //返回结果
       "result":int
       //返回信息
       "msg":string
   }

   */
  productEnterCart(params, callback){
    return this.modelExecute('/Product/EnterCart', params, callback)
  }
  /**
   *名称：商品.我的购物车 路由：/Product/MyCart
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //会员Id
       "membId":int
   }

   *Response:
   {
       //会员Id
       "membId":int
       //商品Id
       "productId":int
       //商品名称
       "productName":String
       //价格
       "price":decimal
       //商品主图
       "imgUrl":String
       //商品描述
       "productDescribe":String
       //数量
       "num":int
       //商品状态
       "productStatus":string
       //加入时间
       "enterTime":string
   }

   */
  productMyCart(params, callback){
    return this.modelExecute('/Product/MyCart', params, callback)
  }
  /**
   *名称：商品.移出购物车 路由：/Product/OutCart
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //商品Id
       "productId":int
       //会员Id
       "membId":int
   }

   *Response:
   {
       //返回结果
       "result":int
       //返回信息
       "msg":string
   }

   */
  productOutCart(params, callback){
    return this.modelExecute('/Product/OutCart', params, callback)
  }
  /**
   *名称：订单.提交订单 路由：/ProductOrder/ProductOrderCreate
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //会员Id
       "membId":int
       //商品信息
       "productInfo":OrderCreateProductInfo[]
       //
       "":
   }

   *Response:
   {
       //订单Id
       "orderId":int
   }

   */
  productOrderCreate(params, callback){
    return this.modelExecute('/ProductOrder/ProductOrderCreate', params, callback)
  }
  /**
   *名称：订单.订单详情 路由：/Product/ProductOrderDetail
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //订单Id
       "orderId":int
   }

   *Response:
   {
       //业务类型
       "businessType":string
       //订单编号
       "orderCode":string
       //下单时间
       "orderTime":string
       //订单金额
       "totalAmount":decimal
       //订单状态
       "orderStatus":string
       //订单商品
       "orderProducts":OrderProductInfo[]
       //消费确认时间
       "payConfirmtime":string
       //支付方式
       "payType":string
       //订单Id
       "orderId":int
   }

   */
  productOrderDetail(params, callback){
    return this.modelExecute('/Product/ProductOrderDetail', params, callback)
  }
  /**
   *名称：订单.订单列表 路由：/ProductOrder/List
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //会员Id
       "membId":int
       //是否使用
       "isUsed":bool
   }

   *Response:
   {
       //订单Id
       "orderId":int
       //订单编号
       "orderCode":string
       //下单时间
       "orderTime":string
       //订单状态
       "orderStatus":string
       //商品数量
       "sumNum":int
       //商品主图
       "productImgs":string
       //订单金额
       "totalAmount":decimal
   }

   */
  productOrderList(params, callback){
    return this.modelExecute('/ProductOrder/List', params, callback)
  }
  /**
   *名称：球场.场次详情 路由：/GolfCourse/PeriodDetail
   *@param {*} params 向服务器传送的参数,对应Request
   *@param {Function} [callback]  回调函数
   *Request:
   {
       //预约日期
       "bookDate":DateTime
       //场次Id
       "pIDId":int
   }

   *Response:
   {
       //球场Id
       "gCId":int
       //球场名称
       "gCName":string
       //场次Id
       "pIDId":int
       //场次名称
       "pIDName":string
       //周几
       "week":string
       //预约日期
       "bookDate":string
       //价格
       "price":decimal
       //剩余预约人次
       "residueTimes":int
       //场次服务
       "pIDService":string
   }

   */
  golfCoursePeriodDetail(params, callback){
    return this.modelExecute('/GolfCourse/PeriodDetail', params, callback)
  }
}
