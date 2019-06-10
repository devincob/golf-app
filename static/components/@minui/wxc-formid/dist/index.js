'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    title: {
      type: String,
      value: ''
    },
    page: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    emitAbnorTap: function emitAbnorTap(event) {
      var detail = event.detail;
      var option = {};
      this.triggerEvent('click', detail, option);
    },
    saveFormId(e){
      if (e.detail.formId === 'the formId is a mock one') return
      var formIds = wx.getStorageSync('formIds')
      var pages = getCurrentPages()
      var currentPage = pages && pages.length ? pages[0] : {}
      var item = {
        formId: e.detail.formId,
        fromPage: this.data.page || currentPage.route,
        fromButton: this.data.title
      }
      if (!formIds || !formIds.length) {
        formIds = [item]
      } else {
        formIds.push(item)
      }
      wx.setStorageSync('formIds', formIds)
    }
  }
});
