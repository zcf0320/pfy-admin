<template>
  <div id="dataPanel">
    <div class="dataPanel-body">
      <Layout />
    </div>
  </div>
</template>

<script>
import Layout from './layout.vue';
// 屏幕自适应方法
const autoScale = function() {
  let timeTicket;

  const width = 2636;
  const height = 1474;

  const isIE = (function() {
    const b = document.createElement('b');
    b.innerHTML = '<!--[if IE]><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
  })();

  const transform = function() {
    const ratio = window.innerHeight / window.innerWidth;
    let rate = 1;
    if (ratio >= height / width) {
      rate = window.innerWidth / width;
    } else {
      rate = window.innerHeight / height;
    }
    const body = document.body;
    const container = document.querySelector('div.dataPanel-body');
    const paddingLeft = parseInt(body.clientWidth - width * rate) / 2;

    if (isIE) {
      const frameStyle = container.getAttribute('style');
      container.setAttribute(
        'style',
        frameStyle + '-ms-transform: scale(' + rate + ',' + rate + ');'
      );
      return;
    }
    container.style.left = paddingLeft + 'px';
    container.style.transform = 'scale(' + rate + ')';
  };

  function autoScale() {
    clearTimeout(timeTicket);
    timeTicket = setTimeout(transform, 100);
  }

  transform();
  window.addEventListener('resize', autoScale);
};
export default {
  name: 'ytPanel',
  components: {
    Layout
  },
  mounted() {
    autoScale();
  }
};
</script>

<style lang="scss" scoped>
#dataPanel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: 100%;
  width: 100%;
  background: #16193a;
  overflow: hidden;
}
.dataPanel-body {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 0;
  width: 2636px;
  height: 1474px;
}
</style>
