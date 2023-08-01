import request from '@/utils/request';

// 查询用户问卷使用记录列表
export function getUserRecordList(data) {
    return request({
        url: 'scm/ucQuestionnaireUserUseDetail/list',
        method: 'post',
        data
    });
}
// 获取C端问卷详情
export function getQuestionnaireDetail(params) {
    return request({
        url: 'scm/ucQuestionnaireUserUseDetail/questionnaireDetail',
        method: 'get',
        params
    });
}
// 获取C端问卷列表
export function getQuestionnaireList() {
    return request({
        url: 'scm/ucQuestionnaireUserUseDetail/questionnaireList',
        method: 'get'
    });
}
// 用户使用问卷记录详情
export function getUserUseDetail(params) {
    return request({
        url: 'scm/ucQuestionnaireUserUseDetail/userUseDetail',
        method: 'get',
        params
    });
}
// 在线用户使用问卷记录详情
export function OlgetUserUseDetail(params) {
    return request({
        url: 'scm/ucQuestionnaireUserUseDetail/userUseDetailOl',
        method: 'get',
        params
    });
}
// 获取渠道列表下拉
export function getChannelList() {
    return request({
        url: 'scm/ucQuestionnaireChannel/getChannelList',
        method: 'get'
    });
}
// 新增问卷渠道生成链接
export function addChannelInfo(data) {
    return request({
        url: 'scm/ucQuestionnaireChannel/insertChannelInfo',
        method: 'post',
        data
    });
}
// 查询问卷渠道列表
export function getQuestionnaireChannelList(data) {
    return request({
        url: 'scm/ucQuestionnaireChannel/list',
        method: 'post',
        data
    });
}
// 修改问卷渠道海报
export function updateChannelPoster(data) {
    return request({
        url: 'scm/ucQuestionnaireChannel/updateChannelPoster',
        method: 'post',
        data
    });
}
// 校验问卷渠道是否存在
export function checkQuestionnaireChannel(data) {
    return request({
        url: 'scm/ucQuestionnaireChannel/checkQuestionnaireChannel',
        method: 'post',
        data
    });
}
// 修改问卷渠道状态
export function saveState(data) {
    return request({
        url: 'scm/ucQuestionnaireChannel/saveState',
        method: 'post',
        data
    });
}
// 保存问卷设置第一步
export function saveQuestionnaireFirst(data) {
    return request({
        url: 'scm/questionnaire/manage/save/Questionnaire',
        method: 'post',
        data
    });
}
// 获取第二部配置
export function getSecondSetting(questionnaireId) {
    return request({
        url: `scm/questionnaire/manage/find/UserInfo/${questionnaireId}`,
        method: 'get'
    });
}
// 删除问卷
export function delQuestionnaire(questionnaireId) {
    return request({
        url: `scm/questionnaire/manage/delete/Questionnaire/${questionnaireId}`,
        method: 'get'
    });
}
// 查找问卷所有设置
export function getAllSetting(questionnaireId) {
    return request({
        url: `scm/questionnaire/manage/find/All/Questionnaire/${questionnaireId}`,
        method: 'get'
    });
}
// 查找问卷第一步
export function getFirstSetting(questionnaireId) {
    return request({
        url: `scm/questionnaire/manage/find/Questionnaire/${questionnaireId}`,
        method: 'get'
    });
}
// 查找用户配置(可查找标题,副标题)第三部
export function getThirdSetting(questionnaireId) {
    return request({
        url: `scm/questionnaire/manage/find/Style/${questionnaireId}`,
        method: 'get'
    });
}
// 保存问卷样式设置第三部
export function saveQuestionnaireThird(data) {
    return request({
        url: 'scm/questionnaire/manage/save/Style',
        method: 'post',
        data
    });
}
// 保存问卷个人信息设置第二部
export function saveQuestionnaireSecond(data) {
    return request({
        url: 'scm/questionnaire/manage/save/UserInfo',
        method: 'post',
        data
    });
}
// 启用问卷
export function openQuestionnaire(questionnaireId) {
    return request({
        url: `scm/questionnaire/manage/start/using/Questionnaire/${questionnaireId}`,
        method: 'get'
    });
}
// 修改问卷所有设置
export function setAllSetting(data) {
    return request({
        url: `scm/questionnaire/manage/update/Questionnaire`,
        method: 'post',
        data
    });
}
// 查询操作日志
export function getLogs(data) {
    return request({
        url: `scm/sys/log/list`,
        method: 'post',
        data
    });
}
// 查找所有最新协议
export function getProtocol() {
    return request({
        url: `scm/user/protocol/findAll`,
        method: 'get'
    });
}
// 通过id查找协议
export function getProtocolById(id) {
    return request({
        url: `scm/user/protocol/find/ById/${id}`,
        method: 'get'
    });
}
// 发布协议
export function saveProtocol(data) {
    return request({
        url: `scm/user/protocol/save/protocol`,
        method: 'post',
        data
    });
}
// 单个协议所有历史版本
export function getProtocolHistory(type) {
    return request({
        url: `scm/user/protocol/find/history/${type}`,
        method: 'get'
    });
}

/**
 * 获取
 * @param {*} questionnaireId
 * @returns
 */
export function getChannelListByQuestionnaireId(questionnaireId) {
    return request({
        url: 'scm/ucQuestionnaireUserUseDetail/questionnaireToChannelList',
        params: { questionnaireId },
        method: 'get'
    });
}
