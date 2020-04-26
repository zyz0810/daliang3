<!-- 物流司机管理 -->
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
        <el-form-item label="状态" prop="userAuth">
          <el-select v-model="search.userAuth" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="已注册" :value="1"></el-option>
            <el-option label="正常" :value="2"></el-option>
            <el-option label="认证失败" :value="3"></el-option>
            <el-option label="认证中" :value="4"></el-option>
            <el-option label="变更中" :value="5"></el-option>
            <el-option label="冻结" :value="6"></el-option>
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
          <el-table-column prop="userName" show-overflow-tooltip label="司机姓名" ><template slot-scope="{row}">{{row.userName || '--'}}</template></el-table-column>
          <el-table-column prop="userPhone" show-overflow-tooltip label="性别" >
            <template slot-scope="scope">
              <template v-if="scope.row.userSex === 1 ">男</template>
              <template v-if="scope.row.userSex === 2 ">女</template>
              <template v-if="scope.row.userSex === null ">--</template>
            </template>
          </el-table-column>
          <el-table-column prop="userAccount" show-overflow-tooltip label="账号"><template slot-scope="{row}">{{row.userAccount || '--'}}</template></el-table-column>
          <el-table-column prop="driverAge" show-overflow-tooltip label="驾龄(年)" ><template slot-scope="{row}">{{row.driverAge || '--'}}</template></el-table-column>
          <el-table-column prop="userCardid" show-overflow-tooltip label="身份证号" width="160"><template slot-scope="{row}">{{row.userCardid || '--'}}</template></el-table-column>
          <el-table-column prop="crttime" show-overflow-tooltip label="注册时间" ><template slot-scope="{row}">{{row.crttime || '--'}}</template></el-table-column>
          <el-table-column prop="userAuth" show-overflow-tooltip label="状态"><template slot-scope="{row}"> {{row.userAuth | filterType}}</template></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleExamine(scope.$index, scope.row)" v-if="scope.row.userAuth ==4" type="success">审核</el-button>
              <el-button size="mini" @click="handleExamine(scope.$index, scope.row)" v-else-if="scope.row.userAuth ==5" type="success">审核</el-button>
              <el-button size="mini" @click="handleExamine(scope.$index, scope.row)" v-else type="primary" >详情</el-button>
              <el-button size="mini" type="info" v-if="scope.row.userAuth ==1 || scope.row.userAuth ==3 || scope.row.userAuth ==4 || scope.row.userAuth ==5" >车辆信息</el-button>
              <el-button size="mini" type="primary" v-else @click="CarInfo(scope.row.userID)" >车辆信息</el-button>
              <el-button size="mini" @click="handleEditPsw(scope.$index, scope.row)" type="warning">修改密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 司机资质审核 -->
    <el-dialog :modal-append-to-body="false"  :title="checktitle" :close-on-click-modal="false" :visible.sync="dialogVisible" width="900px" :before-close="handleClose">
      <div v-if="cardInfo">
        <div class="flexrowtime">
          <div><span>审核提交时间：</span><span>{{cardInfo.crttime || '--'}}</span></div>
          <div><span v-if="cardInfo.userVerifydate">审核时间：</span><span v-if="cardInfo.userVerifydate">{{cardInfo.userVerifydate || '--'}}</span></div>
        </div>
        <div class="logistics">
          <div class="title">司机信息</div>
          <div  class="flexrow marginTop">
            <div v-if="cardInfo.isChangePhoto==1" @click="bigimg(cardInfo.userPhoto)" ><el-badge value="已变更" class="item"><el-avatar fit="fill" :src="cardInfo.userPhoto" :size="110"></el-avatar></el-badge></div>
            <div v-else  @click="bigimg(cardInfo.userPhoto)"><el-avatar :src="cardInfo.userPhoto" fit="fill" :size="110"></el-avatar></div>
            <div class="flexcolumn">
              <p>司机姓名：{{cardInfo.userName  || '--'}}</p>
              <p>身份证：{{cardInfo.userCardid  || '--'}}</p>
              <p>驾龄：{{cardInfo.driverAge  || '--'}} 年</p>
              <p>手机号：{{cardInfo.userPhone  || '--'}}</p>
            </div>
            <div class="flexrow" style="width: 250px;">
              <div class="center" @click="bigimg(cardInfo.userCardimg)" ><el-avatar shape="square" :size="110" fit="fill" :src="cardInfo.userCardimg"></el-avatar><p class="center">身份证正面</p></div>
              <div class="center" @click="bigimg(cardInfo.driverLicenseImg)" ><el-avatar shape="square" :size="110" fit="fill" :src="cardInfo.driverLicenseImg"></el-avatar><p class="center">驾驶证首页</p></div>
            </div>
          </div>
        </div>
        <div class="logistics" v-if="cardInfo.userAuth!=5">
          <div class="title">车辆信息</div>
          <div  class="flexrow marginTop">
            <div style="margin-right: 10px;" @click="bigimg(cardInfo.carSideImg)" ><el-avatar shape="square" fit="fill" :src="cardInfo.carSideImg" :size="120"></el-avatar></div>
            <div class="car-info">
              <p><span class="span">车牌号：</span><span>{{cardInfo.carNumber  || '--'}}</span></p>
              <p><span class="span">车辆类型：</span><span>{{cardInfo.carTypeStr  || '--'}}</span></p>
              <p><span class="span">总重：</span><span>{{cardInfo.carWeight  || '0'}}吨</span></p>
              <p><span class="span">核定载重：</span><span>{{cardInfo.carLoad  || '0'}}吨</span></p>
              <p><span class="span">车辆长宽高：</span><span>{{cardInfo.carLong  || '0'}}*{{cardInfo.carWide  || '0'}}*{{cardInfo.carHigh  || '0'}}米</span></p>
              <p><span class="span">轴数：</span><span>{{cardInfo.carAxleNumber  | carAxleNumberArr}}</span></p>
              <p><span class="span">排放标准：</span><span>{{cardInfo.carEmissionStandard | carEmissionStandard}}</span></p>
              <p><span class="span">车牌颜色：</span><span>{{cardInfo.carNumberColor  | CoreType}}</span></p>
            </div>
            <div class="flexrow">
              <div class="center" style="margin-right: 10px;"  @click="bigimg(cardInfo.drivingLicenseImg)"><el-avatar fit="fill" shape="square" :size="110" :src="cardInfo.drivingLicenseImg"></el-avatar><p class="center">行驶证首页</p></div>
              <div class="center" @click="bigimg(cardInfo.drivingLicenseBackimg)"><el-avatar shape="square" :size="110" fit="fill" :src="cardInfo.drivingLicenseBackimg"></el-avatar><p class="center">行驶证副页</p></div>
            </div>
          </div>
        </div>
        <div v-if="cardInfo.userAuth<4">
          <div>备注：{{cardInfo.userVerifyremark || '--'}}</div>
        </div>
        <div style="text-align: right;" v-if="cardInfo.userAuth==4">
          <el-button type="primary" @click="handleAccount(1,cardInfo.userID)">通过</el-button>
          <el-button type="danger" @click="handleAccount(2,cardInfo.userID)">拒绝</el-button>
        </div>
        <div style="text-align: right;" v-else-if="cardInfo.userAuth==5">
          <el-button type="primary" @click="handleAccount(1,cardInfo.userID)">通过</el-button>
          <el-button type="danger" @click="handleAccount(4,cardInfo.userID)">拒绝</el-button>
        </div>
        <div style="text-align: right;" v-else-if="cardInfo.userAuth==6">
          <el-button type="danger" @click="handleAccount(5,cardInfo.userID)">解冻</el-button>
        </div>
				<div style="text-align: right;" v-else-if="cardInfo.userAuth==7">
				  <el-button type="danger" @click="handleAccount(5,cardInfo.userID)">解冻</el-button>
				</div>
        <div style="text-align: right;" v-else>
          <el-button type="danger" @click="handleAccount(3,cardInfo.userID)">冻结</el-button>
        </div>
      </div>
    </el-dialog>
<!-- 图片放大 -->
		<el-dialog title="查看图片" :modal="true" :modal-append-to-body="false" :visible.sync="imgdialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<!--  -->



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
    <el-dialog :modal-append-to-body="false" title="审核备注" :close-on-click-modal="false" :visible.sync="dialogVisibleRemark" width="500px" :before-close="handleClose">
      <h2>请输入审核不通过原因</h2>
      <div class="dialog-box">
        <el-form :inline="true" :model="verifyInfo" :rules="rules" ref="verifyInfo">
          <el-form-item label="备注" prop="remark" class="form-textarea">
            <el-input type="textarea" maxlength="25" v-model="verifyInfo.remark" placeholder="" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDial('dialogVisibleRemark')">取 消</el-button>
        <el-button type="primary" @click="handleReject">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import http from "@/api/http";
import { validatePassword }from "@/common/js/validator";
import utils from "@/utils/utils";
let that = this
export default {
  name: 'driverManage',
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
      checktitle:'司机资质审核',
      dataloading: true,
      dialogStatus: "",
      loadDialog: false,
      dialogVisible: false,
      dialogVisiblePsw:false,
      dialogVisibleRemark:false,
      totalRecords: 0,
      ruleForm:{
        userID:'',
        newPasseord:'',
        repeatPassword:'',
      },
      userCardimg:[],//身份证正面
      userCardbackimg:[],//身份证反面
      driverLicenseImg:[],//驾驶证首页
      drivingLicenseImg:[],//行驶证首页
      roadTransportPermit:[],//道路运输许可证
      roadTransportOperationCertificate:[],//道路运输营运证
      driverCertificate:[],//司机从业资格证
      carSideImg:[],//车辆侧面
      carHeadImg:[],//车正面
      carTailImg:[],//车尾部
      rules:{
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
        ],
      },
      driverState:"", //状态
      showStatus:false,
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
      search: {
        account: "", //账户
        name: "",  //姓名
        userAuth:"",//状态  1已注册2正常3待审核4审核失败5冻结
        currentPage: 1,
        pageSize: 10
      },
      cardInfo:{},
      searchrules: {},
      tableData: [],
      verifyInfo:{  //审核冻结
        userID:'',
        userAuth:'',
        remark:'',
      },
    };
  },
  filters: {
    // 状态
    filterType(status) {
      let typeMap = {
        1: "已注册",
        2: "正常",
        3: "认证失败",
        4: "认证中",
        5: "变更中",
        6: '冻结',
				7: '冻结',
      };
      return typeMap[status];
    },
		// 颜色
		CoreType(status) {
		  let typeMap = {
		    1: "蓝牌",
		    2: "黄牌",
		    3: "绿牌",
		    4: "黑牌",
		  };
		  return typeMap[status];
		},
		// 轴数
		carAxleNumberArr(status) {
		  let typeMap = {
		    1: "1轴",
		    2: "2轴",
		    3: "3轴",
		    4: "4轴",
				5: "5轴",
				6: "6轴",
				7: "6轴以上",
		  };
		  return typeMap[status];
		},

		//排放标准
		carEmissionStandard(status){
		  let typeMap = {'1':'国一','2':'国二','3':'国三','4':'国四','5':'国五','6':'国六'}
		  return typeMap[status];
		}
  },
  methods: {
    // 导出
    expertExcel:function(){
      let Params = this.search
      http.exportListDriver(Params).then(res => {
        let fileName = '物流司机' + utils.parseTime(new Date(),"{y}-{m}-{d}") // 文件名
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
		//查看大图
		bigimg(img) {
			this.dialogImageUrl = img
			this.imgdialogVisible = true
		},
    //获取列表
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.getListDriver(Params).then(res => {
        if (res.statusCode === 200) {
          this.dataloading = false;
          this.tableData = res.message.records;
          this.totalRecords = res.message.totalRecords;
        }
      });
    },
    handleClose(done) {
      this.$Alert.hidden(this.$route.name)
      done()
    },

    //审核详情
    handleExamine(index, row) {
      if(row.userAuth == 5){
        this.checktitle = '司机资质审核'
      }
      else if(row.userAuth == 4){
        this.checktitle = '司机变更信息审核'
      }else{
        this.checktitle = '司机资料详情'
      }
      http.getListDriverDetail({
        userID:row.userID
      }).then(res=>{
        if(res.statusCode == 200){
          this.cardInfo = res.message
          let carTypeStrArr = {'1':'小客车','2':'微型货车','3':'轻型货车','4':'中型货车','5':'重型货车'}
          this.cardInfo.carTypeStr = carTypeStrArr[res.message.carType]
          let carEmissionStandardStrArr = {'1':'国一','2':'国二','3':'国三','4':'国四'}
          this.cardInfo.carEmissionStandardStr = carEmissionStandardStrArr[res.message.carEmissionStandard]
          this.dialogVisible = true
        }
      })
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
          }).catch(()=>{
            this.isSubmit = false
          })
        }
      });
    },

    // 关闭弹窗
    handleCloseDial(dialog){
      this[dialog] = false
      this.$Alert.hidden(this.$route.name)
    },


    // 审核冻结 1同意2拒绝3冻结4变更拒接5解冻
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
    handleReject(){
      this.$refs["verifyInfo"].validate(valid => {
          if(valid){
            http.logisticsVerify(this.verifyInfo).then(res => {
              if (res.statusCode === 200) {
                  this.$message({ type: "success", message: res.message });
                  this.dialogVisible = false
                  this.$Alert.hidden(this.$route.name)
                  this.dialogVisibleRemark = false
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
    CarInfo:function(orderID){
      this.$emit('isGetCarlistfun', orderID)
      // this.$router.push({ path: "VehicleDetails", query: { id: orderID } });
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
	.el-dialog__wrapper {
		background: rgba(0, 0, 0, 0.5)
	}
</style>
