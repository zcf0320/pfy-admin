<template>
    <div style="position: relative">
        <div v-if="$isNotEmpty(urls)" class="img-box">
            <img
                v-if="$isNotEmpty(urls)"
                :style="style"
                :src="urls[activeIndex].url"
                alt=""
                @click="previewImg(urls[activeIndex].url)"
            >
        </div>
        <div v-else class="none-image">
            <div class="none"/>
        </div>
        <!-- <div
            class="img-status flex-box"
            v-if="$isNotEmpty(urls) && !urls[activeIndex].isError&&!urls[activeIndex].content"
        >
            <div class="icon-success"></div>
            <div class="success-tips ml-6">识别成功</div>
        </div> -->
        <div
            v-if="$isNotEmpty(urls) && !urls[activeIndex].isError && urls[activeIndex].content"
            class="img-status flex-box curent"
            @click="toOcrResult(urls)"
        >
            <div class="icon-success"/>
            <div class="success-tips ml-6">查看结果</div>
        </div>
        <div
            v-else
            class="img-status flex-box"
        >
            <div class="icon-error"/>
            <div class="error-tips ml-6">识别失败</div>
        </div>

        <div
            v-if="$isNotEmpty(urls)"
            class="operation-box flex-between"
        >
            <div
                class="icon-last"
                @click="switchImg(true)"
            />
            <div
                class="icon-enlarge"
                @click="zoomImg(true)"
            />
            <div
                class="icon-rotate"
                @click="rotateImg()"
            />
            <div
                class="icon-narrow"
                @click="zoomImg(false)"
            />
            <div
                class="icon-next"
                @click="switchImg(false)"
            />
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImgPreview',
    props: {
        urls: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            activeIndex: 0,
            scale: 1,
            rotate: 0,
            flag: true,
            style: {
                left: 0,
                top: 0,
                transform:
                    'scale(' +
                    this.scale +
                    ')' +
                    'rotate' +
                    '(' +
                    this.rotate +
                    'deg)'
            }
        };
    },
    computed: {},
    created() {},
    methods: {
        toOcrResult(obj) {
            localStorage.setItem('ocrResult', JSON.stringify(obj));
            const routeData = this.$router.resolve({
                path: '/claimManagement/ocrResult'
            });
            window.open(routeData.href, '_blank');
        },
        // 切换图片
        switchImg(isLast) {
            if (this.$isEmpty(this.urls)) {
                return;
            }
            if (isLast) {
                // 如果是第一张
                if (this.activeIndex === 0) {
                    return;
                    // this.activeIndex=this.urls.length-1
                } else {
                    this.activeIndex -= 1;
                    this.reset();
                }
            } else {
                // 如果是最后一张
                if (this.activeIndex === this.urls.length - 1) {
                    return;
                    // this.activeIndex=0
                } else {
                    this.activeIndex += 1;
                    this.reset();
                }
            }
        },
        // 缩放图片
        zoomImg(isLarge) {
            if (isLarge) {
                // 放大
                this.scale += 0.5;
            } else {
                if (this.scale <= 0.5) {
                    return;
                }
                this.scale -= 0.5;
            }
            let left = 0;
            let top = 0;
            if (this.scale > 1) {
                left = (374 * (this.scale - 1)) / 2;
                top = (374 * (this.scale - 1)) / 2;
            }
            this.style = {
                left: left + 'px',
                top: top + 'px',
                transform:
                    'scale(' +
                    this.scale +
                    ')' +
                    'rotate' +
                    '(' +
                    this.rotate +
                    'deg)'
            };
        },
        // 旋转图片
        rotateImg() {
            this.rotate += 90;
            this.style.transform =
                'scale(' +
                this.scale +
                ')' +
                'rotate' +
                '(' +
                this.rotate +
                'deg)';
        },
        // 预览
        previewImg(src) {
            window.open(src);
        },
        // 重置图片
        reset() {
            this.scale = 1;
            this.rotate = 0;
            this.style = {
                left: 0,
                top: 0,
                transform:
                    'scale(' +
                    this.scale +
                    ')' +
                    'rotate' +
                    '(' +
                    this.rotate +
                    'deg)'
            };
        }
    }
};
</script>

<style scoped lang="scss">
.none-image{
    width: 100%;
    height: 100%;
    min-width: 423px;
    min-height: 423px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #EBEDF2;
    .none{
        width: 303px;
        height: 233px;
        background-image: url('../../../../assets/none-image.png');
        background-size: 100% 100%;
        visibility: visible;
    }
}
.img-box {
    width: 100%;
    height: 100%;
    border: 1px solid #EBEDF2;
    min-width: 423px;
    min-height: 423px;
    background: rgba(0, 0, 0, 0.46);
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    img {
        display: block;
        width: 100%;
        overflow: hidden;
        height: 374px;
        user-select: none;
        position: relative;
        left: 0;
        top: 0;
    }
}
.img-status {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 101px;
    height: 30px;
    background: #ffffff;
    padding: 6px 10px;
    box-shadow: 0px 0px 4px 0px rgba(165, 165, 165, 0.5);
    border-radius: 15px;
    &.curent{
        cursor: pointer;
    }
    .error-tips {
        font-size: 14px;
        color: #f64e60ff;
    }
    .success-tips {
        font-size: 14px;
        color: #18c4bd;
    }
}
.operation-box {
    position: absolute;
    left: 46px;
    right: 46px;
    height: 46px;
    bottom: 30px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 32px;
    padding: 8px 23px;
}
</style>
