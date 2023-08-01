<template>
    <el-container>
        <el-main class="no-padding">
            <div class="fc-black fs-18 mb-24">{{ productObj.name }}（{{ productObj.orderNumber }}）</div>
            <el-scrollbar
                :native="false"
                tag="div"
                :noresize="false"
            >
                <div
                    :style="{height:clientHeight-200 +'px'}"
                    class="bg-white pd-24"
                >
                    <div class="title-line mb-24">{{ filter.serviceItemName }}赔付详情</div>
                    <el-table
                        :data="dataList"
                        class="table-large"
                    >
                        <el-table-column label="药品名称">
                            <template slot-scope="{row}">
                                <span>{{ row.name || "-" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="药品规格/厂家">
                            <template slot-scope="{row}">
                                <span>{{ row.standard ||"-" }} / {{ row.manufacturer || "-" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="赔付次数/占比">
                            <template slot-scope="{row}">
                                <span>{{ row.payForCount ||"-" }} / {{ row.payForRate || "-" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="赔付数量">
                            <template slot-scope="{row}">
                                <span>{{ row.payForNum || "-" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="药品总金额">
                            <template slot-scope="{row}">
                                <span>{{ row.medicinePriceTotal || "-" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="运费">
                            <template slot-scope="{row}">
                                <span>{{ row.postage }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="赔付总金额">
                            <template slot-scope="{row}">
                                <span>{{ row.totalMoney || "-" }}</span>
                            </template>
                        </el-table-column>

                        <div
                            slot="empty"
                            class="empty-img"
                        />
                    </el-table>

                </div>

            </el-scrollbar>

        </el-main>
    </el-container>

</template>

<script>
export default {
    name: 'claimMedicineDetail',
    data() {
        return {
            dataList: [],
            productObj: {
                name: '',
                orderNumber: ''
            },

            filter: {}
        };
    },
    computed: {},
    created() {
        this.filter = this.$extends({}, this.$route.query);
        this.initData();
    },
    methods: {
        // 初始化保险产品数据
        initData() {
            this.$store
                .dispatch('insuranceProducts/getInsuranceShort', {
                    id: this.filter.productId
                })
                .then(res => {
                    this.$copyProps(this.productObj, res.data);
                    this.getData();
                });
        },
        // 获取药品明细
        getData() {
            this.$store
                .dispatch('insuranceProducts/getInsuranceClaimMedicine', {
                    endDate: Number(this.filter.filterTime[1]),
                    startDate: Number(this.filter.filterTime[0]),
                    insuranceProductPlanId: this.filter.insuranceProductPlanId,
                    serviceItemId: this.filter.serviceItemId
                })
                .then(res => {
                    this.dataList = res.data || [];
                });
        }
    }
};
</script>

<style scoped lang="scss">
</style>
