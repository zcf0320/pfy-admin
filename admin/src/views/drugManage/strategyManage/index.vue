<template>
    <el-container>
        <el-main class="flex-col">
            <Tab :btns="[{value: '0',name: '购买策略'}]"/>
            <div class="scroll-table">
                <el-form label-width="100px">
                    <div class="strategy-manage-page">
                            <div v-for="item in baseForm" :key="item.productPriceId" class="form-item">
                                <div class="form-title">
                                    <div class="title-top content-detail">{{ serviceType[item.productPriceId] }}</div>
                                </div>
                                <div class="content">
                                    <el-row :gutter="20">
                                        <el-col v-for="(child, index) in item.child" :key="index" :span="24">
                                            <el-form-item :label="serviceType[child.serviceInfoPriceId]">
                                                <el-input-number v-model="child.amount" :min="0" :max="99" placeholder="请输入权益名称"/>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                    </div>
                </el-form>
            </div>
            <div class="page-footer">
                <button type="button" class="btn-save" @click="save()">保存</button>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'StrategyManage',
    data() {
        return {
            baseForm: [{
                productPriceId: 1001,
                child: [
                    {
                        serviceInfoPriceId: 1001,
                        amount: 0
                    },
                    {
                        serviceInfoPriceId: 1002,
                        amount: 0
                    },
                    {
                        serviceInfoPriceId: 1003,
                        amount: 0
                    }
                ]
            }, {
                productPriceId: 1002,
                child: [
                    {
                        serviceInfoPriceId: 1002,
                        amount: 0
                    },
                    {
                        serviceInfoPriceId: 1003,
                        amount: 0
                    }
                ]
            }, {
                productPriceId: 1003,
                child: [
                    {
                        serviceInfoPriceId: 1003,
                        amount: 0
                    }
                ]
            }],
            serviceType: {
                1001: '30元以下商品',
                1002: '30-100商品',
                1003: '100元以上'
            }
        };
    },
    created() {
        this.getDetails();
    },
    methods: {
        ...mapActions('drugManage', [
            'updateStrategy',
            'getStrategy'
        ]),
        // 更新购买策略
        save() {
            this.updateStrategy({
                planReq: this.baseForm
            }).then(res => {
                if (!res.code) {
                    this.$message.success('更新成功');
                }
            });
        },
        // 查询购买策略
        getDetails() {
            this.getStrategy().then(res => {
                if (!res.code) {
                    this.baseForm = res.obj.planReq;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .strategy-manage-page{
        .page-title{
            padding: 0 0 19px;
            color: #333333;
            font-weight: 500;
            border-bottom: 1px solid rgba(204, 204, 204, 0.5);
        }
        .form-item{
            padding: 25px 0 10px;
            .form-title{
                width: 100%;
                height: 20px;
                display: flex;
                align-items: center;
                margin-bottom: 24px;
                font-size: 16px;
                .title{
                    flex: 1;
                    position: relative;
                    padding-left: 16px;
                    color: #333333;
                    &::before{
                        content: '';
                        width: 4px;
                        height: 16px;
                        position: absolute;
                        top: 0;
                        left: 4px;
                        background-color: #2276FF;
                    }
                }
                .expand{
                    width: 52px;
                    cursor: pointer;
                    color: #2276FF;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
