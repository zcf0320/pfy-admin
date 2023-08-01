export const serviceType = {
  1: '特色服务(T)',
  2: '国内医疗服务(N)',
  3: '海外医疗服务(W)',
  4: '系统支持(X)'
};

export const operationType = {
  save: '新增',
  update: '修改',
  delete: '删除',
  create: '创建',
  submit: '提交',
  close: '关闭',
  start: '开始问诊',
  sendResult: '发送问诊结果',
  comment: '问诊评价',
  reviewdPass: '审核通过',
  reviewdReject: '审核驳回',
  deliverGoods: '发货',
  confirm: '确认',
  cancel: '取消',
  settlement: '结算',
  arrival: '到店',
  refuse: '拒绝',
  reviewd: '审核',
  completed: '已完成',
  upload: '上传报告',
  DDApprove: '钉钉审批',
  finish: '完成'
};
export const peopleType = {
  0: '医生',
  1: '用户'
};
export const LogType = {
  0: '病历',
  1: '基本信息'
};
export const menuType = {
  0: '服务项',
  1: '服务包',
  2: '供应商',
  3: '保险公司',
  4: '保险产品',
  5: '预约',
  6: '人员名单',
  7: '该激活码',
  8: '该保单',
  9: '该评价',
  14: '物流信息',
  26: 'AI问诊',
  27: '人工问诊',
  30: '在线报告',
  50: '电话问诊',
  11: '理赔审核',
  35: '在线服务',
  61: '问卷渠道',
  90: '企业客户',
  98: '问卷样式',
  99: '问卷用户信息',
  100: '问卷',
  51: '留言',
  52: '备注',
  108: '用药提醒'
};
export const insuranceType = {
  1: '健康险',
  2: '财险',
  3: '人寿险',
  4: '车险'
};
export const appointmentType = {
  0: '个人',
  1: '企业'
};
export const activeCodeStatus = {
  0: '可用',
  1: '过期',
  2: '作废',
  3: '已使用',
  4: '不存在'
};
export const policyStatus = {
  0: '正常',
  1: '已撤单'
};
export const policyState = {
  1: '保障中',
  2: '已过期',
  3: '未生效'
};
export const policyStateClass = {
  1: 'label-primary-text',
  2: 'label-active-text',
  3: 'label-danger-text'
};
export const policyStatusText = {
  0: 'label-success',
  1: 'label-danger'
};

export const groupPolicyStatus = {
  0: '可用',
  1: '身份证号码重复',
  2: '数据缺失',
  3: '姓名和身份证号码不对应'
};
export const serviceUseStatus = {
  0: '未使用',
  1: '已使用',
  2: '已失效',
  3: '已失效'
};
export const serviceUseClass = {
  0: 'label-danger',
  1: 'label-success',
  2: 'label-active',
  3: 'label-active'
};

export const credentialType = {
  0: '营业执照',
  1: '开户许可证',
  2: '医疗经营许可证',
  3: '医疗器械许可证',
  4: '税务登记证',
  5: '医疗机构许可证',
  6: '互联网药品信息服务资格证',
  7: '互联网药品交易服务资格证',
  8: '药品经营许可证',
  9: '医疗机构执业许可证',
  10: '医疗器械经营许可证',
  11: '医疗器械生产许可证',
  12: '医疗器械网络销售备案凭证',
  13: '卫生许可证',
  14: '医师资格证书',
  15: '医师执业证书',
  16: '执业药师职业资格证书'
};

export const codeStatus = {
  0: '券码重复',
  1: '数据缺失',
  2: '券码已存在',
  3: '券码日期格式错误',
  4: '券码已过期',
  5: '数据正确'
};

export const exchangeStatus = {
  0: '已兑换',
  1: '未兑换',
  2: '失效'
};
export const commentType = {
  1: '好评',
  2: '中评',
  3: '差评'
};
export const contentType = {
  67: '系统通知',
  68: '内部公告',
  69: '健康资讯',
  70: '小知识',
  71: '老年健康',
  72: '保险相关',
  122: '儿童养育',
  129: '女性呵护',
  136: '男性健康',
  141: '老年保健',
  149: '健康生活',
  3001: '库存预警通知',
  3002: '结算通知'
};
export const reviewStatus = {
  0: '成功',
  1: '待审核',
  2: '失败'
};
export const underwriteStatus = {
  0: '待审核',
  1: '正常可投保',
  2: '不可投保',
  3: '加费可投保',
  4: '除外可投保'
};

export const columnUnderwriteStatus = {
  0: 'label-primary',
  1: 'label-success',
  2: 'label-danger',
  3: 'label-success',
  4: 'label-success'
};

export const columnGroupStatus = {
  1: 'label-success',
  0: 'label-primary',
  2: 'label-danger'
};
export const columnCodeStatus = {
  0: 'label-primary',
  1: 'label-danger',
  2: 'label-danger',
  3: 'label-success',
  4: 'label-danger'
};
export const columnAppointmentStatus = {
  0: 'label-success',
  1: 'label-primary',
  2: 'label-danger'
};
export const columnReviewStatus = {
  0: 'label-success',
  1: 'label-primary',
  2: 'label-danger'
};
export const saleStatus = {
  109: '待发布',
  110: '已上架',
  111: '已下架'
};
export const columnSaleStatus = {
  109: 'label-primary',
  110: 'label-success',
  111: 'label-danger'
};
// 证件类型
export const certificateType = {
  1: '身份证',
  2: '护照'
};
// 发布状态
export const postStatusObj = {
  107: '待发布',
  105: '已发布',
  106: '已下架',
  108: '已屏蔽',
  109: '发布中',
  110: '下架中',
  111: '屏蔽中',
  112: '删除中',
  113: '上架中',
  114: '取消屏蔽中'
};
export const columnPostStatus = {
  107: 'label-primary',
  105: 'label-success',
  106: 'label-danger',
  108: 'label-danger',
  109: 'label-primary',
  110: 'label-danger',
  111: 'label-danger',
  112: 'label-danger',
  113: 'label-primary',
  114: 'label-active'
};

export const columnPostStatusText = {
  107: 'label-primary-text',
  105: 'label-success-text',
  106: 'label-danger-text',
  108: 'label-danger-text',
  109: 'label-primary-text',
  110: 'label-danger-text',
  111: 'label-danger-text',
  112: 'label-danger-text',
  113: 'label-primary-text',
  114: 'label-active-text'
};

// 订单状态
export const orderState = {
  1: '待确认',
  2: '待发货',
  3: '已发货',
  4: '已完成',
  5: '已取消',
  6: '进行中',
  1006: '待确认',
  1007: '待发货',
  1008: '已发货',
  1009: '已完成',
  1010: '已取消'
};

export const columnGoodsState = {
  1004: 'label-success-text',
  1005: 'label-danger-text'
};
export const columnState = {
  1: 'label-primary',
  2: 'label-primary',
  3: 'label-success',
  4: 'label-success',
  5: 'label-danger',
  6: 'label-primary',
  1004: 'label-success',
  1005: 'label-danger',
  1006: 'label-primary',
  1007: 'label-primary',
  1008: 'label-success',
  1009: 'label-success',
  1010: 'label-danger'
};
// 启用禁用状态

// 商品状态
export const goodsState = {
  1004: '已上架',
  1005: '已下架'
};

// 问诊类型
export const diagnoseType = {
  1: '智能问诊',
  2: '人工问诊',
  3: '电话问诊'
};
// 禁用，启用
export const materialState = {
  2: 'state-primary',
  0: 'state-success',
  1: 'state-danger'
};

// 审核状态
export const claimState = {
  待审核: 'state-1',
  待复核: 'state-2',
  '待审核-初审不通过': 'state-3',
  审核不通过: 'state-4',
  审核通过: 'state-5'
};
// 二次审核状态
export const secondaryTreatmentState = {
  1: '待审核',
  2: '审核成功',
  3: '审核失败'
};
// 问诊类型
export const labelClaimState = {
  1: 'label-primary',
  2: 'label-success',
  3: 'label-danger'
};
// 采购状态
export const purchasingState = {
  1: 'label-primary',
  2: 'label-active',
  3: 'label-success'
};
// 采购状态
export const purchasingStatePreview = {
  1: '待处理',
  2: '处理中',
  3: '已完成'
};
// 采购日志
export const purchasingLog = {
  processing: '处理中',
  completed: '已完成',
  remarks: '备注',
  submit: '提交'
};

// 血型
export const bloodIdList = {
  34: 'A型',
  35: 'B型',
  36: 'AB型',
  37: 'O型'
};
// 特殊时期
export const specialPeriod = {
  0: '否',
  1: '备孕',
  2: '怀孕',
  3: '哺乳期'
};
// label启用禁用
export const labelState = {
  0: 'label-success',
  1: 'label-danger'
};
export const insuranceStatus = {
  '1': '可投保',
  '2': '不可投保',
  '3': '代人工核保'
};
// 关系
export const relationship = {
  1: '本人',
  2: '配偶',
  3: '父母',
  4: '子女'
};

// 预警类型
export const claimWarnType = {
  0: '正常',
  1: '违规',
  2: '欺诈',
  3: '提醒'
};
// 预警类型class
export const claimWarnTypeClass = {
  0: 'claimWarning-primary',
  1: 'claimWarning-warning',
  2: 'claimWarning-danger',
  3: 'claimWarning-primary'
};
// 问诊类型
export const diagnoseActionType = {
  1: '26',
  2: '27',
  3: '50'
};
// 上传pdf baseUrl
export const basePdfUrl = `${process.env.VUE_APP_BASE_API}scm/sys/uploadPdf`;
// 上传pic baseUrl
export const basePicUrl = `${process.env.VUE_APP_BASE_API}scm/sys/uploadPic`;

export const postTypeColor = {
  105: '#00D5C8',
  106: '#F54E60',
  107: '#3599FE'
};

// 库存操作
export const inventoryLabel = {
  '1': '增加',
  '-1': '减少'
};
// 物流信息
export const logisticsState = {
  1: '待确人',
  2: '已发货',
  3: '已完成',
  4: '已取消'
};
// 问题类型
export const questionType = {
  1: '单选',
  2: '多选',
  3: '单项填空'
};
// 商品兑换状态
export const exchangeState = {
  1: '待确认',
  2: '已发货',
  3: '已完成'
};
export const exchangeColumn = {
  1: 'label-primary',
  2: 'label-danger',
  3: 'label-success'
};
// 供应商账号状态
export const accountState = {
  1: '待启用',
  2: '正常',
  3: '已解约',
  4: '启用中',
  5: '解约中',
  6: '删除中'
};
export const accountColumn = {
  1: 'label-primary',
  3: 'label-danger',
  2: 'label-success',
  4: 'label-primary',
  5: 'label-active',
  6: 'label-danger'
};
// 供应商审核状态
export const checkState = {
  1: '待审核',
  2: '审核中',
  3: '审核成功',
  4: '审核失败'
};
export const checkColumn = {
  1: 'label-primary',
  2: 'label-primary',
  3: 'label-success',
  4: 'label-danger'
};

// 审批状态
export const ApprovalStatus = {
  0: '待提交审批',
  1: '审批中',
  2: '审批通过',
  3: '审批不通过'
};
// 审批状态
export const ApprovalColumnClass = {
  0: 'label-primary-text',
  1: 'label-active-text',
  2: 'label-success-text',
  3: 'label-danger-text'
};
// 保险公司状态
export const CompanyStatus = {
  0: '待启用',
  1: '已启用',
  2: '已停用',
  3: '启用中',
  4: '停用中'
};
export const CompanyStatusColumn = {
  0: 'label-primary',
  1: 'label-success',
  2: 'label-danger',
  3: 'label-primary',
  4: 'label-danger'
};
// 结算方式
export const settlementMethod = {
  0: '一口价',
  1: '阶梯价',
  2: '按保单',
  3: '按区域',
  4: '按订单价格'
};
// 钉钉审批状态
export const approvalStatus = {
  1: '待审核',
  2: '审核中',
  3: '审核成功',
  4: '审核失败'
};
// 钉钉审批状态对应类名
export const approvalStatusClass = {
  1: 'label-primary-text',
  2: 'label-active-text ',
  3: 'label-success-text ',
  4: 'label-danger-text'
};
// 曾送权益状态
export const collectionState = {
  1: '待领取',
  2: '已领取',
  3: '已过期',
  4: '已失效'
};
// 曾送权益状态
export const collectionStateClass = {
  1: 'label-primary-text',
  2: 'label-success-text',
  3: 'label-active-text',
  4: 'label-danger-text'
};
// 用药计划状态
export const drugPlanState = {
  1: '进行中',
  2: '未开始',
  3: '已过期'
};
export const drugPlanColumn = {
  1: 'label-primary',
  3: 'label-danger',
  2: 'label-active'
};
export const DDApprove = {
  NEW: '新创建',
  RUNNING: '审批中',
  TERMINATED: '被终止',
  COMPLETED: '完成',
  CANCELED: '取消'
};
export const DDOperation = {
  EXECUTE_TASK_NORMAL: '正常执行任务',
  EXECUTE_TASK_AGENT: '代理人执行任务',
  APPEND_TASK_BEFORE: '前加签任务',
  APPEND_TASK_AFTER: '后加签任务',
  REDIRECT_TASK: '转交任务',
  START_PROCESS_INSTANCE: '发起审批流程',
  TERMINATE_PROCESS_INSTANCE: '终止(撤销)流程实例',
  FINISH_PROCESS_INSTANCE: '添加评论',
  redirect_process: '审批退回',
  publish: '发布',
  downShelf: '下架',
  enable: '启用',
  disable: '停用',
  release: '解约'
};
// 服务来源
export const serviceRegionState = {
  1: '激活码',
  2: '保单号',
  3: '商品兑换',
  4: '首页领取',
  5: '健康计划',
  6: '券码领取'
};
// 留言状态
export const leavingMessageState = {
  1: 'label-primary',
  2: 'label-success'
};
export const leavingMessageText = {
  1: '待处理',
  2: '已完成'
};
// 问卷问题类型
export const questionAnswerType = {
  1: '单选',
  2: '多选',
  3: '填空'
};
// 供应商合同状态
export const contractState = {
  未生效: '未生效',
  已生效: '已生效',
  已过期: '已过期'
};
export const contractColumn = {
  未生效: 'label-primary-text',
  已生效: 'label-success-text',
  已过期: 'label-danger-text'
};
// 消息阅读状态
export const messageState = {
  0: '未读',
  1: '已读'
};
export const messageColumn = {
  1: 'label-success-text',
  0: 'label-danger-text'
};
// 销售状态: 0：停售，1：在售
export const saleState = {
  0: '停售',
  1: '在售'
};
export const saleColumn = {
  1: 'label-success-text',
  0: 'label-danger-text'
};

// 结算类型,0保单正常结算，1保单撤单结算
export const POLICYSTATUSTEXT = {
  0: '保单正常结算',
  1: '保单撤单结算'
};

export const contractText = {
  0: 'contract-state0-text',
  1: 'contract-state1-text',
  2: 'contract-state2-text'
};
// 导出临界值
export const exportEmailNum = 20000;

export const orderStateClass = {
  待确认: 'check-passin',
  待审核: 'check-passin',
  进行中: 'check-passin',
  已取消: 'check-unpass',
  已完成: 'check-pass',
  已发货: 'check-pass'
};

/**
 * 结算状态
 */
export const settlementStateClass = {
  待结算: 'check-passin',
  已结算: 'check-pass'
};
