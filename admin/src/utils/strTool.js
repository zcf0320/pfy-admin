// 校验手机号
export function checkPhone(phone) {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  } else {
    return true;
  }
}

