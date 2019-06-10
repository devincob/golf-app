'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Component({
  behaviors: [],
  properties: {
    countdown: {
      type: Number,
      value: 0,
      observer: 'init'
    },
    format: {
      type: String,
      value: 'dd天hh时mm分ss秒'
    },
    numStyle: {
      type: String,
      value: ''
    },
    symbolStyle: {
      type: String,
      value: ''
    }
  },
  data: {
    computeTime: 0,
    endTimeMs: 0
  },
  detached: function detached() {
    this.onPageHide();
  },

  methods: {
    /**
     * Initialization
     */
    init: function init() {
      var _data = this.data,
          countdown = _data.countdown,
          format = _data.format;
      // countdown seconds

      this.computeTime = countdown;
      // time format
      this.format = format;

      var now = Date.now();
      // end timestamp (millisecond)
      this.endTimeMs = now + this.computeTime * 1000;

      this.initCountdown();
    },


    /**
     * timer
     */
    initCountdown: function initCountdown() {
      var _this = this;

      clearInterval(this._timer);

      var now = Date.now();
      // countdown milliseconds
      var computeTimeMs = this.endTimeMs - now;
      // countdown interval
      var timeout = computeTimeMs % 1000 || 0;

      this._timer = setTimeout(function () {
        _this.initCountdown();
      }, timeout);

      this.setCountdownTimeItems(computeTimeMs);
    },


    /**
     * set countdown seconds
     * @param  {Number} computeTimeMs - Countdown milliseconds
     */
    setCountdownTimeItems: function setCountdownTimeItems(computeTimeMs) {
      this.computeTime = parseInt(Math.ceil(computeTimeMs / 1000));
      this.emitRunCount(this.computeTime);

      if (this.computeTime <= 0) {
        clearInterval(this._timer);
        this.emitEndCount();
      }

      var timeItems = this.getTimeItems(this.computeTime, this.format);
      this.setData({
        timeItems: timeItems
      });
    },


    /**
     * get rendering data
     * @param  {Number} computeTime - countdown seconds
     * @param  {String} format - time format
     * @return {Array} rendering data
     */
    getTimeItems: function getTimeItems(computeTime, format) {
      if (computeTime < 0) {
        computeTime = 0;
      }
      var arr = format.match(/[a-zA-Z]{1,3}/g) || [];
      var symbolArr = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];
      var time = this.getTime(computeTime, format);
      return arr.map(function (item, i) {
        return {
          num: time[item],
          symbol: symbolArr[i]
        };
      });
    },


    /**
     * get countdown object
     * @param  {Number} leftseconds - countdown seconds
     * @param  {String} format - time format
     * @return {Object} separated countdown seconds width d, h, m, s
     */
    getTime: function getTime(leftseconds, format) {
      var d = leftseconds;

      var _map = [60, 60, 24].map(function (unit) {
        var num = d % unit;
        d = Math.floor(d / unit);
        return num;
      }),
          _map2 = _slicedToArray(_map, 3),
          s = _map2[0],
          m = _map2[1],
          h = _map2[2];

      if (leftseconds > 86400 && format.indexOf('d') === -1) {
        h += d * 24;
      }

      if (leftseconds > 3600 && format.indexOf('h') === -1) {
        m += h * 60;
      }

      if (leftseconds > 60 && format.indexOf('m') === -1) {
        s += m * 60;
      }

      return {
        dd: this.formatTime(d),
        hh: this.formatTime(h),
        mm: this.formatTime(m),
        ss: this.formatTime(s),
        d: d,
        h: h,
        m: m,
        s: s
      };
    },


    /**
     * zero padding
     * @param  {Number} val - number
     * @return {Number|String} the number after zero padding
     */
    formatTime: function formatTime(val) {
      return val < 10 ? '0' + val : val;
    },


    /**
     * timing callback
     */
    emitRunCount: function emitRunCount() {
      this.triggerEvent('runcount', {
        computeTime: this.computeTime
      });
    },


    /**
     * end callback
     */
    emitEndCount: function emitEndCount() {
      this.triggerEvent('endcount');
    },
    onPageShow: function onPageShow() {
      var now = Date.now();
      if (this.format && this.endTimeMs) {
        this.computeTime = parseInt((this.endTimeMs - now) / 1000);
        this.initCountdown();
      }
    },
    onPageHide: function onPageHide() {
      clearInterval(this._timer);
    }
  }
});