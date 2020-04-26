<!-- 物流司机管理 -->
<template>
  <div class="dealer-info">
    <div>
      <el-form :inline="true" :model="search" ref="search" class="demo-form-inline">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="carNumber">
          <el-input v-model="search.carNumber" placeholder="请输入车牌号"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型" prop="carType">
          <el-select v-model="search.carType" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="小客车" :value="1"></el-option>
            <el-option label="微型货车" :value="2"></el-option>
            <el-option label="轻型货车" :value="3"></el-option>
            <el-option label="中型货车" :value="4"></el-option>
            <el-option label="重型货车" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="carState">
          <el-select v-model="search.carState" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审批" :value="1"></el-option>
            <el-option label="审批中" :value="2"></el-option>
            <el-option label="审批完成" :value="3"></el-option>
            <el-option label="审批失败" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">查询</el-button>
          <el-button @click="resealist()">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="record">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号" ></el-table-column>
          <el-table-column show-overflow-tooltip label="司机姓名" ><template slot-scope="{row}">{{row.userName || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="账号"><template slot-scope="{row}">{{row.userAccount || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="车牌号" ><template slot-scope="{row}">{{row.carNumber || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="车辆类型" width="160"><template slot-scope="{row}">{{row.carType | cardType}}</template></el-table-column>
          <el-table-column how-overflow-tooltip label="总重量" ><template slot-scope="{row}">{{row.carWeight || '0'}}吨</template></el-table-column>
          <el-table-column how-overflow-tooltip label="核定载重" ><template slot-scope="{row}">{{row.carLoad || '0'}}吨</template></el-table-column>
          <el-table-column how-overflow-tooltip label="车辆长宽高" ><template slot-scope="{row}">{{row.lwh || '0*0*0米'}}</template></el-table-column>
          <el-table-column how-overflow-tooltip label="申请时间" ><template slot-scope="{row}">{{row.crttime || '--'}}</template></el-table-column>
          <el-table-column how-overflow-tooltip label="状态" ><template slot-scope="{row}">{{row.carState | filterType}}</template></el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.carState==2" @click="handleExamine(scope.row)" type="success">审核</el-button>
              <el-button size="mini" v-else @click="handleExamine(scope.row)" type="primary">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>
    </div>

     <!-- 司机资质审核 -->
    <el-dialog :modal-append-to-body="false" :title="checktitle" :close-on-click-modal="false" :before-close="handleClose" :visible.sync="dialogVisible" width="900px">
      <div v-if="cardInfo">
        <div v-if="cardInfo.carState==2"><span>审核提交时间：</span><span>{{cardInfo.crttime || '--'}}</span></div>
        <div v-else><span>审核提交时间：</span><span style="padding-right: 100px;">{{cardInfo.crttime || '--'}}</span><span>审核时间：</span><span>{{cardInfo.auditTime || '--'}}</span></div>
        <div class="logistics">
          <div class="title">司机信息</div>
          <div  class="flexrow marginTop">
            <div @click="bigimg(cardInfo.userPhoto)"><el-avatar :src="cardInfo.userPhoto" :size="110"></el-avatar></div>
            <div class="flexcolumn">
              <p>司机姓名：{{cardInfo.userName  || '--'}}</p>
              <p>身份证：{{cardInfo.userCardid  || '--'}}</p>
              <p>驾龄：{{cardInfo.drivingAge  || '--'}} 年</p>
              <p>手机号：{{cardInfo.userPhone  || '--'}}</p>
            </div>
            <div class="flexrow" style="width: 250px;">
              <div class="center" @click="bigimg(cardInfo.userCardimg)"><el-avatar shape="square" :size="110" :src="cardInfo.userCardimg"></el-avatar><p class="center">身份证正面</p></div>
              <div class="center" @click="bigimg(cardInfo.driverLicenseImg)"><el-avatar shape="square" :size="110" :src="cardInfo.driverLicenseImg"></el-avatar><p class="center">驾驶证首页</p></div>
            </div>
          </div>
        </div>
        <div class="logistics">
          <div class="title">车辆信息</div>
          <div  class="flexrow marginTop">
            <div style="margin-right: 10px;" @click="bigimg(cardInfo.carSideImg)"><el-avatar shape="square" :src="cardInfo.carSideImg" :size="120"></el-avatar></div>
            <div class="car-info">
              <p><span class="span">车牌号：</span><span>{{cardInfo.carNumber  || '--'}}</span></p>
              <p><span class="span">车辆类型：</span><span>{{cardInfo.carType  | cardType}}</span></p>
              <p><span class="span">总重：</span><span>{{cardInfo.carWeight  || '0'}}吨</span></p>
              <p><span class="span">核定载重：</span><span>{{cardInfo.carLoad  || '0'}}吨</span></p>
              <p><span class="span">车辆长宽高：</span><span>{{cardInfo.carLong  || '0'}}*{{cardInfo.carWide  || '0'}}*{{cardInfo.carHigh  || '0'}}米</span></p>
              <p><span class="span">轴数：</span><span>{{cardInfo.carAxleNumber  | carAxleNumberArr}}</span></p>
              <p><span class="span">排放标准：</span><span>{{cardInfo.carEmissionStandard | carEmissionStandard}}</span></p>
              <p><span class="span">车牌颜色：</span><span>{{cardInfo.carNumberColor  | CoreType}}</span></p>
            </div>
            <div class="flexrow">
              <div class="center" @click="bigimg(cardInfo.drivingLicenseImg)" style="margin-right: 10px;"><el-avatar shape="square" :size="110" :src="cardInfo.drivingLicenseImg"></el-avatar><p class="center">行驶证首页</p></div>
              <div class="center" @click="bigimg(cardInfo.drivingLicenseBackimg)"><el-avatar shape="square" :size="110" :src="cardInfo.drivingLicenseBackimg"></el-avatar><p class="center">行驶证副页</p></div>
            </div>
          </div>
        </div>
        <div>
          <span>备注：</span>
          <span style="color: red;" v-if="cardInfo.carState==4">{{cardInfo.auditRemark || '--'}}</span>
          <span v-else>{{cardInfo.auditRemark || '--'}}</span>
        </div>
        <div style="text-align: right;" v-if="cardInfo.carState==2">
          <el-button type="primary" @click="agreeCarDetail(cardInfo.carId)">通过</el-button>
          <el-button type="danger" @click="reject(cardInfo.carId)">拒绝</el-button>
        </div>
      </div>
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
		    <el-button type="primary" @click="noPassCarDetail()">确定</el-button>
		  </span>
		</el-dialog>
     <!-- 图片放大 -->
    <el-dialog title="查看图片" :modal="true" :modal-append-to-body="false" :visible.sync="imgdialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import http from "@/api/http";
import { validatePassword }from "@/common/js/validator";
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
      checktitle:'车辆审核详情',
      dialogVisible:false,
      search: {
        name: "", //账户
        carNumber: "",  //姓名
        carType:'',//状态  1已注册2正常3待审核4审核失败5冻结
        carState:'',
        currentPage: 1,
        pageSize: 10
      },
      tableData: [],
      cardInfo:[],
      dataloading:false,
      totalRecords:0,
			dialogVisibleRemark:false,
			rules:{
			  remark: [
			    { required: true, message: "请输入备注", trigger: "blur" },
			  ],
			},
			verifyInfo:{  //审核冻结
			  carId:'',
			  remark:'',
			},
    };
  },
  filters: {
    // 车辆类型
    cardType(status) {
      let typeMap = {
        1: "小客车",
        2: "微型货车",
        3: "轻型货车",
        4: "中型货车",
        5: "重型货车",
      };
      return typeMap[status];
    },
    // 状态
    filterType(status) {
      let typeMap = {
        1: "未审批",
        2: "审批中",
        3: "审批完成",
        4: "审批失败",
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
    //排放标准
    carEmissionStandard(status){
      let typeMap = {'1':'国一','2':'国二','3':'国三','4':'国四','5':'国五','6':'国六'}
      return typeMap[status];
    }

  },
  methods: {
    //获取列表
    getlist() {
      this.dataloading = true;
      var Params = this.search;
      http.listCarDetail(Params).then(res => {
        if (res.statusCode === 200) {
          this.dataloading = false;
          this.tableData = res.message.records;
          this.totalRecords = res.message.totalRecords;
        }
      });
    },
     //查看大图
    bigimg(img) {
    	this.dialogImageUrl = img
    	this.imgdialogVisible = true
    },
    //重置
    resealist: function() {
      this.$refs["search"].resetFields();
      this.getlist();
    },
    //详情审核
    handleExamine:function(row){
      if(row.carState==2){
        this.checktitle = '车辆审核详情'
      }else{
        this.checktitle = '车辆资料详情'
      }
      this.cardInfo = row
      this.dialogVisible = true
    },
    //页数
    handleCurrentChange: function(val) {
      this.search.currentPage = val;
      this.getlist();
    },
    //同意
    agreeCarDetail:function(carId){
      let Params = {'carId':carId}
      http.agreeCarDetail(Params).then(res => {
        if (res.statusCode === 200) {
           this.$message({ type: "success", message: res.message });
           this.dialogVisible = false
           this.getlist();
        }else{
          this.$message.error(res.message);
        }
      });
    },
    //拒绝
    noPassCarDetail:function(carId){
			this.$refs["verifyInfo"].validate(valid => {
			if(valid){
				let Params = this.verifyInfo
				http.noPassCarDetail(Params).then(res => {
						if (res.statusCode === 200) {
								 this.$message({ type: "success", message: res.message });
								 this.dialogVisible = false
								 this.dialogVisibleRemark=false
								 this.getlist();
						}else{
							   this.dialogVisibleRemark=false
								 this.$message.error(res.message);
							 }
					 });
			  }
			})
    },
		reject:function(carId){
			this.verifyInfo.carId = carId
			this.dialogVisibleRemark=true
		},
    handleClose(done) {
      this.cardInfo = ''
      this.$Alert.hidden(this.$route.name)
      done()
    },
  },
  mounted() {
    this.getlist();
  }
};
</script>
<style scoped >
  .logistics .flexrow{ display: flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;}
  .marginTop{margin-top: 20px;}
  .logistics .title{background: #eaeaea;color:#000;width:100%;padding: 5px 10px;box-sizing: border-box;font-weight: bold;}
  .logistics .img-circular{border-radius: 100px;width: 100px;height: 200px;}
  .logistics .flexcolumn{display: flex;flex-direction: column;justify-content:space-between}
  .center{text-align: center;}
  .logistics .car-info{display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;width: 500px;}
  .logistics .car-info p span{display: inline-block;overflow: hidden;}
  .logistics .car-info p span.span{width: 85px;}
  .logistics .car-info p{width: 180px;}
</style>
