'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

exports.default = Component({
  behaviors: [],
  properties: {
    text: {
      type: String,
      value: ''
    },
    isEnd: {
      type: Boolean,
      value: false
    },
    icon: {
      type: String
    }
  },
  data: {
    type: _config.TYPES[Math.floor(Math.random() * _config.TYPES.length)],
    iconStatus: _config.IconType.HIDDEN,
    iconType: _config.IconType
  },
  attached: function attached() {
    var iconStatus = _config.IconType.HIDDEN;
    var icon = this.data.icon;
    if (icon) {
      iconStatus = _config.IconType.SHOW_DEFAULT;
    }
    if (/\.(jpg|gif|jpeg|png)+$/.test(icon)) {
      iconStatus = _config.IconType.SHOW_CONFIG;
    }
    this.setData({
      iconStatus: iconStatus
    });
  },

  methods: {}
});