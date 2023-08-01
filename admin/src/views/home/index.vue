<template>
    <div class="home-page">
        <el-container>
            <el-main>
                <div class="home">
                    <div class="title">欢迎使用森罗树健康管理平台！</div>
                    <div class="home-img"/>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: 'Home',
        data() {
            return {

            };
        }
    };
</script>
<style lang="scss" scoped>
    .home-page{
        position: relative;
        .home{
            width: 407px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .title{
                height: 33px;
                margin-bottom: 47px;
                font-size:24px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(44,46,58,1);
                line-height:33px;
                text-align: center;
            }
            .home-img{
                width: 407px;
                height: 340px;
                background-image: url('../../assets/home.png');
                background-size: 100% 100%;
                margin: 0 auto;
            }
        }
    }
</style>
