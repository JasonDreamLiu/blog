<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item v-for="(item, index) in bookmarks" :key="index" :title="item.name" :name="index">
      <el-row type="flex" justify="center">
        <el-col
            style="width: auto"
            v-for="(item, index) in item.children"
            :key="index">
          <a class="bookmarks-btn" :href="item.url" target="_blank">{{item.name}}</a>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "Index",
  data() {
    return{
      activeNames:["1"],
      bookmarks:[
        {
          name:'inspiration',
          children:[
            {
              name:'99U',
              url:'https://99u.adobe.com/'
            },{
              name:'Abduzeedo Creative',
              url:'https://abduzeedo.com/'
            }
          ]
        },{
          name:'Stock Photos',
          children:[
            {
              name:'500px',
              url:'https://500px.com//'
            },{
              name:'Adobe Stock',
              url:'https://stock.adobe.com/hk/photos'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.el-collapse >>> .el-collapse-item__header,.el-collapse >>> .el-collapse-item__wrap{
  background: no-repeat;
}
.el-collapse >>> .el-collapse-item__header{
  color: #222222;
  display: block;
  font-size: 1.5em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}
.bookmarks-btn{
  border: 1px solid;
  background-color: rgba(255,255,255,0.2);
  font-size: 1.25em;
  padding: 10px 20px;
  display: inline-block;
  border-radius: 4px;
  color: #fff;
  transition: background-color 0.5s;
  -moz-transition: background-color 0.5s;	/* Firefox 4 */
  -webkit-transition: background-color 0.5s;	/* Safari 和 Chrome */
  -o-transition: background-color 0.5s;	/* Opera */
}
.bookmarks-btn:hover{
  background-color: rgb(255,190,106);
}
.bookmarks-btn:active{
  background-color: rgb(50,50,100);
}
</style>