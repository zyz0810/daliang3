<template>
  <div>
    <logistics-business-manage-server v-if="istooggle==1" @isGetInfo="Getinfoid"></logistics-business-manage-server>
    <bussiness-detailserver v-else :Orderinfo="Orderinfo" @GetbussnessList="Getlist"></bussiness-detailserver>
  </div>
</template>
<script>
  import LogisticsBusinessManageServer from '@/views/logistics/logisticsBusinessManage/index.vue'
  import BussinessDetailserver from '@/views/logistics/logisticsBusinessManage/BussinessDetails.vue'
  export default{
    data(){
      return{
        Orderinfo:[],
        istooggle:1,
      }
    },
    components: {
      LogisticsBusinessManageServer,
      BussinessDetailserver,
    },
    methods:{
      Getinfoid:function(data){
        this.Orderinfo = data
        this.istooggle = 2
      },
      Getlist:function(data){
        this.Orderinfo = []
        this.istooggle = 1
      }
    }
  }
</script>

<style>
</style>
