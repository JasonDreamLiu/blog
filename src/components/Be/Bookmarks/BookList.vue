<template>
  <div class="BookList">
    <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column
          label="序号"
          width="50"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + (tableDataPage.pageIndex - 1) * tableDataPage.pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="所属书签组"
          width="200"
      >
        <template slot-scope="scope">

          <el-tooltip v-if="!scope.row.edit" :content="scope.row.tb_bookmark_title.title" effect="light"
                      placement="top">
            <span>{{ scope.row.tb_bookmark_title.title }}</span>
          </el-tooltip>
          <el-autocomplete
              v-if="scope.row.edit"
              v-model="scope.row.editData.title"
              :fetch-suggestions="getBookmarkTitles"
              :placeholder="scope.row.tb_bookmark_title.title"
          />
        </template>
      </el-table-column>
      <el-table-column
          label="书签"
          width="200"
      >
        <template slot-scope="scope">
          <el-tooltip v-if="!scope.row.edit" :content="scope.row.name" effect="light" placement="top">
            <span>{{ scope.row.name }}</span>
          </el-tooltip>
          <el-input v-if="scope.row.edit" v-model="scope.row.editData.name"
                    :placeholder="scope.row.name"/>
        </template>
      </el-table-column>
      <el-table-column
          label="url地址"
      >
        <template slot-scope="scope">
          <el-tooltip v-if="!scope.row.edit" :content="scope.row.url" effect="light" placement="top">
            <span>{{ scope.row.url }}</span>
          </el-tooltip>
          <el-input v-if="scope.row.edit" v-model="scope.row.editData.url"
                    :placeholder="scope.row.url.split('http://')[1]">
            <template slot="prepend">http://</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="200"
      >
        <template slot-scope="scope">
          <el-button
              v-if="!scope.row.edit"
              circle
              icon="el-icon-edit"
              type="primary"
              @click.prevent="tableData[scope.$index].edit = true"
          />
          <el-button
              v-if="scope.row.edit"
              circle
              icon="el-icon-check"
              type="primary"
              @click.prevent="editTableData(scope.row,scope.$index)"
          />
          <el-button
              v-if="scope.row.edit"
              circle
              icon="el-icon-close"
              type="danger"
              @click.prevent="tableData[scope.$index].edit=false"
          />
          <el-popconfirm
              v-if="!scope.row.edit"
              style="margin-left: 10px"
              title="确定删除这条书签吗？"
              @onConfirm="delTableData(scope.row._id)"
          >
            <el-button
                slot="reference"
                circle
                icon="el-icon-delete"
                type="danger"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="tableDataPage.pageIndex"
        :hide-on-single-page="true"
        :page-count="tableDataPage.pageCount"
        :page-size="tableDataPage.pageSize"
        :total="tableDataPage.total"
        background
        class="pageAction"
        layout="prev, pager, next,total"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import axios from "axios";
import Api from "@/ApiConfig/api";
import {Message} from "element-ui";
import io from "socket.io-client";

export default {
  name: "BookList",
  data() {
    return {
      tableData: [],
      tableLoading: false,
      tableDataPage: {
        pageIndex: 1,
        pageSize: 10,
        pageCount: 7,
        total: 0
      },
      tableDataSel: {
        name: "",
        url: "",
        bookmark_id: ""
      }
    }
  },
  methods: {
    getTableData: async function (pageIndex) {
      this.tableLoading = true;
      await axios.get(Api.url + Api.aggregatePagination, {
        params: {
          page: pageIndex,
          pagesize: this.tableDataPage.pageSize,
        }
      })
          .then(res => {
            let data = [];
            if (res.data.datas.length < 1) {
              this.getTableData(pageIndex - 1);
              return;
            }
            res.data.datas.forEach(item => {
              item.edit = false;
              item.editData = {
                title: "",
                url: "",
                name: ""
              }
              data.push(item)
            })
            console.log(data);
            this.tableData = data;
            this.tableDataPage.total = res.data.total;
            this.tableDataPage.pageIndex = pageIndex;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.tableLoading = false;
          })
    },
    delTableData: async function (id) {
      console.log('删除！');
      await axios.post(Api.url + Api.delBookmarksTypes, {id})
          .then(res => {
            console.log(res);
            if (res.statusText === "OK") {
              const data = res.data;
              if (data.result.ok && data.result.n > 0) {
                Message({
                  message: '成功删除' + data.result.n + '条数据！',
                  type: 'success'
                })
                this.$store.state.io.emit('Refresh',true);
                this.getTableData(this.tableDataPage.pageIndex);
              } else if (res.result.ok && res.result.n < 1) {
                Message({
                  message: '删除失败，意外错误！：请联系管理员',
                  type: 'error'
                })
              } else {
                Message({
                  message: '删除失败，参数可能有误！：请联系管理员',
                  type: 'error'
                })
              }
            }
          })
          .catch(err => {
            Message({
              message: '系统错误：' + err,
              type: 'error'
            })
          })
    },
    editTableData: async function (data, index) {
      if (data.editData.title || data.editData.url || data.editData.name) {
        if (data.editData.url&&!data.editData.url.split("http://")[1]){
          data.editData.url = "http://" + data.editData.url;
        }
        await axios.post(Api.url + Api.updateBookmarkTypes, {data: data.editData, id: data._id})
            .then(res => {
              console.log(res);
              if (res.statusText === "OK") {
                const data = res.data;
                if (data.result.ok && data.result.nModified > 0) {
                  Message({
                    message: '修改成功！',
                    type: 'success'
                  })
                  this.$store.state.io.emit('Refresh',true);
                  this.getTableData(this.tableDataPage.pageIndex);
                } else if (res.result.ok && res.result.nModified < 1) {
                  Message({
                    message: '修改失败，未知原因！：请联系管理员',
                    type: 'error'
                  })
                } else {
                  Message({
                    message: '修改失败，填写参数可能有误！：请联系管理员',
                    type: 'error'
                  })
                }
              } else {
                Message({
                  message: '请求错误！：请联系管理员',
                  type: 'error'
                })
              }
            })
            .catch(err => {
              Message({
                message: '系统错误：' + err,
                type: 'error'
              })
            })
        console.log(data.editData);
        this.tableData[index].edit = false;
      } else {
        Message({
          message: '无任何修改，无需提交！',
          type: 'info'
        })
      }
    },
    getBookmarkTitles: async function (queryString, cb) {
      console.log(queryString);
      await axios.get(Api.url + Api.selBookmarkTitles, {
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
    handleCurrentChange: function (pageIndex) {
      this.getTableData(pageIndex);
    }
  },
  mounted() {
    this.getTableData(this.tableDataPage.pageIndex);
    if (!this.$store.state.io){
      this.$store.commit('setIo',io(Api.ws,{path:Api.wsPath}));
    }
    this.$store.state.io.on('Refresh',success=>{
      if (success){
        this.getTableData(this.tableDataPage.pageIndex);
      }
    })
  }
}
</script>

<style lang="less" scoped>
.cell span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.BookList {
  .pageAction {
    padding: 20px 0;
  }
}
</style>