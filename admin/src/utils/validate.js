/**
 * Created by PanJiaChen on 16/11/18.
 */
import { isEmptyObject } from '@/utils/ObjectUtils';

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * 校验手机号
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone) {
  const reg = /^1[0-9]{10}$/;
  return reg.test(phone);
}

/**
 * @param {string} bankNumber
 * @returns {Boolean}
 */
export function validBankNum(bankNumber) {
  const reg = /^([0-9]+)$/;
  return reg.test(bankNumber);
}
/**
 * @param {string} int
 * @returns {Boolean}
 */
export function int(bankNumber) {
  const reg = /^[0-9]*$/;
  return reg.test(bankNumber);
}

/**
 * @param {string} money
 * @returns {Boolean}
 */
export function validMoney(money) {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  return reg.test(money);
}
/**
 * 校验正整数
 * @param {number} value
 * @returns {Boolean}
 */
export function validPInt(value) {
  value = Number(value);
  const reg = /^[1-9]\d*$/;
  return reg.test(value);
}

/**
 * @param {string} mobile
 * @returns {string}
 * 隐藏手机号****
 */
export function formatMobile(mobile) {
  if (mobile) {
    let tel = mobile;
    tel = '' + tel;
    return tel.substr(0, 3) + '****' + tel.substr(7);
  }
  return '暂无';
}

/**
 * @param {string} card
 * @returns {string}
 * 隐藏手身份证号****
 */
export function formatCard(card) {
  if (card) {
    return card.replace(/^(.{4})(?:\d+)(.{4})$/, '$1******$2');
  }
  return '暂无';
}

/**
 * @param {string} type
 * @returns {string}
 * 隐藏手身份证号****
 */
export function formatSettleType(type) {
  if (!type) {
    return '';
  }
  return type === 0 ? '正常' : '异常';
}
// 校验正整数
export function validInteger(number) {
  const reg = /^[1-9]\d*$/;
  return reg.test(number);
}
// 校验核销码
export function validCode(value) {
  const reg = /^[0-9a-z]*$/;
  return reg.test(value);
}
// 校验最多输入三位小数
export function validDecima3(value) {
  const reg = /^\d+(\.\d{1,3})?$/;
  return reg.test(value);
}
// 校验最多输入两位小数
export function validDecima2(value) {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(value);
}
/**
 *
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkEmail(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!validEmail(value)) {
    return callback(
      new Error(
        isEmptyObject(rule.message) ? '请输入正确的邮箱地址' : rule.message,
      ),
    );
  }
  callback();
}
/**
 *
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkValidCode(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!validCode(value)) {
    return callback(
      new Error(
        isEmptyObject(rule.message)
          ? '核销码只能输入数字或者字母'
          : rule.message,
      ),
    );
  }
  callback();
}
/**
 *
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkPhone(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!validPhone(value)) {
    return callback(
      new Error(
        isEmptyObject(rule.message) ? '请输入正确的手机号码' : rule.message,
      ),
    );
  }
  callback();
}
/**
 * 校验正整数
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkPInt(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!validPInt(value)) {
    return callback(
      new Error(isEmptyObject(rule.message) ? '无效的正整数' : rule.message),
    );
  }
  callback();
}
/**
 * 校验范围
 * @param {*} val
 * @param {*} min
 * @param {*} max
 */
export function validateRange(val, min, max) {
  if (!isEmptyObject(min) && val < min) {
    return false;
  }
  if (!isEmptyObject(max) && val > max) {
    return false;
  }
  return true;
}
/**
 * 校验小数不超过3位
 * @param {*} value
 */
export function checkDecima3(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!validDecima3(value)) {
    return callback(
      new Error(
        isEmptyObject(rule.message)
          ? '请输入正整数且小数点最多保留3位'
          : rule.message,
      ),
    );
  }
  callback();
}
/**
 * 校验小数不超过2位
 * @param {*} value
 */
export function checkDecima2(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!validDecima2(value)) {
    return callback(
      new Error(
        isEmptyObject(rule.message)
          ? '请输入正整数且小数点最多保留2位'
          : rule.message,
      ),
    );
  }
  callback();
}
/**
 * 校验可为0的正整数
 * @param {*} value
 */
export function checkInt(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!int(value)) {
    return callback(
      new Error(isEmptyObject(rule.message) ? '请输入正整数' : rule.message),
    );
  }
  callback();
}

/**
 * 是否是身份证号
 * @param cardNo
 */
export function validateIdCardNo(cardNo) {
  const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
  return reg.test(cardNo);
}
/**
 * 校验身份证号
 * @param {*} value
 */
export function checkIdNumber(rule, value, callback) {
  if (isEmptyObject(value)) {
    callback();
  }
  if (!validateIdCardNo(value)) {
    return callback(
      new Error(
        isEmptyObject(rule.message) ? '请输入正确的身份证号' : rule.message,
      ),
    );
  }
  callback();
}
export default {
  checkEmail: checkEmail,
  checkPhone: checkPhone,
  checkPInt: checkPInt,
  validCode: validCode,
  checkValidCode: checkValidCode,
  checkDecima3,
  checkInt,
  checkDecima2,
  checkIdNumber
};
