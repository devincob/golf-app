'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Event = require('./Event.js');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  behaviors: [],
  properties: {
    tabIndex: Number,
    componentId: {
      type: String,
      value: ''
    }
  },
  data: {
    activeKey: 0,
    width: 0
  },
  attached: function attached() {
    var _this = this;

    var componentId = this.data.componentId;
    _Event2.default.emit('tab-create-' + componentId, {
      key: this.data.tabIndex
    });

    _Event2.default.on('to-label-switch-' + componentId, function (activeKey) {
      _this.setData({ activeKey: activeKey });
    });

    _Event2.default.on('label-width-' + componentId, function (width) {
      _this.setData({ width: width });
    });
  },
  moved: function moved() {
    _Event2.default.removeListener();
  },

  methods: {
    onSwitch: function onSwitch() {
      _Event2.default.emit('from-label-switch-' + this.data.componentId, this.data.tabIndex);
    }
  }
});