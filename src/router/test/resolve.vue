<template>
	<div class="basic-info">
		<div class="basic-info">
		<el-form label-width="75px">
          <el-row>
            <el-col :span="12">
				<el-form-item label="开发人员">
					<el-select  filterable placeholder="请选择" style="width:320px;"  v-model="dev">
						<el-option v-for="item in devs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					</el-input>
				</el-form-item>
            </el-col>
            <el-col :span="12">

					<el-form-item label="测试人员">
						<el-select  filterable placeholder="请选择" style="width:320px;"  v-model="check">
							<el-option v-for="item in checks" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

            </el-col>
          </el-row>
          <el-row>
          	<el-col :span="12">

          			<el-form-item label="问题类型">
	          			<div style="display: inline-block">
				      		<el-select v-model="select" slot="prepend" placeholder="请选择" size="small">
						      <el-option label="BUG" value="1"></el-option>
						      <el-option label="订单号" value="2"></el-option>
						      <el-option label="用户电话" value="3"></el-option>
							</el-select>
						</div>
					</el-form-item>

          	</el-col>
          	<el-col :span="12">

					<el-form-item label="责任人">
						<el-select  filterable placeholder="请选择" style="width:320px;"  v-model="resp">
							<el-option v-for="item in resps" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

          	</el-col>
          </el-row> 
          <el-row>
            <el-col :span="12">
	            	<el-form-item label="是否解决">
						<el-radio v-model="radio" label="1">是</el-radio>
						<el-radio v-model="radio" label="2">否</el-radio>
					</el-form-item>

            </el-col>
            <el-col :span="12">
	            	<el-form-item label="解决时间">
						<el-time-select v-model="times" :picker-options="{ start: '08:30',step: '00:15',end: '18:30'}" placeholder="请选择时间" style="width:320px;">
						</el-time-select>
	
					</el-form-item>
            </el-col>
          </el-row> 
		</el-form>
        </div>
	</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class Resolve extends Vue{
	data(){
		return{
			select:'BUG',
			radio:'2',
			dev:"",
			check:"",
			resp:"",
			times: "",
			devs: [{
                value: '选项1',
                label: '开发1'
                }, {
                value: '选项2',
                label: '开发2'
                }, {
                value: '选项3',
                label: '开发3'
			 }],
			 checks: [{
                value: '选项1',
                label: '测试1'
                }, {
                value: '选项2',
                label: '测试2'
                }, {
                value: '选项3',
                label: '测试3'
			 }],
			 resps: [{
                value: '选项1',
                label: '责任1'
                }, {
                value: '选项2',
                label: '责任2'
                }, {
                value: '选项3',
                label: '责任3'
			 }],
		}
	}
}
</script>