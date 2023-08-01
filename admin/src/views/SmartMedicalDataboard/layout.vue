<template>
    <div class="smart-layout">
        <div class="smart-layout-header">
            <Header
                start-date="2021-10-01"
                end-date="2022-01-31"
                title="智慧医疗数据看板"
            />
        </div>
        <div class="smart-layout-center"><center /></div>
        <div class="smart-layout-btm"><bottom /></div>
    </div>
</template>

<script>
import Bottom from './components/bottom.vue';
import Center from './components/center.vue';
import Header from './components/header.vue';
export default {
    name: 'smart-layout',
    components: {
        Header,
        Center,
        Bottom
    }
};
</script>

<style lang="scss" scoped>
.smart-layout {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 24px;
    &-header {
        width: 100%;
        height: 250px;
    }
    &-center {
        width: 100%;
        height: 451px;
    }
    &-btm {
        width: 100%;
        height: 714px;
    }
}
</style>
