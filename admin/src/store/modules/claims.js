import * as claimsApi from '@/api/claims';

const ageOptions = [];
// 初始化age
for (let i = 0; i < 100; i++) {
  ageOptions.push({
    id: i,
    name: i
  });
}

const state = {
  ageOptions,
  jobOptions: [
    {
      id: 163,
      name: '一类'
    },
    {
      id: 164,
      name: '二类'
    },
    {
      id: 165,
      name: '三类'
    },
    {
      id: 166,
      name: '四类'
    },
    {
      id: 167,
      name: '五类'
    },
    {
      id: 168,
      name: '六类'
    }
  ],
  sexOptions: [
    {
      id: 169,
      name: '男'
    },
    {
      id: 170,
      name: '女'
    }
  ]
};

const actions = {
  // 获取理赔列表
  getClaimsList(ctx, params) {
    return claimsApi.getClaimsList(params);
  },
  // 获取理赔详情
  getClaimsDetails(ctx, params) {
    return claimsApi.getClaimsDetails(params);
  },
  // 审核
  reviewClaims(ctx, params) {
    return claimsApi.reviewClaims(params);
  },
  // 导出
  export(ctx, params) {
    return claimsApi.exportList(params);
  }
};

export default {
  namespaced: true,
  state,
  actions
};
