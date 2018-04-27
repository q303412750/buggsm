<template>
    <div class="box">
        <el-checkbox>只显示自己相关数据</el-checkbox>
        <el-tabs v-model="activeName2" type="card" >
            <el-tab-pane label="全部" name="first"><All></All></el-tab-pane>
            <el-tab-pane label="处理中" name="second" ></el-tab-pane>
            <el-tab-pane label="测试中" name="third" ></el-tab-pane>
            <el-tab-pane label="已解决" name="fourth" ></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import All from '../test/All.vue';
@Component({
  components: { All }
})
export default class Tabs extends Vue{
    data() {
        return {
            activeName2: "first",
            checked:true
        };
    }
}
</script>
<style type="text/css">
    .box .el-tabs__header{
        margin: 0px;
    }
    .box .el-tabs__header .el-tabs__nav{
        background: #fff;
        font-size: 14px;
        font-weight: 400;
        color: #303133;
    }
    .box .el-tabs__item.is-active{
        font-weight: 500;
    }
</style>
<style type="text/css" scoped>

    .box{
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    .hidden-columns{
        background: #fff;
    }
    .el-checkbox{
        position: absolute;
        right:20px;
        top:10px;
    }
</style>
