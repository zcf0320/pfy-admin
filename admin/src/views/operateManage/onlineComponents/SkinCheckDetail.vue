<template>
            <div class="skin-test-detail">
                <div v-if="activeName === '1'">
                    <div class="skin-test-detail-table">
                         <div class="skinDetails-table">
                                  <div class="skin-test-detail-table-title">用户信息</div>
                        <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">ID</div>
                                <div class="skin-test-detail-value">
                                   {{ formData.baseData[0].value }}
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">
                                    服务项
                                </div>
                                <div class="skin-test-detail-value">
                                    {{ formData.baseData[1].value }}
                                </div>
                            </div>
                        </div>
                        <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">服务来源</div>

                                <div  :class="{
                                    'link-skip': !!formData.serviceSourceVO.serviceSourceId,
                                    text: true,
                                    }"
                                    @click="linkSkip(formData.serviceSourceVO)">
                                     {{
                                    formData.serviceSourceVO.serviceRegin
                                        ? '【' +
                                        serviceRegionState[
                                            Object.keys(formData.serviceSourceVO.serviceRegin)[0]
                                        ] +
                                        '】'
                                        : '-'
                                    }}{{ formData.serviceSourceVO.serviceSourceId }}
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">
                                    更新时间
                                </div>

                                <div class="skin-test-detail-value">
                                    {{
                                        $moment(detailInfo.checkTime).format(
                                            "YYYY-MM-DD HH:mm"
                                        )
                                    }}
                                </div>
                            </div>
                        </div>
                        <div class="skin-test-detail-table-title">服务信息</div>
                           <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">用户姓名</div>
                                <div class="skin-test-detail-value">
                                {{ detailInfo.userInfo.userInfoId === null ? '-' : detailInfo.userInfo.userInfoId}}
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">
                                    性别
                                </div>
                                <div class="skin-test-detail-value">
                                    {{detailInfo.userInfo.sex === 1 ? '男' : '女' }}
                                </div>
                            </div>
                        </div>
                           <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">年龄</div>
                                <div class="skin-test-detail-value">
                                    {{ detailInfo.userInfo.age }}
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">
                                    手机号
                                </div>
                                <div class="skin-test-detail-value">
                                    {{ detailInfo.userInfo.mobile }}
                                </div>
                            </div>
                        </div>
                        <div class="skin-test-detail-table-column">
                            <div class="skin-test-detail-table-column-l">
                                <div
                                    class="skin-test-detail-table-column-label"
                                >
                                    皮肤照片
                                </div>
                                <div
                                    class="skin-test-detail-table-column-value"
                                >
                                    <div class="img">
                                        <img :src="detailInfo.picUrl" >
                                    </div>
                                </div>
                            </div>
                            <div class="skin-test-detail-table-column-r">
                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        肤色
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{
                                            detailInfo.skin.color
                                                | colorNumberText
                                        }}
                                    </div>
                                </div>

                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        皮肤光滑度
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{ detailInfo.skin.smooth | eggText }}
                                    </div>
                                </div>
                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        痘痘
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{ acneTextArr.toString() }}
                                    </div>
                                </div>

                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        斑
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{ detailInfo.speckle.num }}
                                    </div>
                                </div>
                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        痣
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{ detailInfo.mole.num }}
                                    </div>
                                </div>
                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        皱纹类型
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{ wrinkleTextArr.toString() }}
                                        <el-popover
                                            placement="top"
                                            width="338"
                                            trigger="click"
                                        >
                                            <div
                                                class="skin-healthy-dou"
                                                :class="
                                                    detailInfo.wrinkle.num > 0
                                                        ? 'wrinkle'
                                                        : 'no-wrinkle'
                                                "
                                            >
                                                <div class="wrinkle-text">
                                                    您有
                                                    <span
                                                        class="skin-healthy-dou-num"
                                                        >{{
                                                            detailInfo.wrinkle
                                                                .num
                                                        }}</span>
                                                    条皱纹
                                                </div>
                                            </div>
                                            <div
                                                slot="reference"
                                                class="result"
                                            >
                                                分析结果
                                            </div>
                                        </el-popover>
                                    </div>
                                </div>
                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        黑头类型
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{
                                            detailInfo.blackhead.type
                                                | BlackHeadText
                                        }}
                                        <el-popover
                                            placement="top"
                                            width="338"
                                            trigger="click"
                                        >
                                            <div class="skin-healthy-bleak">
                                                <div
                                                    class="skin-healthy-bleak-icon"
                                                />
                                                <div
                                                    class="skin-healthy-bleak-text"
                                                >
                                                    黑头个数
                                                </div>
                                                <div
                                                    class="skin-healthy-bleak-num"
                                                >
                                                    {{
                                                        detailInfo.blackhead.num
                                                    }}
                                                </div>
                                            </div>
                                            <div
                                                slot="reference"
                                                class="result"
                                            >
                                                分析结果
                                            </div>
                                        </el-popover>
                                    </div>
                                </div>
                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        毛孔类型
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{ poreTextArr.toString() }}
                                    </div>
                                </div>
                                <div
                                    class="skin-test-detail-table-column-r-two"
                                >
                                    <div
                                        class="skin-test-detail-table-column-r-two-label"
                                    >
                                        皱纹数量
                                    </div>
                                    <div
                                        class="skin-test-detail-table-column-r-two-value"
                                    >
                                        {{ detailInfo.wrinkle.num }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">
                                    黑头数量
                                </div>
                                <div class="skin-test-detail-value">
                                    {{ detailInfo.blackhead.num }}
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">
                                    毛孔数量
                                </div>
                                <div class="skin-test-detail-value">
                                    {{ detailInfo.pore.num }}
                                </div>
                            </div>
                        </div>
                        <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">
                                    肌肤耐受程度
                                </div>
                                <div class="skin-test-detail-value">
                                    {{ skinSensitiveCheck | skinToleranceText }}
                                    <el-popover
                                        placement="top"
                                        width="338"
                                        trigger="click"
                                    >
                                        <div class="face-wrap">
                                            <div class="nose">
                                                您的鼻子
                                                <br >
                                                肌肤为<span>
                                                    {{
                                                        skinDryoilCheckList[1]
                                                            | skinOilyText
                                                    }}</span>
                                            </div>
                                            <div class="head">
                                                您的额头
                                                <br >
                                                肌肤为<span>
                                                    {{
                                                        skinDryoilCheckList[0]
                                                            | skinOilyText
                                                    }}</span>
                                            </div>
                                            <div class="left-face">
                                                您的左脸
                                                <br >
                                                肌肤为<span>
                                                    {{
                                                        skinDryoilCheckList[2]
                                                            | skinOilyText
                                                    }}</span>
                                            </div>
                                            <div class="line-left"/>
                                            <div class="line-right"/>
                                            <div class="right-face">
                                                您的右脸
                                                <br >
                                                肌肤为<span>
                                                    {{
                                                        skinDryoilCheckList[3]
                                                            | skinOilyText
                                                    }}</span>
                                            </div>
                                            <div class="chin">
                                                您的下巴
                                                <br >
                                                肌肤为<span>
                                                    {{
                                                        skinDryoilCheckList[4]
                                                            | skinOilyText
                                                    }}</span>
                                            </div>
                                            <img
                                                :src="
                                                    detailInfo.userInfo.sex ===
                                                    1
                                                        ? faceBoy
                                                        : faceGirl
                                                "
                                                alt=""
                                            >
                                        </div>

                                        <div slot="reference" class="result">
                                            分析结果
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">额头</div>
                                <div class="skin-test-detail-value">
                                    {{ skinDryoilCheckList[0] | skinOilyText }}
                                </div>
                            </div>
                        </div>
                        <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">鼻子</div>
                                <div class="skin-test-detail-value">
                                    {{ skinDryoilCheckList[1] | skinOilyText }}
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">左脸</div>
                                <div class="skin-test-detail-value">
                                    {{ skinDryoilCheckList[2] | skinOilyText }}
                                </div>
                            </div>
                        </div>
                        <div class="skin-test-detail-table-four">
                            <div class="skin-test-detail-table-four-l">
                                <div class="skin-test-detail-label">右脸</div>
                                <div class="skin-test-detail-value">
                                    {{ skinDryoilCheckList[3] | skinOilyText }}
                                </div>
                            </div>
                            <div class="skin-test-detail-table-four-r">
                                <div class="skin-test-detail-label">下巴</div>
                                <div class="skin-test-detail-value">
                                    {{ skinDryoilCheckList[4] | skinOilyText }}
                                </div>
                            </div>
                        </div>
                         </div>
                    </div>
                </div>
                <div v-if="activeName === '2'" class="log-items">
                    <div class="log-list">
                        <div v-if="logList.length > 0">
                            <div
                                v-for="(item, index) in logList"
                                :key="index"
                                class="log-item"
                            >
                                <span class="dot"/>
                                <span
                                    class="time"
                                    >{{ item.createTime | timeFormat }}
                                </span>
                                <span class="name">{{ item.name }} </span>
                                <span
                                    class="name"
                                    >{{ $enums["operationType"][item.operation]
                                    }}{{ $enums["menuType"][item.type] }}</span>
                            </div>
                        </div>
                        <div v-else>
                            暂无记录
                        </div>
                    </div>
                </div>
            </div>
</template>
<script>
import faceGirl from '@/assets/skin-test/face-girl.png';
import faceBoy from '@/assets/skin-test/face-boy.png';
import { PoreText, wrinkleText, AcneText } from '@/filters/index';
import { serviceRegionState } from '@/utils/enum';
export default {
    name: 'SkinTestRecordDetail',
     props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
    data() {
        return {
            serviceRegionState,
            faceGirl,
            faceBoy,
            activeName: '1',
            logList: [],
            detailInfo: {
                userInfo: {
                    mobile: '',
                    sex: '',
                    age: ''
                },
                skin: {
                    color: ''
                },
                acne: {
                    acneTypeAndNum: []
                },
                speckle: {
                    num: ''
                },
                mole: {
                    num: ''
                },
                wrinkle: {
                    num: ''
                },
                pore: {
                    num: ''
                },
                blackhead: {
                    num: ''
                },
                skinquality: {
                    skinDryoilCheck: ''
                }
            },
            skinDryoilCheckList: [],
            skinSensitiveCheck: '',
            wrinkleTextArr: [],
            acneTextArr: [],
            poreTextArr: []
        };
    },
    mounted() {
         this.$store
        .dispatch('onlineService/OlgetSkinCheckDetail', { id: this.$route.params.id })
         .then(res => {
          this.detailInfo = res.data;
            this.skinDryoilCheckList = res.data.skinquality.skinDryoilCheck.split(
                ','
            );
            this.skinSensitiveCheck = res.data.skinquality.skinSensitiveCheck;
            const wrinkleTextArr = [];
            res.data.wrinkle.type.split(',').forEach(item => {
                wrinkleTextArr.push(wrinkleText(item));
            });
            this.wrinkleTextArr = wrinkleTextArr;
            const acneList = [];
            res.data.acne.acneTypeAndNum &&
                res.data.acne.acneTypeAndNum.forEach(item => {
                    acneList.push(AcneText(item.type) + item.num + '个');
                });
            res.acneTextArr = acneList;

            const poreTextArr = [];
            res.data.pore.type &&
                res.data.pore.type.split(',').forEach(item => {
                    poreTextArr.push(PoreText(item));
                });
            this.poreTextArr = poreTextArr;
         });
    }
};
</script>
<style lang="scss" scoped>
.skin-test-detail {
    .skin-test-detail-label {
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
        border-right: 1px solid #e8e8e8;
    }
    .link-skip {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .skin-test-detail-value {
        flex: 1;
        font-weight: 400;
        padding: 0 22px 0 61px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .skin-test-detail-table {
        margin-bottom: 20px;
         .skinDetails-table {
            width: 99%;
            background: #ffffff;
            box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
            border-radius: 4px;
            margin: 24px auto 0;
        }
        &-title {
            height: 48px;
            background: #f3f6f9;
            border: 1px solid #e8e8e8;
            border-top: none;
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            color: #545473;
            line-height: 48px;
            padding: 0 16px;
            display: flex;
            align-items: center;
            &::before {
                content: "";
                display: block;
                width: 4px;
                height: 16px;
                background: #3599fe;
                margin-right: 12px;
            }
        }
        &-four {
            height: 48px;
            display: flex;
            font-size: 14px;
            color: #545473;
            font-weight: bold;
            line-height: 48px;
            border: 1px solid #e8e8e8;
            border-top: none;
            &-l,
            &-r {
                flex: 1;
                display: flex;
                align-items: center;
            }
            &-l {
                border-right: 1px solid #e8e8e8;
            }
        }
    }
    .skin-test-detail-table-column {
        display: flex;

        &-l {
            display: flex;
            flex: 1;
            align-items: center;
            border-left: 1px solid #e8e8e8;
            border-right: 1px solid #e8e8e8;
        }
        &-label {
            width: 165px;
            height: 100%;
            display: flex;
            align-items: center;
            font-weight: bold;
            padding-left: 32px;
            border-bottom: 1px solid #e8e8e8;
            border-right: 1px solid #e8e8e8;
        }
        &-value {
           flex: 1;
            height: 432px;
            padding: 16px 62px 18px 42px;
            border-bottom: 1px solid #e8e8e8;
            .img {
                width: 100%;
                height: 391px;
                border-radius: 4px;
                // border: 1px dashed #dcdcdc;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }

        &-r {
            flex: 1;
            &-two {
                height: 48px;
                display: flex;
                font-size: 14px;
                color: #545473;
                font-weight: bold;
                line-height: 48px;
                &-label {
                    width: 165px;
                    font-weight: bold;
                    padding-left: 32px;
                    border-right: 1px solid #e8e8e8;
                    border-bottom: 1px solid #e8e8e8;
                }
                &-value {
                    border-bottom: 1px solid #e8e8e8;
                    border-right: 1px solid #e8e8e8;
                   flex: 1;
                    font-weight: 400;
                    padding: 0 22px 0 61px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
    }
    .result {
        width: 70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #ebedf2;
        border-radius: 4px;
    }
}

.skin-healthy-dou {
    width: 137px;
    height: 182px;
    background: url(../../../assets/skin-test/face-dou.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    &.wrinkle {
        background: url(../../../assets/skin-test/wrinkle.png) no-repeat center
            center;
        background-size: 100% 100%;
        .wrinkle-text {
            font-size: 12px;
            font-weight: 400;
            color: #666666;
            line-height: 34px;
            position: absolute;
            top: 0px;
            white-space: nowrap;
            right: -10px;
            transform: translateX(100%);
        }
    }
    &.no-wrinkle {
        background: url(../../../assets/skin-test/no-wrinkle.png) no-repeat center
            center;
        background-size: 100% 100%;
        .wrinkle-text {
            font-size: 12px;
            font-weight: 400;
            color: #666666;
            line-height: 34px;
            position: absolute;
            top: 0px;
            white-space: nowrap;
            right: -10px;
            transform: translateX(100%);
        }
    }
    .skin-healthy-dou-num {
        font-size: 16px;
        color: #febd44;
    }
}
.skin-healthy-bleak {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-icon {
        width: 64px;
        height: 64px;
        background: url(../../../assets/skin-test/Blackhead.png) no-repeat center
            center;
        background-size: 100% 100%;
        margin-bottom: 15px;
    }
    &-text {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        margin-bottom: 8px;
    }
    &-num {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
    }
}
.face-wrap {
    position: relative;
    img {
        margin: 0 auto;
        width: 142px;
        height: 148px;
    }
    .nose,
    .head,
    .left-face,
    .right-face,
    .chin {
        position: absolute;
        font-size: 12px;
        color: #666666;
        span {
            font-size: 16px;
            font-weight: bold;
            color: #febd44;
        }
    }
    .nose {
        left: 20px;
        text-align: right;
    }
    .head {
        top: -10px;
        right: 30px;
    }
    .left-face {
        top: 40%;
    }
    .line-left {
        position: absolute;
        left: 76px;
        top: 85px;
        width: 50px;
        height: 1px;
        background-color: #febd44;
        opacity: 0.4;
    }
    .line-right {
        position: absolute;
        right: 90px;
        top: 85px;
        width: 50px;
        height: 1px;
        background-color: #febd44;
        opacity: 0.4;
    }
    .right-face {
        top: 70px;
        right: 20px;
    }

    .chin {
        right: 20px;
        bottom: -10px;
    }
}
</style>
