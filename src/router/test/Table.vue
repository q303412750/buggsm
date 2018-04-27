<template>
	<div class="table">
      <el-table :data="tableData">
        <el-table-column prop="date" label="当前状态" width="100"></el-table-column>
        <el-table-column prop="name" label="标题"  width="480"></el-table-column>
        <el-table-column prop="address" label="客户" width="130"></el-table-column>
        <el-table-column prop="time" label="登记时间"></el-table-column>
        <el-table-column  prop="resolveTime" label="解决时间"></el-table-column>
        <el-table-column  prop="sendTime" label="发包时间"></el-table-column>
      </el-table>
    </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class TableCom extends Vue{
  data() {
    return {
      tableData: [
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        },
        {
          date: "处理中",
          name: "销售系统-交易管理房源查询中部分房间无法显示设置的显示内容",
          address: "荣盛房地产",
          time: "2018-04-17 16:20",
          resolveTime: "2018-04-17 16:28",
          sendTime: "2018-04-17 16:28"
        }
      ]
    };
  }
}
</script>
<style type="text/css" scoped>
	

</style>