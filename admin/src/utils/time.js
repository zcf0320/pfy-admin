import moment from 'moment';
// 获取时间戳
export const getUnix = value => {
  if (!value) {
    return;
  }
  return new Date(value).getTime() / 1000;
};

export const chatTimeTransform = chatTime => {
  if (!chatTime) {
    return '';
  }
  const currentTime = new Date().getTime();
  // 距离现在时间间隔
  const time = currentTime - chatTime;
  if (time > 5 * 60 * 1000 && time < 24 * 60 * 60 * 1000) {
    return moment(chatTime).format('HH:mm');
  } else if (time >= 24 * 60 * 60 * 1000 && time < 48 * 60 * 60 * 1000) {
    return `昨天 ${moment(chatTime).format('HH:mm')}`;
  } else if (time >= 48 * 60 * 60 * 1000 && time < 7 * 24 * 60 * 60 * 1000) {
    return moment(chatTime).format('dddd HH:mm');
  } else {
    return moment(chatTime).format('YYYY-MM-DD HH:mm');
  }
};

/**
 * 判断某一年是否是闰年
 * @param year 可以是一个date类型，也可以是一个int类型的年份，不传默认当前时间
 */
export function isLeapYear(year) {
  if (year === undefined) year = new Date();
  if (year instanceof Date) year = year.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 获取某一年某一月的总天数，没有任何参数时获取当前月份的
 * 方式一：$.getMonthDays();
 * 方式二：$.getMonthDays(new Date());
 * 方式三：$.getMonthDays(2013, 12);
 */
export function getMonthDays(date, month) {
  let y, m;
  if (date === undefined) date = new Date();
  if (date instanceof Date) {
    y = date.getFullYear();
    m = date.getMonth();
  } else if (typeof date === 'number') {
    y = date;
    m = month - 1;
  }
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 非闰年的一年中每个月份的天数
  // 如果是闰年并且是2月
  if (m === 1 && isLeapYear(y)) return days[m] + 1;
  return days[m];
}

/**
 * 将字符串解析成日期
 * @param str 输入的日期字符串，如'2014-09-13'
 * @param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
 * @returns 解析后的Date类型日期
 */
export function parseDate(str, fmt) {
  fmt = fmt || 'yyyy-MM-dd';
  const obj = {
    y: 0,
    M: 1,
    d: 1,
    H: 0,
    h: 0,
    m: 0,
    s: 0,
    S: 0
  };
  fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function(
    m,
    $1,
    $2,
    $3,
    $4,
  ) {
    str = str.replace(
      new RegExp($1 + '(\\d{' + $2.length + '})' + $4),
      function(_m, _$1) {
        obj[$3] = parseInt(_$1);
        return '';
      },
    );
    return '';
  });
  obj.M--; // 月份是从0开始的，所以要减去1
  const date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
  if (obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
  return date;
}
