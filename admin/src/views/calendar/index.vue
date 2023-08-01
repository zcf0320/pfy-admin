<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main filter-form"
      tag="main"
      :noresize="false"
    >
      <div class="calendar">
        <div class="calendar-header flex">
          <div class="calendar-header-left flex">
            {{ year }}年{{ `${month + 1}` }}月
            <div class="change pre" @click="prev" />
            <div class="change next" @click="next" />
          </div>
          <div class="calendar-header-right flex">
            <el-select
              v-model="holiday"
              placeholder="选择节假日"
              style="width: 140px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <button type="button" class="btn-save btn" @click="comfirm">
              确认
            </button>
          </div>
        </div>

        <!-- <div class="calendar-tools">
          <div class="calendar-info" @click.stop="changeYear">
            <div class="month">
              <div
                class="month-inner"
                :style="{ top: -(this.month * 20) + 'px' }"
              >
                <span v-for="m in months" :key="m">{{ m }}</span>
              </div>
            </div>
            <div class="year">{{ year }}</div>
          </div>
        </div> -->
        <table border="0" cellspacing="1" cellpadding="0">
          <thead>
            <tr>
              <td v-for="week in weeks" :key="week" class="week">{{ week }}</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(day, k1) in days"
              :key="k1"
              style="{'animation-delay',(k1*30)+'ms'}"
            >
              <td
                v-for="(child, k2) in day"
                :key="k2"
                :class="{ selected: child.selected, disabled: child.disabled }"
                @click="select(k1, k2, $event)"
              >
                <div class="date-container">
                  <div class="pen" @click="editStatus(child)" />
                  <div class="date flex">
                    <div
                      :class="{
                        day: true,
                        current:
                          child.day === current &&
                          month === currentM &&
                          year === currentY,
                      }"
                    >
                      {{ child.day }}
                    </div>
                    <div
                      v-if="lunar"
                      class="lunar"
                      :class="{
                        isLunarFestival: child.isLunarFestival,
                        isGregorianFestival: child.isGregorianFestival,
                      }"
                    >
                      {{ child.term || child.lunar }}
                    </div>
                    <div :class="setClass(child)">
                      {{ setStatus(child) }}
                    </div>
                  </div>
                  <div v-if="child.festival" class="festival">
                    {{ child.festival }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="calendar-years" :class="{ show: yearsShow }">
          <span
            v-for="y in years"
            :key="y"
            :class="{ active: y === year }"
            @click.stop="selectYear(y)"
            >{{ y }}</span
          >
        </div>
      </div>
      <el-dialog
        title="更改工作状态"
        :visible.sync="dialogVisible"
        width="507px"
        :before-close="
          () => {
            dialogVisible = false;
          }
        "
        class="bold-dialog"
      >
        <div class="text">
          {{ year }}年{{ `${month + 1}` }}月{{
            dialog.day
          }}日&nbsp;&nbsp;&nbsp;星期{{
            dialog.week | formatWeek
          }}&nbsp;&nbsp;&nbsp; 工作状态：
        </div>
        <div class="status flex">
          <div
            :class="{
              'status-container': true,
              active: chooseStatus === '班',
            }"
            @click="chooseStatus = '班'"
          >
            班
          </div>
          <div
            :class="{ 'status-container': true, active: chooseStatus === '休' }"
            @click="chooseStatus = '休'"
          >
            休
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </el-scrollbar>
  </el-container>
</template>

<script>
import calendar from './calendar.js';
import moment from 'moment';
export default {
  name: 'calendar',
  filters: {
    formatWeek(key) {
      switch (key) {
        case 1:
          return '一';
        case 2:
          return '二';
        case 3:
          return '三';
        case 4:
          return '四';
        case 5:
          return '五';
        case 6:
          return '六';
        case 7:
          return '日';
        default:
          break;
      }
    }
  },
  props: {
    // 多选模式
    multi: {
      type: Boolean,
      default: false
    },
    // 星期高亮
    weekend: {
      type: Array,
      default: function() {
        return [0, 6];
      }
    },

    // 范围模式
    range: {
      type: Boolean,
      default: false
    },
    // 默认日期
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 开始选择日期
    begin: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 结束选择日期
    end: {
      type: Array,
      default: function() {
        return [];
      }
    },

    // 是否小于10补零
    zero: {
      type: Boolean,
      default: false
    },
    // 屏蔽的日期
    disabled: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 是否显示农历
    lunar: {
      type: Boolean,
      default: true
    },

    // 自定义星期名称
    weeks: {
      type: Array,
      default: function() {
        return window.navigator.language.toLowerCase() === 'zh-cn'
          ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
          : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      }
    },
    // 自定义月份
    months: {
      type: Array,
      default: function() {
        return window.navigator.language.toLowerCase() === 'zh-cn'
          ? [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ]
          : [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ];
      }
    },
    // 自定义事件
    events: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      years: [],
      yearsShow: false,
      year: 0,
      month: 0,
      day: 0,
      days: [],
      multiDays: [],
      today: [],
      festival: {
        lunar: {
          '1-1': '春节',
          '1-15': '元宵节',
          '2-2': '龙头节',
          '5-5': '端午节',
          '7-7': '七夕节',
          '7-15': '中元节',
          '8-15': '中秋节',
          '9-9': '重阳节',
          '10-1': '寒衣节',
          '10-15': '下元节',
          '12-8': '腊八节',
          '12-23': '祭灶节'
        },
        gregorian: {
          '1-1': '元旦',
          '2-14': '情人节',
          '3-8': '妇女节',
          '3-12': '植树节',
          '4-5': '清明节',
          '5-1': '劳动节',
          '5-4': '青年节',
          '6-1': '儿童节',
          '7-1': '建党节',
          '8-1': '建军节',
          '9-10': '教师节',
          '10-1': '国庆节',
          '12-24': '平安夜',
          '12-25': '圣诞节'
        }
      },
      rangeBegin: [],
      rangeEnd: [],
      options: [
        {
          value: '元旦节',
          label: '元旦节'
        },
        {
          value: '除夕',
          label: '除夕'
        },
        {
          value: '春节',
          label: '春节'
        },
        {
          value: '清明节',
          label: '清明节'
        },
        {
          value: '劳动节',
          label: '劳动节'
        },
        {
          value: '端午节',
          label: '端午节'
        },
        {
          value: '中秋节',
          label: '中秋节'
        },
        {
          value: '国庆节',
          label: '国庆节'
        }
      ],
      holiday: '',
      current: 0,
      currentM: 0,
      currentY: 0,
      dialogVisible: false,
      dialog: {
        week: '',
        day: '',
        status: ''
      },
      // 自定义日期高亮
      restDate: {
        // "2021-7-15": "休", "2021-7-14": "休"
      },
      workDate: {
        // "2021-7-16": "班",
      },
      chooseStatus: ''
    };
  },
  watch: {
    events() {
      this.render(this.year, this.month);
    },
    value() {
      this.init();
    }
  },
  created() {
    const date = moment().format('YYYY-MM');
    this.getList(date, true);
  },
  mounted() {
    const now = new Date();
    this.currentY = now.getFullYear();
    this.currentM = now.getMonth();
    this.current = now.getDate();
  },
  methods: {
    init() {
      const now = new Date();
      this.year = now.getFullYear();
      this.month = now.getMonth();
      this.day = now.getDate();
      if (this.value.length > 0) {
        if (this.range) {
          // 范围
          this.year = parseInt(this.value[0][0]);
          this.month = parseInt(this.value[0][1]) - 1;
          this.day = parseInt(this.value[0][2]);

          const year2 = parseInt(this.value[1][0]);
          const month2 = parseInt(this.value[1][1]) - 1;
          const day2 = parseInt(this.value[1][2]);

          this.rangeBegin = [this.year, this.month, this.day];
          this.rangeEnd = [year2, month2, day2];
        } else if (this.multi) {
          // 多选
          this.multiDays = this.value;
          this.year = parseInt(this.value[0][0]);
          this.month = parseInt(this.value[0][1]) - 1;
          this.day = parseInt(this.value[0][2]);
        } else {
          // 单选
          this.year = parseInt(this.value[0]);
          this.month = parseInt(this.value[1]) - 1;
          this.day = parseInt(this.value[2]);
        }
      }
      this.render(this.year, this.month);
    },
    // 渲染日期
    render(y, m) {
      const firstDayOfMonth = new Date(y, m, 1).getDay(); // 当月第一天
      const lastDateOfMonth = new Date(y, m + 1, 0).getDate(); // 当月最后一天
      const lastDayOfLastMonth = new Date(y, m, 0).getDate(); // 最后一月的最后一天
      this.year = y;
      const seletSplit = this.value;
      let i;
      let line = 0;
      // eslint-disable-next-line no-unused-vars
      let nextMonthPushDays = 1;
      const temp = [];
      for (i = 1; i <= lastDateOfMonth; i++) {
        const day = new Date(y, m, i).getDay(); // 返回星期几（0～6）
        let k;
        // 第一行
        if (day === 0) {
          temp[line] = [];
        } else if (i === 1) {
          temp[line] = [];
          k = lastDayOfLastMonth - firstDayOfMonth + 1;
          for (let j = 0; j < firstDayOfMonth; j++) {
            temp[line].push(
              Object.assign(
                { day: k, disabled: true },
                this.getLunarInfo(
                  this.computedPrevYear(),
                  this.computedPrevMonth(true),
                  k,
                ),
                this.getEvents(
                  this.computedPrevYear(),
                  this.computedPrevMonth(true),
                  k,
                ),
              ),
            );
            k++;
          }
        }

        if (this.range) {
          // 范围

          const options = Object.assign(
            { day: i },
            this.getLunarInfo(this.year, this.month + 1, i),
            this.getEvents(this.year, this.month + 1, i),
          );
          if (this.rangeBegin.length > 0) {
            const beginTime = Number(
              new Date(
                this.rangeBegin[0],
                this.rangeBegin[1],
                this.rangeBegin[2],
              ),
            );
            const endTime = Number(
              new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]),
            );
            const stepTime = Number(new Date(this.year, this.month, i));
            if (beginTime <= stepTime && endTime >= stepTime) {
              options.selected = true;
            }
          }
          if (this.begin.length > 0) {
            const beginTime = Number(
              new Date(
                parseInt(this.begin[0]),
                parseInt(this.begin[1]) - 1,
                parseInt(this.begin[2]),
              ),
            );
            if (beginTime > Number(new Date(this.year, this.month, i))) {
              options.disabled = true;
            }
          }
          if (this.end.length > 0) {
            const endTime = Number(
              new Date(
                parseInt(this.end[0]),
                parseInt(this.end[1]) - 1,
                parseInt(this.end[2]),
              ),
            );
            if (endTime < Number(new Date(this.year, this.month, i))) {
              options.disabled = true;
            }
          }
          if (this.disabled.length > 0) {
            if (
              this.disabled.filter(v => {
                return (
                  this.year === v[0] && this.month === v[1] - 1 && i === v[2]
                );
              }).length > 0
            ) {
              options.disabled = true;
            }
          }
          temp[line].push(options);
        } else if (this.multi) {
          // 多选
          let options;
          // 判断是否选中
          if (
            this.value.filter(v => {
              return (
                this.year === v[0] && this.month === v[1] - 1 && i === v[2]
              );
            }).length > 0
          ) {
            options = Object.assign(
              {
                day: i,
                selected: true
              },
              this.getLunarInfo(this.year, this.month + 1, i),
              this.getEvents(this.year, this.month + 1, i),
            );
          } else {
            options = Object.assign(
              {
                day: i,
                selected: false
              },
              this.getLunarInfo(this.year, this.month + 1, i),
              this.getEvents(this.year, this.month + 1, i),
            );
            if (this.begin.length > 0) {
              const beginTime = Number(
                new Date(
                  parseInt(this.begin[0]),
                  parseInt(this.begin[1]) - 1,
                  parseInt(this.begin[2]),
                ),
              );
              if (beginTime > Number(new Date(this.year, this.month, i))) {
                options.disabled = true;
              }
            }
            if (this.end.length > 0) {
              const endTime = Number(
                new Date(
                  parseInt(this.end[0]),
                  parseInt(this.end[1]) - 1,
                  parseInt(this.end[2]),
                ),
              );
              if (endTime < Number(new Date(this.year, this.month, i))) {
                options.disabled = true;
              }
            }
            if (this.disabled.length > 0) {
              if (
                this.disabled.filter(v => {
                  return (
                    this.year === v[0] && this.month === v[1] - 1 && i === v[2]
                  );
                }).length > 0
              ) {
                options.disabled = true;
              }
            }
          }

          temp[line].push(options);
        } else {
          // 单选

          const chk = new Date();
          const chkY = chk.getFullYear();
          const chkM = chk.getMonth();
          // 匹配上次选中的日期
          if (
            parseInt(seletSplit[0]) === this.year &&
            parseInt(seletSplit[1]) - 1 === this.month &&
            parseInt(seletSplit[2]) === i
          ) {
            temp[line].push(
              Object.assign(
                { day: i, selected: true },
                this.getLunarInfo(this.year, this.month + 1, i),
                this.getEvents(this.year, this.month + 1, i),
              ),
            );
            this.today = [line, temp[line].length - 1];
          } else if (
            // 没有默认值的时候显示选中今天日期
            chkY === this.year &&
            chkM === this.month &&
            i === this.day &&
            this.value === ''
          ) {
            temp[line].push(
              Object.assign(
                { day: i, selected: true },
                this.getLunarInfo(this.year, this.month + 1, i),
                this.getEvents(this.year, this.month + 1, i),
              ),
            );
            this.today = [line, temp[line].length - 1];
          } else {
            // 普通日期

            const options = Object.assign(
              { day: i, selected: false },
              this.getLunarInfo(this.year, this.month + 1, i),
              this.getEvents(this.year, this.month + 1, i),
            );
            if (this.begin.length > 0) {
              const beginTime = Number(
                new Date(
                  parseInt(this.begin[0]),
                  parseInt(this.begin[1]) - 1,
                  parseInt(this.begin[2]),
                ),
              );
              if (beginTime > Number(new Date(this.year, this.month, i))) {
                options.disabled = true;
              }
            }
            if (this.end.length > 0) {
              const endTime = Number(
                new Date(
                  parseInt(this.end[0]),
                  parseInt(this.end[1]) - 1,
                  parseInt(this.end[2]),
                ),
              );
              if (endTime < Number(new Date(this.year, this.month, i))) {
                options.disabled = true;
              }
            }
            if (this.disabled.length > 0) {
              if (
                this.disabled.filter(v => {
                  return (
                    this.year === v[0] && this.month === v[1] - 1 && i === v[2]
                  );
                }).length > 0
              ) {
                options.disabled = true;
              }
            }
            temp[line].push(options);
          }
        }
        // 到周六换行
        if (day === 6 && i < lastDateOfMonth) {
          line++;
        } else if (i === lastDateOfMonth) {
          // line++
          let k = 1;
          for (let d = day; d < 6; d++) {
            temp[line].push(
              Object.assign(
                { day: k, disabled: true },
                this.getLunarInfo(
                  this.computedNextYear(),
                  this.computedNextMonth(true),
                  k,
                ),
                this.getEvents(
                  this.computedNextYear(),
                  this.computedNextMonth(true),
                  k,
                ),
              ),
            );
            k++;
          }
          // 下个月除了补充的前几天开始的日期
          nextMonthPushDays = k;
        }
      } // end for

      this.days = temp;
    },
    computedPrevYear() {
      let value = this.year;
      if (this.month - 1 < 0) {
        value--;
      }
      return value;
    },
    computedPrevMonth(isString) {
      let value = this.month;
      if (this.month - 1 < 0) {
        value = 11;
      } else {
        value--;
      }
      // 用于显示目的（一般月份是从0开始的）
      if (isString) {
        return value + 1;
      }
      return value;
    },
    computedNextYear() {
      let value = this.year;
      if (this.month + 1 > 11) {
        value++;
      }
      return value;
    },
    computedNextMonth(isString) {
      let value = this.month;
      if (this.month + 1 > 11) {
        value = 0;
      } else {
        value++;
      }
      // 用于显示目的（一般月份是从0开始的）
      if (isString) {
        return value + 1;
      }
      return value;
    },
    // 获取农历信息
    getLunarInfo(y, m, d) {
      const lunarInfo = calendar.solar2lunar(y, m, d);
      let lunarValue = lunarInfo.IDayCn;

      const term = lunarInfo.Term;
      const nWeek = lunarInfo.nWeek;
      let isLunarFestival = false;
      let isGregorianFestival = false;
      let isCustomDayLight = '';
      let festival = '';

      if (
        this.festival.lunar[lunarInfo.lMonth + '-' + lunarInfo.lDay] !==
        undefined
      ) {
        lunarValue = this.festival.lunar[
          lunarInfo.lMonth + '-' + lunarInfo.lDay
        ];
        isLunarFestival = false; // 此处为农历节日是否高亮
      }
      if (this.festival.gregorian[m + '-' + d] !== undefined) {
        festival = this.festival.gregorian[m + '-' + d];
        isGregorianFestival = false; // 此处为阳历节日是否高亮
      }
      if (this.restDate[y + '-' + m + '-' + d] !== undefined) {
        isCustomDayLight = '休'; // 自定义日期高亮
      }
      if (this.workDate[y + '-' + m + '-' + d] !== undefined) {
        isCustomDayLight = '班'; // 自定义日期高亮
      }

      return {
        lunar: lunarValue,
        isLunarFestival: isLunarFestival,
        isGregorianFestival: isGregorianFestival,
        isCustomDayLight: isCustomDayLight,
        term,
        nWeek,
        festival
      };
    },
    // 获取自定义事件
    getEvents(y, m, d) {
      if (Object.keys(this.events).length === 0) return false;
      const eventName = this.events[y + '-' + m + '-' + d];
      const data = {};
      if (eventName !== undefined) {
        data.eventName = eventName;
      }
      return data;
    },
    // 上月
    prev(e) {
      e.stopPropagation();
      if (this.month === 0) {
        this.month = 11;
        this.year = parseInt(this.year) - 1;
      } else {
        this.month = parseInt(this.month) - 1;
      }
      let date = `${this.year}-${this.month + 1}`;
      date = moment(date).format('YYYY-MM');
      this.getList(date, false);
    },
    //  下月
    next(e) {
      e.stopPropagation();
      if (this.month === 11) {
        this.month = 0;
        this.year = parseInt(this.year) + 1;
      } else {
        this.month = parseInt(this.month) + 1;
      }
      let date = `${this.year}-${this.month + 1}`;
      date = moment(date).format('YYYY-MM');
      this.getList(date, false);
    },
    // 选中日期
    select(k1, k2, e) {
      if (e !== undefined) e.stopPropagation();
      // 日期范围
      if (this.range) {
        if (this.rangeBegin.length === 0 || this.rangeEndTemp !== 0) {
          this.rangeBegin = [this.year, this.month, this.days[k1][k2].day];
          this.rangeBeginTemp = this.rangeBegin;
          this.rangeEnd = [this.year, this.month, this.days[k1][k2].day];
          this.rangeEndTemp = 0;
        } else {
          this.rangeEnd = [this.year, this.month, this.days[k1][k2].day];
          this.rangeEndTemp = 1;
          // 判断结束日期小于开始日期则自动颠倒过来
          if (
            +new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]) <
            +new Date(
              this.rangeBegin[0],
              this.rangeBegin[1],
              this.rangeBegin[2],
            )
          ) {
            this.rangeBegin = this.rangeEnd;
            this.rangeEnd = this.rangeBeginTemp;
          }
          // 小于10左边打补丁
          let begin = [];
          let end = [];
          if (this.zero) {
            this.rangeBegin.forEach((v, k) => {
              if (k === 1) v = v + 1;
              begin.push(this.zeroPad(v));
            });
            this.rangeEnd.forEach((v, k) => {
              if (k === 1) v = v + 1;
              end.push(this.zeroPad(v));
            });
          } else {
            begin = this.rangeBegin;
            end = this.rangeEnd;
          }

          this.$emit('select', begin, end);
        }
        this.render(this.year, this.month);
      } else if (this.multi) {
        // 如果已经选过则过滤掉
        const filterDay = this.multiDays.filter(v => {
          return (
            this.year === v[0] &&
            this.month === v[1] - 1 &&
            this.days[k1][k2].day === v[2]
          );
        });
        if (filterDay.length > 0) {
          this.multiDays = this.multiDays.filter(v => {
            return (
              this.year !== v[0] ||
              this.month !== v[1] - 1 ||
              this.days[k1][k2].day !== v[2]
            );
          });
        } else {
          this.multiDays.push([
            this.year,
            this.month + 1,
            this.days[k1][k2].day
          ]);
        }
        this.days[k1][k2].selected = !this.days[k1][k2].selected;
        this.$emit('select', this.multiDays);
      } else {
        // 取消上次选中
        if (this.today.length > 0) {
          this.days.forEach(v => {
            v.forEach(vv => {
              vv.selected = false;
            });
          });
        }
        // 设置当前选中天
        this.days[k1][k2].selected = true;
        this.day = this.days[k1][k2].day;
        this.today = [k1, k2];
        this.$emit('select', [
          this.year,
          this.zero ? this.zeroPad(this.month + 1) : this.month + 1,
          this.zero
            ? this.zeroPad(this.days[k1][k2].day)
            : this.days[k1][k2].day
        ]);
      }
    },
    changeYear() {
      if (this.yearsShow) {
        this.yearsShow = false;
        return false;
      }
      this.yearsShow = true;
      this.years = [];
      for (let i = ~~this.year - 10; i < ~~this.year + 10; i++) {
        this.years.push(i);
      }
    },
    selectYear(value) {
      this.yearsShow = false;
      this.year = value;
      this.render(this.year, this.month);
      this.$emit('selectYear', value);
    },
    // 返回今天
    setToday() {
      const now = new Date();
      this.year = now.getFullYear();
      this.month = now.getMonth();
      this.day = now.getDate();
      this.render(this.year, this.month);
      // 遍历当前日找到选中
      this.days.forEach(v => {
        const day = v.find(vv => {
          return vv.day === this.day && !vv.disabled;
        });
        if (day !== undefined) {
          day.selected = true;
        }
      });
    },
    // 日期补零
    zeroPad(n) {
      return String(n < 10 ? '0' + n : n);
    },
    comfirm() {
      if (this.holiday === '元旦节') {
        this.month = 0;
      } else if (this.holiday === '除夕' || this.holiday === '春节') {
        this.month = 1;
      } else if (this.holiday === '清明节') {
        this.month = 3;
      } else if (this.holiday === '劳动节') {
        this.month = 4;
      } else if (this.holiday === '端午节') {
        this.month = 5;
      } else if (this.holiday === '中秋节') {
        this.month = 8;
      } else if (this.holiday === '国庆节') {
        this.month = 9;
      }
      let date = `${this.year}-${this.month + 1}`;
      date = moment(date).format('YYYY-MM');
      this.getList(date, false);
      this.holiday = '';
    },
    editStatus(child) {
      this.dialog.week = child.nWeek;
      this.dialog.day = child.day;
      this.dialog.status = child.isCustomDayLight;
      this.dialogVisible = true;
      const data = JSON.parse(JSON.stringify(this.dialog));
      this.chooseStatus = data.status || '班';
    },
    submit() {
      let date = `${this.year}-${this.month + 1}-${this.dialog.day}`;
      date = moment(date).valueOf();
      if (this.chooseStatus === '班') {
        this.add(true, date);
      } else {
        this.add(false, date);
      }
    },
    getList(date, type) {
      this.$store.dispatch('calendar/getWeekdays', date).then(res => {
        const data = res.data;
        this.restDate = {};
        this.workDate = {};
        data.forEach(item => {
          for (const i in item) {
            const key = moment(i).format('YYYY-M-D');
            if (item[i] === false) {
              this.restDate[key] = '休';
            } else {
              this.workDate[key] = '班';
            }
          }
        });

        if (type) {
          this.init();
        } else {
          this.render(this.year, this.month);
        }
      });
    },
    add(workState, workday) {
      const params = {
        workState,
        workday
      };
      this.$store.dispatch('calendar/addWeekdays', params).then(() => {
        this.$message.success('修改成功');
        this.dialogVisible = false;
        const date = moment(workday).format('YYYY-MM');
        this.getList(date, false);
      });
    },
    setStatus(item) {
      if (item.isCustomDayLight) {
        return item.isCustomDayLight;
      } else {
        if (item.nWeek === 6 || item.nWeek === 7) {
          return '休';
        } else if (item.nWeek !== 6 && item.nWeek !== 7) {
          return '班';
        }
      }
    },
    setClass(item) {
      console.log(item);
      if (item.isCustomDayLight) {
        if (item.isCustomDayLight === '休') {
          return 'rest';
        } else {
          return 'work';
        }
      } else {
        if (item.nWeek === 6 || item.nWeek === 7) {
          return 'rest';
        } else if (item.nWeek !== 6 && item.nWeek !== 7) {
          return 'work';
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  margin: auto;
  width: 100%;
  min-width: 300px;
  background: #fff;
  font-size: 14px;
  padding: 0 32px;
  user-select: none;
  table tbody tr td {
    border: 1px solid #f5f6f8;
  }
  table tbody tr td:first-child {
    background: #f5f6f8;
  }
  table tbody tr td:last-child {
    background: #f5f6f8;
  }
  .date {
    justify-content: flex-start;
    align-items: center;
  }
  .work {
    color: #f64e60;
    font-weight: 500;
  }
  .rest {
    color: #18c4bd;
    font-weight: 500;
  }
  .lunar {
    color: #a2a3b7;
    margin: 0 8px;
  }
  .date-container {
    width: 100%;
    height: 100%;
    padding: 12px;
    position: relative;
    .pen {
      width: 20px;
      height: 20px;
      background: url('../../assets/pen.png');
      background-size: 100% 100%;
      position: absolute;
      bottom: 12px;
      right: 12px;
      cursor: pointer;
      display: none;
    }
    &:hover {
      background: #f3f7ff;
    }
    &:hover .pen {
      display: block;
    }
  }
  .festival {
    width: 100%;
    height: 30px;
    background: #18c4bd;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 9px;
  }
  &-header {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    &-left {
      justify-content: flex-start;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      color: #464668;
      .change {
        width: 14px;
        height: 14px;
        cursor: pointer;
      }
      .pre {
        background: url('../../assets/pre.png');
        background-size: 100% 100%;
        margin: 0 8px 0 12px;
      }
      .next {
        background: url('../../assets/next.png');
        background-size: 100% 100%;
      }
    }
    .btn {
      margin-left: 40px;
    }
  }
  .day {
    font-size: 16px;
    font-weight: bold;
    color: #464668;
  }
  .current {
    width: 24px;
    height: 24px;
    background: #3599fe;
    border-radius: 50%;
    line-height: 24px;
    text-align: center;
    color: #fff;
  }
}
.status-container {
  width: 82px;
  height: 82px;
  background: #a2a3b7;
  border-radius: 4px;
  font-size: 33px;
  font-weight: 500;
  color: #ffffff;
  line-height: 82px;
  text-align: center;
  cursor: pointer;
  &.active {
    background: #3599fe;
  }
}
.status {
  justify-content: space-between;
  align-items: center;
  width: 243px;
  margin: 40px auto 46px;
}
.calendar-tools {
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color: #5e7a88;
}

.calendar-tools span {
  cursor: pointer;
}

.calendar-prev {
  width: 14.28571429%;
  float: left;
  text-align: center;
}

.calendar-info {
  padding-top: 3px;
  font-size: 16px;
  line-height: 1.3;
  text-align: center;
}

.calendar-info > div.month {
  margin: auto;
  height: 20px;
  width: 100px;
  text-align: center;
  color: #5e7a88;
  overflow: hidden;
  position: relative;
}

.calendar-info > div.month .month-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 240px;
  transition: top 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.calendar-info > div.month .month-inner > span {
  display: block;
  font-size: 14px;
  height: 20px;
  width: 100px;
  overflow: hidden;
  text-align: center;
}

.calendar-info > div.year {
  font-size: 10px;
  line-height: 1;
  color: #999;
}

.calendar-next {
  width: 14.28571429%;
  float: right;
  text-align: center;
}

.calendar table {
  clear: both;
  width: 100%;
  margin-bottom: 10px;
  border-collapse: collapse;
  color: #444444;
}

.calendar td {
  width: 140px;
  height: 140px;
}
.calendar td.week {
  font-size: 16px;
  font-weight: 500;
  color: #464668;
  width: 140px;
  height: 54px;
  text-align: center;
  pointer-events: none !important;
  cursor: default !important;
  border: none;
}

.calendar td.disabled {
  color: #a2a3b7;
  pointer-events: none !important;
  cursor: default !important;
}

.calendar td.disabled div {
  color: #a2a3b7;
}

.calendar td span {
  display: block;
  max-width: 40px;
  height: 26px;
  font-size: 16px;
  line-height: 26px;
  margin: 0px auto;
  border-radius: 20px;
}

.calendar td:not(.selected) span:not(.red):hover {
  background: #f3f8fa;
  color: #444;
}

.calendar td:not(.selected) span.red:hover {
  background: #f9efef;
}

.calendar td:not(.disabled) span.red {
  color: #ea6151;
}

.calendar td.selected span {
  background-color: #5e7a88;
  color: #fff;
}

.calendar td .text {
  font-size: 14px;
  color: #a2a3b7;
}

.calendar td .isGregorianFestival,
.calendar td .isCustomDayLight,
.calendar td .isLunarFestival {
  color: #ea6151;
}

.calendar td.selected span.red {
  background-color: #ea6151;
  color: #fff;
}

.calendar td.selected span.red:hover {
  background-color: #ea6151;
  color: #fff;
}

.calendar thead td {
  text-transform: uppercase;
  height: 30px;
  vertical-align: middle;
}

.calendar-button {
  text-align: center;
}

.calendar-button span {
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  min-width: 5em;
  vertical-align: baseline;
  background: #5e7a88;
  color: #fff;
  margin: 0 0.25em 0 0;
  padding: 0.6em 2em;
  font-size: 1em;
  line-height: 1em;
  text-align: center;
  border-radius: 0.3em;
}

.calendar-button span.cancel {
  background: #efefef;
  color: #666;
}

.calendar-years {
  position: absolute;
  left: 0px;
  top: 60px;
  right: 0px;
  bottom: 0px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
}

.calendar-years.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0px);
}

.calendar-years > span {
  margin: 1px 5px;
  display: inline-block;
  width: 60px;
  line-height: 30px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #fbfbfb;
  color: #999;
}

.calendar-years > span.active {
  border: 1px solid #5e7a88;
  background-color: #5e7a88;
  color: #fff;
}
</style>
