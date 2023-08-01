<template>
    <el-tooltip :content="content" placement="bottom" effect="light">
        <div :class="tipClassName"/>
    </el-tooltip>
</template>

<script>
    export default {
        name: 'HoverTip',
        props: {
            content: {
                type: String,
                default: ''
            },
            tipClassName: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
