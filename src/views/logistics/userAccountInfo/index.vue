<!-- 用户账户数据信息 -->
<template>
  <div class="dealer-info">
    <div>
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="账号" prop="account">
          <el-input v-model="search.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="search.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
          <el-button type="warning" @click="expertExcel()">导出</el-button>
        </el-form-item>
      </el-form>

      <div class="record">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号"></el-table-column>

          <el-table-column prop="userName" label="用户名称"><template slot-scope="{row}">{{row.userName || '--'}}</template></el-table-column>
          <el-table-column prop="userAccount" label="账号"><template slot-scope="{row}">{{row.userAccount || '--'}}</template></el-table-column>
          <el-table-column prop="orderProgressing" label="发单次数"><template slot-scope="{row}">{{row.orderProgressing || '0'}}</template></el-table-column>
          <el-table-column prop="orderCancel" label="取消订单次数"><template slot-scope="{row}">{{row.orderCancel || '0'}}</template></el-table-column>
          <el-table-column prop="orderSuccess" label="完成订单数"><template slot-scope="{row}">{{row.orderSuccess || '0'}}</template></el-table-column>
          <el-table-column prop="orderTrafficvolume" label="累计发货量" ><template slot-scope="{row}">{{row.orderTrafficvolume || '0'}}吨</template></el-table-column>
          <el-table-column prop="userLogin" label="启动次数"><template slot-scope="{row}">{{row.userLogin || '0'}}</template></el-table-column>
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
import utils from "@/utils/utils";
let that;

export default {
  name: 'userAccountInfo',
  beforeCreate() {
    that = this;
  },
  activated() {
    this.$shadow.shadow(this, this.cachedViews)
  },
  computed: {
    cachedViews() {
      return this.$store.state.permission.cachedViews
    }
  },
  filters: {
    // 类型
    userStatus(status) {
      let typeMap = {
        1: "个人",
        2: "交易商",
        3: "经纪人",
        4: "经纪人",
        6: "司机",
      };
      return typeMap[status];
    },
  },
  data() {
    return {
      dataloading: true,
      totalRecords: 0,
      search: {
        account: "", //账户
        name: "", //姓名
        type:2, //类型1司机2客户
        currentPage: 1,
        pageSize: 10
      },
      searchrules: {},
      tableData: [],
    };
  },
  methods: {
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.listDriverDetail(Params).then(data => {
        this.dataloading = false;
        if (data.statusCode === 200) {
          this.tableData = data.message.records;
          this.totalRecords = data.message.totalRecords;
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
    expertExcel:function(){
      let Params = this.search
      http.exportListDriverDetail(Params).then(res => {
        let fileName = '用户账户数据' + utils.parseTime(new Date(),"{y}-{m}-{d}") // 文件名
        let blob = new Blob([res], {
        	type: "application/vnd.ms-excel"
        });
        if (window.navigator.msSaveBlob) {
        	window.navigator.msSaveBlob(blob, fileName + '.xlsx');
        } else {
        	const elink = document.createElement('a');
        	elink.download = fileName;
        	elink.style.display = 'none';
        	elink.href = URL.createObjectURL(blob);
        	document.body.appendChild(elink);
        	elink.setAttribute('download', fileName + '.xlsx')
        	elink.click();
        	URL.revokeObjectURL(elink.href); // 释放URL 对象
        	document.body.removeChild(elink);
        }
      })
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>
