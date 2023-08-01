<template>
  <Dialog
    :visible.sync="dialog.visible"
    title="选择问卷模板"
    :width="933"
    :height="733"
    @closed="dialog.visible = false"
  >
    <div>
      <el-radio-group v-model="selectId">
        <div v-for="item in tplList" :key="item.id" class="mb-24 mt-6">
          <el-radio :label="item.id">{{ item.name }}</el-radio>
        </div>
      </el-radio-group>
      <div class="flex-box">
        <el-button
type="primary"
class="mr-24"
@click="add()"
>新增模板</el-button>
        <div class="fc-blue pointer" @click="list()">刷新</div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button
        :disabled="$isEmpty(selectId)"
        type="primary"
        @click="saveForm()"
        >确 定</el-button>
    </div>
  </Dialog>
</template>

<script>
export default {
  name: 'selectHealthQue',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectId: null,
      tplList: []
    };
  },
  computed: {},
  watch: {
    visible: {
      handler: function(val) {
        if (val) {
          this.list();
          this.selectId = this.id || null;
        }
        this.dialog.visible = val;
      }
    },
    'dialog.visible': {
      handler(val) {
        if (!val) {
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {},
  methods: {
    // 获取列表
    list: function() {
      const query = {
        pageSize: 9999,
        pageNum: 1,
        status: 0
      };
      this.$store.dispatch('supplier/healthQuesList', query).then(res => {
        this.tplList = res.records || [];
      });
    },
    saveForm() {
      this.$emit('saved', this.selectId);
      this.dialog.visible = false;
    },
    // 添加问题
    add() {
      const { href } = this.$router.resolve({
        path: `/insuranceRecord/questionnaire/questAdd`,
        query: { id: -1 }
      });
      window.open(href, '_blank');
    }
  }
};
</script>

<style scoped lang="scss"></style>
