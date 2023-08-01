<template>
  <div class="questionnaireManageDetail">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="btns"
            :btn-style="{ overflow: 'visible' }"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="activeName === '0'">
              <div class="tabChange">
                <div
                  :class="
                    activeIndex == 0
                      ? 'tabChange-item active'
                      : 'tabChange-item'
                  "
                  @click="activeIndex = 0"
                >
                  题目设置
                </div>
                <div
                  :class="
                    activeIndex == 1
                      ? 'tabChange-item active'
                      : 'tabChange-item'
                  "
                  @click="activeIndex = 1"
                >
                  个人信息设置
                </div>
                <div
                  :class="
                    activeIndex == 2
                      ? 'tabChange-item active'
                      : 'tabChange-item'
                  "
                  @click="activeIndex = 2"
                >
                  样式设置
                </div>
              </div>
              <SetTitle
                v-show="activeIndex === 0"
                ref="setTitle"
                :put-on-state="putOnState"
                :base-form="baseForm"
                :rule-form="ruleForm"
              />
              <SetPeopleInfo
                v-show="activeIndex === 1"
                ref="setPeopleInfo"
                :put-on-state="putOnState"
                :people-info="peopleInfo"
              />
              <SetStyle
                v-show="activeIndex === 2"
                ref="setStyle"
                :put-on-state="putOnState"
                :style-info="styleInfo"
              />
            </div>
            <div v-show="activeName === '1'">
              <div class="title-top content-detail">
                渠道列表<el-button
                  type="primary"
                  class="fr"
                  :disabled="!putOnState"
                  @click.native.prevent="addChannel"
                >
                  新增渠道
                </el-button>
              </div>
              <el-table
                v-loading="tableLoading"
                :data="channelList"
                class="table-large"
              >
                <el-table-column label="渠道">
                  <template slot-scope="scope">
                    <div class="mainText">
                      {{ scope.row.channelName || '-' }}
                    </div>
                    <span class="gray"
                      >ID：{{ scope.row.channelCode || '-' }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="渠道链接">
                  <template slot-scope="scope">
                    <div class="text-overflow url mainText">
                      {{ scope.row.channelUrl || '-' }}
                    </div>
                    <span
                      class="copyUrl"
                      @click="copyUrl($event, scope.row.channelUrl)"
                      >复制链接</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="营销海报">
                  <template slot-scope="scope">
                    <div v-if="scope.row.channelPoster" class="uploadImg">
                      <el-image
                        style="width: 56px; height: 56px"
                        :src="scope.row.channelPoster"
                        :preview-src-list="[scope.row.channelPoster]"
                      />
                      <el-upload
                        action=""
                        :show-file-list="false"
                        :http-request="changeImage"
                        :data="{ id: scope.row.id }"
                        :before-upload="beforeAvatarUpload"
                      >
                        <div class="hoveUpload">
                          替换
                        </div>
                      </el-upload>
                    </div>
                    <el-upload
                      v-else
                      action=""
                      :show-file-list="false"
                      :http-request="changeImage"
                      :data="{ id: scope.row.id }"
                      :before-upload="beforeAvatarUpload"
                    >
                      <div class="copyUrl">上传图片</div>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column label="二维码">
                  <template slot-scope="scope">
                    <div class="uploadImg">
                      <el-image
                        style="width: 56px; height: 56px"
                        :src="scope.row.channelQrCode"
                        :preview-src-list="[scope.row.channelQrCode]"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <span
                      :class="['label-text', labelState[scope.row.state]]"
                      >{{ scope.row.state ? '已禁用' : '已启用' || '-' }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="时间">
                  <template slot-scope="scope">
                    <div class="mainText url">
                      过期时间：{{
                        $moment(scope.row.expirationTime).format('YYYY/MM/DD')
                      }}
                    </div>
                    <div class="mainText url m-b0">
                      更新时间：{{
                        $moment(scope.row.updateTime).format('YYYY/MM/DD')
                      }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-popconfirm
                      :title="scope.row.state ? '确认启用吗？' : '确认停用吗？'"
                      placement="top"
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      confirm-button-type="plain"
                      cancel-button-type="primary"
                      :hide-icon="true"
                      @onConfirm="
                        changeState(
                          scope.row.id,
                          scope.row.state,
                          scope.row.expirationTime,
                        )
                      "
                    >
                      <HoverTip
                        slot="reference"
                        class="mr-30"
                        :content="scope.row.state === 0 ? '禁用' : '启用'"
                        :tip-class-name="
                          scope.row.state === 0 ? 'icon-disable' : 'icon-enable'
                        "
                      />
                    </el-popconfirm>
                  </template>
                </el-table-column>
                <div slot="empty" class="empty-img" />
              </el-table>
              <Pagination
                :total="pagingOptions.total"
                :limit="pagingOptions.pageSize"
                :page="pagingOptions.pageNo"
                layout="total, prev, pager, next"
                @pagination="getList"
              />
              <Dialog
                title="新增问卷渠道"
                :visible="closeClickModal"
                :height="400"
                :width="445"
                class="add-questionnaire"
                @closed="close"
              >
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                  <div class="keyName">设置渠道</div>
                  <el-form-item prop="channelName">
                    <el-select
                      v-model="ruleForm.channelName"
                      filterable
                      placeholder="查找问卷分布渠道"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="item in channelSelectList"
                        :key="item.channelId"
                        :label="item.channelName + '(' + item.channelId + ')'"
                        :value="item.channelId"
                      />
                    </el-select>
                  </el-form-item>
                  <div class="keyName">有效时间</div>
                  <el-form-item prop="time">
                    <el-date-picker
                      v-model="ruleForm.time"
                      type="daterange"
                      value-format="timestamp"
                      :clearable="isShowClear"
                      :editable="false"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 100%;"
                    />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="closeClickModal = false">取消</el-button>
                  <el-button
                    type="primary"
                    :loading="addState"
                    @click="submitForm('ruleForm')"
                    >发布</el-button
                  >
                </span>
              </Dialog>
              <Dialog
                title="更新过期时间"
                :visible="timeState"
                :height="400"
                :width="445"
                class="add-questionnaire"
                @closed="closeTime"
              >
                <el-form ref="timeForm" :model="timeForm" :rules="timeRules">
                  <div class="keyName">有效时间</div>
                  <el-form-item prop="expirationTime">
                    <el-date-picker
                      v-model="timeForm.expirationTime"
                      type="date"
                      value-format="timestamp"
                      :clearable="isShowClear"
                      :editable="false"
                      placeholder="选择日期"
                      style="width: 100%;"
                      :picker-options="{
                        disabledDate(time) {
                          return time.getTime() < Date.now() - 3600 * 1000 * 24;
                        },
                      }"
                    />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="timeState = false">取消</el-button>
                  <el-button
                    type="primary"
                    :loading="addTimeState"
                    @click="submitTime('timeForm')"
                    >确定</el-button
                  >
                </span>
              </Dialog>
            </div>
            <div v-show="activeName == '2'" class="log-items">
              <div v-if="logList.length>0">
                <div
                v-for="item in logList"
                :key="item.createTime"
                class="log-item"
              >
                <div class="circle" />
                <div class="log-details">
                  <span class="create-time">{{
                    $moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
                  }}</span>
                  <span class="color-hight">{{ item.name }}</span>
                  <span class="color-hight">{{
                    operationType[item.operation]
                  }}</span>
                  <span class="color-hight"
                    >{{ operationType[item.operation]
                    }}{{ menuType[item.type] }}</span
                  >
                </div>
              </div>
              </div>
                <div v-else>
                    <!-- 暂无记录 -->
                    <div slot="empty" class="empty-img" />
                </div>
            </div>
            <div v-show="activeName === '3'">
              <div class="title-top content-detail flex-between">
                问卷名称：{{ detail.questionnaireName || '-' }}
                <div>
                  <el-select
                    v-model="channelCode"
                    filterable
                    @change="getQuestionnaireDetail"
                  >
                    <el-option label="全部" value="" />
                    <el-option
                      v-for="item in countChannelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </div>
              <div class="title-top content-detail f-s16 flex-box">
                <div class="sub-title">{{ baseForm.secondName }}</div>
                <div class="use-count">使用人数：{{ detail.useCount }}人</div>
              </div>
              <div
                v-for="(item, index) in detail.questionInfos"
                :key="item.questionId"
                class="questionList"
              >
                <div class="questionName">
                  {{ index + 1 + '、' }}{{ item.question }}
                </div>
                <div class="remark">备注信息：{{ item.remark }}</div>
                <div v-if="item.answerType !== 3">
                  <div
                    v-for="ele in item.answerInfos"
                    :key="ele.answerId"
                    class="questionAnswer"
                  >
                    {{ ele.answer || '-'
                    }}<span v-if="ele.rightAndWrong">(正确)</span>

                    <div class="progress">
                      <el-progress
                        :percentage="ele.answerSelectRatio * 100"
                        :stroke-width="14"
                        color="#5FAEFF"
                        :show-text="false"
                        class="progress-bar"
                      />
                      <div class="percent">
                        {{ Number(ele.answerSelectRatio * 100).toFixed(0) }}%
                      </div>
                      <div class="people">{{ ele.answerSelectCount }}人</div>
                    </div>
                  </div>
                </div>
                <div v-else class="questionAnswer">
                  <div class="progress">
                    <el-progress
                      :percentage="item.answerSelectRatio * 100"
                      :stroke-width="14"
                      color="#5FAEFF"
                      :show-text="false"
                      class="progress-bar"
                    />
                    <div class="percent">
                      {{ Number(item.answerSelectRatio * 100).toFixed(0) }}%
                    </div>
                    <div class="people">{{ item.answerSelectCount }}人</div>
                  </div>
                </div>
                <el-row v-if="item.tips">
                  <el-col :span="24"
                    ><span class="health">健康知识</span></el-col
                  >
                  <p class="healthDetail">
                    {{ item.tips }}
                  </p>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div v-show="activeName == 0" class="page-footer">
          <el-popover placement="top" width="240" trigger="click">
            <div ref="qrCodeUrl" class="qrcode" />
            <el-button
              slot="reference"
              class="mr-24"
              @click.native.prevent="lookView"
              >预览</el-button
            >
          </el-popover>
          <el-button
            v-if="!putOnState"
            type="primary"
            :loading="saveState"
            class="mr-24 ml-10"
            @click.native.prevent="putUp"
            >发布</el-button
          >
          <el-button
            v-if="!putOnState"
            type="primary"
            :loading="saveState"
            @click.native.prevent="save"
            >保存</el-button
          >
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Clipboard from '@/utils/clipboard';
import { labelState, operationType, menuType } from '@/utils/enum';
import uploadImage from '@/utils/uploadImage';
import SetTitle from '../components/setTitle';
import SetPeopleInfo from '../components/setPeopleInfo';
import SetStyle from '../components/setStyle';
import QRCode from 'qrcodejs2';
import { cloneDeep } from 'lodash';
import { getChannelListByQuestionnaireId } from '@/api/marketingTool';
export default {
  name: 'EditQuestionnaire',
  components: {
    SetTitle,
    SetPeopleInfo,
    SetStyle
  },
  data() {
    const self = this;
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择渠道'));
      } else {
        // 查询是否存在
        const params = {
          channelId: self.ruleForm.channelName,
          questionnaireId: self.$route.params.id
        };
        self.addState = true;
        self.$store
          .dispatch('marketingTool/checkQuestionnaireChannel', params)
          .then(res => {
            if (!res.data) {
              self.addState = false;
              callback(new Error('渠道ID已有链接，不可重复生成'));
            } else {
              self.addState = false;
              callback();
            }
          });
      }
    };
    return {
      labelState,
      operationType,
      menuType,
      isShowClear: false,
      btns: [
        { value: '0', name: '基础信息' },
        {
          value: '3',
          name: '数据统计'
        },
        { value: '1', name: '渠道列表' },
        { value: '2', name: '操作日志' }
      ],
      logList: [],
      activeName: '0',
      tableLoading: false,
      closeClickModal: false,
      ruleForm: {
        time: [],
        channelName: ''
      },
      rules: {
        channelName: [
          {
            validator: validateName,
            trigger: 'blur'
          }
        ],
        time: [
          {
            required: true,
            message: '请选择有效时间',
            trigger: 'blur'
          }
        ]
      },
      timeForm: {
        expirationTime: '' // 更新结束时间
      },
      timeRules: {
        expirationTime: [
          {
            required: true,
            message: '请选择有效时间',
            trigger: 'blur'
          }
        ]
      },
      detail: {},
      channelSelectList: [], // 渠道下拉列表
      channelList: [], // 渠道列表
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      addState: false, // 新增渠道加载
      activeIndex: 0,
      // 详情
      baseForm: {},
      peopleInfo: {},
      styleInfo: {},
      saveState: false,
      putOnState: false,
      timeState: false, // 是否过期
      channelId: '', // 记录
      channelState: '', // 记录
      addTimeState: false,
      channelCode: '',
      countChannelList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    // 获取问卷详情
    this.getQuestionnaireDetail();

    // 获取渠道下拉列表
    this.$store.dispatch('marketingTool/getChannelList').then(res => {
      this.channelSelectList = res.data;
    });
    // 获取渠道列表
    if (this.pageNum) {
      this.pagingOptions.pageNo = this.pageNum;
      this.getList();
    } else {
      this.getList();
    }
    // 获取问卷日志
    this.$store
      .dispatch('marketingTool/getLogs', {
        id: this.$route.params.id,
        type: [61, 98, 99, 100]
      })
      .then(res => {
        if (res) {
          this.logList = res.data || [];
        }
      });
    // 获取问卷数据
    this.$store
      .dispatch('marketingTool/getAllSetting', this.$route.params.id)
      .then(res => {
        const obj = cloneDeep(res.data);
        this.ruleForm = {
          conclusionList: res.data.questionnaireVO.conclusionList
        };
        delete obj.questionnaireVO.conclusionList;
        this.baseForm = obj.questionnaireVO;
        this.peopleInfo = res.data.questionnaireUserinfoSettingsVO;
        this.styleInfo = res.data.questionnaireStyleSettingsVO;
        if (this.styleInfo.coverSelect) {
          this.styleInfo.imgurl = this.styleInfo.coverSettings;
          this.styleInfo.coverSettings = '#0E937B';
        }
        this.putOnState = res.data.publish ? true : false;
      });
    getChannelListByQuestionnaireId(this.$route.params.id).then(res => {
      this.countChannelList = res.data;
    });
  },
  methods: {
    getQuestionnaireDetail() {
      this.$store
        .dispatch('marketingTool/getQuestionnaireDetail', {
          questionnaireId: this.$route.params.id
        })
        .then(res => {
          this.detail = res.data;
        });
    },
    // tab切换
    handleClick(tab) {
      const vm = this;
      vm.activeName = tab;
    },
    // 复制链接
    copyUrl(e, str) {
      Clipboard(str, e);
    },
    changeImage(item) {
      uploadImage(item)
        .then(res => {
          this.$store
            .dispatch('marketingTool/updateChannelPoster', {
              channelPoster: res,
              id: item.data.id
            })
            .then(() => {
              this.getList();
              this.$message.success('上传图片成功');
            });
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    close() {
      this.closeClickModal = false;
      this.ruleForm.time = [];
      this.ruleForm.channelName = '';
    },
    closeTime() {
      this.timeState = false;
    },
    // 新增渠道
    addChannel() {
      this.closeClickModal = true;
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            channelId: this.ruleForm.channelName,
            questionnaireId: this.$route.params.id,
            startTime: this.ruleForm.time.length ? this.ruleForm.time[0] : '',
            expirationTime: this.ruleForm.time.length
              ? this.ruleForm.time[1] - 1000 + 3600 * 1000 * 24
              : ''
          };
          this.$store
            .dispatch('marketingTool/addChannelInfo', params)
            .then(() => {
              this.getList({});
              this.$message.success('发布成功');
              this.ruleForm.time = [];
              this.ruleForm.channelName = '';
              this.closeClickModal = false;
            });
        } else {
          return false;
        }
      });
    },
    submitTime(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addTimeState = true;
          const params = {
            channelId: this.channelId,
            questionnaireId: Number(this.$route.params.id),
            state: this.channelState ? 0 : 1,
            expirationTime:
              this.timeForm.expirationTime - 1000 + 3600 * 1000 * 24
          };
          this.$store
            .dispatch('marketingTool/saveState', params)
            .then(() => {
              this.$message.success('时间更新成功！');
              this.addTimeState = false;
              this.timeState = false;
              this.getList();
            })
            .catch(() => {
              this.addTimeState = false;
            });
        } else {
          return false;
        }
      });
    },
    // 查询问卷渠道列表
    getList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize,
        questionnaireId: this.$route.params.id
      };
      vm.tableLoading = true;
      // 查询问卷渠道列表
      vm.$store
        .dispatch('marketingTool/getQuestionnaireChannelList', params)
        .then(res => {
          this.channelList = res.records;
          this.pagingOptions.total = res.totalNum;
          vm.tableLoading = false;
        });
    },
    // 切换问卷状态
    changeState(channelId, state, time) {
      if (time < Date.now() && state) {
        this.timeState = true;
        this.channelId = channelId;
        this.channelState = state;
      } else {
        const params = {
          channelId,
          questionnaireId: Number(this.$route.params.id),
          state: state ? 0 : 1
        };
        this.$store.dispatch('marketingTool/saveState', params).then(() => {
          this.$message.success('状态切换成功!');
          this.getList();
        });
      }
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    // 预览
    lookView() {
      if (this.qrcode) {
        this.qrcode.clear(); // 清除代码
        this.qrcode.makeCode(
          `${process.env.VUE_APP_USER_CENTER}/questionnaire/#/questionnaire/custom/start?id=${this.$route.params.id}&isview=1`,
        );
        return;
      }
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: `${process.env.VUE_APP_USER_CENTER}/questionnaire/#/questionnaire/custom/start?id=${this.$route.params.id}&isview=1`, // 需要转换为二维码的内容
        width: 228,
        height: 228,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    // 发布
    putUp() {
      this.$confirm(
        '此操作将保存当前修改并发布，发布后无法再次修改, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        },
      ).then(() => {
        this.$refs.setTitle.$refs['baseForm'].validate(valid => {
          if (valid) {
            if (this.sumScore(this.$refs.setTitle.baseForm) === 100) {
              this.$refs.setTitle.baseForm.questionList.forEach(
                (item, index) => {
                  item.sortNum = index;
                },
              );
              const params1 = Object.assign(
                {},
                this.$refs.setTitle.ruleForm,
                this.$refs.setTitle.baseForm,
              );
              const questionnaireDTO = params1;
              const params2 = cloneDeep(this.$refs.setStyle.styleInfo);
              if (params2.coverSelect === 0) {
                params2.coverSettings = this.$refs.setStyle.styleInfo.coverSettings;
              } else {
                params2.coverSettings = this.$refs.setStyle.styleInfo.imgurl;
              }
              delete params2.imgurl;
              const questionnaireStyleSettingsDTO = params2;
              const questionnaireUserinfoSettingsDTO = this.$refs.setPeopleInfo
                .peopleInfo;
              questionnaireUserinfoSettingsDTO.questionnaireId = Number(
                this.$route.params.id,
              );
              const params = Object.assign(
                { questionnaireDTO },
                { questionnaireStyleSettingsDTO },
                { questionnaireUserinfoSettingsDTO },
                { questionnaireId: Number(this.$route.params.id) },
              );
              this.saveState = true;
              this.$store
                .dispatch('marketingTool/setAllSetting', params)
                .then(() => {
                  this.saveState = false;
                  this.$store
                    .dispatch(
                      'marketingTool/openQuestionnaire',
                      this.$route.params.id,
                    )
                    .then(() => {
                      this.$message({
                        message: '发布成功!',
                        type: 'success'
                      });
                      this.putOnState = true;
                    });
                });
            } else {
              this.$message.error('总分不等于100，请检查！');
            }
          } else {
            return false;
          }
        });
      });
    },
    // 保存
    save() {
      this.$refs.setTitle.$refs['baseForm'].validate(valid => {
        if (valid) {
          if (this.sumScore(this.$refs.setTitle.baseForm) === 100) {
            this.$refs.setTitle.baseForm.questionList.forEach((item, index) => {
              item.sortNum = index;
            });
            this.$refs.setTitle.baseForm.secondName =
              this.$refs.setTitle.baseForm.secondName == null
                ? ''
                : this.$refs.setTitle.baseForm.secondName;
            this.$refs.setStyle.styleInfo.secondName =
              this.$refs.setStyle.styleInfo.secondName == null
                ? ''
                : this.$refs.setStyle.styleInfo.secondName;
            if (
              this.$refs.setTitle.baseForm.name !==
                this.$refs.setStyle.styleInfo.name ||
              this.$refs.setTitle.baseForm.secondName !==
                this.$refs.setStyle.styleInfo.secondName
            ) {
              this.$message.error('问卷标题不一致，请检查！');
              return;
            }
            if (
              this.$refs.setStyle.styleInfo.coverSelect === 1 &&
              (this.$refs.setStyle.styleInfo.imgurl === null ||
                this.$refs.setStyle.styleInfo.imgurl === '')
            ) {
              this.$message.error('请上传图片！');
              return;
            }
            const params1 = Object.assign(
              {},
              this.$refs.setTitle.ruleForm,
              this.$refs.setTitle.baseForm,
            );
            const questionnaireDTO = params1;
            const params2 = cloneDeep(this.$refs.setStyle.styleInfo);
            if (params2.coverSelect === 0) {
              params2.coverSettings = this.$refs.setStyle.styleInfo.coverSettings;
            } else {
              params2.coverSettings = this.$refs.setStyle.styleInfo.imgurl;
            }
            // delete params2.imgurl
            const questionnaireStyleSettingsDTO = params2;
            const questionnaireUserinfoSettingsDTO = this.$refs.setPeopleInfo
              .peopleInfo;
            questionnaireUserinfoSettingsDTO.questionnaireId = Number(
              this.$route.params.id,
            );
            const params = Object.assign(
              { questionnaireDTO },
              { questionnaireStyleSettingsDTO },
              { questionnaireUserinfoSettingsDTO },
              { questionnaireId: Number(this.$route.params.id) },
            );
            this.saveState = true;
            this.$store
              .dispatch('marketingTool/setAllSetting', params)
              .then(() => {
                this.saveState = false;
                this.$message({
                  message: '保存成功!',
                  type: 'success'
                });
              });
          } else {
            this.$message.error('总分不等于100，请检查！');
          }
        } else {
          return false;
        }
      });
    },
    // 计算用户填写的选项总分
    sumScore(obj) {
      let sum = 0;
      obj.questionList.forEach(item => {
        if (item.answerType === 1) {
          sum += Math.max.apply(
            Math,
            item.answerList.map(item1 => {
              return item1.score;
            }),
          );
        }
        if (item.answerType === 2) {
          item.answerList.forEach(item2 => {
            sum += item2.score;
          });
        }
        if (item.answerType === 3) {
          sum += item.answerList[0].score;
        }
      });
      return sum;
    }
  }
};
</script>

<style lang="scss" scoped>
.questionnaireManageDetail {
  .f-s16 {
    font-size: 16px;
  }
  /* .sub-title {
    max-width: 200px;
  } */
  .use-count {
    margin-left: 20px;
    width: 145px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f8ff;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #3599fe;
  }
  .questionList {
    .remark {
      font-size: 14px;
      font-weight: 500;
      color: #464668;
      margin-left: 20px;
      margin-bottom: 23px;
    }
    .questionName {
      font-size: 14px;

      font-weight: bold;
      color: #464668;
      line-height: 14px;
      margin-bottom: 24px;
    }
    .questionAnswer {
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
      margin-bottom: 20px;
      padding-left: 20px;

      .progress {
        width: 55%;
        padding: 12px 30px 0 0;
        display: flex;
        align-items: center;
        .progress-bar {
          width: 80%;
          /deep/.el-progress-bar__outer {
            border-radius: 0;
          }
          /deep/ .el-progress-bar__inner {
            border-radius: 0;
          }
        }
        .percent {
          width: 50px;
          font-size: 14px;
          font-weight: 400;
          color: #3599fe;
          margin: 0 12px 0 24px;
        }
        .people {
          width: fit-content;
          font-size: 14px;
          font-weight: 400;
          color: #464668;
        }
      }
    }
  }
  .el-row {
    line-height: 21px;
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    margin-bottom: 22px;
    .el-col {
      display: flex;
      span {
        vertical-align: text-top;
      }
      .item-content {
        flex: 1;
        line-height: 21px;
        display: inline-block;
        vertical-align: text-top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .health {
    margin-bottom: 15px;
    &::before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 6px;
      height: 6px;
      background: #464668;
      margin-right: 4px;
      border-radius: 50%;
    }
  }
  p.healthDetail {
    width: 646px;
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 21px;
    margin-bottom: 24px;
  }
  .mainText {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    margin-bottom: 12px;
  }
  .m-b0 {
    margin-bottom: 0;
  }
  .gray {
    font-size: 14px;

    font-weight: 400;
    color: #989ab3;
    line-height: 14px;
  }
  .url {
    color: #1e1e2f;
  }
  .copyUrl {
    font-size: 14px;

    font-weight: 400;
    color: #3599fe;
    line-height: 14px;
    cursor: pointer;
  }
  .uploadImg {
    position: relative;
    width: 56px;
    height: 56px;
    .hoveUpload {
      width: 100%;
      height: 21px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      font-size: 14px;

      font-weight: 400;
      color: #ffffff;
      line-height: 21px;
      text-align: center;
      cursor: pointer;
      display: none;
    }
    &:hover {
      .hoveUpload {
        display: block;
      }
    }
  }
  .add-questionnaire {
    .keyName {
      font-size: 14px;

      font-weight: 400;
      color: #46456b;
      line-height: 14px;
      margin-bottom: 12px;
    }
  }
  .tabChange {
    width: 350px;
    border-radius: 4px;
    border: 1px solid #ebedf2;
    display: flex;
    margin-top: 24px;
    margin-bottom: 30px;
    cursor: pointer;
    &-item {
      padding: 18px 20px;
      font-size: 16px;

      color: #a2a3b7;
      line-height: 16px;
      border-right: 1px solid #ebedf2;
      &:last-of-type {
        border: none;
      }
      &.active {
        color: #3599fe;
        font-weight: bold;
      }
    }
  }
}
</style>
