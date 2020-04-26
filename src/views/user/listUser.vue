<!-- 用户分页设置 -->
<template>
  <div class="wrapper">
    <div class="dealer-info">
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="search.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
        </el-form-item>
        <div>
          <el-form-item>
            <el-button type="primary" @click="handleAddUser()">添加用户</el-button>
          </el-form-item>
        </div>
      </el-form>

      <div class="record">
        <el-table :data="tableDataList" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="userAccount" label="用户账号"></el-table-column>
          <el-table-column prop="userName" label="用户名称"></el-table-column>
          <el-table-column prop="userPhone" label="电话号码"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleRole(scope.$index, scope.row)" type="primary">分配角色</el-button>
              <el-button size="mini" @click="handleEdit(scope.row)" type="success">修改密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>

      <!-- 添加用户 -->
      <el-dialog :modal-append-to-body="false" title="添加用户" :close-on-click-modal="false" :visible.sync="dialogVisible" width="65%" :before-close="handleClose">
        <h2>基本信息</h2>
        <div class="dialog-box addMoney">
          <div>
            <el-form :inline="true" :model="ruleForm" class="demo-form-inline" :rules="rules" ref="ruleForm">
              <el-form-item label="账号" prop="userAccount">
                <el-input v-model="ruleForm.userAccount" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="ruleForm.userName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="userSex">
                <el-select v-model="ruleForm.userSex" placeholder="请选择">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                  <el-option label="保密" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详细地址" prop="userAddress">
                <el-input v-model="ruleForm.userAddress" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="userPhone">
                <el-input v-model="ruleForm.userPhone" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="出生日期" prop="userBirthday">
                <el-date-picker v-model="ruleForm.userBirthday" type="date" placeholder="" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model="ruleForm.userEmail" placeholder=""></el-input>
              </el-form-item>
              <div class="clear"></div>
              <el-form-item label="地址" prop="userProvince">
                <el-select v-model="ruleForm.userProvince" @change="choseCity">
                  <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="userCity" label-width="0">
                <el-select v-model="ruleForm.userCity" @change="choseBlock">
                  <el-option v-for="item in cityAll" :key="item.id" :label="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="userCounty" label-width="0">
                <el-select v-model="ruleForm.userCounty">
                  <el-option v-for="item in areaAll" :key="item.id" :label="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="addUser()" v-loading="isSubmit" :disabled="isSubmit">确定</el-button>
        </span>
      </el-dialog>

      <!-- 分配角色 -->
      <el-dialog :modal-append-to-body="false" title="分配角色" :close-on-click-modal="false" :visible.sync="dialogVisibleRole" width="70%" :before-close="handleCloseRole">
        <h2>分配角色</h2>
        <div class="dialog-box addMoney">
          <div>
            <el-table :data="tableData" ref="multipleTable" style="width: 100%" stripe v-loading="dataloading" @selection-change="handleSelectionChange" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="roleName" label="角色名称"></el-table-column>
              <el-table-column prop="roleID" label="角色名称"></el-table-column>
              <el-table-column prop="roleRemark" label="角色备注"></el-table-column>
              <el-table-column type="selection" prop="isChoosed"></el-table-column>
              <!-- <el-table-column type="selection" prop="isChoosed" :selectable="selectable"></el-table-column> -->
              <!-- <el-table-column label="操作" prop="isChoosed">
                    <template slot-scope="scope">
                      <template v-if="scope.row.isChoosed === true " @selection-change="handleSelectionChange">
                        <el-checkbox v-model="checked"></el-checkbox>
                      </template>
                      <template v-if="scope.row.isChoosed === false ">
                         <el-checkbox v-model="noChecked" @selection-change="handleSelectionChange"></el-checkbox>
                      </template>
                    </template>
                  </el-table-column> -->

            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCan">取 消</el-button>
          <el-button type="primary" @click="addUserRole()">绑 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改密码 -->
      <el-dialog :modal-append-to-body="false" title="修改密码" :close-on-click-modal="false" :visible.sync="dialogVisibleEdit" :before-close="handleCloseRole">
        <el-form style="height: 200px;" :inline="true" :model="edit" ref="editForm" :rules="editRules">
          <el-form-item label="新密码" prop="password">
            <el-input v-model="edit.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="edit.checkPass" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="btns text-center mt50">
            <el-button type="primary" @click="handleEditPass">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetAddressMap, choseAddress } from "@/common/js/common";
import {
  validateEMail,
  validatePhone,
  validatePassword
} from "@/common/js/validator";
import http from "@/api/http";
var user = sessionStorage.getItem("user");
user = JSON.parse(user);
var usertoke = user.usertoke;

export default {
  name: "listUser",
  data() {
    return {
      checked: true,
      noChecked: false,
      dataloading: true,
      userID: "",
      dialogVisible: false,
      dialogVisibleEdit: false,
      dialogVisibleRole: false, //分配角色
      totalRecords: 0,
      edit: {
        password: "",
        checkPass: ""
      },
      editRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.edit.password) {
                callback(new Error("两次密码输入不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      roleID: "", // 修改Id
      roleIDs: "", // 批量Id
      cityAll: [],
      areaAll: [],
      Agentlist: [],
      province: "",
      search: {
        userName: "",
        currentPage: 1,
        pageSize: 10
      },
      searchrules: {},
      tableData: [],
      tableDataList: [],
      isSubmit: false,
      ruleForm: {
        userProvince: "",
        userCity: "",
        userCounty: ""
      },
      choseRole: {
        userId: ""
      },
      userRoleList: {
        //绑定角色
        userID: "",
        choosedRoleID: ""
      },
      roleList: {
        roleName: "",
        currentPage: 1,
        pageSize: 10
      },
      rules: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        userBirthday: [
          { required: true, message: "请选择出生日期", trigger: "change" }
        ],
        userEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEMail, trigger: "blur" }
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        userProvince: [
          { required: true, message: "请选择省市区", trigger: "change" }
        ],
        userCity: [
          { required: true, message: "请选择省市区", trigger: "change" }
        ],
        userCounty: [
          { required: true, message: "请选择省市区", trigger: "change" }
        ]
      }
    };
  },
  created: function() {
    var self = this;
    GetAddressMap(self);
  },
  components: {},
  methods: {
    //获取列表
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.getUserList(Params).then(res => {
        this.dataloading = false;
        this.tableDataList = res.message.records;
        this.totalRecords = res.message.totalRecords;
      });
    },
    // 修改密码
    handleEdit(row) {
      this.edit = {
        password: "",
        checkPass: ""
      }
      this.userID = row.userID;
      this.$Alert.show(this.$route.name);
      this.dialogVisibleEdit = true;
    },
    handleCancel() {
      this.dialogVisible = false;
      this.$Alert.hidden(this.$route.name);
    },
    handleEditPass() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          let params = {
            userID: this.userID,
            password: this.edit.password
          };
          http.updatePwd(params).then(res => {
            if (res.statusCode == 200) {
              this.$message.success(res.message)
              this.$Alert.hidden(this.$route.name);
              this.dialogVisibleEdit = false
            }
          });
        }
      });
    },
    handleCan() {
      this.dialogVisibleRole = false;
      this.$Alert.hidden(this.$route.name);
    },
    //城市选择
    choseCity: function(e) {
      this.ruleForm.userCity = "";
      this.ruleForm.userCounty = "";
      let index2 = this.province.findIndex(item => item.value == e);
      var self = this;
      choseAddress(self, 0, this.province[index2].id);
    },
    choseBlock: function(e) {
      this.ruleForm.userCounty = "";
      let index = this.cityAll.findIndex(item => item.value == e);
      var self = this;
      choseAddress(self, 1, this.cityAll[index].id);
    },
    // 添加用户
    handleAddUser() {
      this.$Alert.show(this.$route.name);
      this.dialogVisible = true;
      if (this.$refs["ruleForm"] !== undefined) {
        this.$nextTick(() => {
          this.$refs["ruleForm"].resetFields();
        });
      }
    },
    //添加用户
    addUser() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.isSubmit = true;
          http
            .addUser(this.ruleForm)
            .then(res => {
              this.isSubmit = false;
              if (res.statusCode === 200) {
                this.$message({ type: "success", message: res.message });
                this.dialogVisible = false;
                this.$Alert.hidden(this.$route.name);
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
    //分配角色
    handleRole(index, row) {
      this.$Alert.show(this.$route.name);
      this.choseRole.userId = row.userID;
      this.userRoleList.userID = row.userID;
      this.dialogVisibleRole = true;
      this.getChooseRoleView();
    },

    // 获取分配角色列表
    getChooseRoleView() {
      var params = this.choseRole;
      http.getChooseRoleView(params).then(res => {
        this.tableData = res.message;
        for (let i in this.tableData) {
          if (this.tableData[i].isChoosed === true) {
            this.$nextTick(function() {
              this.$refs.multipleTable.toggleRowSelection(this.tableData[i]);
            });
          }
        }
      });
    },

    handleSelectionChange(val) {
      let roleIDs = val.map(item => item.roleID).join("#");
      this.roleIDs = roleIDs;
      this.userRoleList.choosedRoleID = this.roleIDs;
    },

    //绑定角色列表
    addUserRole() {
      var params = this.userRoleList;
      http.chooseRoleToUser(params).then(res => {
        if (res.statusCode === 200) {
          this.$message({ type: "success", message: res.message });
          this.dialogVisibleRole = false;
          this.$Alert.hidden(this.$route.name);
        } else {
          this.$message.error(res.message);
        }
      });
      this.getlist();
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
      this.$Alert.hidden(this.$route.name);
      done();
    },
    handleCloseRole(done) {
      this.$Alert.hidden(this.$route.name);
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
<style scoped>
.addMoney .el-select {
  width: 202px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 202px;
}
</style>
