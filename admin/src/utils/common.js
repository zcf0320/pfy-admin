import { uploadPic } from '@/api/system';
import store from '@/store';

// 编辑器上传图片
export const editorUploadImage = file => {
  const fd = new FormData();
  // 文件对象
  fd.append('file', file[0]);

  return new Promise((resolve, reject) => {
    uploadPic(fd).then(res => {
      if (res.status) {
        resolve(res.data);
      } else {
        reject(res.message);
      }
    });
  });
};

// 数字千分位转换
export const toThousands = num => {
  //   var num = (num || 0).toString();
  let result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
};

// 匹配关键字高亮
export const replaceHightKeyWord = (keyword, text) => {
  // 匹配关键字正则
  const replaceReg = new RegExp(keyword, 'g');
  // 高亮替换v-html值
  const replaceString = `<span class="hight-keyword">${keyword}</span>`;

  return text.replace(replaceReg, replaceString);
};

// 获取当前页面待确认/待审核数量
export const getConfirmNumber = path => {
  let remindNumber = 0;
  store.getters.menuList.forEach(sys => {
    sys.children.forEach(menu => {
      menu.children.forEach(page => {
        if (page.url === path) {
          remindNumber = page.remindNumber;
        }
        if (page.url === 'PurchasingManagement') {
          // do
        }
      });
    });
  });
  return remindNumber;
};
const pageAuthority = {};
export const recursionAuth = data => {
  data.forEach(child => {
    pageAuthority[child.value] = child.actionTypes;
    if (child.children.length) {
      recursionAuth(child.children);
    }
  });
  return pageAuthority;
};
