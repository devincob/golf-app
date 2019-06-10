'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    value: {
      type: [Number, String],
      value: 0
    },
    max: {
      type: [Number, String],
      value: 100
    },
    type: {
      type: String,
      value: 'number'
    },
    _system_: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {},
  attached: function attached() {
    var host = this;
    var data = host.data;
    var max = parseInt(data.max, 10);
    var value = parseInt(data.value, 10);

    // 超出 max 范围显示 max+
    if (value && max && value > max) {
      host.setData({
        value: max + '+'
      });
    }

    // 设置系统信息
    wx.getSystemInfo && wx.getSystemInfo({
      success: function success(res) {
        host.setData({
          _system_: !!~res.system.indexOf('Android') ? 'android' : 'ios'
        });
      }
    });
  }
});