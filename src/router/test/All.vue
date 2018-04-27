<template>
    <div class="home-content">
    	<el-row :gutter="20">
		    <el-col :span="3">
    			<div>
      		 	<el-select v-model="select" slot="prepend" placeholder="请选择" class="input-select" >
      			      <el-option label="标题" value="1"></el-option>
      			      <el-option label="客户" value="2"></el-option>
      			      <el-option label="登记名" value="3"></el-option>
      			</el-select>                 
             <!-- 选择下拉多选input -->
      		</div>
		    </el-col>
    		<el-col :span="10">
    			<div class="search">
    				<el-input placeholder="请输入搜索内容" title="搜索一下"  class="input-with-search" icon="search"></el-input><i style="cursor:pointer" class="el-icon-search"></i>
    			</div>
    		</el-col>
    		<el-col :span="1.5">
    			  <Register></Register>
            <!-- 登记的模态框 -->
    		</el-col>
    		<el-col :span="1.5">
    			  <el-button  @click="dialogSend=true">指派</el-button>
            <el-dialog title="指派" :visible.sync="dialogSend ">
              <el-row>
                <el-col :span="12">
                  <el-form>
                    <el-form-item label="开发人员">
                      <el-input size="small" placeholder="请输入" style="width: 370px;">
                        <i class="el-icon-search el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form>
                    <el-form-item label="开发人员">
                      <el-input size="small" placeholder="请输入" style="width: 370px;">
                        <i class="el-icon-search el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-form>
                    <el-form-item label="开发人员">
                      <el-input size="small" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-form>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSend = false">取 消</el-button>
                <el-button type="primary" @click="dialogSend = false">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 指派的模态框 -->
    		</el-col>
    		<el-col :span="1.5">
    			  <el-button  @click="disalogResolve = true">解决</el-button>
            <el-dialog title="收货地址" :visible.sync="disalogResolve ">
              <el-form>
                hello
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="disalogResolve = false">取 消</el-button>
                <el-button type="primary" @click="disalogResolve = false">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 解决的模态框 -->
    		</el-col>
    		<el-col :span="6.5">
    		  	<el-button-group class="btn-group">
    				  <el-button >确认解决</el-button>
    				  <el-button class="line">打回</el-button>            
    				  <el-button @click="hello">关闭</el-button>
    			</el-button-group>
    		</el-col>
    	</el-row>
      <TableCom></TableCom>
      <div class="block-page">
        <span>每页</span><el-select v-model="pageNum" slot="prepend" placeholder="请选择" size="mini">
      			      <el-option label="10" value="1"></el-option>
      			      <el-option label="20" value="2"></el-option>
      			      <el-option label="30" value="3"></el-option>
        </el-select><span>条</span>   
        <el-pagination
          :page-size="10"
          :pager-count="21"
          layout="prev, pager, next"
          :total="230"
          class="pagination">
        </el-pagination>
      </div>
    </div>
</template>
<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";

import TableCom from "../test/Table.vue";
import Register from "../test/Register.vue";
@Component({
  components: {  TableCom, Register }
})
export default class All extends Vue {
  hello() {
    alert("hello");
  }
  data() {
    return {
      select: "标题",
      pageNum:10,
      dialogSend: false,
      disalogResolve: false
    };
  }
}
</script>
    <style>
      .el-table table {
        width: auto !important;
      }
      .el-table__body {
        width: auto !important;
      }
      .el-upload--picture-card {
        width: 100% !important;
        background-color: #fff;
      }
      .el-button {
        border-radius: 4px;
      }
      .el-input__inner{
        height: 36px;
        line-height: 36px;
      }
      .el-pager li{
        font-size:14px;
      }
      /* <!--统一所有按钮圆角为4px--> */
    </style>
    <style type="text/css" scoped>
      .home-content {
        box-sizing: border-box;
        max-width: 1200px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #dcdfe6;
        padding: 25px 24px 24px 24px;
      }
      .input-with-search{
        width: 320px;
        height: 36px;
        line-height:36px;
      }
      .input-select {
        width: 100px;
        background: #fff;
        color: #000;
        height: 36px;
      }
      .search {
        position: relative;
      }
      .search i {
        position: absolute;
        top: 11px;
        left: 295px;
        color: rgb(166, 166, 166);
        font-size: 14px;
        font-weight: 400;
      }
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
      .btn-group {
        width: 238px;
        height: 36px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        line-height: 36px;
        font-size: 14px;
        box-sizing: border-box;
      }
      .btn-group .el-button {
        width: auto;
        padding: 11px 21px;
        border: none;
        height:34px;
      }
      .btn-group .line::before {
        content: " ";
        position: absolute;
        width: 1px;
        height: 16px;
        background-color: #dcdfe6;
        top: 10px;
        z-index: 100;
        left: 0;
      }
      .btn-group .line::after {
        content: " ";
        position: absolute;
        width: 1px;
        height: 16px;
        background-color: #dcdfe6;
        top: 10px;
        right: 0;
        z-index: 100;
      }
      .table {
        margin-top: 20px;
      }
      .el-table__header-wrapper{
        color: #909399;
      }
      .block-page {
        text-align: right;
        margin-top: 88px;
        margin-bottom: 20px;
        color:#606266;
      }
      .block-page .el-select{
        width:60px;
        height: 28px;
        margin:0 7px;
        text-align:left;
      }
      .block-page .el-pagination {
        font-weight: normal;
        color: #666;
        float: right;
        margin-left:8px;
        padding:0 ;
      }
    </style>
