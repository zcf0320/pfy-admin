<template>
  <div class="guarantee-power-details page-form modal-form">
    <el-container>
      <el-main class="flex-col">
        <Tab :btns="btns" @change="handleClick" />
        <div class="scroll-table">
          <div v-show="tabIndex === '0'">
            <BaseForm
              :id="id"
              :base-form="form.baseForm"
              :post-status="postStatus"
            />
          </div>
          <div v-show="tabIndex === '1'">
            <InsuredAmountSet
              :id="id"
              :dtos="form.dtos"
              :post-status="postStatus"
            />
          </div>
          <div v-show="tabIndex === '2'">
            <RateTable
              v-if="tabIndex === '2'"
              :id="id"
              :rate-table="form.rateTable"
              :post-status="postStatus"
            />
          </div>
          <div v-show="tabIndex === '3'">
            <RiskFactors
              :id="id"
              :base-form="form.calculatingFactor"
              :post-status="postStatus"
            />
          </div>
          <div v-if="tabIndex === '4'">
            <Logs :id="id" :type="'21'" :has-o-a-log="true" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import BaseForm from './component/baseForm/index';
import InsuredAmountSet from './component/insuredAmount/index';
import RateTable from './component/rate/rateTable';
import RiskFactors from './component/riskFactors';
import { operationType } from '@/utils/enum';
export default {
  name: 'GuaranteePowerDetails',
  components: {
    BaseForm,
    InsuredAmountSet,
    RateTable,
    RiskFactors
  },
  data() {
    return {
      activeName: '1',
      tabIndex: '0',
      form: {
        baseForm: {
          insuranceType: [],
          name: '',
          mainDeputy: '',
          guaranteeDetails: ''
        },
        dtos: [
          {
            price: -1,
            priceUnit: -1,
            realPrice: 0
          }
        ],
        calculatingFactor: {
          channelFactor: 1,
          industryFactor: 1,
          insuredNumber: 1,
          insuredRiskFactor: 1,
          manageRiskFactor: 1,
          preferentialFactor: 1,
          saleAreaFactor: 1
        },
        rateTable: []
      },
      id: '',
      postStatus: 107,
      operationType,
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '保额设置' },
        { value: '2', name: '费率表' },
        { value: '3', name: '测算因子' },
        { value: '4', name: '操作日志' }
      ]
    };
  },
  computed: {
    jobOptions() {
      return this.$store.state.guaranteePower.jobOptions;
    },
    sexOptions() {
      return this.$store.state.guaranteePower.sexOptions;
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getProtectRightDetail(this.id);
  },
  methods: {
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.tabIndex = tab;
    },
    // 查询保障责任详情
    getProtectRightDetail(id) {
      this.$store
        .dispatch('guaranteePower/getProtectRightDetail', {
          id
        })
        .then(res => {
          if (!res.code) {
            this.form = {
              ...res.obj,
              baseForm: {
                ...res.obj
              }
            };
            // 费率表表头name回显
            this.form.rateTable.forEach(rate => {
              rate.rateTable.forEach(item => {
                if (item.key === 'age') {
                  item.name = item.row;
                } else if (item.key === 'sex') {
                  item.name = this.sexOptions[item.row];
                } else if (item.key === 'job') {
                  item.name = this.jobOptions[item.row];
                }
                if (item.child.length) {
                  item.child.forEach(child => {
                    if (child.key === 'age') {
                      child.name = child.column;
                    } else if (child.key === 'sex') {
                      child.name = this.sexOptions[child.column];
                    } else if (child.key === 'job') {
                      child.name = this.jobOptions[child.column];
                    }
                  });
                }
              });
            });
            this.postStatus = res.obj.postStatus;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
