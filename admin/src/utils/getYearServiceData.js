import { getYearServiceData } from '@/api/system';

const getServiceData = (year) => {
    const fd = new URLSearchParams();
    fd.append('year', year);

    return new Promise((resolve, reject) => {
        getYearServiceData(fd).then(res => {
            if (res.data.status) {
                resolve(res.data.data);
            } else {
                reject(res.data.message);
            }
        });
    });
};

export default getServiceData;
