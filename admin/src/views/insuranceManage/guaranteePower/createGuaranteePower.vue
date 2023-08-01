<template>
    <div class="create-guarantee-power-page page-form modal-form">
        <el-container>
            <el-main class="flex-col">
                <div class="step">
                    <el-steps
                        :active="activeIndex"
                        align-center
                        finish-status="success"
                    >
                        <el-step title="录入基本资料"/>
                        <el-step title="设置保额"/>
                        <el-step title="录入费率表"/>
                        <el-step title="确认风险因子"/>
                        <el-step title="完成"/>
                    </el-steps>
                </div>
                <div class="step-content  scroll-table">
                    <BaseForm
                        v-show="activeIndex === 0"
                        :base-form="form.baseForm"
                        :post-status="postStatus"
                        @next="nextStep"
                        @back="backStep"
                    />
                    <InsuredAmountSet
                        v-show="activeIndex === 1"
                        :dtos="form.dtos"
                        :post-status="postStatus"
                        @next="nextStep"
                        @back="backStep"
                    />
                    <RateTable
                        v-show="activeIndex === 2"
                        :rate-table="form.rateTable"
                        :post-status="postStatus"
                        @next="nextStep"
                        @back="backStep"
                    />
                    <RiskFactors
                        v-show="activeIndex === 3"
                        :base-form="form.calculatingFactor"
                        :post-status="postStatus"
                        @next="nextStep"
                        @back="backStep"
                    />
                    <Result
                        v-if="activeIndex === 4 && id"
                        :id="id"
                        @next="nextStep"
                        @back="backStep"
                    />
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
import Result from './component/result';
export default {
    name: 'CreateGuaranteePower',
    components: {
        BaseForm,
        InsuredAmountSet,
        RateTable,
        RiskFactors,
        Result
    },
    data() {
        return {
            activeIndex: 0,
            form: {
                baseForm: {
                    insuranceType: [],
                    name: '',
                    mainDeputy: '',
                    guaranteeDetails: '',
                    paymentConditionLimit: '',
                    paymentConditionExclusion: '',
                    payLogics: [
                        {
                            deductible: null,
                            payoutAmount: null,
                            payoutRatio: null,
                            settlementMedicalInsuranceType: null,
                            settlementType: null,
                            payoutAmountUnit: 1
                        }
                    ],
                    renewalYearLimit: null,
                    renewalAgeLimit: null
                },
                dtos: [
                    {
                        price: -1,
                        priceUnit: -1,
                        singlePrice: -1,
                        singlePriceUnit: -1
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
            postStatus: 107
        };
    },
    computed: {},
    created() {},
    methods: {
        // 下一步
        async nextStep(item) {
            const { activeIndex, data } = item;
            if (activeIndex === 3) {
                this.form.rateTable = data;
            } else if (activeIndex === 4) {
                await this.$store
                    .dispatch('guaranteePower/createProtectRight', {
                        ...this.form.baseForm,
                        ...this.form
                    })
                    .then(res => {
                        this.activeIndex = 5;
                        this.id = res.obj;
                    });
            }
            this.activeIndex = activeIndex;
        },
        // 上一步
        backStep(item) {
            const { activeIndex } = item;
            this.activeIndex = activeIndex;
        }
    }
};
</script>
<style lang="scss" scoped>
.create-guarantee-power-page {
    .step {
        padding: 10px 0 20px;
        border-bottom: 1px solid #ebebeb;
    }
    .step-content {
        padding: 20px 0px;
    }
}
</style>
