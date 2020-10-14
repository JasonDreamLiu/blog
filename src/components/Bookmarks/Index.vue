<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(item, index) in bookmarks" :key="index" :title="item.name" :name="index">
        <el-row type="flex" justify="center">
          <el-col
              style="width: auto"
              v-for="(item, index) in item.children"
              :key="index">
            <a class="bookmarks-btn" :href="item.url" target="_blank">{{ item.name }}</a>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="console">
      <el-form :model="bookmarkTitlesForm" ref="bookmarkTitlesForm">
        <el-form-item
            v-for="(item,index) in bookmarkTitlesForm.titles"
            :label="`书签组名${index+1}`"
            :prop="'titles.'+index+'.title'"
            :rules="{
              required: true, message: '书签组名不能为空', trigger: 'blur'
            }"
            :key="index"
        >
          <el-input v-model="item.title"></el-input>
          <el-button v-if="bookmarkTitlesForm.titles.length>1" @click.prevent="removeBookmarkTitles(item)">删除
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addBookmarkTitle">新增</el-button>
          <el-button type="primary" @click="submitForm('bookmarkTitlesForm')">提交</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="bookmarksForm" ref="bookmarksForm">
        <el-table
            :data="bookmarksForm.addBookmarks"
        >

        </el-table>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      activeNames: ["1"],
      bookmarks: [],
      bookmarkTitlesForm: {
        titles: [
          {
            title: ""
          }
        ]
      },
      bookmarksForm: {
        addBookmarks: [
          {
            title: "",
            types: [
              {
                name: "",
                url: ""
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    submitForm: function(formName,fn) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
          if (fn){
            fn();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getBookmarks: function () {
      axios.get('http://192.168.1.2:3000/connect/aggregate')
          .then((res) => {
            console.log(res);
            this.bookmarks = res.data;
          })
          .catch(err => {
            console.log(err);
          })
    },
    removeBookmarkTitles: function (item) {
      const index = this.bookmarkTitlesForm.titles.indexOf(item);
      if (index !== -1) {
        this.bookmarkTitlesForm.titles.splice(index, 1);
      }
    },
    addBookmarkTitle: function () {
      this.bookmarkTitlesForm.titles.push(
          {
            title: ""
          }
      )
    },
    setBookmarkTitles: function (){
      axios.post('http://192.168.1.2:3000/connect/addBookmarkTitles',{
        bookmarkTitles:this.bookmarkTitlesForm.titles
      })
      .then(res=>{
        console.log(res);
        this.getBookmarks();
        this.$message({
          message:'添加成功',
          type:'success'
        });
      })
      .catch(err=>{
        console.log(err);
        this.$message({
          message:'添加失败',
          type:'error'
        })
      })
    }
  },
  mounted() {
    this.getBookmarks();
  }
}
</script>

<style scoped>
.el-collapse >>> .el-collapse-item__header, .el-collapse >>> .el-collapse-item__wrap {
  background: no-repeat;
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