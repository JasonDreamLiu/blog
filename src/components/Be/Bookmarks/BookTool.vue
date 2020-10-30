<template>
  <div>
    <div class="console">
      <el-form ref="bookmarkTitlesForm" :model="bookmarkTitlesForm">
        <el-form-item
            v-for="(item,index) in bookmarkTitlesForm.titles"
            :key="index"
            :label="`书签组名${index+1}`"
            :prop="'titles.'+index+'.title'"
            :rules="[
                {required: true, message: '书签组名不能为空', trigger: 'blur'},
                {validator:bookmarkTitlesFormValidator,trigger: 'blur'}
                ]"
        >
          <el-input v-model="item.title"></el-input>
          <el-button v-if="bookmarkTitlesForm.titles.length>1" @click.prevent="removeBookmarkTitles(item)">删除
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addBookmarkTitle">新增</el-button>
          <el-button type="primary" @click="submitForm('bookmarkTitlesForm',setBookmarkTitles)">提交</el-button>
        </el-form-item>
      </el-form>

      <hr id="h12">
      <el-form ref="bookmarksForm" :model="bookmarksForm">
        <el-table
            :data="bookmarksForm.addBookmarks"
        >
          <el-table-column
              label="序列"
              width="50"
          >
            <template slot-scope="scope">
              <el-form-item><span>{{ scope.$index + 1 }}</span></el-form-item>
            </template>
          </el-table-column>
          <el-table-column
              label="书签组名"
              width="200"
          >
            <template slot-scope="scope">
              <el-form-item
                  :prop="'addBookmarks.'+scope.$index+'.title'"
                  :rules="[
                  {required: true, message: '书签组名不能为空', trigger: 'change'}
                ]"
              >
                <el-autocomplete
                    v-model="bookmarksForm.addBookmarks[scope.$index].title"
                    :fetch-suggestions="getBookmarkTitles"
                    placeholder="请输入书签组名"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
              label="书签名"
              width="200"
          >
            <template slot-scope="scope">
              <el-form-item
                  :prop="'addBookmarks.'+scope.$index+'.name'"
                  :rules="[
                  {required: true, message: '书签名不能为空', trigger: 'blur'}
                ]"
              >
                <el-input
                    v-model="bookmarksForm.addBookmarks[scope.$index].name"
                    placeholder="请输入书签名"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
              label="链接"
          >
            <template slot-scope="scope">
              <el-form-item
                  :prop="'addBookmarks.'+scope.$index+'.url'"
                  :rules="[
                  {required: true, message: '链接不能为空', trigger: 'blur'},
                  {type: 'url', message: '请输入正确的链接！', trigger: 'blur'}
                ]"
              >
                <el-input v-model="bookmarksForm.addBookmarks[scope.$index].url" placeholder="请输入链接"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              width="150"
          >
            <template slot-scope="scope">
              <el-form-item>
                <el-button circle icon="el-icon-plus" @click="addBookmarks"/>
                <el-button
                    v-if="bookmarksForm.addBookmarks.length>1"
                    circle
                    icon="el-icon-minus"
                    @click.prevent="removeBookmarks(bookmarksForm.addBookmarks[scope.$index])"
                />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item>
          <el-button :loading="addBookmarksLod" type="primary" @click="submitForm('bookmarksForm',setBookmarks)">提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Message} from "element-ui";
import Api from "@/ApiConfig/api";
import io from "socket.io-client";

export default {
  name: "BookTool",
  data() {
    return {
      addBookmarksLod: false,
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
            name: "",
            url: ""
          }
        ]
      },
      bookmarkTitlesFormValidator: async (rule, value, callback) => {
        await axios.get(Api.url+Api.selIsBookmarkTitle, {
          params: {
            title: value
          }
        })
            .then(res => {
              if (res.data) {
                callback("该书签组名已存在！")
              }
            }).catch(err => {
              console.log(err);
              callback()
            })
        if (await this.isRepetition(this.bookmarkTitlesForm.titles, "title", value, 1)) {
          callback(new Error('请不要输入多个相同书签组名！'));
        } else {
          callback()
        }
      },
    }
  },
  methods:{
    submitForm: function (formName, fn) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
          if (fn) {
            fn();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
    getBookmarkTitles: async function (queryString, cb) {
      console.log(queryString);
      await axios.get(Api.url+Api.selBookmarkTitles, {
        params: {
          title: queryString
        }
      }).then(res => {
        console.log(res);
        cb(res.data);
      }).catch(err => {
        console.log(err);
      })
    },
    addBookmarks: function () {
      this.bookmarksForm.addBookmarks.push(
          {
            title: "",
            name: "",
            url: ""
          }
      )
    },
    removeBookmarks: function (item) {
      const index = this.bookmarksForm.addBookmarks.indexOf(item);
      if (index !== -1) {
        this.bookmarksForm.addBookmarks.splice(index, 1);
      }
    },
    setBookmarkTitles: async function () {
      await axios.post(Api.url+Api.addBookmarkTitles, this.bookmarkTitlesForm.titles)
          .then(res => {
            console.log(res);
            if (res.data.result.success) {
              Message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              Message({
                message: '添加失败',
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
            Message({
              message: '添加失败',
              type: 'error'
            })
          })
    },
    setBookmarks: async function () {
      this.addBookmarksLod = true;
      await axios.post(Api.url+Api.addBookmarks, this.bookmarksForm.addBookmarks)
          .then(res => {
            console.log(res);
            if (res.data.result.success) {
              Message({
                message: '添加成功',
                type: 'success'
              });
              this.$store.state.io.emit('Refresh',true);
            } else {
              Message({
                message: '添加失败',
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
            Message({
              message: '添加失败',
              type: 'error'
            })
          })
          .finally(() => {
            this.addBookmarksLod = false;
          })
    },
    isRepetition: async function (list, type, item, i) {
      let a = 0;
      list.forEach(item_ => {
        console.log(item_);
        if (item_[type] === item) {
          a++;
        }
      })
      return a > i;
    }
  },
  mounted() {
    if (!this.$store.state.io){
      this.$store.commit('setIo',io('http://172.26.40.247:3000'));
    }
  }
}
</script>

<style scoped>

</style>