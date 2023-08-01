<template>
    <div class="leaving-message-info"
    v-if="respList.length"
    >
        <el-collapse
                 v-for="(item,index) in respList"
                 :key="`时间${index}`"
                v-model="activeNames"
                 accordion
                 >
                 <el-collapse-item
                 :name="index"
                 :title="`${$moment(item.useTime).format('YYYY-MM-DD HH:mm:ss')}`"
                 >
                 <div class="detail-table-title">甲状腺功能</div>
                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">血清甲状腺素</div>
                      <div class="detail-item-value">
                         {{ item.thyroidInfo.serumThyroxine === null ? '-' : item.thyroidInfo.serumThyroxine}}
                        {{ item.resultInfo.serumThyroxineResult | thyroidFormat}}
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label">血清游离甲状腺素</div>
                      <div class="detail-item-value">
                           {{item.thyroidInfo.serumFreeThyroxine === null ? '-' : item.thyroidInfo.serumFreeThyroxine}}
                        {{ item.resultInfo.serumFreeThyroxineResult | thyroidFormat}}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">促甲状腺激素</div>
                      <div class="detail-item-value">
                         {{item.thyroidInfo.stimulatingHormone === null ? '-' : item.thyroidInfo.stimulatingHormone}}
                        {{item.resultInfo.stimulatingHormoneResult | thyroidFormat}}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">促甲状腺受体抗体</div>
                      <div class="detail-item-value">
                        {{item.thyroidInfo.receptorAntibody === null ? '-' : item.thyroidInfo.receptorAntibody}}
                         {{item.resultInfo.receptorAntibodyResult | thyroidFormat}}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">血清三碘甲状腺原氨酸</div>
                      <div class="detail-item-value">
                         {{item.thyroidInfo.serumTriiodothyronine === null ? '-' : item.thyroidInfo.serumTriiodothyronine}}
                        {{item.resultInfo.serumTriiodothyronineResult | thyroidFormat}}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">游离三碘甲状腺原氨酸</div>
                      <div class="detail-item-value">
                         {{'-'}}
                      </div>
                    </div>
                     <div class="detail-item">
                      <div class="detail-item-label">抗甲状腺球蛋白抗体</div>
                      <div class="detail-item-value">
                        <!-- {{item.thyroidInfo.globulinAntibody === null ? '-' : item.thyroidInfo.globulinAntibody}} -->
                       {{item.resultInfo.globulinAntibodyResult === 1 ? "阴性"
                       :item.resultInfo.globulinAntibodyResult === 2 ? "阳性":'-'
                       }}
                      </div>
                    </div>
                     <div class="detail-item">
                      <div class="detail-item-label">甲状腺刺激抗体</div>
                      <div class="detail-item-value">
                          <!-- {{item.thyroidInfo.stimulatingAntibody === null ? '-' : item.thyroidInfo.stimulatingAntibody}} -->
                         {{item.resultInfo.stimulatingAntibodyResult === 1 ? "阴性"
                       :item.resultInfo.stimulatingAntibodyResult === 2 ? "阳性":'-'}}
                      </div>
                    </div>
                  </div>
                  <div class="detail-table-title">血脂</div>
                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">总胆固醇</div>
                      <div class="detail-item-value">
                         {{item.thyroidInfo.totalCholesterol === null ? '-' : item.thyroidInfo.totalCholesterol}}
                        {{item.resultInfo.totalCholesterolResult | thyroidFormat}}
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label">甘油三酯</div>
                      <div class="detail-item-value">
                         {{item.thyroidInfo.triglyceride === null ? '-' : item.thyroidInfo.triglyceride}}
                        {{ item.resultInfo.triglycerideResult | thyroidFormat}}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">高密度脂蛋白胆固醇</div>
                      <div class="detail-item-value">
                          {{item.thyroidInfo.highLipCholesterol === null ? '-' : item.thyroidInfo.highLipCholesterol}}
                        {{item.resultInfo.highLipCholesterolResult | thyroidFormat}}
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-item-label">低密度脂蛋白胆固醇</div>
                      <div class="detail-item-value">
                         {{item.thyroidInfo.lowLipCholesterol === null ? '-' : item.thyroidInfo.lowLipCholesterol}}
                        {{item.resultInfo.lowLipCholesterolResult | thyroidFormat}}
                      </div>
                    </div>
                  </div>
                   <div class="detail-table-title">甲状腺结节</div>
                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">等级</div>
                      <div class="detail-item-value">
                        {{item.resultInfo.noduleGrade == ''? '-':item.resultInfo.noduleGrade
                        }}
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label"></div>
                      <div class="detail-item-value">
                      </div>
                    </div>
                  </div>
                     <div class="detail-table-title">化验单</div>
                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">化验单</div>
                      <div class="detail-item-value" >
                        <template v-if="item.resultInfo.urls.length">
                           <el-image
                              v-for="(v,i) in item.resultInfo.urls"
                              :key="i"
                              style="width: 100px; height: 100px"
                            :src="v"
                            :preview-src-list="item.resultInfo.urls">
                              <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                            </el-image>
                        </template>
                        <div v-else>{{'-'}}</div>
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label"></div>
                      <div class="detail-item-value">
                      </div>
                    </div>
                  </div>
                   <div class="detail-table-title">分析结论</div>
                  <div class="detail-item-box">
                    <div class="detail-item">
                      <div class="detail-item-label">化验单</div>
                      <div class="detail-item-value">
                        {{'-'}}
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-item-label"></div>
                      <div class="detail-item-value">
                      </div>
                    </div>
                  </div>
                 </el-collapse-item>
                 </el-collapse>
    </div>
    <div v-else slot="empty" class="empty-img" />
</template>
<script>
export default {
    name: 'Thyroid',
    props: {
        respList: {
        type: Array,
        default: () => {
            return [];
          }
      }
    },
    data() {
        return {
              activeNames: 0
            //  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            // srcList: [
            // 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            // 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            // ]
        };
    }
};
</script>
<style lang="scss" scoped>
  .leaving-message-info {
    width: 99%;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    .detail-item-box {
    width: 100%;
    min-height: 48px;
    height: 100%;
    display: flex;
    border: 1px solid #ebedf2;
    border-top: none;
    font-size: 14px;
    color: #545473;
    flex-flow: row wrap;
  .detail-item {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .detail-item-label {
      // flex: 1;
      // display: flex;
      // align-items: center;
      // min-height: 48px;
      // height: 100%;
      // font-weight: bold;
      // padding-left: 32px;
      border-right: 1px solid #ebedf2;
      border-bottom: 1px solid #ebedf2;
       display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 204px;
        font-weight: bold;
        padding-left: 32px;
    }
    .detail-item-value {
      display: flex;
      flex: 1;
      padding-left: 42px;
      align-items: center;
      color: #545473;
      min-height: 48px;
      height: 100%;
      border-right: 1px solid #ebedf2;
      border-bottom: 1px solid #ebedf2;
      text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
  }
}
/deep/ .el-collapse-item {
  .el-collapse-item__header {
    height: 48px;
    background: #f3f6f9;
    border: 1px solid #e8e8e8;
    border-top: none;
    width: 100%;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #545473;
    line-height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background: #3599fe;
      margin-right: 12px;
    }
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
/deep/ .el-image{
    height: 100%;
    background: #ebedf2;
}
/deep/ .el-image:nth-child(n+2){
    background: #ebedf2;
    margin-left: 10px;
}
/deep/ .image-slot{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
}
</style>
