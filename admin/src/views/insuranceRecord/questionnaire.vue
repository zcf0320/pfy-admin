<template>
  <div class="questionnaire">
    <el-container>
      <el-main class="flex-col">
        <Tab :btns="btns" @change="handleClick"/>
        <QuesList v-if="activeName === '0'" />
        <Setting v-if="activeName === '1'" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Setting from './component/setting';
import QuesList from './component/quesList';
export default {
  name: 'Questionnaire',
  components: { Setting, QuesList },
  data() {
    return {
      btns: [
        { value: '0', name: '健康问卷列表' },
        { value: '1', name: '选项设置' }
      ],
      activeName: '0'
    };
  },
  created() {

  },
  methods: {
    // tab切换
    handleClick(tab) {
      this.activeName = tab;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
