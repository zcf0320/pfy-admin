<template>
  <Dialog
    title="用户"
    :visible.sync="dialogVisible"
    :height="300"
    :width="440"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div>
      <div class="flex-between mb-24">
        <div>姓名:</div>
        <el-select
          v-model="userId"
          class="w-300"
          filterable
          remote
          placeholder="请搜索用户"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="change"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span v-html="item.hightLable" />
            <span class="option-remark">{{ item.mobile }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="flex-between">
        <div>手机号:</div>
        <el-input
          v-model="mobile"
          class="w-300"
          disabled
          placeholder="手机号自动带入"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        :disabled="$isEmpty(checkData)"
        @click="saveForm()"
        >确 定</el-button>
    </span>
  </Dialog>
</template>

<script>
import { replaceHightKeyWord } from '@/utils/common';
export default {
  name: 'reviewDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      userId: null,
      mobile: '',
      userList: [],
      checkData: {}
    };
  },
  computed: {},
  watch: {
    visible: {
      async handler(val) {
        if (val) {
          this.dialogVisible = val;
          this.userId = null;
          this.mobile = '';
          this.checkData = {};
          this.userList = [];
        }
      }
    },
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.$emit('update:visible', false);
        }
      }
    }
  },
  created() {},
  methods: {
    remoteMethod(keyword) {
      this.loading = true;
      if (keyword !== '') {
        const params = {
          name: keyword,
          pageNum: 1,
          logoutFlag: 1
        };
        this.$store
          .dispatch('userManage/getUserList', params)
          .then(res => {
            this.loading = false;
            res.records.forEach(item => {
              item.hightLable = replaceHightKeyWord(keyword, item.name);
            });
            this.userList = res.records || [];
          })
          .catch(() => {
            this.searchLoading = false;
          });
      } else {
        this.loading = false;
        this.userList = [];
      }
    },
    change(val) {
      if (this.$isNotEmpty(val)) {
        const itemData = this.userList.find(item => item.id === val);
        this.checkData = this.$extends({}, itemData);
        this.mobile = itemData.mobile;
      }
    },
    saveForm() {
      this.$emit('saved', this.checkData);
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
