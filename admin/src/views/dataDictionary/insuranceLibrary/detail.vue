<template>
  <el-container>
    <el-main>
      <Tab :currentKey="activeName" :btns="tabs" @change="handleClick" />
      <div class="scroll-table"></div>
      <div v-if="activeName === '0'" class="basic-info">
       <div class="basicDetail-table">
        <div class="detail-table-title">基础信息</div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              ID
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.id }}
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              产品名称
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.productName }}
            </div>
          </div>
        </div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              保险公司
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.insuranceCompany }}
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              保险分类
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.insuranceClassification }}
            </div>
          </div>
        </div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              保障期限
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.guaranteeTime }}
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              等待期
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.waitingPeriod }}
            </div>
          </div>
        </div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              来源
            </div>
            <div class="detail-table-item-value">
              <el-select v-model="dataSource">
                <el-option
                  v-for="item in dataSourceOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              类型
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.insuranceType }}
            </div>
          </div>
        </div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              销售单数
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsInfoVo.deliveredNumber }}
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              相关疾病
            </div>
            <div class="detail-table-item-value">
              {{
                insuranceProductsInfoVo.diseasesList &&
                insuranceProductsInfoVo.diseasesList.length
                  ? insuranceProductsInfoVo.diseasesList.join(',')
                  : '-'
              }}
            </div>
          </div>
        </div>
        <div class="detail-table-title">计划责任</div>
        <div v-for="(item, index) in plansVos" :key="index">
          <div class="detail-table-item">
            <div class="detail-table-item-left">
              <div class="detail-table-item-label">
                计划名称
              </div>
              <div class="detail-table-item-value">
                {{ item.planName }}
              </div>
            </div>
            <div class="detail-table-item-right">
              <div class="detail-table-item-label">
              </div>
              <div class="detail-table-item-value">
              </div>
            </div>
          </div>
          <div v-for="(res, index) in item.responsibilityVos" :key="res.id">
            <div class="detail-table-item">
              <div class="detail-table-item-left">
                <div class="detail-table-item-label">
                  责任{{ index + 1 }}名称
                </div>
                <div class="detail-table-item-value">
                  {{ res.responsibilityName }}
                </div>
              </div>
              <div class="detail-table-item-right">
                <div class="detail-table-item-label">
                  保额
                </div>
                <div class="detail-table-item-value">
                  {{ res.insuredAmount }}
                </div>
              </div>
            </div>
            <div class="detail-table-item">
              <div class="detail-table-item-left">
                <div class="detail-table-item-label">
                  属性
                </div>
                <div class="detail-table-item-value">
                  {{ res.responsibilityType }}
                </div>
              </div>
              <div class="detail-table-item-right">
                <div class="detail-table-item-label">
                  给付条件
                </div>
                <div class="detail-table-item-value">
                  {{ res.conditions }}
                </div>
              </div>
            </div>
            <div class="detail-table-item">
              <div class="detail-table-item-left">
                <div class="detail-table-item-label">
                  服务
                </div>
                <div class="detail-table-item-value">
                  {{ item.serviceVos }}
                </div>
              </div>
              <div class="detail-table-item-right">
                <div class="detail-table-item-label">
                </div>
              <div class="detail-table-item-value">
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-table-title">投保规则</div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              投保人年龄
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsDeliveryRuleVo.suitAge }}
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              被保人年龄
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsDeliveryRuleVo.insuredAge }}
            </div>
          </div>
        </div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              被保人职业
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsDeliveryRuleVo.position }}
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              区域
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsDeliveryRuleVo.salesScope }}
            </div>
          </div>
        </div>

        <div class="detail-table-title">理赔规则</div>
        <div class="detail-table-item">
          <div class="detail-table-item-left">
            <div class="detail-table-item-label">
              是否需要审核
            </div>
            <div class="detail-table-item-value">
              <el-select v-model="needAudit">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </div>
          </div>
          <div class="detail-table-item-right">
            <div class="detail-table-item-label">
              审核时间
            </div>
            <div class="detail-table-item-value">
              {{ insuranceProductsIndemnityRuleVo.claimTime }}
            </div>
          </div>
        </div>
           </div>
        <div class="page-footer">
          <el-button plain @click.native.prevent="$router.go(-1)"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="editLoading"
            @click.native.prevent="save"
          >
            保存
          </el-button>
        </div>
      </div>
      <div v-else>
        <Logs :id="id" :type="'118'"  />
      </div>
    </el-main>
  </el-container>
</template>
<script>
import {
  getInsuranceProductDetail,
  updateInsuranceProduct
} from '@/api/insuranceProducts';
export default {
  name: 'InsuranceProductLibraryDetail',
  data() {
    return {
      id: '',
      activeName: '0',
      editLoading: false,
      insuranceProductsDeliveryRuleVo: {},
      insuranceProductsIndemnityRuleVo: {},
      insuranceProductsInfoVo: {},
      plansVos: [],
      dataSource: '',
      needAudit: '',
      dataSourceOptions: [],
      tabs: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ]
    };
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getDetail(this.id);
    }
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'dataSource'
      })
      .then(res => {
        this.dataSourceOptions = res.data;
      });
  },
  methods: {
    getDetail(id) {
      getInsuranceProductDetail(id).then(res => {
        this.insuranceProductsDeliveryRuleVo =
          res.data.insuranceProductsDeliveryRuleVo || {};
        this.insuranceProductsIndemnityRuleVo =
          res.data.insuranceProductsIndemnityRuleVo || {};
        this.insuranceProductsInfoVo = res.data.insuranceProductsInfoVo || {};
        this.dataSource = res.data.insuranceProductsInfoVo.dataSource;
        this.needAudit = res.data.insuranceProductsIndemnityRuleVo.needAudit;
        this.plansVos = res.data.plansVos || {};
      });
    },
    handleClick(value) {
      this.activeName = value;
    },
    save() {
      this.editLoading = true;
      if (!this.dataSource) {
        this.$message.warning('请选择来源');
        this.editLoading = false;
        return;
      }
      if (this.needAudit === '') {
        this.$message.warning('请选择是否需要审核');
        this.editLoading = false;
        return;
      }
      const params = {
        id: this.id,
        dataSource: this.dataSource,
        needAudit: this.needAudit
      };
      updateInsuranceProduct(params)
        .then(res => {
          this.editLoading = false;
          this.$message.success(res.message);
          this.$router.go(-1);
        })
        .catch(() => {
          this.editLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.basic-info {
      padding-bottom: 50px;
      .basicDetail-table {
        width: 100%;
        background: #ffffff;
        box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
        border-radius: 4px;
        margin:  auto 0;
      }
}
</style>
