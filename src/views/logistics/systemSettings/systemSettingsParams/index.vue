<!-- 参数设置 -->
<template>
  <div class="wrapper">
    <div class="dealer-info">
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="参数名称" prop="paramName">
          <el-input v-model="search.paramName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="record">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="configName" label="参数名称"><template slot-scope="{row}">{{row.configName || '--'}}</template></el-table-column>
          <el-table-column prop="configCode" label="参数代码"><template slot-scope="{row}">{{row.configCode || '--'}}</template></el-table-column>
          <el-table-column prop="configValue" label="参数值"><template slot-scope="{row}">{{row.configValue || '--'}}</template></el-table-column>
          <el-table-column prop="configText" label="说明"><template slot-scope="{row}">{{row.configText || '--'}}</template></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleSystem(scope.$index, scope.row)" type="primary">设置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>

      <!-- 参数设置 -->
      <el-dialog :modal-append-to-body="false" title="参数设置" :close-on-click-modal="false" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <h2>参数设置</h2>
        <div class="dialog-box">
          <el-form :inline="true" :model="ruleForm" :rules="rule" ref="ruleForm">
            <el-form-item label="参数名称" prop="configText">
              <el-input v-model="ruleForm.configText" placeholder="请输入参数说明"></el-input>
            </el-form-item>
            <el-form-item label="参数值" prop="configValue">
              <el-input v-model="ruleForm.configValue" placeholder="请输入参数值"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancle">取 消</el-button>
          <el-button type="primary" @click="handleConfig">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "systemSettingsParams",
  data() {
    return {
      dataloading: true,
      dialogVisible: false, //添加角色
      totalRecords: 0,
      search: {
        paramName: "",
        currentPage: 1,
        pageSize: 10
      },
      searchrules: {},
      tableData: [],
      ruleForm: {
        configID:"",
        configText: "", //参数说明
        configValue:"", //参数值
      },
      rule: {
        configText: [
          { required: true, message: "请输入参数说明", trigger: "submit" }
        ],
        configValue: [
          { required: true, message: "请输入参数值", trigger: "submit" }
        ]
      }
    };
  },
  methods: {
    //获取列表
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.getListConfig(Params).then(res => {
        if (res.statusCode === 200) {
          this.dataloading = false;
          this.tableData = res.message.records;
          this.totalRecords = res.message.totalRecords;
        }
      });
    },


    // 参数设置
    handleSystem(index,row){
        this.dialogVisible = true
        this.ruleForm = {
          configID:row.configID,
          configText:row.configText,
          configValue:row.configValue
        }
        this.$Alert.show(this.$route.name)
        if (this.$refs.ruleForm) {
          this.$refs["ruleForm"].resetFields();
        }
    },

    // 取消
    handleCancle() {
      this.$Alert.hidden(this.$route.name)
      this.dialogVisible = false
    },


    //参数设置确定
    handleConfig(){
        this.$refs["ruleForm"].validate(valid => {
          if(valid){
            http.updateConfig(this.ruleForm).then(res => {
              if (res.statusCode === 200) {
                this.$message.success(res.message);
                this.$Alert.hidden(this.$route.name)
                this.dialogVisible = false
                this.getlist();
              }else{
                this.$message.error(res.message);
              }
            });
          }
        })

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
    handleClose(done) {
      this.$Alert.hidden(this.$route.name)
      done();
    },

  },
  activated() {
    this.$shadow.shadow(this, this.cachedViews);
  },
  computed: {
    cachedViews() {
      return this.$store.state.permission.cachedViews;
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>
</style>
