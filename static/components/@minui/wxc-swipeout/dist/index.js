'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [],
  properties: {
    index: Number
  },
  data: {
    items: [],
    offsetRecord: {'index': -1, 'startX': 0, 'offset': 0, 'direction': null}, // 偏移记录
    deleteButtonWidth: 200, // 删除按钮的宽度(rpx)
    pixelScale: 1
  },
  methods: {
    /**
     * 表格cell触摸开始事件
     */
    onTableCellTouchStart: function (event) {
      if (!event.changedTouches.length) return
      var index = event.currentTarget.dataset.index
      var x = event.changedTouches[0].clientX
      var y = event.changedTouches[0].clientY
      var offset = 0
      if (this.data.offsetRecord != null && this.data.offsetRecord.index === index) {
        offset = this.data.offsetRecord.offset
      }
      this.setData({offsetRecord: {'index': index, 'startX': x, 'startY': y, 'offset': offset, 'direction': null}})
    },

    /**
     * 表格cell触摸移动事件
     */
    onTableCellTouchMove: function (event) {
      if (!event.changedTouches.length) return
      var index = event.currentTarget.dataset.index
      var record = this.data.offsetRecord
      if (record == null || index !== record.index) {
        return
      }
      var clientX = event.changedTouches[0].clientX
      var startX = record.startX

      if (record.direction === null) {
        // 记录手势是左滑还是右滑
        record.direction = startX - 10 >= clientX ? 'left' : 'right'
      }
      if (record.direction === 'left') { // 👈滑动
        record.offset = Math.min((startX - clientX) * this.data.pixelScale, this.data.deleteButtonWidth)
      } else { // 👉滑动
        if (record.offset > 0) {
          record.offset = Math.max(this.data.deleteButtonWidth - Math.abs(clientX - startX) * this.data.pixelScale, 0)
        } else {
          record = null
        }
      }
      this.setData({offsetRecord: record})
    },

    /**
     * 表格cell触摸结束事件
     */
    onTableCellTouchEnd: function (event) {
      if (event.changedTouches.length !== 1) return
      var index = event.currentTarget.dataset.index
      var record = this.data.offsetRecord

      if (record != null && index === Reflect.get(record, 'index')) {
        var offset = Reflect.get(record, 'offset')
        if (offset >= this.data.deleteButtonWidth / 2) {
          Reflect.set(record, 'offset', this.data.deleteButtonWidth)
        } else {
          record = null
        }
        this.setData({offsetRecord: record})
      }
    },

    /**
     * 表格cell删除按钮点击事件
     */
    onDeleteButtonTapped: function (event) {
      var index = event.currentTarget.dataset.index
      this.triggerEvent('swipe:delete', {index: index - 1})
    }
  },
  ready: function () {
    var res = wx.getSystemInfoSync()
    this.data.pixelScale = (750 / 2) / (res.screenWidth / 2)
  },
  attached(){
    this.setData({
      offsetRecord: {'index': -1, 'startX': 0, 'offset': 0, 'direction': null}
    })
  }
})
