<template>
    <div class="result-page">
        <div class="success-img"/>
        <div class="tips">保障责任新增成功</div>
        <el-button type="primary" @click="lookDetails">前往权益详情页</el-button>
    </div>
</template>
<script>
export default {
    name: 'Result',
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        };
    },
    methods: {
        // 权益详情
        lookDetails() {
            this.$router.push(`/insuranceManage/guaranteePower/guaranteePowerDetails/${this.id}`);
        }
    }
};
</script>
<style lang="scss" scoped>
    .result-page{
        text-align: center;
        padding-top: 100px;
        .success-img{
            width: 387px;
            height: 297px;
            background-image: url('../../../../../assets/guarantee_power_success.png');
            background-size: 100% 100%;
            margin: 0 auto 32px;
        }
        .tips{
            color: #333333;
            font-size: 24px;
            margin-bottom: 32px;
            font-weight: 500;
        }
    }
</style>
