'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: function observer(isShow) {
        if (isShow) {
          if (!getApp().globalData) {
            Object.assign(getApp(), { globalData: {} });
          }
          var globalData = getApp().globalData;
          var zIndex = (globalData._zIndex || 1000) + 1;
          globalData._zIndex = zIndex;
          this.setData({
            zIndex: zIndex
          });
        }
      }
    },
    text: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: ''
    },
    src: {
      type: String,
      value: ''
    },
    duration: {
      type: Number,
      value: 2000
    }
  },
  data: {
    zIndex: 1000
  },
  methods: {
    show: function show() {
      var _this = this;

      var duration = this.data.duration;

      clearTimeout(this._timer);
      this.setData({
        isShow: true
      });

      if (duration > 0 && duration !== Infinity) {
        this._timer = setTimeout(function () {
          _this.hide();
          _this.triggerEvent('success', {}, {});
        }, duration);
      }
    },
    hide: function hide() {
      this._timer = clearTimeout(this._timer);

      this.setData({ isShow: false });
    }
  }
});