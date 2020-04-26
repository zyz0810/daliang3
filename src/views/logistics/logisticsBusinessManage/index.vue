<!-- 订单业务查询 -->
<template>
  <div class="dealer-info">
    <div>
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="订单号" prop="orderID">
          <el-input v-model="search.orderID" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="search.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="startTime" class="date-form-item">
          <el-date-picker v-model="search.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:"  placeholder="选择开始日期" :picker-options="pickerOptionsStart"></el-date-picker>
          <span>—</span>
        </el-form-item>
        <el-form-item prop="endTime" class="end-Data-item">
          <el-date-picker v-model="search.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:" placeholder="选择结束日期" :picker-options="pickerOptionsEnd"></el-date-picker>
        </el-form-item>
        <el-form-item label="完成状态" prop="state">
          <el-select v-model="search.state" placeholder="请选择">
            <el-option label="发布" :value="1"></el-option>
            <el-option label="已过期" :value="2"></el-option>
            <el-option label="完成" :value="3"></el-option>
            <el-option label="取消" :value="4"></el-option>
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
          <el-button type="warning" @click="exportExcel()">导出</el-button>
        </el-form-item>
      </el-form>

      <div class="record">
         <el-table :data="tableData"  :row-key='getRowKeys' :expand-row-keys="expands"  ref="table"  stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
            <el-table-column type="index" label="序号" ></el-table-column>
            <el-table-column show-overflow-tooltip label="发布人" ><template slot-scope="{row}">{{row.userName || '--'}}</template></el-table-column>
            <el-table-column show-overflow-tooltip label="账号" ><template slot-scope="{row}">{{row.userAccount || '--'}}</template></el-table-column>
            <el-table-column show-overflow-tooltip label="订单号" ><template slot-scope="{row}">{{row.orderNumber || '--'}}</template></el-table-column>
            <el-table-column show-overflow-tooltip label="货物类型" ><template slot-scope="{row}">{{row.transportGoods || '--'}}</template></el-table-column>
            <el-table-column show-overflow-tooltip label="货物总重" ><template slot-scope="{row}">{{row.totalWeight || '0'}} 吨</template></el-table-column>
            <el-table-column show-overflow-tooltip label="起点" ><template slot-scope="{row}">{{row.startAddress || '--'}}</template></el-table-column>
            <el-table-column show-overflow-tooltip label="终点" ><template slot-scope="{row}">{{row.endAddress || '--'}}</template></el-table-column>
            <el-table-column show-overflow-tooltip label="订单时间" ><template slot-scope="{row}">{{row.orderTime || '--'}}</template></el-table-column>
            <el-table-column show-overflow-tooltip label="订单截止时间" ><template slot-scope="{row}">{{row.endTime || '--'}}</template></el-table-column>
            <el-table-column prop="status"  show-overflow-tooltip label="状态"><template slot-scope="{row}"> {{row.status | filterType}}</template></el-table-column>
            <el-table-column label="操作" width="100" align="center" prop="operation">
              <template slot-scope="scope">
                <el-button type="primary" @click="Getinfo(scope.row)" size="mini">详情</el-button>
              </template>
            </el-table-column>
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
export default {
  filters: {
    // 状态 1发布，2运输中，3完成，4取消
    filterType(status) {
      let typeMap = {
        1: "发布",
        2: "已过期",
        3: "完成",
        4: "取消",
      };
      return typeMap[status];
    },
  },
  data() {
    return {
      dataloading: false,
      totalRecords: 0,
      getRowKeys (row) {
        return row.orderID
      },
      pickerOptionsStart: {
         disabledDate: time => {
           let endDateVal = this.search.endTime;
           if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
           }
         }
      },
      pickerOptionsEnd: {
           disabledDate: time => {
             let beginDateVal = this.search.startTime;
             if (beginDateVal) {
               return (time.getTime()<new Date(beginDateVal).getTime()
             );
           }
        }
      },
      expands: [],
      search: {
        orderID: "",
        account: "",
        startTime: "",
        endTime: "",
        state:"", //状态 1发布，2运输中，3完成，4取消
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
      http.getLogisticsOrderList(Params).then(data => {
        this.dataloading = false;
        if (data.statusCode === 200) {
          this.tableData = data.message.records;
          this.totalRecords = data.message.totalRecords;
        }
      });
    },
    //导出excel
    exportExcel() {
      let Params = this.search
      http.exportOrderAndDriverList(Params).then(res => {
        let fileName = '订单业务' +  utils.parseTime(new Date(),"{y}-{m}-{d}") // 文件名
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
    },
    Getinfo(row) {
      this.$emit('isGetInfo',row)
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
<style scoped>
.reload-btn{
  position: absolute;
  right: 40px;
  top: 65px;
}
</style>
