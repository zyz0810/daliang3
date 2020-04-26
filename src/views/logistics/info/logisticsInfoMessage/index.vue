<!-- 消息管理 -->
<template>
  <div class="wrapper">
    <div class="dealer-info">
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="发布对象" prop="userType">
          <el-select v-model="search.userType" placeholder="请选择">
            <el-option label="个人" :value="1"></el-option>
            <el-option label="司机" :value="2"></el-option>
            <el-option label="所有人" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="startTime" class="date-form-item">
          <el-date-picker v-model="search.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:" placeholder="选择开始日期" :picker-options="pickerOptionsStart"></el-date-picker>
          <span>—</span>
        </el-form-item>
        <el-form-item prop="endTime" class="end-Data-item">
          <el-date-picker v-model="search.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:"  placeholder="选择结束日期" :picker-options="pickerOptionsEnd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
        </el-form-item>
        <div>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </div>
      </el-form>

      <div class="record">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号" min-width="5%"></el-table-column>
          <el-table-column prop="roleName" show-overflow-tooltip label="发布对象" min-width="12%">
            <template slot-scope="scope">
              <template v-if="scope.row.pushType === 1 ">个人</template>
              <template v-if="scope.row.pushType === 2 ">司机</template>
              <template v-if="scope.row.pushType === 3 ">所有人</template>
            </template>
          </el-table-column>
          <el-table-column prop="pushText" show-overflow-tooltip label="内容" min-width="50%"><template slot-scope="{row}">{{row.pushText || '--'}}</template></el-table-column>
          <el-table-column prop="operatorUserName" show-overflow-tooltip label="发布者" min-width="10%"><template slot-scope="{row}">{{row.operatorUserName || '--'}}</template></el-table-column>
          <el-table-column prop="pushTime" show-overflow-tooltip label="发布时间" min-width="15%"><template slot-scope="{row}">{{row.pushTime || '--'}}</template></el-table-column>
          <el-table-column prop="pushState" show-overflow-tooltip label="状态" min-width="8%">
            <template slot-scope="scope">
              <template v-if="scope.row.pushState === 1 ">发布</template>
              <template v-if="scope.row.pushState === 2 ">未发布</template>
              <template v-if="scope.row.pushState === null ">--</template>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="34%">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.pushState === 2" @click="handleEdit(scope.$index, scope.row)" type="warning">修改</el-button>
              <el-button size="small" type="info" v-else disabled>修改</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
              <el-button size="small" type="primary" v-if="scope.row.pushState === 2" @click="handlePublish(scope.$index, scope.row)">发布</el-button>
              <el-button size="small" type="info" v-else disabled>发布</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>

      <!-- 消息发布 -->
      <el-dialog :modal-append-to-body="false" title="消息发布" :close-on-click-modal="false" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <h2>消息发布</h2>
        <div class="dialog-box">
          <el-form :inline="true" :model="ruleForm" :rules="rule" ref="ruleForm">
            <el-form-item label="发布对象" prop="userType">
              <el-select v-model="ruleForm.userType" placeholder="请选择">
                <el-option label="个人" :value="1"></el-option>
                <el-option label="司机" :value="2"></el-option>
                <el-option label="所有人" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布内容" prop="pushText" class="form-textarea">
              <el-input type="textarea" v-model="ruleForm.pushText" placeholder="" ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCloseDial">取 消</el-button>
          <el-button type="primary"  @click="handleSubmit">{{dialTxt}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "logisticsInfoMessage",
  data() {
    return {
      dataloading: true,
      dialogVisible: false, //添加角色
      authLoading: false,
      totalRecords: 0,
      dialTxt:'确定',
      type:1,//新增
      search: {
        userType: "",
        startTime:"",
        endTime:"",
        currentPage: 1,
        pageSize: 10
      },
      pushID:'',//修改ID
      searchrules: {},
      tableData: [],
      ruleForm: {
        userType: "",
        pushText: ""
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
      rule: {
        userType: [
          { required: true, message: "请选择发布对象", trigger: "change" }
        ],
        pushText: [
          { required: true, message: "请输入发布内容", trigger: "blur" }
        ],
      }
    };


  },
  methods: {
    //获取列表
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.pushMessageList(Params).then(res => {
        if (res.statusCode === 200) {
          this.dataloading = false;
          this.tableData = res.message.records;
          this.totalRecords = res.message.totalRecords;
        }
      });
    },

    //新增
    handleAdd(){
       this.type = 1
       this.dialogVisible = true
       this.$Alert.show(this.$route.name)
       this.dialTxt = "确定"
       if (this.$refs.ruleForm) {
         this.$refs["ruleForm"].resetFields();
       }
    },

    // 编辑
    handleEdit(indexe,row){
        this.pushID = row.pushID
        this.type = 2
        this.dialogVisible = true
        this.$Alert.show(this.$route.name)
        this.dialTxt = "确定修改"
        if (this.$refs.ruleForm) {
          this.$refs["ruleForm"].resetFields();
        }
        this.ruleForm.userType = row.pushType
        this.ruleForm.pushText = row.pushText
    },


    //删除
    handleDelete(index,row){
        let data = {
          pushID:row.pushID
        }
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          http.delPush(data).then(res => {
            if (res.statusCode === 200) {
              this.$message.success(res.message);
              this.getlist();
            } else {
              this.$message.error(res.message);
            }
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //发布
    handlePublish(index,row){
      let data = {
        pushID:row.pushID
      }
      this.$confirm("确定发布消息吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http.publishMessage(data).then(res => {
          if (res.statusCode === 200) {
            this.$message.success(res.message);
            this.getlist();
          } else {
            this.$message.error(res.message);
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },



    // 确定和修改消息
    handleSubmit(){
      this.$refs["ruleForm"].validate(valid => {
        if(valid){
          if(this.type == 1){
            //新增
            let data = Object.assign({}, this.ruleForm);
            http.addPush(data).then(res => {
                this.dialogVisible = false;
                if (res.statusCode === 200) {
                  this.$Alert.hidden(this.$route.name)
                  this.$message.success(res.message);
                  this.getlist();
                } else {
                  this.$message.error(res.message);
                }
              }) .catch(() => {

              });
          }else if(this.type == 2){
            //修改
             let data = {
               pushID:this.pushID,
               userType:this.ruleForm.userType,
               pushText:this.ruleForm.pushText
             }
            http.updatePush(data).then(res => {
              if (res.statusCode === 200) {
                this.$Alert.hidden(this.$route.name)
                this.dialogVisible = false
                this.$message.success(res.message);
                this.getlist();
              } else {
                this.$message.error(res.message);
              }
            })
          }
        }
      })


    },

    handleCloseDial(){
       this.dialogVisible = false
       this.$Alert.hidden(this.$route.name)
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
    handleCloseRole(done) {
      this.$Alert.hidden(this.$route.name)
      done();
    }
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
.addMoney .el-select {
  width: 202px;
}
.wrapper {
  /deep/ .el-checkbox {
    width: 50%;
    margin-right: 0;
  }
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 202px;
}
</style>
