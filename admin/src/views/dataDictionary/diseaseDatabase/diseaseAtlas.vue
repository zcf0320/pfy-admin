<template>
  <div class="diseaseAtlas">
    <el-container>
      <el-main class="spacing">
        <div class="diseaseAtlas-left">
          <div class="diseaseAtlas-left-top">
            <span class="left-top-left"
              >知识图谱：{{ diseaseInfo.diseaseName || '-' }}</span
            ><span
              >推荐药物：<span
                v-if="diseaseInfo.recommendMedicineNum"
                class="link-skip"
                @click="toBasisiDrug(diseaseInfo.diseaseName)"
                >{{ diseaseInfo.recommendMedicineNum || '-' }}种</span
              >
              <span v-else>暂无</span></span
            >
          </div>
          <div class="diseaseAtlas-left-bottom">
            <Charts :disease-name="diseaseName" />
          </div>
        </div>
        <div class="diseaseAtlas-right">
          <div class="diseaseAtlas-right-top">
            <div class="diseaseAtlas-title">
              常见病<span class="next" @click="nextCommonDiseases">换一批</span>
            </div>
            <div v-if="commonDiseases.list.length" class="diseaseItem">
              <span
                v-for="(item, index) in commonDiseases.list"
                :key="item.diseaseName"
                :class="item.checked ? 'active' : ''"
                @click="checkCommonDisease(index)"
                >{{ item.diseaseName }}</span
              >
            </div>
            <div v-else class="diseaseItem">
              <span>暂无数据</span>
            </div>
          </div>
          <div class="diseaseAtlas-right-top">
            <div class="diseaseAtlas-title">
              慢性病<span class="next" @click="nextChronic">换一批</span>
            </div>
            <div v-if="chronic.list.length" class="diseaseItem">
              <span
                v-for="(item, index) in chronic.list"
                :key="item.diseaseName"
                :class="item.checked ? 'active' : ''"
                @click="checkChronic(index)"
                >{{ item.diseaseName }}</span
              >
            </div>
            <div v-else class="diseaseItem">
              <span>暂无数据</span>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Charts from './charts';
import { mapActions } from 'vuex';
export default {
  name: 'DiseaseAtlas',
  components: { Charts },
  data() {
    return {
      commonDiseases: {
        list: []
      },
      chronic: {
        list: []
      },
      diseaseInfo: {},
      diseaseName: ''
    };
  },
  watch: {
    diseaseName(newValue) {
      this.getDiseaseInfo({ diseaseName: newValue }).then(res => {
        this.diseaseInfo = res.data;
      });
    }
  },
  created() {
    this.diseaseName = this.$route.query.name;
    const params = {
      pageNum: 1,
      pageSize: 20
    };
    this.getChronic(params).then(res => {
      res.data.list = this.setChecked(res.data.list);
      this.chronic = res.data;
    });
    this.getCommonDiseases(params).then(res => {
      res.data.list = this.setChecked(res.data.list);
      this.commonDiseases = res.data;
    });
    // this.getDiseaseInfo({ diseaseName: this.diseaseName }).then(res => {
    //   this.diseaseInfo = res.data;
    // })
  },
  methods: {
    ...mapActions('inquiryManage', [
      'getChronic',
      'getCommonDiseases',
      'getDiseaseAtlas',
      'getDiseaseInfo'
    ]),
    ...mapActions('drugManage', ['setDiseaseName']),
    toBasisiDrug(name) {
      this.setDiseaseName(name);
      this.$router.push('/dataDictionary/basisDrugs');
    },
    // 常见病换一批
    nextCommonDiseases() {
      if (this.commonDiseases.hasNextPage) {
        const params = {
          pageNum: this.commonDiseases.nextPage,
          pageSize: 20
        };
        this.getCommonDiseases(params).then(res => {
          res.data.list = this.setChecked(res.data.list);
          this.commonDiseases = res.data;
        });
      } else {
        const params = {
          pageNum: 1,
          pageSize: 20
        };
        this.getCommonDiseases(params).then(res => {
          res.data.list = this.setChecked(res.data.list);
          this.commonDiseases = res.data;
        });
      }
    },
    // 慢性病换一批
    nextChronic() {
      if (this.chronic.hasNextPage) {
        const params = {
          pageNum: this.chronic.nextPage,
          pageSize: 20
        };
        this.getChronic(params).then(res => {
          res.data.list = this.setChecked(res.data.list);
          this.chronic = res.data;
        });
      } else {
        const params = {
          pageNum: 1,
          pageSize: 20
        };
        this.getChronic(params).then(res => {
          res.data.list = this.setChecked(res.data.list);
          this.chronic = res.data;
        });
      }
    },
    // 切换常见病
    checkCommonDisease(index) {
      this.diseaseName = this.commonDiseases.list[index].diseaseName;
      this.commonDiseases.list.forEach(item => {
        this.$set(item, 'checked', false);
      });
      this.chronic.list.forEach(item => {
        this.$set(item, 'checked', false);
      });
      this.$set(this.commonDiseases.list[index], 'checked', true);
    },
    // 切换慢性病
    checkChronic(index) {
      this.diseaseName = this.chronic.list[index].diseaseName;
      this.chronic.list.forEach(item => {
        this.$set(item, 'checked', false);
      });
      this.commonDiseases.list.forEach(item => {
        this.$set(item, 'checked', false);
      });
      this.$set(this.chronic.list[index], 'checked', true);
    },
    // 添加选中状态
    setChecked(data) {
      data.forEach(element => {
        element.checked = false;
      });
      data.some(item => {
        if (item.diseaseName === this.diseaseName) {
          this.$set(item, 'checked', true);
          return true;
        } else {
          return false;
        }
      });
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.diseaseAtlas {
  .spacing {
    display: flex;
    justify-content: space-between;
    &::-webkit-scrollbar {
      display: none;
    }
    .diseaseAtlas-left {
      min-width: 769px;
      flex: 3;
      margin-right: 24px;
      .diseaseAtlas-left-top {
        height: 70px;
        background-color: #fff;
        margin-bottom: 24px;
        box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
        border-radius: 4px;
        font-size: 16px;

        font-weight: 400;
        color: #2b2c43;
        line-height: 70px;
        padding: 0 24px;
        .left-top-left {
          margin-right: 60px;
        }
      }
      .diseaseAtlas-left-bottom {
        background-color: #fff;
        box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
        border-radius: 4px;
      }
    }
    .diseaseAtlas-right {
      max-width: 284px;
      flex: 1;
      .diseaseAtlas-right-top {
        height: 392px;
        margin-bottom: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
        border-radius: 4px;
        padding: 24px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .diseaseAtlas-title {
          font-size: 18px;

          font-weight: bolder;
          color: #464668;
          line-height: 14px;
          margin-bottom: 24px;
          .next {
            color: #3599fe;
            font-weight: normal;
            float: right;
            font-size: 16px;
            cursor: pointer;
          }
        }
        .diseaseItem {
          font-size: 16px;

          font-weight: 400;
          color: #2b2c43;
          line-height: 16px;
          display: flex;
          flex-wrap: wrap;
          &:last-of-type {
            margin-bottom: 0;
          }
          span {
            display: block;
            margin-bottom: 16px;
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            &:nth-last-of-type(-n + 2) {
              margin-bottom: 0;
            }
            &.active {
              color: #3599fe;
              font-weight: bolder;
            }
          }
        }
      }
    }
  }
}
</style>
