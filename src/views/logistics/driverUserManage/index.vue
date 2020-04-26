<!-- 发货用户管理 -->
<template>
  <div class="dealer-info">
    <div>
      <el-form :inline="true" :model="search" ref="search" :rules="searchrules" class="demo-form-inline">
        <el-form-item label="账号" prop="account">
          <el-input v-model="search.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="注册终端" prop="registry">
          <el-select v-model="search.registry" placeholder="请选择">
            <el-option label="PC端" :value="1"></el-option>
            <el-option label="移动端" :value="2"></el-option>
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="userAuth">
          <el-select v-model="search.userAuth" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item,index) in allStatus" :key="index" :label="item.statusName" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
          <el-button type="warning" @click="expertExcel()">导出</el-button>
        </el-form-item>
      </el-form>
    <div class="record">
       <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
         <el-table-column type="index" label="序号" ></el-table-column>
          <el-table-column prop="userName" show-overflow-tooltip label="用户姓名"><template slot-scope="{row}">{{row.userName || '--'}}</template></el-table-column>
          <el-table-column prop="userSex" show-overflow-tooltip label="性别" >
            <template slot-scope="scope">
              <template v-if="scope.row.userSex === 1 ">男</template>
              <template v-if="scope.row.userSex === 2 ">女</template>
              <template v-if="scope.row.userSex === null ">--</template>
            </template>
          </el-table-column>
          <el-table-column prop="userAccount" show-overflow-tooltip label="账号"><template slot-scope="{row}">{{row.userAccount || '--'}}</template></el-table-column>
          <el-table-column prop="userCardid" show-overflow-tooltip label="身份证号"><template slot-scope="{row}">{{row.userCardid || '--'}}</template></el-table-column>
          <el-table-column prop="userPhone" show-overflow-tooltip label="联系电话"><template slot-scope="{row}">{{row.userPhone || '--'}}</template></el-table-column>
          <el-table-column prop="userType" show-overflow-tooltip label="注册终端">
            <template slot-scope="scope">
              <template v-if="scope.row.userRegistry === 1 "> PC端</template>
              <template v-if="scope.row.userRegistry === 2 "> 移动端</template>
              <template v-if="scope.row.userRegistry === null ">--</template>
            </template>
          </el-table-column>
          <el-table-column prop="crttime" show-overflow-tooltip label="注册时间"><template slot-scope="{row}">{{row.crttime || '--'}}</template></el-table-column>
          <el-table-column prop="bindPhone" show-overflow-tooltip label="关联账号"><template slot-scope="{row}"> {{row.bindPhone || '--'}}</template></el-table-column>
          <el-table-column prop="state" show-overflow-tooltip label="状态"><template slot-scope="{row}"> {{row.userAuth | filterType}}</template></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleExamine(scope.$index, scope.row)" v-if="scope.row.userAuth ==4 || scope.row.userAuth ==5" type="success">审核</el-button>
              <el-button size="mini" v-else-if="scope.row.userAuth ==1" type="info">详情</el-button>
              <el-button size="mini" @click="handleExamine(scope.$index, scope.row)" v-else type="primary">详情</el-button>
              <el-button size="mini" v-if="scope.row.userType == 1"  @click="handleEditPsw(scope.$index, scope.row)" type="danger">修改密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>
    </div>

     <!-- 用户实名认证审核 -->
     <el-dialog :modal-append-to-body="false" :title="checktitle" :close-on-click-modal="false" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
       <div class="logistics">
         <div class="flexrowtime">
           <div><span>审核提交时间：</span><span>{{userInfo.crttime || '--'}}</span></div>
           <div><span v-if="userInfo.userVerifydate">审核时间：</span><span v-if="userInfo.userVerifydate">{{userInfo.userVerifydate || '--'}}</span></div>
         </div>
         <div class="logistics">
           <div class="title">用户信息</div>
           <div  class="flexrow marginTop">
             <div v-if="userInfo.isChangePhoto==1" @click="bigimg(userInfo.userPhoto)"><el-badge value="已变更" class="item"><el-avatar fit="fill" :src="userInfo.userPhoto" :size="110"></el-avatar></el-badge></div>
             <div v-else @click="bigimg(userInfo.userPhoto)"><el-avatar :src="userInfo.userPhoto" fit="fill" :size="110"></el-avatar></div>
             <div class="flexcolumn">
               <p>用户姓名：{{userInfo.userName  || '--'}}</p>
               <p>身份证：{{userInfo.userCardid  || '--'}}</p>
               <p>手机号：{{userInfo.userPhone  || '--'}}</p>
             </div>
             <div class="flexrow" style="width: 250px;">
               <div class="center" @click="bigimg(userInfo.userCardimg)"><el-avatar fit="fill" shape="square" :size="110" :src="userInfo.userCardimg"></el-avatar><p class="center">身份证正面</p></div>
             </div>
           </div>
         </div>
         <div v-if="userInfo.userAuth<4 || userInfo.userAuth==6 || userInfo.userAuth==7">
           <div>备注：{{userInfo.userVerifyremark || '--'}}</div>
         </div>
         <div style="text-align: right;" v-if="userInfo.userAuth==4">
           <el-button type="primary" @click="handleAccount(1,userInfo.userID)">通过</el-button>
           <el-button type="danger" @click="handleAccount(2,userInfo.userID)">拒绝</el-button>
         </div>
         <div style="text-align: right;" v-if="userInfo.userAuth==5">
           <el-button type="primary" @click="handleAccount(1,userInfo.userID)">通过</el-button>
           <el-button type="danger" @click="handleAccount(4,userInfo.userID)">拒绝</el-button>
         </div>
         <div style="text-align: right;" v-if="userInfo.userAuth==6">
           <el-button type="danger" @click="handleAccount(5,userInfo.userID)">解冻</el-button>
         </div>
				 <div style="text-align: right;" v-if="userInfo.userAuth==7">
				   <el-button type="danger" @click="handleAccount(5,userInfo.userID)">解冻</el-button>
				 </div>
         <div style="text-align: right;" v-if="userInfo.userAuth==2">
           <el-button type="danger" @click="handleAccount(3,userInfo.userID)">冻结</el-button>
         </div>
       </div>
     </el-dialog>

     <!-- 修改密码 -->
     <el-dialog :modal-append-to-body="false" title="修改密码" :close-on-click-modal="false" :visible.sync="dialogVisiblePsw" width="500px" :before-close="handleClose">
       <div>
         <el-form :inline="true" :model="ruleForm" :rules="rule" ref="ruleForm">
           <el-form-item label="新密码" prop="newPasseord">
             <el-input type="password" v-model="ruleForm.newPasseord" placeholder="请输入新密码"></el-input>
           </el-form-item>
           <el-form-item label="确认密码" prop="repeatPassword">
             <el-input type="password" v-model="ruleForm.repeatPassword" placeholder="请确认密码"></el-input>
           </el-form-item>
         </el-form>
       </div>
       <span slot="footer" class="dialog-footer">
         <el-button @click="handleCloseDial('dialogVisiblePsw')">取 消</el-button>
         <el-button type="primary" @click="handleSubmitPsw">确定</el-button>
       </span>
     </el-dialog>

      <!-- 审核备注 -->
      <el-dialog :modal-append-to-body="false" title="审核备注" :close-on-click-modal="false" :visible.sync="dialogVisibleRemark" width="40%" :before-close="handleClose">
        <h2>请输入审核不通过原因</h2>
        <div class="dialog-box">
          <el-form :inline="true" :model="verifyInfo" :rules="rules" ref="verifyInfo">
            <el-form-item label="备注" prop="remark" class="form-textarea">
              <el-input type="textarea" v-model="verifyInfo.remark" placeholder="" ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCloseDial('dialogVisibleRemark')">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </el-dialog>
  <!-- 图片放大 -->
		<el-dialog title="查看图片" :modal="true" :modal-append-to-body="false" :visible.sync="imgdialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	<!--  -->

  </div>

</template>

<script>
import http from "@/api/http";
import { validatePassword }from "@/common/js/validator";
import utils from "@/utils/utils";
let that = this
export default {
  name: 'driverUserManage',
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
  data() {
    return {
			imgdialogVisible:false,
			dialogImageUrl:'',
      checktitle:'用户资质审核',
      dataloading: true,
      loadDialog: false,
      dialogVisible: false,
      dialogVisiblePsw:false,
      dialogVisibleRemark:false,
      totalRecords: 0,
      userInfo:{},
      allStatus:[{value:1,statusName:"已注册"},{value:2,statusName:"正常"},{value:3,statusName:"审核不通过"},{value:4,statusName:"待审核"},{value:5,statusName:"信息变更"},{value:6,statusName:"冻结"}],
      singleStatus:[{value:2,statusName:"正常"}],
      ruleForm:{
        userID:'',
        newPasseord:'',
        repeatPassword:'',
      },
      rule:{
        newPasseord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        repeatPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.newPasseord) {
                callback(new Error("两次密码输入不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
      },
      rules:{
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
        ],
      },
      search: {
        account: "",//账户
        name: "", //姓名
        userAuth:"", //状态  1已注册2正常3待审核4审核失败5冻结
        registry:"", //注册方1pc端2移动端
        userType:1,
        currentPage: 1,
        pageSize: 10
      },
      verifyInfo:{  //审核冻结
        userID:'',
        userAuth:'',
        remark:'',
      },
      searchrules: {},
      tableData: [],
      currenttime:'2020-01-01'
    };
  },
  activated() {
    this.$shadow.shadow(this, this.cachedViews)
  },
  filters: {
    // 状态
    filterType(status) {
      let typeMap = {
        1: "已注册",
        2: "正常",
        3: "审核不通过",
        4: "待审核",
        5: "信息变更",
        6: "冻结",
				7: '冻结'
      };
      return typeMap[status];
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.permission.cachedViews
    }
  },
  methods: {
		//查看大图
		bigimg(img) {
			this.dialogImageUrl = img
			this.imgdialogVisible = true
		},
    //获取列表
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.logisticsDriverUser(Params).then(res => {
        if (res.statusCode === 200) {
          this.dataloading = false;
          this.tableData = res.message.records;
          this.totalRecords = res.message.totalRecords;
        }else{
           this.$message.error(res.message);
        }
      });
    },


    //审核详情
    handleExamine(index, row) {
      if(row.userAuth == 4){
        this.checktitle = '用户资质审核'
      }
      else if(row.userAuth == 5){
        this.checktitle = '变更信息审核'
      }else{
        this.checktitle = '用户资料详情'
      }
      this.userInfo = '';
      http.getListDriverDetail({
        userID:row.userID
      }).then(res=>{
        if(res.statusCode === 200){
          this.userInfo = res.message
          this.dialogVisible = true
        }else{
          this.$message.error(res.message);
        }
      })
      this.$Alert.show(this.$route.name)
    },

    // 忘记密码
    handleEditPsw(indx,row){
      if (this.$refs.ruleForm) {
        this.$refs["ruleForm"].resetFields();
      }
      this.ruleForm.userID = row.userID
      this.dialogVisiblePsw = true
      this.$Alert.show(this.$route.name)
    },
    // 修改密码
    handleSubmitPsw(index,row){
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          http.updateDriverPassword(this.ruleForm).then(res => {
            if (res.statusCode === 200) {
              this.$message({ type: "success", message: res.message });
              this.dialogVisiblePsw = false;
              this.$Alert.hidden(this.$route.name)
              this.getlist();
            } else {
              this.$message.error(res.message);
            }
          })
        }
      });
    },
    // 关闭弹窗
    handleCloseDial(dialog){
      this[dialog] = false
      this.$Alert.hidden(this.$route.name)
    },
    handleClose(done) {
      this.$Alert.hidden(this.$route.name)
      done()
    },

    //详情
    handleDetails(index, row) {
      this.dialogVisible = true
      this.$Alert.show(this.$route.name)
    },


    // 审核冻结
    handleAccount(value,id){
      this.verifyInfo.userID = id
      this.verifyInfo.userAuth = value
      if(value == 2){
        //审核拒绝
        this.dialogVisibleRemark = true
        this.$Alert.show(this.$route.name)
      }else{
        http.logisticsVerify(this.verifyInfo).then(res => {
          if (res.statusCode === 200) {
              this.$message({ type: "success", message: res.message });
              this.dialogVisible = false
              this.$Alert.hidden(this.$route.name)
              this.getlist()
          } else {
            this.$message.error(res.message);
          }
        })
      }
    },


    //审核拒绝
    handleSubmit(){
      this.$refs["verifyInfo"].validate(valid => {
        if(valid){
          http.logisticsVerify(this.verifyInfo).then(res => {
            if (res.statusCode === 200) {
                this.$message({ type: "success", message: res.message });
                this.dialogVisibleRemark = false
                this.dialogVisible = false
                this.$Alert.hidden(this.$route.name)
                this.getlist()
            } else {
              this.$message.error(res.message);
            }
          })
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
    expertExcel:function(){
      let Params = this.search
      http.exportListDriverUser(Params).then(res => {
        let fileName = '发货用户' +  utils.parseTime(new Date(),"{y}-{m}-{d}") // 文件名
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
<style scoped >
  .flexrowtime,.logistics .flexrow{ display: flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;}
  .marginTop{margin-top: 20px;}
  .logistics .title{background: #eaeaea;color:#000;width:100%;padding: 5px 10px;box-sizing: border-box;font-weight: bold;}
  .logistics .img-circular{border-radius: 100px;width: 100px;height: 200px;}
  .logistics .flexcolumn{display: flex;flex-direction: column;justify-content:space-between}
  .center{text-align: center;}
  .logistics .car-info{display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;width: 500px;}
  .logistics .car-info p span{display: inline-block;overflow: hidden;}
  .logistics .car-info p span.span{width: 85px;}
  .logistics .car-info p{width: 180px;}
  .flexrowtime div{width: 50%;}
</style>
