<template>
  <div class="flow-code flow-card">
    <div class="flow-title flex">
      <div class="icon"/>
      <span>扫码关注</span>
    </div>
    <div class="code-box flex">
      <div class="official">
        <div class="code"/>
        <div>微信公众号</div>
      </div>
      <div class="applet">
        <div class="code"/>
        <div>微信小程序</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flowCode'
};
</script>

<style lang="scss" scoped>
.flow-code {
  height: 294px;
  .icon {
    background: url("../images/code.svg");
    background-size: 100% 100%;
  }
  .code-box {
    margin: 48px auto 0;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #989ab3;
    .code {
      width: 104px;
      height: 104px;
      margin-bottom: 12px;
    }
    .official {
      text-align: center;
      margin-right: 30px;
      .code {
        background: url("../images/official.jpg");
        background-size: 100% 100%;
      }
    }
    .applet {
      text-align: center;
      .code {
        background: url("../images/applet.jpg");
        background-size: 100% 100%;
      }
    }
  }
}
</style>
