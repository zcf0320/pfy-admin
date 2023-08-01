<template>
    <el-container>
        <el-scrollbar
            :native="false"
            wrap-class="el-main relative"
            tag="main"
            :noresize="false"
        >
            <div class="bg-white w-full">
                <img
                    width="1000px"
                    :src="img"
                    alt=""
                >
            </div>
        </el-scrollbar>
    </el-container>

</template>

<script>
export default {
    name: '',
    data() {
        return {
            img: require('@/assets/previewInstructions.png')
        };
    },
    computed: {},
    created() {},
    methods: {}
};
</script>

<style scoped lang="scss">
</style>
