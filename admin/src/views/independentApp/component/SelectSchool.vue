<template>
  <el-select
    v-model="schoolName"
    :filterable="filterable"
    :placeholder="placeholder"
    clearable
    @change="change"
  >
    <el-option
      v-for="item in schoolList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import { default as api } from '@/api/YouthHealthRecord';
export default {
  name: 'SelectSchool',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      schoolName: this.value,
      schoolList: []
    };
  },
  watch: {
    /**
     * 监视v-model值，如果来源有变化需要在这里刷新
     * @param val
     */
    value(val) {
      if (val === this.schoolName) {
        return;
      }
      this.schoolName = val;
    }
  },
  created() {
    this.getSchoolList();
  },

  methods: {
    getSchoolList() {
      api.getSchoolList().then(res => {
        this.schoolList = res.data;
      });
    },
    change(value) {
      this.$emit('change', value);
    }
  }
};
</script>
