import { uploadPic } from '@/api/system';

const uploadImage = (item, onUploadProgress) => {
    const fileObj = item.file;
    // FormData 对象
    const fd = new FormData();
    // 文件对象
    fd.append('file', fileObj);

    return new Promise((resolve, reject) => {
        uploadPic(fd, onUploadProgress).then(res => {
            if (res.status) {
                resolve(res.data);
            } else {
                reject(res);
            }
        });
    });
};

export default uploadImage;
