<template>
    <div class="footer">
        <el-button
            v-if="postStatus === 107"
            type="primary"
            class="ml-20"
            @click.native.prevent="publishProduct(105)"
        >发布</el-button>
        <!-- 已发布 -->
        <el-button
            v-if="postStatus === 105"
            type="danger"
            class="ml-20"
            @click.native.prevent="downShelfProduct(106)"
        >下架</el-button>
        <!-- 已下架 -->
        <el-button
            v-if="postStatus === 106"
            type="primary"
            class="ml-20"
            @click.native.prevent="publishProduct(105)"
        >上架</el-button>
        <el-button
            v-if="postStatus === 106 || postStatus === 108"
            type="danger"
            class="ml-20"
            @click.native.prevent="updateShield"
        >{{ shield === 184 ? '屏蔽链接' : '不屏蔽链接' }}</el-button>
    </div>
</template>
<script>
export default {
    name: 'Footer',
    props: {
        id: {
            type: String,
            default: ''
        },
        postStatus: {
            type: Number,
            default: 107
        },
        shield: {
            type: Number,
            default: 184
        }
    },
    data() {
        return {};
    },
    methods: {
        // 发布
        publishProduct(status) {
            this.$store
                .dispatch('insuranceProducts/publishProduct', {
                    id: this.id,
                    postStatus: status
                })
                .then(res => {
                    if (!res.code) {
                        this.$message.success(res.comment);
                        this.$router.push('/insuranceManage/insuranceProducts');
                    }
                });
        },
        // 下架
        downShelfProduct(status) {
            this.$store
                .dispatch('insuranceProducts/downShelfProduct', {
                    id: this.id,
                    postStatus: status
                })
                .then(res => {
                    if (!res.code) {
                        this.$message.success(res.comment);
                        this.$router.push('/insuranceManage/insuranceProducts');
                    }
                });
        },
        // 屏蔽链接
        updateShield() {
            if (this.shield !== 184) {
                this.$store
                    .dispatch('insuranceProducts/unShield', {
                        id: this.id,
                        shield: 184
                    })
                    .then(res => {
                        if (!res.code) {
                            this.$message.success(res.comment);
                            this.$router.push(
                                '/insuranceManage/insuranceProducts'
                            );
                        }
                    });
                return;
            }
            this.$store
                .dispatch('insuranceProducts/shield', {
                    id: this.id,
                    shield: 108
                })
                .then(res => {
                    if (!res.code) {
                        this.$message.success(res.comment);
                        this.$router.push('/insuranceManage/insuranceProducts');
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.footer {
    display: inline-block;
}
</style>
