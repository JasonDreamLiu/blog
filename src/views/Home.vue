<template>
  <el-container>
    <el-header height="101">
      <Header />
    </el-header>
    <el-main>
      <hr id="h11">
      <router-view />
    </el-main>
    <el-footer height="80">
      <hr id="h12">
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
const Header = () => import(/* webpackChunkName: "Header" */ '@/views/Header');
const Footer = () => import(/* webpackChunkName: "Footer" */ '@/views/Footer');

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  }
}
</script>
