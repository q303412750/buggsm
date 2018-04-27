<template>
	<div class="basic-info">
		<el-row>
			<el-form>
					<el-form-item label="问题原因">
						<el-input size="small" placeholder="请输入" type="textarea" style="width: 748px;" :rows="11">
						</el-input>
					</el-form-item>
				</el-form>
		</el-row>
	</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class Reason extends Vue{

}
</script>
<style type="text/css" scoped>
	.el-form-item__label{
		  vertical-align:top;
	}

</style>