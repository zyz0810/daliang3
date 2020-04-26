<template>
  <div class="upload-container dealer-info">
   <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible" title="图片上传" :append-to-body="true">
     <!-- <el-upload :multiple="true" :file-list="fileList" :show-file-list="true" :on-remove="handleRemove" :on-success="handleSuccess"
        :before-upload="beforeUpload" class="editor-slide-upload" action="https://httpbin.org/post" list-type="picture-card">
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload> -->
      <el-upload :multiple="true" :file-list="fileList" :show-file-list="true" :on-remove="handleRemove"
       :before-upload="beforeUpload" class="editor-slide-upload" action="#" list-type="picture-card">
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import http from "@/api/http";
  export default {
    name: 'EditorSlideUpload',
    props: {
      color: {
        type: String,
        default: '#1890ff'
      }
    },
    data() {
      return {
        dialogVisible: false,
        listObj: {},
        fileList: []
      }
    },
    methods: {
      checkAllSuccess() {
        return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
      },
      handleSubmit() {
        const arr = Object.keys(this.listObj).map(v => this.listObj[v])
        console.log("arr",arr,this.listObj)
        // if (!this.checkAllSuccess()) {
        //   this.$message(
        //     '请等待图片上传，如果上传失败，请刷新页面重试!'
        //   )
        //   return
        // }
        this.$emit('successCBK', arr)
        this.listObj = {}
        this.fileList = []
        this.dialogVisible = false
      },
      // handleSuccess(response, file) {
      //   const uid = file.uid
      //   const objKeyArr = Object.keys(this.listObj)
      //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //     if (this.listObj[objKeyArr[i]].uid === uid) {
      //       this.listObj[objKeyArr[i]].url = response.files.file
      //       this.listObj[objKeyArr[i]].hasSuccess = true
      //       return
      //     }
      //   }
      // },
      handleRemove(file) {
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]]
            return
          }
        }
      },
      beforeUpload(imgfile) {
        console.log(imgfile)
        const _self = this
        const uid = imgfile.uid
        let params = new FormData()
        const _URL = window.URL || window.webkitURL
        const fileName = imgfile.uid
        this.listObj[fileName] = {}
        return new Promise((resolve,reject) =>{
          const img = new Image()
          img.src = _URL.createObjectURL(imgfile)
          img.onload = function() {
              _self.listObj[fileName] = {
                hasSuccess: false,
                uid: imgfile.uid,
                width: this.width,
                height: this.height
              }
          }
          params.append('imgfile', imgfile)//传文件
          http.publicUploadImg(params).then((res) => {
            if(res.statusCode === 200){
               const objKeyArr = Object.keys(this.listObj)
               console.log(objKeyArr)
               for (let i = 0, len = objKeyArr.length; i < len; i++) {
                 if (this.listObj[objKeyArr[i]].uid === uid) {
                   this.listObj[objKeyArr[i]].url = res.message.ossurl;
                   this.listObj[objKeyArr[i]].hasSuccess = true
                   return
                 }
               }
            }
          })
        })

        return false


        // return false;
        // const _self = this
        // const _URL = window.URL || window.webkitURL
        // const fileName = file.uid
        // this.listObj[fileName] = {}
        // return new Promise((resolve, reject) => {
        //   const img = new Image()
        //   img.src = _URL.createObjectURL(file)
        //   img.onload = function() {
        //     _self.listObj[fileName] = {
        //       hasSuccess: false,
        //       uid: file.uid,
        //       width: this.width,
        //       height: this.height
        //     }
        //   }
        //   resolve(true)
        // })
      }
    }
  }
</script>

<style scoped>
  .editor-slide-upload {
    margin-bottom: 20px;
  }
  .el-upload--picture-card{
    width:100% !important;
  }

</style>
