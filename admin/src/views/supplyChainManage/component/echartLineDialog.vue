<template>
  <Dialog
    title="保险产品量"
    :visible.sync="dialogVisible"
    :height="1000"
    :width="920"
    @closed="
      val => {
        dialogVisible = false;
      }
    "
  >
    <div class="pd-10">
      <div class="flex-between">
        <div/>
        <div>
          <span>时间：</span>
          <el-date-picker
            v-model="year"
            :clearable="false"
            class="w-100"
            type="year"
            placeholder="选择年"
            @change="getData"
          />
        </div>
      </div>
      <div v-if="dialogVisible" class="flex-center">
        <EchartsLine
          :id="'inventory'"
          :data="dataLine"
          :type="'line'"
          :height="300"
          :width="850"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </Dialog>
</template>
<script>
export default {
  name: 'echartLineDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: { type: String, default: '' },
    type: { type: Number, default: 0 }
  },
  data() {
    return {
      year: new Date(),
      dialogVisible: false,
      dataType: {
        1: '保险公司量',
        2: '保险产品量',
        3: '保单量',
        4: '累计使用量',
        5: '使用人数',
        6: '平均使用率'
      },
      dataLine: {
        legendData: ['保险产品量'],
        color: ['#6EB5FF'],
        xAxisData: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        series: [
          {
            name: '保险产品量',
            lineStyle: {
              color: '#6EB5FF'
            },
            areaStyle: {
              color: '#DFEFFF'
            },
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 200]
          }
        ]
      }
    };
  },
  computed: {},
  watch: {
    visible: {
      async handler(val) {
        if (val) {
          this.dialogVisible = val;
          this.getData();
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
  mounted() {},
  methods: {
    async getData() {
      if (this.$isEmpty(this.year)) {
        return false;
      }
      const year = this.year.getFullYear();
      const data = {
        year,
        type: this.type,
        service_info_id: this.id
      };
      const res = await this.$store.dispatch(
        'inventory/getItemStatistics',
        data
      );
      if (res) {
        const data = this.$extends(true, {}, this.dataLine);
        data.legendData = [this.dataType[this.type]];
        data.series[0].data = res.data;
        data.series[0].name = this.dataType[this.type];
        this.dataLine = data;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
