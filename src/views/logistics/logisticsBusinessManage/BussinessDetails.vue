<template>
  <div  class="dealer-info">
    <div style="margin-bottom: 10px;"><el-button type="primary" icon="el-icon-back" @click="backfun" circle></el-button></div>
    <div class="felxrow infobox">
      <div class="felxrow line">
        <div class="avatar" style="width: auto;" @click="bigimg(Orderinfo.userPhoto)"><el-avatar :src="Orderinfo.userPhoto" :size="50"></el-avatar></div>
        <div class="flexrounm">
          <p><span>{{Orderinfo.userName || '--'}}</span> <span>{{Orderinfo.userAccount || '--'}}</span></p>
          <p><i class="el-icon-phone"></i><span>电话：{{Orderinfo.userPhone || '--'}}</span></p>
          <p><i class="el-icon-document-remove"></i><span>发单数：{{Orderinfo.orderProgressing || '0'}}单</span></p>
          <p><i class="el-icon-user-solid"></i><span>账户类型：{{Orderinfo.userType | userType}}</span></p>
        </div>
      </div>
      <div class="flexrounm line">
        <p><i class="el-icon-date"></i><span>订单号：{{Orderinfo.orderNumber || '--'}}</span></p>
        <p><i class="el-icon-date"></i><span>关联出库单号：{{Orderinfo.depotOrderId || '--'}}</span></p>
        <p><i class="el-icon-odometer"></i><span>订单时间：{{Orderinfo.orderTime || '--'}}</span></p>
        <p><i class="el-icon-odometer"></i><span>订单截止时间：{{Orderinfo.endTime || '--'}}</span></p>
      </div>
      <div class="flexrounm line">
        <p><i class="el-icon-truck"></i><span>货物类型：{{Orderinfo.transportGoods || '--'}}</span></p>
        <p><i class="el-icon-paperclip"></i><span>货物总重:{{Orderinfo.totalWeight || '0'}}吨</span></p>
        <p><i class="el-icon-paperclip"></i><span>剩余量：{{Orderinfo.remainingTonnage || '0'}}吨</span></p>
        <p><i class="el-icon-coin"></i><span>参考运输价格：{{Orderinfo.transportRefPrice || '0'}}元/吨</span></p>
      </div>
      <div class="flexrounm line">
        <p class="address-item"><i class="el-icon-location greencolor bigsize"></i><span>起点：</span><span class="greencolor">{{Orderinfo.startAddress || '--'}}</span></p>
        <p class="address-item"><i class="el-icon-location redcolor bigsize"></i><span>终点：</span><span class="redcolor">{{Orderinfo.endAddress || '--'}}</span></p>
      </div>
      <div class="flexrounm" v-if="Orderinfo.status == 3">
        <p style="margin-left: 40px;"><i class="circle bgredcoloe"></i><span class="status redcolor">{{Orderinfo.status | filterType}}</span></p>
      </div>
      <div class="flexrounm" v-else-if="Orderinfo.status == 1">
        <p style="margin-left: 40px;"><i class="circle bggreencoloe"></i><span class="status greencolor">{{Orderinfo.status | filterType}}</span></p>
      </div>
      <div class="flexrounm" v-else>
        <p style="margin-left: 40px;"><i class="circle bgglaycoloe"></i><span class="status glaycolor">{{Orderinfo.status | filterType}}</span></p>
      </div>
    </div>

    <el-form :inline="true" :model="search" ref="search" class="demo-form-inline">
      <el-form-item label="物流单号" prop="logisticsNumber">
        <el-input v-model="search.logisticsNumber" placeholder="请输入物流单号"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="search.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="carNumber">
        <el-input v-model="search.carNumber" placeholder="请输入车牌号"></el-input>
      </el-form-item>
      <el-form-item label="完成状态" prop="state">
        <el-select v-model="search.state" placeholder="请选择">
          <el-option label="已接单" :value="1"></el-option>
          <el-option label="运输中" :value="2"></el-option>
          <el-option label="完成" :value="3"></el-option>
          <el-option label="拒绝" :value="4"></el-option>
          <el-option label="用户取消" :value="5"></el-option>
          <el-option label="指定" :value="6"></el-option>
          <el-option label="到达" :value="7"></el-option>
          <el-option label="司机取消" :value="8"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getlist()">查询</el-button>
        <el-button @click="resealist()">重置</el-button>
      </el-form-item>
    </el-form>
     <div class="record">
       <el-table :data="tableData"  ref="table"  stripe style="width: 100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column type="index" label="序号" ></el-table-column>
          <el-table-column show-overflow-tooltip label="司机姓名" ><template slot-scope="{row}">{{row.userName || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="账号" ><template slot-scope="{row}">{{row.userAccount || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="物流单号" ><template slot-scope="{row}">{{row.logisticsNumber || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="车牌号" ><template slot-scope="{row}">{{row.carNumber || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="承运量" ><template slot-scope="{row}">{{row.receivingCapacity || '0'}} 吨</template></el-table-column>
          <el-table-column show-overflow-tooltip label="实际运输量" ><template slot-scope="{row}">{{row.carryingCapacity || '0'}}吨</template></el-table-column>
          <el-table-column show-overflow-tooltip label="实际运输单价" ><template slot-scope="{row}">{{row.logisticsQuotation || '0'}}元/吨</template></el-table-column>
          <el-table-column show-overflow-tooltip label="实际运输总价" ><template slot-scope="{row}">{{row.totalPrice || '0'}}元</template></el-table-column>
          <el-table-column show-overflow-tooltip label="实际发车时间" ><template slot-scope="{row}">{{row.startTransporTime || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="到达时间" ><template slot-scope="{row}">{{row.finishTime || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="用时" ><template slot-scope="{row}">{{row.takingTime || '--'}}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="接单时间" ><template slot-scope="{row}">{{row.orderTime || '--'}}</template></el-table-column>
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
    <!-- 弹框 -->
    <!-- 订单详情 -->
    <el-dialog :modal-append-to-body="false" title="订单详情" :close-on-click-modal="false" :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
      <div>
        <div style="text-align: right;margin-bottom: 10px;"><el-button @click="reloadMap" type="primary">刷新</el-button></div>
        <div class="felxrow">
          <div style="width: 40%;margin-right: 20px;">
            <div class="title">驾驶员信息</div>
            <div class="felxrow">
              <div class="flexrounm" style="width: 40%;">
                <div style="margin-bottom: 30px;" @click="bigimg(info.userPhoto)"><el-avatar fit="fill" :src="info.userPhoto" :size="100"></el-avatar></div>
                <div @click="bigimg(info.carSideImg)"><el-avatar fit="fill" shape="square" :src="info.carSideImg" :size="100"></el-avatar></div>
              </div>
              <div class="felxrowwrap" style="width: 60%;">
                <p>司机：{{info.userName || "--"}}</p>
                <p>驾龄：{{info.drivingAge || "--"}}年</p>
                <p>身份证号：{{info.userCardid || "--"}}</p>
                <p>手机：{{info.userPhone || "--"}}</p>
                <p>接单数：{{info.orderProgressing || "--"}}</p>
                <p>车牌号：{{info.carNumber || "--"}}</p>
                <p>车辆类型：{{info.carType | cardType }}</p>
                <p>总重量：{{info.carWeight || "0"}} 吨</p>
                <p>核定载重：{{info.carLoad || "0"}} 吨</p>
                <p>车辆长宽高：{{info.carLong}}*{{info.carWide}}*{{info.carHigh}}米</p>
                <p>轴数：{{info.carAxleNumber | carAxleNumbertype}}</p>
                <p>排放标准：{{info.carEmissionStandard | carEmissionStandardtype}}</p>
                <p>车牌颜色：{{info.carNumberColor | carNumberColortype}}</p>
              </div>
            </div>
            <div class="title">客户信息</div>
            <div class="flexrounm" style="margin-left: 20px;">
              <p>发布人：{{Orderinfo.userName || '--'}} </p>
              <p>联系电话：{{Orderinfo.userPhone || '--'}}</p>
            </div>
             <div class="title">订单信息</div>
             <div class="felxrowwrap" style="margin-left: 20px;">
               <p>货物：{{Orderinfo.transportGoods || '--'}}</p>
               <p>承接量：{{info.receivingCapacity || "0"}}吨</p>
               <p>空车重量：{{info.carEmptyWeight || "0"}}吨</p>
               <p>装车重量：{{info.carryingCapacity*1+info.carEmptyWeight*1 || "0"}}吨</p>
               <p>实际运输量：{{info.carryingCapacity || "0"}}吨</p>
               <p>实际运输价格：{{info.logisticsQuotation || "--"}}元/吨</p>
               <p>起点：{{info.startDetailAddress || '--' }}</p>
               <p>终点：{{info.endDetailAddress || "--"}}</p>
               <p style="margin-bottom: 20px;"></p>
               <p>出发时间：{{info.startTransporTime || "--"}}</p>
               <p>到达时间：{{info.finishTime || '--'}}</p>
               <p>运输用时：{{info.takingTime || '--'}}</p>
             </div>
          </div>
          <div style="width: 60%;"><div id="mapContainer"></div></div>
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
    props:['Orderinfo'],
    data(){
      return{
        imgdialogVisible:false,
        dialogImageUrl:'',
        totalRecords:0,
        search:{
          logisticsNumber:'',
          account:'',
          state :'',
          carNumber:'',
          currentPage:1,
          pageSize:10,
          orderId:this.Orderinfo.orderID
        },
        tableData:[],
        dataloading:false,
        dialogVisible:false,
        info:'',
        startLngLat:[],
        endLngLat:[],
        detailsData:{},
        Flng: "", //起点经度
        Flat: "", //起点纬度
        Tlng: "", //终点经度
        Tlat: "", //终点纬度
      }
    },
    filters: {
      // 状态 1发布，2运输中，3完成，4取消
      filterType(status) {
        let typeMap = {
          1: "已接单",
          2: "运输中",
          3: "完成",
          4: "拒绝",
          5: "用户取消",
          6: "指定",
          7: "到达",
          8: "司机取消",
        };
        return typeMap[status];
      },
      userType(status){
        let typeMap = {
          1: "个人",
          2: "企业",
        }
        return typeMap[status];
      },
      // 车辆类型
      cardType(status) {
        let typeMap = {
          1: "小客车",
          2: "微型货车",
          3: "轻型货车",
					4: "中型货车",
					5: "重型货车"
        };
        return typeMap[status];
      },
      carAxleNumbertype(status){
        let typeMap = {
          1: "1轴",
          2: "2轴",
          3: "3轴",
          4:'4轴',
          5:'5轴',
          6:'6轴以上'
        };
        return typeMap[status];
      },
      carEmissionStandardtype(status){
        let typeMap ={'1':'国一','2':'国二','3':'国三','4':'国四','5':'国五','6':'国六'};
        return typeMap[status];
      },
      carNumberColortype(status){
        let typeMap ={'1':'蓝牌','2':'黄牌','3':'绿牌','4':'黑牌'};
        return typeMap[status];
      }
    },
    methods:{
      //查看大图
      bigimg(img) {
      	this.dialogImageUrl = img
      	this.imgdialogVisible = true
      },
      backfun:function(){
        this.$emit('GetbussnessList',1)
      },
      handleCurrentChange:function(val){
        this.search.currentPage = val;
        this.getlist();
      },
      getlist() {
        this.dataloading = true;
        var Params = this.search;
        http.driverOrderList(Params).then(data => {
          this.dataloading = false;
          if (data.statusCode === 200) {
            this.tableData = data.message.records;
            this.totalRecords = data.message.totalRecords;
          }
        });
      },
      resealist:function(){
        this.$refs["search"].resetFields();
        this.getlist();
      },
      //关闭弹窗
      handleClose(done) {
        this.$Alert.hidden(this.$route.name)
        done()
      },
      //刷新
      reloadMap(){
        this.getMapLine(this.detailsData)
      },
      Getinfo:function(row){
        this.info =''
        this.info = row
        this.detailsData ={
          driverOrderID:row.driverOrderID
        }
        this.getMapLine(this.detailsData)
        this.dialogVisible = true
      },
      getMapLine:function(data){
          http.getCarTrajectory(data).then(res =>{
            this.startLngLat = []
            this.endLngLat = []
            if(res.statusCode == 200){
                if(res.message.start != null ){
                  let start = res.message.start
                  let end = res.message.end
                  this.startLngLat = [Number(start.split(",")[1]), Number(start.split(",")[0])]
                  this.endLngLat = [Number(end.split(",")[1]), Number(end.split(",")[0])]
                }
              if(this.Flat != null){this.getInit()}
           }
          })
      },
      getInit() {
        let that = this
        this.$nextTick(() => {
          let map = new AMap.Map("mapContainer", {
            resizeEnable: true,
            zoom: 14
          });
        AMap.plugin("AMap.TruckDriving", () => {
          let truckDriving = new AMap.TruckDriving({
            policy: 0,
            size: 1
          });
          var path = [];
          path.push({ lnglat : this.startLngLat })
          path.push({ lnglat : this.endLngLat })
          truckDriving.search(path, (status, result) => {
            if (status === "complete") {
              if (result.routes && result.routes.length) {
                drawRoute(result.routes[0]);
              }
            } else {
              this.$message.error("获取货车规划数据失败：" + result);
            }
          });

         function drawRoute(route) {
           var path = parseRouteToPath(route);
           var startMarker = new AMap.Marker({
             position: path[0],
             icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
             map: map
           });
           var endMarker = new AMap.Marker({
             position: path[path.length - 1],
             icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
             map: map
           });
           var routeLine = new AMap.Polyline({
             path: path,
             isOutline: true,
             outlineColor: "#ffeeee",
             borderWeight: 2,
             strokeWeight: 5,
             strokeColor: "#0091ff",
             lineJoin: "round"
           });
           routeLine.setMap(map);
           // 调整视野达到最佳显示区域
           map.setFitView([startMarker, endMarker, routeLine]);
         }
          // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
          function parseRouteToPath(route) {
            var path = [];
            for (var i = 0, l = route.steps.length; i < l; i++) {
              var step = route.steps[i];
              for (var j = 0, n = step.path.length; j < n; j++) {
                path.push(step.path[j]);
              }
            }
            return path;
          }
        });
       })
      },

    },
    mounted() {
      this.getlist();
    }
  }
</script>

<style>
  .infobox{border: 1px solid #EAEAEA;border-radius: 5px;padding: 10px;margin-bottom: 20px;}
  .line{border-right: 1px solid #EAEAEA;text-align: left;padding: 0 30px;}
  .line i{padding-right: 0.625rem;font-size: 1rem;}
  .felxrow{display: flex;flex-direction:row;flex-wrap:nowrap;}
  .felxrowwrap{display: flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;}
  .felxrowwrap p{min-width: 50%;line-height: 40px;}
  .flexrounm{display: flex;flex-direction: column;justify-content:center;}
  .flexrounm p{line-height: 30px;}
  .avatar{margin-right: 10px;width: auto;}
  .greencolor{color: green;}
  .redcolor{color: red;}
  .bgredcoloe{background: red;}
  .bggreencoloe{background: green;}
  .glaycolor{color: #666;}
  .bgglaycoloe{background: #666;}
  .flexrounm .circle{display: inline-block;width: 15px;height: 15px;border-radius: 15px;margin-right: 1.25rem;vertical-align: middle;}
  .flexrounm .status{padding-right: 20px;}
  .flexrounm .bigsize{font-size: 2rem;}
  .flexrounm .address-item{height: 40px;vertical-align: middle;white-space: nowrap;}
  .flexrounm .address-item span{line-height: 40px;}
  .felxrow .title{background: #eaeaea;color:#000;width:100%;padding: 5px 10px;box-sizing: border-box;font-weight: bold;}
</style>
