<template>
	<div class="reasonBar">
		<el-steps direction="vertical" :active="1">
			<el-step title="步骤 1"></el-step>
			<el-step title="步骤 2"></el-step>
			<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
		</el-steps>
		<template slot>

		</template>	
	</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class Dialog extends Vue{

}
</script>
<style type="text/css" scoped>
	.dialog-box{
		padding: 0 20px;
		color: #aaa;
	}
	.dialog-box span{
		color:#111;
		font-weight: 400; 

	}
</style>