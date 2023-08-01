<template>
  <div class="insured-amount page-form modal-form">
    <div class="title-top content-detail">
      保额信息<button
        type="button"
        class="btn-save fr"
        :disabled="!!id && postStatus !== 107"
        @click="toggleModal"
      >
        新增
      </button>
    </div>
    <div class="table">
      <el-table :data="dtos">
        <el-table-column label="累计保额">
          <template slot-scope="scope">
            <span v-if="scope.row.priceUnit !== -1">{{
              `${scope.row.price}${realPriceText[scope.row.priceUnit]}`
            }}</span>
            <span v-else>不投保</span>
          </template>
        </el-table-column>
        <el-table-column label="金额（元）">
          <template slot-scope="scope">
            <span>{{ scope.row.realPrice || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-popconfirm
              title="删除后将不可恢复，是否删除？"
              placement="top"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirm-button-type="plain"
              cancel-button-type="primary"
              :hide-icon="true"
              @onConfirm="deleteInsuredAmount(scope)"
            >
              <HoverTip
                v-show="scope.row.priceUnit !== -1 && postStatus === 107"
                slot="reference"
                content="删除"
                tip-class-name="icon-delete"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
        <div slot="empty" class="empty-img" />
      </el-table>
    </div>
    <div v-if="!id" class="footer">
      <el-button @click.native.prevent="back">上一步</el-button>
      <el-button type="primary" @click.native.prevent="next('baseForm')"
        >下一步</el-button
      >
    </div>
    <div v-else class="page-footer">
      <el-button
        v-if="postStatus === 107"
        type="primary"
        @click.native.prevent="save('baseForm')"
        >保存</el-button
      >
      <!-- 状态改变组件 -->
      <Footer :id="id" :post-status="postStatus" />
    </div>
    <InsuredAmountModal
      v-if="isShow"
      :is-show="isShow"
      @close="toggleModal"
      @sure="sureInsuredAmount"
    />
  </div>
</template>
<script>
import InsuredAmountModal from './insuredAmountSetModal';
import { realPriceText } from './config';
import Footer from '../footer';
export default {
  name: 'InsuredAmountSet',
  components: {
    InsuredAmountModal,
    Footer
  },
  props: {
    dtos: {
      type: Array,
      default: () => {
        return [];
      }
    },
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    }
  },
  data() {
    return {
      isShow: false,
      type: true,
      realPriceText
    };
  },
  created() {
    this.$route.params.id ? (this.type = false) : (this.type = true);
  },
  methods: {
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 0
      });
    },
    // 下一步
    next() {
      this.$emit('next', {
        activeIndex: 2
      });
    },
    // 保额新增弹框切换显示
    toggleModal() {
      this.isShow = !this.isShow;
    },
    // 确认新增费率
    sureInsuredAmount(item) {
      // 判断金额是否重复
      for (let i = 0; i < this.dtos.length; i++) {
        if (this.dtos[i].realPrice === item.realPrice) {
          this.$message.warning('保额重复');
          return;
        }
      }
      this.dtos.push(item);
      // 保额从小到大排序
      this.dtos.sort((a, b) => a.realPrice - b.realPrice);
      this.toggleModal();
    },
    // 删除
    deleteInsuredAmount(item) {
      this.dtos.splice(item.$index, 1);
    },
    // 保存
    save() {
      this.$store
        .dispatch('guaranteePower/updatePriceSetting', {
          dtos: this.dtos,
          id: this.id
        })
        .then(res => {
          if (!res.code) {
            this.$message.success('更新保额设置成功');
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.insured-amount {
  .add-insured-amount {
    margin-bottom: 10px;
  }
  .table {
    margin-bottom: 10px;
  }
}
</style>
