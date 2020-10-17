<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less">
@import "assets/styles/style";
#app {
  .el-main{
    overflow: inherit;
  }
}
</style>
