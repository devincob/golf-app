<template>
  <view class="page page-course-reservation">
    <view class="flex space-between title">
      <view style="vertical-align: middle;padding: 2rpx 0;">
        <image src="/static/images/mark.png" class="mark-icon" mode="aspectFit"/>
        <span class="ml8 course-name">{{pickerList[pickCourse]}}高尔夫球场</span>
      </view>
      <view>
        <picker @change="onCourseChange" :value="pickCourse" :range="pickerList">
          <span class="course-choice">更换球场</span>
          <image src="/static/images/right_back.png" class="back-icon ml8" mode="aspectFit"/>
        </picker>
      </view>
    </view>
    <view class="reservation-body">
      <table>
        <tr class="table-rows" style="" v-for="(item, $index) in coursePeriodWeekList" :key="item.bookDate">
          <td class="table-item">
            <div class="table-item-top">{{item.bookDatestr}}</div>
            <p class="table-item-bottom">{{item.week}}</p>
          </td>
          <td class="table-item normal-item" :class="{'disable': !period.residueTimes, 'active': period.active}" v-for="period in item.gcPeriods" :key="period.pidId" @click="onPeriodClick(period, item.bookDate)">
            <div class="table-item-top">{{period.pidName}}</div>
            <p v-if="period.residueTimes" class="table-item-bottom">剩余：{{period.residueTimes}}人</p>
            <p v-else class="table-item-bottom">已满</p>
          </td>
        </tr>
      </table>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courseList: [],
      pickerList: [],
      pickCourse: '',
      coursePeriodWeekList: []
    }
  },
  methods: {
    async queryGolfCourse(){
      try {
        this.$loading.show()
        this.courseList = await this.$$main.golfCourseList()
        this.pickerList = this.courseList.map((item) => {
          return item.gcName
        })
        this.$loading.hide()
      } catch (e) {
        this.$loading.hide()
        e.message && this.$wx.showToast({
          title: e.message,
          icon: 'none'
        })
      }
    },
    onCourseChange(res){
      this.pickCourse = res.target.value || 0
      console.log(this.pickCourse)
      this.queryGolfCoursePeriodWeek(this.courseList[this.pickCourse].gcId)
    },
    async queryGolfCoursePeriodWeek(id){
      try {
        this.$loading.show()
        this.coursePeriodWeekList = await this.$$main.golfCoursePeriodWeekGet({
          gCId: id
        })
        this.$loading.hide()
      } catch (e) {
        this.$loading.hide()
        e.message && this.$wx.showToast({
          title: e.message,
          icon: 'none'
        })
      }
    },
    onPeriodClick(period, date){
      if (!period.residueTimes) {
        return
      }
      this.coursePeriodWeekList.forEach((i) => {
        i.gcPeriods && i.gcPeriods.forEach((e) => {
          this.$set(e, 'active', false)
        })
      })
      period.active = true
      this.goToPage(`/pages/course-reservation-submit/main?pid=${period.pidId}&date=${date}`)
    }
  },
  onLoad: function () {
    this.queryGolfCourse()
    this.queryGolfCoursePeriodWeek(6)
  }
}
</script>

<style lang="less">
  .page-course-reservation{
    height: 100%;
    padding: 44rpx 32rpx;
    .flex{
      display: flex;
    }
    .space-between{
      justify-content: space-between;
    }
    .ml8{
      margin-left: 8rpx !important;
    }
    .title{
      image{
        vertical-align: middle;
      }
      .mark-icon{
        width: 28rpx;
        height: 34rpx;
        padding-bottom: 6rpx;
      }
      .back-icon{
        width: 14rpx;
        height: 27rpx;
      }
      .course-name{
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
      }
      .course-choice{
        font-size: 28rpx;
        color: #333;
        opacity: 0.56;
      }
    }
    .reservation-body{
      margin-top: 32rpx;
      .table-rows{
        display: flex;
      }
      table, table tr td {
        border:1rpx solid #d1d1d1;
      }
      .table-item{
        width: 25%;
        height: 116rpx;
        padding: 0;
        border-color: #d1d1d1;
        border-width: 2rpx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .table-item-top{
          font-size: 24rpx;
          color: #333;
          opacity: 0.7;
          font-weight: 500;
          width: 100%;
          text-align: center;
          height: 30rpx;
        }
        .table-item-bottom{
          text-align: center;
          width: 100%;
          font-size: 24rpx;
          color: #333;
          opacity: 0.7;
          font-weight: 500;
          margin-top: 0;
        }
      }
      .normal-item{
        background: rgba(26, 185, 118, 0.1);
        text-align: center;
        .table-item-top{
          color: #1ab976;
          opacity: 1;
        }
        .table-item-bottom{
          color: #1ab976;
          opacity: 1;
        }
      }
      .table-item.disable{
        background: #e6e6e6;
        opacity: 0.6;
        .table-item-top{
          color: #333;
          opacity: 1;
        }
        .table-item-bottom{
          color: #333;
          opacity: 1;
        }
      }
      .table-item.active{
        background: #1ab976;
        .table-item-top{
          color: #fff;
          opacity: 1;
        }
        .table-item-bottom{
          color: #fff;
          opacity: 1;
        }
      }
    }
  }
</style>
