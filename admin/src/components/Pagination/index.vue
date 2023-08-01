<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      layout="total, slot, prev, pager, next, jumper"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <span class="size">10条/页</span>
    </el-pagination>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to';
import { mapMutations } from 'vuex';
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      }
    },
    // 是否设置缓存
    setCache: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      }
    }
  },
  methods: {
    ...mapMutations('app', ['SET_PAGE_NUM']),
    handleSizeChange(val) {
      this.$emit('update:pageNo');
      this.$emit('pagination', { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit('update:pageNo');
      this.$emit('pagination', { page: val, limit: this.pageSize });
      if (this.setCache) {
        this.SET_PAGE_NUM(val);
      }
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  }
};
</script>

<style scoped>
.pagination-container {
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
}
.pagination-container.hidden {
  display: none;
}
</style>
