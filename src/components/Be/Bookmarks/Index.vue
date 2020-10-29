<template>
  <el-tabs class="Bookmarks" type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-tickets"/>书签组列表</span>
      <BookList/>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-s-platform"/> 书签多功能操作台 </span>
      <BookTool/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import BookList from "./BookList";
import BookTool from "./BookTool";

export default {
  name: "Index",
  components: {
    BookList,BookTool
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.el-tabs {
  height: calc(100% - 20px);

  .cell span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.Bookmarks {
  .pageAction {
    padding: 20px 0;
  }
}
</style>