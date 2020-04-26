<template>
  <div v-if="model === 'city'">
    <el-form-item :label="label.provice" >
        <el-select :disabled="isDisable" :value="provVal"   @change="choseCity" :label-width="labelWidth">
          <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item :label="label.city" :prop="addressProp.city" class="ml20" :label-width="labelWidth">
        <el-select :disabled="isDisable" :value="cityVal"  @change="choseBlock">
          <el-option  v-for="item in cityAll" :key="item.id"  :label="item.value" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item :label="label.area" :prop="addressProp.county"  class="ml20" :label-width="labelWidth">
        <el-select :disabled="isDisable" :value="areaVal">
        	  <el-option  v-for="item in areaAll"  :key="item.id"  :label="item.value"  :value="item.value"></el-option>
        </el-select>
    </el-form-item>
  </div>
  <!-- <div v-if="model === 'city'" class="address-choose">
    <el-form-item :label="label.provice" :prop="addressProp.province" :label-width="labelWidth">
      <el-select :disabled="isDisable" :value="provVal" @change="choseAddress(0, $event)">
        <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="label.city" :prop="addressProp.city" class="ml20" :label-width="labelWidth">
      <el-select :disabled="isDisable" :value="cityVal" @change="choseAddress(1, $event)">
        <el-option v-for="item in city" :key="item.id" :label="item.value" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="label.area" :prop="addressProp.county" class="ml20" :label-width="labelWidth">
      <el-select :disabled="isDisable" :value="areaVal" @change="choseAddress(2, $event)">
        <el-option v-for="item in area" :key="item.id" :label="item.value" :value="item.value"></el-option>
      </el-select>
    </el-form-item> -->
  </div>
</template>

<script>
import { LocalhostGetData } from '@/api/api'
import { GetAddressMap,choseAddress } from '@/common/js/common';
export default {
  props: {
    model: {
      type: String,
      default: 'city'
    },
    provVal: {
      type: String,
      default: ''
    },
    addressProp: {
      type: Object,
      default () {
        return {
          province: 'order_province',
          city: 'order_city',
          county: 'order_county'
        }
      }
    },
    cityVal: {
      type: String,
      default: ''
    },
    areaVal: {
      type: String,
      default: ''
    },
    label: {
      type: Object,
      default: () => {
        return {
          provice: '',
          city: '',
          area: ''
        }
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cityAll:[],
      areaAll:[],
      Agentlist:[],
      province: '',
      // mapJson: '../../static/json/map.json',
      // cityAll: [], // 市区集合
      // areaAll: [], // 区域集合
      // province: [], // 省
      // city: [], // 市
      // area: [], // 区,
      checkedAddress: {
        provVal: '',
        cityVal: '',
        areaVal: ''
      }
    }
  },
  created:function(){
    var self = this
    GetAddressMap(self)
  },
  methods: {
    // 获取省市区
    choseCity: function (e) {
      // this.ruleForm.userCity = ''
      // this.ruleForm.userCounty= ''
      let index2 = this.province.findIndex(item => item.value == e)
      var self = this
      choseAddress(self,0,this.province[index2].id)

    },
    choseBlock: function (e) {
      // this.ruleForm.userCounty= ''
      let index = this.cityAll.findIndex(item => item.value == e)
      var self = this
      choseAddress(self,1,this.cityAll[index].id)

    },

    // getAllpre () {
    //   LocalhostGetData(this.mapJson).then(res => {
    //     if (res.data) {
    //       for (let item in res.data) {
    //         if (item.match(/0000$/)) {
    //           // 省
    //           this.province.push({
    //             id: item,
    //             value: res.data[item],
    //             children: []
    //           })
    //         } else if (item.match(/00$/)) {
    //           // 市
    //           this.cityAll.push({
    //             id: item,
    //             value: res.data[item],
    //             children: []
    //           })
    //         } else {
    //           // 区
    //           this.areaAll.push({ id: item, value: res.data[item] })
    //         }
    //       }
    //       // 分类市级
    //       this.province.forEach(item => {
    //         this.cityAll.forEach(cItem => {
    //           if (item.id.slice(0, 2) === cItem.id.slice(0, 2)) {
    //             item.children.push(cItem)
    //           }
    //         })
    //       })
    //       // 分类区级
    //       this.cityAll.forEach(item => {
    //         this.areaAll.forEach(cItem => {
    //           if (item.id.slice(0, 4) === cItem.id.slice(0, 4)) {
    //             item.children.push(cItem)
    //           }
    //         })
    //       })
    //     }
    //   })
    // },
    // // 选择区域
    // choseAddress (type, e) {
    //   // 用作城市联动
    //   if (type === 0) {
    //     let index = this.province.findIndex(item => item.value === e)
    //     this.city = [].concat(this.province[index].children)
    //     this.area = [].concat(this.province[index].children[0].children)
    //     this.checkedAddress.provVal = e
    //     this.checkedAddress.cityVal = this.city[0].value
    //     this.checkedAddress.areaVal = this.city[0].children[0].value
    //   } else if (type === 1) {
    //     let index = this.city.findIndex(item => item.value === e)
    //     this.area = [].concat(this.city[index].children)
    //     this.checkedAddress.cityVal = e
    //     this.checkedAddress.areaVal = this.area[0].value
    //   } else {
    //     this.checkedAddress.areaVal = e
    //   }
    //   this.$emit('changeAddress', {
    //     type,
    //     val: this.checkedAddress
    //   })
    // }
  },
  // created () {
  //   this.getAllpre()
  // }
}
</script>

<style lang="scss" scoped>
.address-choose {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  .el-form-item {
    flex-basis: 30%;
  }
}

</style>
