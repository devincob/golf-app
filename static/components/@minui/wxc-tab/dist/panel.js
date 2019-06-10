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
    label: String,
    componentId: {
      type: String,
      value: ''
    }
  },
  data: {
    activeKey: 1,
    test: 0
  },
  attached: function attached() {
    var _this = this;

    this.componentId = this.data.componentId;
    this.data.label && _Event2.default.emit('tab-create-' + this.componentId, {
      key: this.data.tabIndex,
      label: this.data.label
    });
    _Event2.default.on('to-panel-switch-' + this.componentId, function (activeKey) {
      _this.setData({ activeKey: activeKey });
    });
  },

  methods: {}
});