'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    title: {
      type: String
    },
    titlePaddingTop: {
      type: String,
      value: '50rpx'
    },
    titleColor: {
      type: String,
      value: '#000000'
    },
    content: {
      type: String
    },
    contentColor: {
      type: String,
      value: '#888888'
    },
    confirmText: {
      type: String
    },
    confirmColor: {
      type: String,
      value: '#ff5777'
    },
    cancelText: {
      type: String
    },
    cancelColor: {
      type: String,
      value: '#666666'
    },
    image: {
      type: String
    },
    locked: {
      type: Boolean,
      value: false
    },
    dialogWidth: {
      type: String,
      value: ''
    },
    cancelBackground: {
      type: String,
      value: ''
    },
    confirmBackground: {
      type: String,
      value: ''
    },
    showButtons: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    show: function show() {
      var popupComponent = this.selectComponent('.popup');
      popupComponent && popupComponent.show();
    },
    hide: function hide() {
      var popupComponent = this.selectComponent('.popup');
      popupComponent && popupComponent.hide();
    },
    onContentTap: function onContentTap() {},
    cancelCallback: function cancelCallback() {
      this.triggerEvent('cancel');
    },
    confirmCallback: function confirmCallback() {
      this.triggerEvent('confirm');
    }
  }
});
