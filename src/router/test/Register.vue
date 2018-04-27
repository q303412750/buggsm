<template>
	<div>
        <el-button   @click="dialogFormVisible = true" >登记</el-button>
            <el-dialog title="BUG详情" :visible.sync="dialogFormVisible"  width="860px"> 
              <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              >
              <span class="tips">此区域可粘贴文件 / 图片</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <div class="dialog-tab">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="基本信息" name="first">
                    <div class="basic-info">
                        <el-form :rules="rules" label-width="80px" >
                            <el-row style="margin:20px 0;">
                                <el-col :span="12"><span class="input-intro">登记人</span><span>方堃</span></el-col>
                                <el-col :span="12"  style="padding-left:10px"><span class="input-intro">登记时间</span><span>2018-04-17 16：20</span></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="问题标题" prop="title">   
                                        <el-input  placeholder="请输入" style="width:320px;"></el-input>
                                    </el-form-item> 
                                </el-col>
                                <el-col :span="12" style="padding-left:10px">
                                    <el-form label-width="80px" label-position="left" :rules="rules"> 
                                        <el-form-item label="客户" prop="client">
                                            <el-select  filterable placeholder="请选择" style="width:320px;"  v-model="kehu">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-form-item label="问题描述" prop="des">
                                     <el-input size="large" placeholder="请输入" type="textarea" style="width: 740px;"></el-input>
                                </el-form-item>
                            </el-row> 
                            <el-row>
                                <el-form-item label="备注说明" prop="mark">    
                                    <el-input size="small" placeholder="请输入" style="width:740px;"></el-input>
                                </el-form-item>
                            </el-row> 
                        </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="解决信息" >
                    <Resolve></Resolve>
                  </el-tab-pane>
                  <el-tab-pane label="问题原因" >
                    <Reason></Reason>
                  </el-tab-pane>
                  <el-tab-pane label="操作日志" >
                    <Dialog></Dialog>
                  </el-tab-pane>
                </el-tabs>
                <span class="dialog-tab-info">来源：任务系统</span>
              </div> 
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
        </el-dialog>
    </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import Resolve from "../test/resolve.vue";
import Reason from "../test/Reason.vue";
import Dialog from "../test/Dialog.vue";
@Component({
  components: { Resolve, Reason, Dialog }
})
export default class Register extends Vue{
    data(){
        return{
            dialogFormVisible: false,
            dialogVisible:false,
            dialogImageUrl: "",
            activeName:"first",
            mark:false,
            kehu:"",
            options: [{
                value: '选项1',
                label: '客户1'
                }, {
                value: '选项2',
                label: '客户2'
                }, {
                value: '选项3',
                label: '客户3'
             }],
             rules: {
                title: [
                    { required: true, message: '请输入问题标题', trigger: 'blur' }
                ],
                client: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                des: [
                    { required: true, message: '请输入问题描述', trigger: 'blur' }
                ]
             }
        }
    }
}
</script>
<style>
.el-tabs__nav-wrap::after{
    z-index: 100;
}
</style>

<style type="text/css" scoped>

	.el-button {
        background: #fff;
        width: 70px;
        height:36px;
        color: #606266;
        font-size:14px;
      }
      .el-button:hover {
        background: rgb(64, 158, 255);
        color: white;
      }
      .tips {
        font-size: 20px;
        color: #999;
      }
      .dialog-tab {
        position: relative;
      }
      .dialog-tab-info {
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        position: absolute;
        right: 10px;
        top: 0;
        color: #999;
      }
      /*弹出框里面的所有span的宽度*/
      .input-intro {
        width: 80px;
        display: inline-block;
        padding-left: 10px;
      }
      .input-textarea {
        vertical-align: top;
      }
      .basic-info {
        margin-top: 20px;
      }
      .basic-info > .el-row {
        margin-bottom: 20px;
      }
</style>