<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    created() {
    },
    methods: {

    }
};
</script>
<style lang="scss">
.notice-content {
    width: 336px;
    padding: 16px;
    h2 {
        color: #464668;
    }
    p {
        color: #989ab3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    .notice-icon {
        background: url("./assets/notice-icon.png") no-repeat;
        background-size: 100%;
    }
    .el-notification__group {
        width: 238px;
    }
}
</style>
