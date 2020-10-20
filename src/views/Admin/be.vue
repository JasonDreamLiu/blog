<template>
  <el-container id="be">
    <el-header height="auto">
<!--      头-->
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu :default-active="$route.path==='/be'?'/be/bookmarks':$route.path" router :collapse="isCollapse">
          <el-menu-item :index="'/be/bookmarks'">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">书签组编辑</span>
          </el-menu-item>
        </el-menu>
        <el-button class="isCollapse" @click="()=>{isCollapse=!isCollapse}" :icon="!isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"></el-button>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "be",
  data(){
    return{
      isCollapse:false
    }
  },
  mounted() {
    console.log(this.$route.path);
  }
}
</script>

<style lang="less" scoped>
  #be{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .el-container{
      .el-header{
        height: auto;
      }
      .el-aside{
        .el-menu{
          &:not(.el-menu--collapse) {
            width: 200px;
          }
          height: 100%;
          float: left;
        }
        .isCollapse{
          padding: 5px;
          font-size: 25px;
          margin-left: 5px;
        }
      }
    }
  }
</style>