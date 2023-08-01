<template>
  <div class="hight-search">
    <el-dropdown trigger="click" @command="selectChange">
      <el-select
        v-model="value"
        :multiple="multiple"
        :filterable="filterable"
        placeholder="全部"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span v-html="item.hightLabel"/>
          <span class="option-remark">dada</span>
        </el-option>
      </el-select>
      <el-dropdown-menu slot="dropdown" class="hight-search-dropdown">
        <el-dropdown-item
          v-for="item in options"
          :key="item.value"
          :command="item.value"
        >
          <span v-html="item.label"/>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'HightSearch',
  props: {
    value: {
      type: String || Array,
      default() {
        return '' || [];
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [
        {
          value: '1',
          label: '黄金糕',
          hightLabel: '<span class="search-hight-keyword">黄金糕</span>1'
        },
        {
          value: '2',
          label: '双皮奶',
          hightLabel: '<span class="search-hight-keyword">双皮奶</span>1'
        },
        {
          value: '3',
          label: '蚵仔煎',
          hightLabel: '<span class="search-hight-keyword">蚵仔煎</span>1'
        },
        {
          value: '4',
          label: '龙须面',
          hightLabel: '<span class="search-hight-keyword">龙须面</span>1'
        },
        {
          value: '5',
          label: '北京烤鸭',
          hightLabel: '<span class="search-hight-keyword">北京烤鸭</span>1'
        }
      ]
    };
  },
  methods: {
    // 选择
    selectChange(key) {
      if (this.multiple) {
        const set = new Set([...this.value]);
        if (set.has(key)) {
          set.delete(key);
        } else {
          set.add(key);
        }
        this.changeValue([...set]);
      } else {
        this.changeValue(key);
      }
    },
    removeTag(key) {
      if (this.multiple) {
        const set = new Set([...this.value]);
        if (set.has(key)) {
          set.delete(key);
        }
        this.changeValue(...set);
      }
    },
    changeValue(value) {
      this.$emit('changeValue', value);
    }
    //
  }
};
</script>

<style lang="scss">
.hight-search {
  width: 100%;
  .el-dropdown {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .remark {
    float: right;
  }
}
// .el-select-dropdown{
//     opacity: 0;
// }
</style>
