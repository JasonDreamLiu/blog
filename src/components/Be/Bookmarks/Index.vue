<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-tickets" />书签组列表</span>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
            label="序号"
            width="50"
        >
          <template slot-scope="scope">
            <span>{{scope.$index+(tableDataPage.pageIndex-1)*tableDataPage.pageSize+1}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="标签组名"
            width="200"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{scope.row.tb_bookmark_title.title}}</span>
            <el-input v-if="scope.row.edit" v-model="scope.row.editData.title" :placeholder="scope.row.tb_bookmark_title.title" />
          </template>
        </el-table-column>
        <el-table-column
            label="标签名"
            width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="地址"
        >
          <template slot-scope="scope">
            <span>{{scope.row.url}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="200"
        >
          <template slot-scope="scope">
            <el-button
                v-if="!scope.row.edit"
                type="primary"
                icon="el-icon-edit"
                @click.prevent="editTableData(scope.row,scope.$index)"
                circle
            />
<!--            <el-button-->
<!--                v-if="scope.row.edit"-->
<!--                type="primary"-->
<!--                icon="el-icon-check"-->
<!--                @click.prevent="()=>this.tableData[scope.$index].edit=false"-->
<!--                circle-->
<!--            />-->
            <el-button
                v-if="!scope.row.edit"
                type="danger"
                icon="el-icon-delete"
                @click.prevent="delTableData(scope.row._id)"
                circle
            />
<!--            <el-button-->
<!--                v-if="scope.row.edit"-->
<!--                type="danger"-->
<!--                icon="el-icon-close"-->
<!--                @click.prevent="()=>this.tableData[scope.$index].edit=false"-->
<!--                circle-->
<!--            />-->
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data(){
    return {
      tableData:[],
      tableDataPage:{
        pageIndex:1,
        pageSize:5,
        total:0
      },
      tableDataSel:{
        name:"",
        url:"",
        bookmark_id:""
      }
    }
  },
  methods:{
    getTableData:async function (){
      await axios.get('http://127.0.0.1:3000/connect/aggregatePagination', {
        params:{
          page:this.tableDataPage.pageIndex,
          pagesize:this.tableDataPage.pageSize,
        }
      })
      .then(res=>{
        let data = [];
        res.data.forEach(item=>{
          item.edit = false;
          item.editData = {
            title:"",
            url:"",
            name:""
          }
          data.push(item)
        })
        console.log(data);
        this.tableData = data;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    delTableData:async function(){
      console.log('删除！');
    },
    editTableData:async function(data,index){
      this.tableData[index].edit = true;
    }
  },
  mounted() {
    this.getTableData();
  }
}
</script>

<style scoped>
.el-tabs{
  height: calc(100% - 20px);
}
</style>