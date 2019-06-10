'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    value: String,
    values: Array,
    multiple: {
      type: Boolean,
      value: false
    }
  },
  data: {
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
    selects: []
  },
  ready() {
    if (this.data.value) {
      this.setData({
        selects: [this.data.value]
      })
      this.setNowDate(new Date(this.data.value))
    } else if (this.data.values && this.data.values.length) {
      var value = this.data.values[0]
      this.setData({
        selects: this.data.values
      })
      this.setNowDate(new Date(value))
    } else {
      this.setNowDate(null)
    }
  },
  methods: {
    show: function () {
      var popupComponent = this.selectComponent('.J_Popup__Calendar')
      popupComponent && popupComponent.show()
      this.triggerEvent('calendar-show')
    },
    hide: function () {
      var popupComponent = this.selectComponent('.J_Popup__Calendar')
      popupComponent && popupComponent.hide()
      this.triggerEvent('calendar-hide')
    },
    dateSelectAction: function (e) {
      var cur_day = e.currentTarget.dataset.idx
      // this.setData({
      //   todayIndex: cur_day
      // })
      // console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}`)
      var current = `${this.data.cur_year}/${this.data.cur_month}/${cur_day + 1}`
      if (this.data.multiple) {
        var selects = this.data.selects
        var pos = selects.indexOf(current)
        if (pos === -1) {
          selects.push(current)
        } else {
          selects.splice(pos, 1)
        }
        this.setData({
          values: selects
        })
        this.calculateDays(this.data.cur_year, this.data.cur_month)
      } else {
        var selects = [current]
        this.setData({
          selects: selects
        })
        this.calculateDays(this.data.cur_year, this.data.cur_month)
        this.triggerEvent('change', {
          value: current
        })
        this.hide()
      }
    },
    onDoneClick(){
      this.triggerEvent('change', {
        values: this.data.selects
      })
      this.hide()
    },
    onClearClick(){
      this.setData({
        selects: []
      })
      this.calculateDays(this.data.cur_year, this.data.cur_month)
    },
    setNowDate: function (date) {
      if (!date) date = new Date()
      var cur_year = date.getFullYear()
      var cur_month = date.getMonth() + 1
      var todayIndex = date.getDate() - 1
      var weeks_ch = ['日', '一', '二', '三', '四', '五', '六']
      this.calculateEmptyGrids(cur_year, cur_month)
      this.calculateDays(cur_year, cur_month)
      this.setData({
        cur_year: cur_year,
        cur_month: cur_month,
        weeks_ch,
        todayIndex
      })
    },

    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate()
    },
    getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay()
    },
    calculateEmptyGrids(year, month) {
      var firstDayOfWeek = this.getFirstDayOfWeek(year, month)
      var empytGrids = []
      if (firstDayOfWeek > 0) {
        for (var i = 0; i < firstDayOfWeek; i++) {
          empytGrids.push(i)
        }
        this.setData({
          hasEmptyGrid: true,
          empytGrids
        })
      } else {
        this.setData({
          hasEmptyGrid: false,
          empytGrids: []
        })
      }
    },
    calculateDays(year, month) {
      var days = []
      var thisMonthDays = this.getThisMonthDays(year, month)
      for (var i = 1; i <= thisMonthDays; i++) {
        days.push({
          date: i,
          active: this.data.selects.indexOf(`${year}/${month}/${i}`) !== -1
        })
      }
      this.setData({
        days
      })
    },
    handleCalendar(e) {
      var handle = e.currentTarget.dataset.handle
      var cur_year = this.data.cur_year
      var cur_month = this.data.cur_month
      if (handle === 'prev') {
        var newMonth = cur_month - 1
        var newYear = cur_year
        if (newMonth < 1) {
          newYear = cur_year - 1
          newMonth = 12
        }

        this.calculateDays(newYear, newMonth)
        this.calculateEmptyGrids(newYear, newMonth)

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        })

      } else {
        var newMonth = cur_month + 1,
          newYear = cur_year
        if (newMonth > 12) {
          newYear = cur_year + 1
          newMonth = 1
        }

        this.calculateDays(newYear, newMonth)
        this.calculateEmptyGrids(newYear, newMonth)

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        })
      }
    },
    onPopupTap: function (e) {
    }
  }
})
