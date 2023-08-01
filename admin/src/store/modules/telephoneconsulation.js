import * as api from '@/api/telephoneconsulation';

const actions = {
    // 电话问诊列表
    callRecordList(ctx, data) {
        return api.callRecordList(data);
    },
    // 电话问诊详情
    callRecordDetail(ctx, data) {
        return api.callRecordDetail(data);
    },
    // 给用户打电话
    makeCall(ctx, data) {
        return api.makeCall(data);
    },
    // 发送问诊结果
    sendResult(ctx, data) {
        return api.sendResult(data);
    },
    // 跟新备注
    updateRemark(ctx, data) {
        return api.updateRemark(data);
    },
    // 模糊搜索疾病列表
    getDiseaseByName(ctx, params) {
        return api.getDiseaseByName(params);
    },
    // 获取全部科室多级
    getAllDepartment(ctx, params) {
        return api.getAllDepartment(params);
    },
    // 通过基础药品库进行搜索
    findDrug(ctx, params) {
        return api.findDrug(params);
    }
};

export default {
    namespaced: true,
    actions
};
