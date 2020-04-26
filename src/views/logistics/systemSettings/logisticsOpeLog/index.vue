<!-- 操作日志查询 -->
<template>
  <div class="wrapper">
    <div class="dealer-info">
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="操作人" prop="roleName">
          <el-input v-model="search.roleName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="操作功能菜单" prop="roleName">
          <el-input v-model="search.roleName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="登录时间" prop="startTime" class="date-form-item">
          <el-date-picker v-model="search.startTime" type="date" placeholder="选择开始日期"></el-date-picker>
          <span>—</span>
        </el-form-item>
        <el-form-item prop="endTime" class="end-Data-item">
          <el-date-picker v-model="search.endTime" type="date" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="record">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="roleName" label="账号"><template slot-scope="{row}">{{row.roleName || '--'}}</template></el-table-column>
          <el-table-column prop="roleRemark" label="操作人"><template slot-scope="{row}">{{row.roleName || '--'}}</template></el-table-column>
          <el-table-column prop="roleRemark" label="操作人IP"><template slot-scope="{row}">{{row.roleName || '--'}}</template></el-table-column>
          <el-table-column prop="roleRemark" label="操作时间"><template slot-scope="{row}">{{row.roleName || '--'}}</template></el-table-column>
          <el-table-column prop="roleRemark" label="操作功能菜单"><template slot-scope="{row}">{{row.roleName || '--'}}</template></el-table-column>
          <el-table-column prop="roleRemark" label="操作结果"><template slot-scope="{row}">{{row.roleName || '--'}}</template></el-table-column>
          <el-table-column prop="roleRemark" label="操作内容"><template slot-scope="{row}">{{row.roleName || '--'}}</template></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "logisticsOpeLog",
  data() {
    return {
      dataloading: true,
      authLoading: false,
      totalRecords: 0,
      search: {
        roleName: "",
        currentPage: 1,
        pageSize: 10
      },
      searchrules: {},
      tableData: [],
      ruleForm: {
        roleName: "",
        roleRemark: ""
      },
    };
  },
  methods: {
    //获取列表
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.getRolesList(Params).then(res => {
        if (res.statusCode === 200) {
          this.dataloading = false;
          // this.tableData = res.message.records;
          // this.totalRecords = res.message.totalRecords;
        }
      });
    },

    //重置
    resealist: function() {
      this.$refs["search"].resetFields();
      this.getlist();
    },
    //页数
    handleCurrentChange: function(val) {
      this.search.currentPage = val;
      this.getlist();
    },
  },

  mounted() {
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>

</style>
