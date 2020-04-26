<!-- 物流司机管理 -->
<template>
  <div class="dealer-info">
    <div>
      <div><el-button type="primary" icon="el-icon-back" @click="backfun" circle></el-button></div>
      <div class="record">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号" ></el-table-column>
          <el-table-column show-overflow-tooltip label="司机姓名" ><template slot-scope="{row}">{{row.userName || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="车牌号" ><template slot-scope="{row}">{{row.carNumber || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="车辆类型" width="160"><template slot-scope="{row}">{{row.carType | cardType}}</template></el-table-column>
          <el-table-column how-overflow-tooltip label="总重量" ><template slot-scope="{row}">{{row.carWeight || '0'}}吨</template></el-table-column>
          <el-table-column how-overflow-tooltip label="核定载重" ><template slot-scope="{row}">{{row.carLoad || '0'}}吨</template></el-table-column>
          <el-table-column how-overflow-tooltip label="车辆长宽高" ><template slot-scope="{row}">{{row.lwh || '0*0*0米'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="接单次数" ><template slot-scope="{row}">{{row.orderProgressing || '0'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="完成订单数"><template slot-scope="{row}"> {{row.orderSuccess || '0'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="运输量"><template slot-scope="{row}"> {{row.trafficVolume || '0'}}吨</template></el-table-column>
          <el-table-column show-overflow-tooltip label="审核时间"><template slot-scope="{row}"> {{row.auditTime || '--'}}</template></el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button size="mini" @click="CarInfo(scope.row)" type="primary" >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :page-size="search.pageSize" @current-change="handleCurrentChange" :total="totalRecords" :background="true" prev-text="上一页" next-text="下一页"></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :modal-append-to-body="false" title="车辆详情" :close-on-click-modal="false" :visible.sync="dialogVisible" width="900px" :before-close="handleClose">
      <div v-if="cardInfo">
        <div><span>审核提交时间：</span><span style="padding-right: 100px;">{{cardInfo.crttime || '--'}}</span> <span>审核时间：</span><span>{{cardInfo.auditTime || '--'}}</span></div>
        <div class="logistics">
          <div class="title">司机信息</div>
          <div  class="flexrow marginTop">
            <div @click="bigimg(cardInfo.userPhoto)"><el-avatar :src="cardInfo.userPhoto" fit="fill" :size="110"></el-avatar></div>
            <div class="flexcolumn">
              <p>司机姓名：{{cardInfo.userName  || '--'}}</p>
              <p>身份证：{{cardInfo.userCardid  || '--'}}</p>
              <p>驾龄：{{cardInfo.drivingAge  || '--'}} 年</p>
              <p>手机号：{{cardInfo.userPhone  || '--'}}</p>
            </div>
            <div class="flexrow" style="width: 250px;">
              <div class="center" @click="bigimg(cardInfo.userCardimg)"><el-avatar shape="square" fit="fill" :size="110" :src="cardInfo.userCardimg"></el-avatar><p class="center">身份证正面</p></div>
              <div class="center" @click="bigimg(cardInfo.driverLicenseImg)"><el-avatar shape="square" fit="fill" :size="110" :src="cardInfo.driverLicenseImg"></el-avatar><p class="center">驾驶证首页</p></div>
            </div>
          </div>
        </div>
        <div class="logistics" v-if="cardInfo.userAuth!=5">
          <div class="title">车辆信息</div>
          <div  class="flexrow marginTop">
            <div style="margin-right: 10px;" @click="bigimg(cardInfo.carSideImg)"><el-avatar shape="square" fit="fill" :src="cardInfo.carSideImg" :size="120"></el-avatar></div>
            <div class="car-info">
              <p><span class="span">车牌号：</span><span>{{cardInfo.carNumber  || '--'}}</span></p>
              <p><span class="span">车辆类型：</span><span>{{cardInfo.carType  | cardType}}</span></p>
              <p><span class="span">总重：</span><span>{{cardInfo.carWeight  || '0'}}吨</span></p>
              <p><span class="span">核定载重：</span><span>{{cardInfo.carLoad  || '0'}}吨</span></p>
              <p><span class="span">车辆长宽高：</span><span>{{cardInfo.carLong  || '0'}}*{{cardInfo.carWide  || '0'}}*{{cardInfo.carHigh  || '0'}}米</span></p>
              <p><span class="span">轴数：</span><span>{{cardInfo.carAxleNumber  | carAxleNumberArr}}</span></p>
              <p><span class="span">排放标准：</span><span>{{cardInfo.carEmissionStandard| carEmissionStandard}}</span></p>
              <p><span class="span">车牌颜色：</span><span>{{cardInfo.carNumberColor  | CoreType}}</span></p>
            </div>
            <div class="flexrow">
              <div class="center" @click="bigimg(cardInfo.drivingLicenseImg)" style="margin-right: 10px;"><el-avatar fit="fill" shape="square" :size="110" :src="cardInfo.drivingLicenseImg"></el-avatar><p class="center">行驶证首页</p></div>
              <div class="center" @click="bigimg(cardInfo.drivingLicenseBackimg)"><el-avatar shape="square" fit="fill" :size="110" :src="cardInfo.drivingLicenseBackimg"></el-avatar><p class="center">行驶证副页</p></div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 图片放大 -->
    <el-dialog title="查看图片" :modal="true" :modal-append-to-body="false" :visible.sync="imgdialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import http from "@/api/http";
export default{
  props:['orderID'],
  data(){
    return{
      imgdialogVisible:false,
      dialogImageUrl:'',
      tableData:[],
      dataloading:false,
      dialogVisible:false,
      cardInfo:[],
      totalRecords:0,
      search:{
        pageSize:10,
        currentPage:1,
        userId:''
      }
    }
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

  },
  methods:{
    getlist() {
      this.search.userId = this.orderID
      this.dataloading = true;
      var Params = this.search;
      http.listDriverCarDetail(Params).then(res => {
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
    handleCurrentChange: function(val) {
      this.search.currentPage = val;
      this.getlist();
    },
    //获取详情
    CarInfo:function(row){
      this.cardInfo = ''
      this.cardInfo = row
      this.dialogVisible = true
    },
    handleClose(done) {
      this.cardInfo = ''
      this.$Alert.hidden(this.$route.name)
      done()
    },
    backfun(){
      this.$emit('GetCarlistfun', 1)
    }
  },
  mounted(){
    this.getlist()
  }
}

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
	.el-dialog__wrapper {
		background: rgba(0, 0, 0, 0.5)
	}
</style>
