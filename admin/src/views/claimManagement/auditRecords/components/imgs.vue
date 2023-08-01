<template>
    <div class="imgsBox">
        <div
            v-if="$isNotEmpty(urls)"
            class="flex-wrap"
        >
            <div
                v-for="(item,index) in urls"
                :key="index"
                class="img-item"
            >
                <el-image
                    :src="item"
                    :preview-src-list="urls"
                />
                <div class="icon-status icon-success"/>
            </div>
        </div>
        <div
            v-else
            class="flex-wrap"
        >
            <div class="img-item">
                <img
                    src="@/assets/no-img.png"
                    alt=""
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'imgList',
    props: {
        urls: {
            type: Array,
            required: true
        }
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {
        // 图片预览
        openWindow(item) {
            window.open(item);
        }
    }
};
</script>

<style scoped lang="scss">
.imgsBox {
    .img-item {
        width: 100px;
        height: 100px;
        margin: 0px 30px 30px 0px;
        position: relative;
        .icon-status {
            position: absolute;
            right: -9px;
            top: -9px;
            height: 18px;
            width: 18px;
        }
        img {
            width: 100%;
            height: 100%;
            display: inline-block;
        }
        .el-image {
            width: 100px;
            height: 100px;
        }
    }
}
</style>
