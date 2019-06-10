'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Event = require('./Event.js');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  options: {
    multipleSlots: true // support multi slot
  },
  behaviors: [],
  properties: {
    fullScreen: {
      type: Boolean,
      value: false
    },
    defaultIndex: {
      type: Number,
      value: 0
    },
    componentId: {
      type: String,
      value: ''
    },
    animate: {
      type: Boolean,
      value: false
    },
    textColor: {
      type: String,
      value: '#000'
    },
    activeTextColor: {
      type: String,
      value: '#ff5777'
    },
    lineColor: {
      type: String,
      value: '#ddd'
    },
    activeLineColor: {
      type: String,
      value: '#ff5777'
    }
  },
  data: {
    tabs: [],
    width: 0,
    activeKey: 0,
    move: 0
  },
  attached: function attached() {
    var _this = this;

    this.componentId = this.data.componentId;
    this.tabs = [];
    _Event2.default.on('tab-create-' + this.componentId, function (tab) {
      _this.type = !tab.label ? 'complex' : 'simple';
      _this.tabs.push(tab);
    });
  },
  ready: function ready() {
    var activeKey = this.minAndMax(this.data.defaultIndex);
    this.onSwitch(activeKey, 'all');
    this.listenSwitch();
    // const width = this.tabs.length < 5 ? (100 / this.tabs.length) : 25;
    var len = this.tabs.length;
    var width = parseInt(750 / (len > 5 ? 5 : len));
    this.type === 'complex' && _Event2.default.emit('label-width-' + this.componentId, width);
    this.setData({
      tabs: this.tabs,
      width: width,
      type: this.type,
      move: width * activeKey
    });
  },
  detached: function detached() {
    _Event2.default.removeListener();
  },

  methods: {

    // limit input range
    minAndMax: function minAndMax(activeKey) {
      var max = this.tabs.length - 1;
      var min = 0;
      if (activeKey > max) {
        return max;
      } else if (activeKey < min) {
        return 0;
      } else {
        return activeKey;
      }
    },


    // lisen child component tab event
    listenSwitch: function listenSwitch() {
      var _this2 = this;

      _Event2.default.on('from-label-switch-' + this.componentId, function (key) {
        _this2.onSwitch(key, 'to-panel');
      });
      _Event2.default.on('from-panel-switch-' + this.componentId, function (key) {
        _this2.onSwitch(key, 'to-label');
      });
    },
    onSwitch: function onSwitch(activeKey, toNotice) {
      if (!toNotice) {
        activeKey = activeKey.currentTarget.dataset.idx;
        toNotice = 'to-panel';
      }
      var move = activeKey * this.data.width;
      this.setData({
        activeKey: activeKey,
        move: move
      });

      // to notice panel and label tab has switched
      if (toNotice === 'all') {
        _Event2.default.emit('to-label-switch-' + this.componentId, activeKey);
        _Event2.default.emit('to-panel-switch-' + this.componentId, activeKey);
      } else {
        _Event2.default.emit(toNotice + '-switch-' + this.componentId, activeKey);
      }

      this.afterSwitch(activeKey);
    },
    afterSwitch: function afterSwitch(activeKey) {
      this.triggerEvent('tabchange', {
        key: activeKey,
        componentId: this.componentId
      });
    }
  }
});