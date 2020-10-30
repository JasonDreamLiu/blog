<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(item, index) in bookmarks" :key="index" :title="item.title" :name="index">
        <el-row type="flex" justify="center">
          <el-col style="width: auto" v-if="item.children.length<1" :key="index">
            <a class="bookmarks-btn" href="javascript:void(0);">{{ "标签组暂无任何标签！" }}</a>
          </el-col>
          <el-col
              v-else
              style="width: auto"
              v-for="(item, index) in item.children"
              :key="index">
            <a class="bookmarks-btn" :href="item.url" target="_blank">{{ item.name }}</a>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import axios from "axios";
import Api from "@/ApiConfig/api";
import io from "socket.io-client";

export default {
  name: "Index",
  data() {
    return {
      activeNames: ["1"],
      bookmarks: [],
      socket:null
    }
  },
  methods: {
    getBookmarks: async function () {
      await axios.get(Api.url+Api.aggregate)
          .then((res) => {
            console.log(res);
            this.bookmarks = res.data;
          })
          .catch(err => {
            console.log(err);
          })
    },
  },
  mounted() {
    this.getBookmarks();
    if (!this.$store.state.io){
      this.$store.commit('setIo',io('http://172.26.40.247:3000'));
    }
    this.$store.state.io.on('Refresh',success=>{
      if (success){
        this.getBookmarks();
      }
    })
  }
}
</script>

<style scoped>
.el-collapse{
  border-bottom: none;
}
.el-collapse >>> .el-collapse-item__header, .el-collapse >>> .el-collapse-item__wrap {
  background: no-repeat;
  border-bottom: none;
}

.el-collapse >>> .el-collapse-item__header {
  color: #222222;
  display: block;
  font-size: 1.5em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
  border-bottom: none;
}

.bookmarks-btn {
  border: 1px solid;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 1.25em;
  padding: 10px 20px;
  display: inline-block;
  border-radius: 4px;
  color: #fff;
  transition: background-color 0.5s;
  -moz-transition: background-color 0.5s; /* Firefox 4 */
  -webkit-transition: background-color 0.5s; /* Safari 和 Chrome */
  -o-transition: background-color 0.5s; /* Opera */
}

.bookmarks-btn:hover {
  background-color: rgb(255, 190, 106);
}

.bookmarks-btn:active {
  background-color: rgb(50, 50, 100);
}
</style>