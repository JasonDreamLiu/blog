<template>
  <div id="app">
    <canvas id="cas" />
    <router-view />
  </div>
</template>

<script>
import Background from "@/assets/javascript/index";
export default {
  name: 'app',
  components: {
  },
  mounted() {
    Background("cas");
  }
}
</script>

<style lang="less">
@import "assets/styles/style";
#app {
  .el-main{
    overflow: inherit;
  }
  #cas{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
