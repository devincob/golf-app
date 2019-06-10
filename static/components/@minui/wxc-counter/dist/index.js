"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    number: {
      type: [Number, String],
      value: 0,
      observer: function observer(newVal) {
        this.setData({
          number: parseInt(newVal, 10)
        });
      }
    },
    max: {
      type: [Number, String],
      value: 1,
      observer: function observer(newVal) {
        this.setData({
          max: parseInt(newVal, 10)
        });
      }
    },
    min: {
      type: [Number, String],
      value: 0,
      observer: function observer(newVal) {
        this.setData({
          min: parseInt(newVal, 10)
        });
      }
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  attached: function attached() {},
  methods: {
    addHandler: function addHandler(e) {
      var min = this.data.min;
      var max = this.data.max;
      var disabled = this.data.disabled;
      if (max <= this.data.number || disabled) return;
      this.setData({
        number: ++this.data.number
      });
      this.triggerEvent('changenumber', {
        e: e,
        number: this.data.number,
        min: min,
        max: max,
        type: 'add'
      });
    },
    minusHandler: function minusHandler(e) {
      var min = this.data.min;
      var max = this.data.max;
      var disabled = this.data.disabled;
      if (min >= this.data.number || disabled) return;
      this.setData({
        number: --this.data.number
      });
      this.triggerEvent('changenumber', {
        e: e,
        number: this.data.number,
        min: min,
        max: max,
        type: 'minus'
      });
    }
  }
});