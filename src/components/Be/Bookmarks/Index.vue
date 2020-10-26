<template>
  <el-tabs class="Bookmarks" type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-tickets"/>书签组列表</span>
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
            label="标签组名"
            width="200"
        >
          <template slot-scope="scope">

            <el-tooltip v-if="!scope.row.edit" :content="scope.row.tb_bookmark_title.title" placement="top" effect="light">
              <span>{{ scope.row.tb_bookmark_title.title }}</span>
            </el-tooltip>
            <el-input v-if="scope.row.edit" v-model="scope.row.editData.title"
                      :placeholder="scope.row.tb_bookmark_title.title"/>
          </template>
        </el-table-column>
        <el-table-column
            label="标签名"
            width="200"
        >
          <template slot-scope="scope">
            <el-tooltip v-if="!scope.row.edit" :content="scope.row.name" placement="top" effect="light">
            <span>{{ scope.row.name }}</span>
            </el-tooltip>
            <el-input v-if="scope.row.edit" v-model="scope.row.editData.name"
                      :placeholder="scope.row.name"/>
          </template>
        </el-table-column>
        <el-table-column
            label="地址"
        >
          <template slot-scope="scope">
            <el-tooltip v-if="!scope.row.edit" :content="scope.row.url" placement="top" effect="light">
            <span>{{ scope.row.url }}</span>
            </el-tooltip>
            <el-input v-if="scope.row.edit" v-model="scope.row.editData.url"
                      :placeholder="scope.row.url"/>
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
                @click.prevent="editTableData(scope.row,scope.$index)"
            />
            <el-button
                v-if="scope.row.edit"
                type="primary"
                icon="el-icon-check"
                @click.prevent="()=>this.tableData[scope.$index].edit=false"
                circle
            />
            <el-button
                v-if="!scope.row.edit"
                circle
                icon="el-icon-delete"
                type="danger"
                @click.prevent="delTableData(scope.row._id)"
            />
            <el-button
                v-if="scope.row.edit"
                circle
                icon="el-icon-close"
                type="danger"
                @click.prevent="()=>tableData[scope.$index].edit=false"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="pageAction"
          :hide-on-single-page="true"
          :page-count="tableDataPage.pageCount"
          :page-size="tableDataPage.pageSize"
          :total="tableDataPage.total"
          background
          layout="prev, pager, next,total"
          @current-change="handleCurrentChange"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
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
      await axios.get('http://127.0.0.1:3000/connect/aggregatePagination', {
        params: {
          page: pageIndex,
          pagesize: this.tableDataPage.pageSize,
        }
      })
          .then(res => {
            let data = [];
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
    delTableData: async function () {
      console.log('删除！');
    },
    editTableData: async function (data, index) {
      this.tableData[index].edit = true;
    },
    handleCurrentChange: function (pageIndex) {
      this.getTableData(pageIndex);
    }
  },
  mounted() {
    this.getTableData(this.tableDataPage.pageIndex);
  }
}
</script>

<style lang="less" scoped>
.el-tabs {
  height: calc(100% - 20px);
  .cell span{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
.Bookmarks{
  .el-tabs__content{
    height: calc(100% - 30px - 39px);
  }
  .pageAction{
    padding: 20px 0;
  }
}
</style>