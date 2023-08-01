import { uplaodCertificateReList } from '@/api/drugManage';

const uplaodCertificate = (item, type) => {
  const fileObj = item.file;
  // FormData 对象
  const fd = new FormData();
  // 文件对象
  fd.append('file', fileObj);

  return new Promise((resolve, reject) => {
    uplaodCertificateReList(fd, type).then(res => {
      if (res.status) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  });
};

export default uplaodCertificate;
