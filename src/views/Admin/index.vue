<template>
  <div :style='{backgroundColor:`rgba(${colors.r},${colors.g},${colors.b},${colors.a})`}'>
    <span :style='{color:`rgba(${colors.r},${colors.g},${colors.b},${colors.a})`}'>傻了吧，这网站没有后台</span>
  </div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      colors:{
        r:Math.round(Math.random() * 255-1),
        g:Math.round(Math.random() * 255-1),
        b:Math.round(Math.random() * 255-1),
        a:Math.random()
      }
    };
  },
  computed:{
    // setColor:function (){
    //   return "rgba("+`${Math.round(Math.random() * 255-1)},${Math.round(Math.random() * 255-1)},${Math.round(Math.random() * 255-1)},${Math.random()},`+")";
    // }
  },
  mounted() {
    setInterval(() => {
      this.colors = {
        r:Math.round(Math.random() * 255-1),
        g:Math.round(Math.random() * 255-1),
        b:Math.round(Math.random() * 255-1),
        a:Math.random()
      }
    }, 1000);
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content:center;
  align-items:center;
  top: 0;
  left: 0;
  transition: background-color 1s;
  -moz-transition: background-color 1s; /* Firefox 4 */
  -webkit-transition: background-color 1s; /* Safari 和 Chrome */
  -o-transition: background-color 1s; /* Opera */
}
span{
  font-size: 72px;
  filter: invert(100%);
  transition: color 1s;
  -moz-transition: color 1s; /* Firefox 4 */
  -webkit-transition: color 1s; /* Safari 和 Chrome */
  -o-transition: color 1s; /* Opera */
}
</style>