<template>
  <div class="class-table-data" @click="curIndex = -1">
    <div class="title-top content-detail drug">
      用药计划
      <el-date-picker
        v-model="findTime"
        type="date"
        placeholder="选择日期"
         value-format="yyyy-MM-dd"
        :clearable="false"
        :picker-options="pickerOptions0"
        @change="initData"
      />
    </div>
    <div class="class-table">
      <table>
        <thead>
          <tr>
            <th />
            <th
              v-for="(item, index) in weeks"
              :key="item"
              :class="['title', weeksStatus[index]]"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(courseNum, courseIndex) in coursesLen" :key="courseIndex">
            <td class="time">
              {{ period[courseIndex] }}
            </td>

            <td
              v-for="(weekNum, weekIndex) in weeks"
              :key="weekIndex"
              class="content"
            >
              <!-- <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      popper-class="class-table-pop"
                    >
                    </el-popover> -->

              <div
                v-if="fieldCharacter(weekIndex, courseIndex) !== '-'"
                :class="{
                  blue: weekIndex === 0,
                  red: weekIndex === 1,
                  green: weekIndex === 2,
                  text: true,
                }"
                @click.stop="changeStatus(weekIndex, courseIndex)"
              >
                <div
                  v-if="checkStatus(weekIndex, courseIndex)"
                  class="popover-content1"
                  v-html="fieldCharacter(weekIndex, courseIndex)"
                />
                {{ period[courseIndex] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import useRecord from '@/api/useRecord';
import moment from 'moment';
import _ from 'lodash';
export default {
  data() {
    return {
      weeks: { 0: '待进行', 1: '未记录', 2: '已服药' }, // 周集合
      weeksStatus: { 0: 'blueText', 1: 'redText', 2: 'greenText' }, // 周集合
      coursesLen: 24, // 最大课节数
      period: [], // 时间段
      classTableData: {
        // mock模拟的数据
        weekCourse: []
      },
      findTime: '',
      curIndex: -1,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },

  created() {
    // const date =
    this.findTime = moment(moment().format('YYYY-MM-DD')).valueOf();
    this.initTime();
    this.initData();
  },

  methods: {
    /**

     * 更新mock模拟的数据，对数据进行排序

     */

    updateData() {
      /* 将数据按从周日到周六排序 */

      this.classTableData.weekCourse.sort((a, b) => {
        return a.week - b.week;
      });

      /* 将数据按从第一节到第n节排序 */

      for (const v of this.classTableData.weekCourse) {
        for (const k in v) {
          if (k === 'courses') {
            v[k].sort((a, b) => {
              return a.index - b.index;
            });
          }
        }
      }
    },

    /**

     * 计算周数据及课节数

     */

    initWeekCourses() {
      const that = this;

      this.weeks = []; // 周集合

      this.coursesLen = 0; // 最大的课节数

      this.weeks = this.classTableData.weekCourse.map(item => {
        for (const k in item) {
          if (k === 'courses') {
            let maxCoursesLen = 0;

            /* 取出一周中最大的课节数及当天的最大课节数 */

            for (const j of item[k]) {
              j.index > that.coursesLen && (that.coursesLen = j.index); // 取所有一周里最大课节值

              j.index > maxCoursesLen && (maxCoursesLen = j.index); // 取当天最大课节值
            }

            /* 如果当天的课节总数小于当天的最大课节值 */

            if (item[k].length < maxCoursesLen) {
              for (let i = 0; i < maxCoursesLen; i++) {
                // 以最大课节值为终点遍历当天课节
                if (!item[k][i] || item[k][i].index !== i + 1) {
                  // 如果下标课节不存在或着与循环的下标不匹配
                  item[k].splice(i, 0, ''); // 填充空课节
                }
              }
            }
          }
        }
        return item.week;
      });
    },

    /**

     * 处理格子数据，无数据转换为字符串'-'

     * @param {Number} weekIndex 周几对应的下标

     * @param {Number} courseNum 第几节课对应的下标

     * @returns {String} 返回对应的字符

     */

    fieldCharacter(weekIndex, courseIndex) {
      if (
        this.classTableData.weekCourse[weekIndex] &&
        this.classTableData.weekCourse[weekIndex].courses[courseIndex] &&
        this.classTableData.weekCourse[weekIndex].courses[courseIndex].index ===
          courseIndex + 1
      ) {
        const data = this.classTableData.weekCourse[weekIndex].courses[
          courseIndex
        ].title;

        let html = ``;
        if (weekIndex === 0) {
          html = `<div class="blueText title">${this.weeks[weekIndex]}</div>`;
        } else if (weekIndex === 1) {
          html = `<div class="redText title">${this.weeks[weekIndex]}</div>`;
        } else {
          html = `<div class="greenText title">${this.weeks[weekIndex]}</div>`;
        }
        data.forEach(item => {
          html += `<div class="item-name">${item.name}</div><div class="content">${item.content}</div>`;
        });

        return html;
      }
      return '-';
    },
    checkStatus(weekIndex, courseIndex) {
      if (
        this.classTableData.weekCourse[weekIndex] &&
        this.classTableData.weekCourse[weekIndex].courses[courseIndex] &&
        this.classTableData.weekCourse[weekIndex].courses[courseIndex].index ===
          courseIndex + 1
      ) {
        if (
          this.curIndex ===
          this.classTableData.weekCourse[weekIndex].courses[courseIndex].index
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    changeStatus(weekIndex, courseIndex) {
      if (
        this.classTableData.weekCourse[weekIndex] &&
        this.classTableData.weekCourse[weekIndex].courses[courseIndex] &&
        this.classTableData.weekCourse[weekIndex].courses[courseIndex].index ===
          courseIndex + 1
      ) {
        this.curIndex = this.classTableData.weekCourse[weekIndex].courses[
          courseIndex
        ].index;
      }
    },
    initTime() {
      for (let i = 0; i <= 25; i++) {
        this.period.push(`${i}点`);
      }
    },
    formatTime(time) {
      return Number(moment(time).format('H')) + 1;
    },
    initData() {
      const params = {
        planId: this.$route.params.id,
        findTime: this.findTime
      };
      this.tableLoading = true;
      useRecord.findMedicationHistory(params).then(res => {
        let data = res.data;
        if (data) {
          data.forEach(item => {
            item.courses.forEach(course => {
              course.index = this.formatTime(course.time);
            });
            item.courses = this.mergeObj(item.courses);
          });
          const order = ['待进行', '未记录', '已服药'];
          data = data.sort(function compareFunction(item1, item2) {
            return order.indexOf(item1.week) - order.indexOf(item2.week);
          });
          this.classTableData.weekCourse = data;
          this.updateData();
          this.initWeekCourses();
        } else {
          this.classTableData.weekCourse = [];
        }
      });
    },
    mergeObj(item) {
      const data = _(item)
        .flatten()
        .groupBy('index')
        .map(
          _.spread((...values) => {
            return _.mergeWith(...values, this.customizer);
          }),
        )
        .value();

      return data;
    },
    customizer(objValue, srcValue) {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.class-table-data {
  .class-table {
    width: 99%;
    height: 100%;
    box-shadow: 0px 0px 8px 0px rgba(204, 204, 204, 0.5);
    border-radius: 4px;
    margin: 0 auto;
    table {
      width: 100%;
      padding-bottom: 32px;
      border-collapse: collapse;
      thead {
        border-bottom: 1px solid #ebedf2;
      }
      tbody {
        td {
          border-bottom: 1px solid #ebedf2;
        }
        td:first-child {
          border-bottom: none;
        }
      }
    }
    .time {
      width: 89px;
      padding: 12px 0;
      text-align: center;
      font-size: 14px;
      color: #a2a3b7;
      border-right: 1px solid #ebedf2;
    }
    .title {
      width: 30%;
      height: 45px;
      line-height: 45px;
      text-align: center;
    }
    .content {
      width: 30%;
    }
  }
  .drug {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }
  .blueText {
    color: #3599fe;
    font-size: 14px;
  }
  .redText {
    color: #f64e60;
    font-size: 14px;
  }
  .greenText {
    color: #18c4bd;
    font-size: 14px;
  }

  .blue {
    width: 100%;
    height: 30px;
    background: #e1f1ff;
    border-radius: 4px;
    color: #3599fe;
  }
  .green {
    width: 100%;
    height: 30px;
    background: #c9f7f4;
    border-radius: 4px;
    color: #18c4bd;
  }
  .red {
    width: 100%;
    height: 30px;
    background: #ffe2e5;
    border-radius: 4px;
    color: #f64e60;
  }
  .text {
    padding-left: 24px;
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    .popover-content1 {
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 0px 6px 0px rgba(204, 204, 204, 0.5);
      border-radius: 4px;
      position: absolute;
      bottom: 36px;
      left: 0;
      padding: 16px 24px;
      /deep/.item-name {
        font-weight: bold;
        color: #464668 !important;
        white-space: nowrap; /*超出的空白区域不换行*/
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*文本超出显示省略号*/
      }
      /deep/.content {
        color: #464668;
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
}
</style>
