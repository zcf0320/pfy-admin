export { parseTime, timeFormat } from '@/utils';
// 预约的状态值
export function appointmentStatusFilter(value) {
  const status = [
    { text: '可用', value: 0 },
    { text: '过期', value: 1 },
    { text: '作废', value: 2 },
    { text: '已使用', value: 3 },
    { text: '不存在', value: 4 }
  ];
  const filterArr = status.filter(item => {
    return item.value === value;
  });
  return filterArr[0].text;
}
export function companyStatusFilter(value) {
  const status = [
    { text: '成功', value: '0' },
    { text: '待确认', value: '1' },
    { text: '失败', value: '2' }
  ];
  const filterArr = status.filter(item => {
    return item.value === value;
  });
  return filterArr[0].text;
}

export function findParentNode(array, path) {
  const stack = [];
  let going = true;

  const walker = (children, label) => {
    children.forEach(item => {
      if (!going) return;
      stack.push(item);
      if (label === item['url']) {
        going = false;
      } else if (item['children'].length) {
        walker(item['children'], label);
      } else {
        stack.pop();
      }
    });
    if (going) stack.pop();
  };
  walker(array, path);
  return stack;
}

/**
 * 肤色
 * @param num
 * @returns
 */
export function colorNumberText(num) {
  let text = '';
  switch (num) {
    case 1:
      text = '冷色';
      break;
    case 2:
      text = '偏冷色';
      break;
    case 3:
      text = '中性冷色';
      break;
    case 4:
      text = '中性色';
      break;
    case 5:
      text = '偏暖色';
      break;
    case 6:
      text = '暖色';
      break;
    default:
      text = '';
      break;
  }
  return text;
}
/**
 * 光滑度
 * @param num
 * @returns
 */
export function eggText(num) {
  let text = '';
  switch (num) {
    case 1:
      text = '1级';
      break;
    case 2:
      text = '2级';
      break;
    case 3:
      text = '3级';
      break;
    case 4:
      text = '4级';
      break;

    default:
      text = '';
      break;
  }
  return text;
}

/**
 * 耐受度
 * @param type
 * @returns
 */
export function skinToleranceText(type) {
  let text = '';
  switch (type) {
    case '0':
      text = '耐受';
      break;
    case '1':
      text = '中性';
      break;
    case '2':
      text = '敏感';
      break;
    default:
      text = '';
      break;
  }
  return text;
}

/**
 * 油性
 * @param type
 * @returns
 */
export function skinOilyText(type) {
  let text = '';
  switch (type) {
    case '0':
      text = '干性';
      break;
    case '1':
      text = '中性';
      break;
    case '2':
      text = '油性';
      break;
    default:
      text = '';
      break;
  }
  return text;
}

/**
 * 黑头类型
 * @param type
 * @returns
 */
export function BlackHeadText(type) {
  let text = '';
  switch (type) {
    case '1':
      text = '脂栓性';
      break;
    case '2':
      text = '脂丝型';
      break;
    case '3':
      text = '螨虫型';
      break;
    default:
      text = '';
      break;
  }
  return text;
}
/**
 * 毛孔类型
 * @param type
 * @returns
 */
export function PoreText(type) {
  let text = '';
  switch (type) {
    case '1':
      text = '油光型';
      break;
    case '2':
      text = '缺水型';
      break;
    case '3':
      text = '角质型';
      break;
    case '4':
      text = '衰老型';
      break;
    default:
      text = '';
      break;
  }
  return text;
}

/**
 * 皱纹类型
 * @param type
 * @returns
 */
export function wrinkleText(type) {
  let text = '';
  switch (type) {
    case '1':
      text = '抬头纹';
      break;
    case '2':
      text = '川字纹';
      break;
    case '3':
      text = '眼周细纹';
      break;
    case '4':
      text = '鱼尾纹';
      break;
    case '5':
      text = '法令纹';
      break;
    case '6':
      text = ' 口周纹';
      break;
    default:
      text = '';
      break;
  }
  return text;
}
/**
 * 痘痘类型
 * @param {*} type
 * @returns
 */
export function AcneText(type) {
  let text = '';
  switch (type) {
    case 0:
      text = '粉刺';
      break;
    case 1:
      text = '痘印';
      break;
    case 2:
      text = '脓包';
      break;
    case 3:
      text = '结节';
      break;
    default:
      text = '';
      break;
  }
  return text;
}

/**
 * 性别
 * @param {*} val
 * @returns
 */
export function sexFormat(val) {
  if (val === 0) {
    return '女';
  } else if (val === 1) {
    return '男';
  } else {
    return '-';
  }
}
/**
 * 受教育年限
 * @param {*} val
 * @returns
 */
export function educationFormat(val) {
  if (val === 1) {
    return '>=10年';
  } else if (val === 2) {
    return '7~9年';
  } else {
    return '<7年';
  }
}

export function payType(val) {
  let type = '';
  switch (val) {
    case 1301:
      type = '账号支付';
      break;
    case 1302:
      type = '支付宝';
      break;
    case 1303:
      type = '微信';
      break;
    case 1304:
      type = '银行卡';
      break;
    case 1305:
      type = '线下门店';
      break;
    default:
      type = '-';
      break;
  }
  return type;
}

export function asleep(val) {
    let str = '';
    switch (val) {
      case 1:
        str = '晚上10点前';
        break;
      case 2:
        str = '10点-11点';
        break;
      case 3:
        str = '11点-12点';
        break;
      case 4:
        str = '12点后';
        break;
      default:
        str = '-';
    }
    return str;
  }

 export function wakeFeeling(val) {
    let str = '';
    switch (val) {
      case '1':
        str = '神清气爽';
        break;
      case '2':
        str = '头脑发昏';
        break;
      case '3':
        str = '乏累困倦';
        break;
      case '4':
        str = '腰酸背痛';
        break;
      default:
        str = '-';
    }
    return str;
  }

  export function wake(val) {
    let str = '';
    switch (val) {
      case 1:
        str = '早上5点前';
        break;
      case 2:
        str = '5点-7点';
        break;
      case 3:
        str = '7点-9点';
        break;
      case 4:
        str = '9点后';
        break;
      default:
        str = '-';
    }
    return str;
  }
 export function haveWake(val) {
    let str = '';
    switch (val) {
      case 1:
        str = '醒来1次';
        break;
      case 2:
        str = '醒来2-3次';
        break;
      case 3:
        str = '醒来3次以上';
        break;
      case 4:
        str = '整夜未醒';
        break;
      default:
        str = '-';
    }
    return str;
  }
export function medicineFormat(val) {
    if (val === 0) {
      return '否';
    } else if (val === 1) {
      return '是';
    } else {
      return '-';
    }
  }
  export function thyroidFormat(val) {
    if (val === 3) {
      return '正常';
    } else if (val === 1) {
      return '偏高';
    } else if (val === 2) {
      return '偏低';
    } else {
      return '-';
    }
  }
