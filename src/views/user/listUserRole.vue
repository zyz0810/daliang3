<!-- 角色分页设置 -->
<template>
  <div class="wrapper">
    <div class="dealer-info">
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="search.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
        </el-form-item>
        <div>
          <el-form-item>
            <el-button type="primary" @click="handleAddUser">添加</el-button>
          </el-form-item>
        </div>
      </el-form>

      <div class="record">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <!-- <el-table-column prop="roleID" label="角色类型"></el-table-column> -->
          <el-table-column prop="roleRemark" label="角色备注"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleRole(scope.$index, scope.row)" type="primary">配置权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>

      <!-- 添加角色 -->
      <el-dialog :modal-append-to-body="false" title="添加角色" :close-on-click-modal="false" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <h2>添加角色</h2>
        <div class="dialog-box addMoney">
          <el-form :inline="true" :model="ruleForm" :rules="authRule" ref="ruleForm">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色类型" prop="roleRemark">
              <el-select v-model="ruleForm."></el-select>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-form-item> -->
            <el-form-item label="角色备注" prop="roleRemark">
              <el-input v-model="ruleForm.roleRemark" placeholder="请输入角色备注"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserCancel">取 消</el-button>
          <el-button type="primary" v-loading="isSubmit" :disabled="isSubmit" @click="addUserSubmit">确定</el-button>
        </span>
      </el-dialog>


      <!-- 配置权限 -->
      <el-dialog :modal-append-to-body="false" title="配置权限" :close-on-click-modal="false" :visible.sync="dialogVisibleRole" width="70%" :before-close="handleCloseRole">
        <div v-loading="authLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-button size="small" @click="handleCheckedAll">全选</el-button>
         <ul>
            <li v-for="(item,index) in authorityLists" class="clearfix">
                <div class="left">{{item.functionName}}</div>
                <div class="right">
                  <div v-for="(child, index) in item.menuList" class="menu-list clearfix">
                   <div class="middle">{{child.functionName}}</div>
                   <div class="right-checkbox clearfix">
                     <!-- 三级 -->
                     <span class="menu-three">
                       <el-checkbox-group v-model="checkAuth">
                         <el-checkbox v-for="(childs, index) in child.menuList" :key="index" :label="childs.functionID" :class="childs.menuList == null ? 'noMenuList':'hasMenuList'">
                           <span class="menu-title"> {{childs.functionName}} </span>
                             <el-checkbox-group v-model="checkAuth2" class="menu-list-forth">
                               <el-checkbox v-for="(childss, key) in childs.menuList" :key="key" :label="childss.functionID" >
                                   {{childss.functionName}}
                               </el-checkbox>
                             </el-checkbox-group>
                         </el-checkbox>
                       </el-checkbox-group>
                     </span>
                     <!-- 四级 -->
                     <!-- <div class="menu-last">
                       <span v-for="(childs, index) in child.menuList" :key="index"  v-if="childs.menuList != null" >
                         <div class="menu-last-title">{{childs.functionName}}</div>
                         <el-checkbox-group v-model="checkAuth2">
                           <el-checkbox v-for="(childss, key) in childs.menuList" :key="key" :label="childss.functionID" v-if="childs.menuList != null">
                               {{childss.functionName}}
                           </el-checkbox>
                         </el-checkbox-group>
                       </span>
                     </div> -->
                    </div>
                  </div>
                </div>
            </li>
            <li class=""></li>
          </ul>
          <div class="btns text-center mt30">
            <el-button type="primary" @click="handleAuthSubmit">确认</el-button>
            <el-button type="primary" @click="handleCancleAuth">取消全选</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "listUserRole",
  data() {
    return {
      dataloading: true,
      dialogVisible: false, //添加角色
      dialogVisibleRole: false, //分配角色
      authorityLists: [], // 所有权限
      checkAuth: [], // 选中的权限
      checkAuth2:[],
      authLoading: false,
      totalRecords: 0,
      isSubmit: false,
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
      ss:'',
      authRule: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "submit" }
        ]
      }
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
          this.tableData = res.message.records;
          this.totalRecords = res.message.totalRecords;
        }
      });
    },
    handleAddUser() {
      this.$Alert.show(this.$route.name)
      this.dialogVisible = true;
    },
    // 添加确定
    addUserSubmit() {
      this.$refs["ruleForm"].validate(vaild => {
        if (vaild) {
          this.isSubmit = true;
          let data = Object.assign({}, this.ruleForm);
          http
            .addRole(data)
            .then(res => {
              this.dialogVisible = false;
              if (res.statusCode === 200) {
                 this.isSubmit = false;
                this.$Alert.hidden(this.$route.name)
                this.$message.success(res.message);
                this.getlist();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(() => {
              this.isSubmit = false;
            });
        }
      });
    },
    // 添加取消
    addUserCancel() {
      this.$refs["ruleForm"].resetFields();
    },
    handleCancleAuth(){
      this.checkAuth = []
      this.checkAuth2 = []
    },
    // 获取权限列表
    getRoleFunction(roleID) {
      this.authLoading = true;
      http.getRoleFunction(roleID).then(res => {
        this.authLoading = false;
        if (res.statusCode === 200) {
          var arrChecked = []
          for(let item of res.message) {
              if(item.menuList) {
                  arrChecked = arrChecked.concat(item.menuList);
              }
          }

          var m = []
          for(let i = 0;i< arrChecked.length;i++){
            if(arrChecked[i].menuList){
              m = m.concat(arrChecked[i].menuList);
            }
            for(let j in arrChecked[i].menuList){
                if(arrChecked[i].menuList[j].checked == '1'){
                  arrChecked[i].menuList[j].checked = true
                }else{
                   arrChecked[i].menuList[j].checked = false
                }
            }
          }
          var f = [] //四级
          for(let i = 0;i< m.length;i++){
            if(m[i].menuList){
              f = f.concat(m[i].menuList);
            }
            for(let j in m[i].menuList){
                if(m[i].menuList[j].checked == '1'){
                  m[i].menuList[j].checked = true
                }else{
                   m[i].menuList[j].checked = false
                }
            }
          }
          var list = m.filter(item => {
            if (item.checked === true) {
              return item
            }
          })
          var list2 = f.filter(item =>{
            if (item.checked === true) {
              return item
            }
          })

          this.authorityLists = res.message;
          this.checkAuth = list.map(item => item.functionID);
          this.checkAuth2 = list2.map(item => item.functionID)
        }
      });
    },
    //分配权限
    handleRole(index, row) {
      this.$Alert.show(this.$route.name)
      this.dialogVisibleRole = true;
      this.roleID = row.roleID;
      this.getRoleFunction(row.roleID);
    },
    // 更新权限
    handleAuthSubmit() {
      let allAuthList = this.checkAuth.concat(this.checkAuth2)
      let authLists = allAuthList.join(",")
      let data = {
        roleID: this.roleID,
        values: authLists
      };
      console.log('authList2', authLists)
      http.updateRoleFunction(data).then(res => {
        if (res.statusCode === 200) {
          this.dialogVisibleRole = false;
          this.$Alert.hidden(this.$route.name)
          this.$message.success(res.message);
          this.getlist();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 选中所有权限
    handleCheckedAll() {
      var arrChecked = []
      for(let item of this.authorityLists) {
          if(item.menuList) {
              arrChecked = arrChecked.concat(item.menuList);
          }
      }
      var m = []
      for(let i = 0;i< arrChecked.length;i++){
        if(arrChecked[i].menuList){
          m = m.concat(arrChecked[i].menuList);
        }
        for(let j in arrChecked[i].menuList){
          arrChecked[i].menuList[j].checked = true
        }
      }
      var list = m.filter(item => {
        if (item.checked === true) {
          return item
        }
      })
      var f = [] //四级
      for(let i = 0;i< m.length;i++){
        if(m[i].menuList){
          f = f.concat(m[i].menuList);
        }
        for(let j in m[i].menuList){
          m[i].menuList[j].checked = true
        }
      }
      var list2 = f.filter(item =>{
        if (item.checked === true) {
          return item
        }
      })
      this.checkAuth = list.map(item => item.functionID);
      this.checkAuth2 = list2.map(item => item.functionID);
      //this.checkAuth = this.authorityLists.map(item => item.functionID);
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
    width: 25%;
    margin-right: 0;
  }
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 202px;
}

ul{
  border: 1px solid #EBEEF5;
  border-top: none;
  margin-top: 20px;
  position: relative;
}
li{
  box-sizing: border-box;
  border-top: 1px solid #EBEEF5;
  position: relative;
}
.left{
  width: 10%;
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  top:26%;
  left:0%;
  padding: 20px 0;
}

.left .el-checkbox {
  display: block !important;
}
.right-box{
  float: right;
  width: 60%;
  box-sizing: border-box;
  border-left: 1px solid #EBEEF5;
}
.menu-list{
  position: relative;
  border-bottom: 1px solid #EBEEF5;
}
.middle{
  width: 12%;
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  top:30%;
  left:0%;

}
.right{
    float: right;
    width: 90%;
    box-sizing: border-box;
    border-left: 1px solid #EBEEF5;
}
.right-checkbox{
  width: 86%;
  float: right;
  border-left: 1px solid #EBEEF5;

}
.clearfix::after{
  clear: both;
  display: table;
  content:''
}
.right .menu-list:last-child{
  border-bottom: none;
}
.right .el-checkbox::nth-of-type(4){
  display: none;
}
.menu-list:nth-child(odd){
  background: #F9F9F9;
}
li:nth-last-child(2) .menu-list:first-child{
  background: none;
}
li:nth-last-child(2) .menu-list:last-child{
  background: #F9F9F9;
}
span.menu-three {
    width: 46%;
    width: 100%;
    float: left;
    display: inline-block;
    border-right: 1px solid #EBEEF5;
}
.menu-three .el-checkbox{
  width: 100%;
  border-bottom: 1px solid #EBEEF5;
  padding: 10px 10px 10px 20px;
  padding: 0px 10px 0px 20px;
  box-sizing: border-box;
}
.menu-three .el-checkbox:last-child{
  border-bottom: none;
}
.menu-three .el-checkbox-group{
  width: 100%;

}
.menu-last{
  width: 53.8%;
  display: inline-block;
  box-sizing: border-box;
  padding-left: center;
}
.menu-last-title{
    display: inline-block;
    width: 30%;
    position: absolute;
    top: 30%;
    box-sizing: border-box;
    padding-left: 9%;
}
.menu-last .el-checkbox-group{
  float: right;
  width: 50.6%;
}
.menu-last .el-checkbox{
  width: 100%;
  border-bottom: 1px solid #EBEEF5;
  padding: 10px 10px 10px 20px;
  box-sizing: border-box;
}
li.border-line{
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0px;
    z-index: 999999;
    right: 21%;
    background: #EBEEF5;
}
/deep/ .hasMenuList > span.el-checkbox__input{
  display: none;
}
.menu-three  .hasMenuList.el-checkbox{
  padding: 0px;
}
.menu-title{
  display: block;
}

.menu-list-forth .el-checkbox{
    display: block;
    border-bottom: 1px solid #EBEEF5;
    padding: 10px 20px;
}
.noMenuList .menu-title{
  width: 100%;
  padding-left: 10px;
}

.hasMenuList .menu-title{
    width: 50%;
    float: left;
    margin-top: 3%;
    padding-left: 4%;
    box-sizing: border-box
}

.hasMenuList .menu-list-forth{
  float: right;
  width: 48.5%;
  border-left:1px solid #EBEEF5;
  box-sizing: border-box;
}

/deep/ .hasMenuList .el-checkbox__label{
  display: block;
}
/deep/ .hasMenuList .el-checkbox__label:after{
  clear: both;
  display: table;
  content: "";
}
/deep/ .hasMenuList .menu-list-forth .el-checkbox__label{
  display: inline-block;
}
/deep/ .right-checkbox .el-checkbox{
  margin-bottom: 0px;
}
/deep/ .noMenuList .el-checkbox__label{
  display: inline-block;
  width: 50%;
  border-right: 1px solid #EBEEF5;
  box-sizing: border-box;
  padding: 10px 0;
}
</style>
