<template>
        <div>
          <driver-manage-server @isGetCarlistfun="isGetCar" v-if="isGetCarlist==1"></driver-manage-server>
          <vehicle-details-server @GetCarlistfun="GetCar" :orderID="orderID"  v-else ></vehicle-details-server>
        </div>
</template>

<script>
  import driverManageServer from '@/views/logistics/driverManage/index.vue'
  import VehicleDetailsServer from '@/views/logistics/driverManage/VehicleDetails.vue'
  export default{
    data(){
      return{
        isGetCarlist:1,
        orderID:''
      }
    },
    components: {
      driverManageServer,
      VehicleDetailsServer,
    },
    methods:{
      isGetCar:function(data){
        this.orderID = data
        this.isGetCarlist = data
      },
      GetCar:function(data){
        this.isGetCarlist = 1
      }
    }
  }
</script>

<style>
</style>
