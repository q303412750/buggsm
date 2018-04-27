<template>
  <div class="_oauth2">
    <div class="_loading" v-loading="loading" />
    <router-view/>
  </div>
</template>


<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Loading } from 'element-ui';

@Component
export default class MainLayout extends Vue {
  loading: boolean = true;
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.el-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: #ececec;
}
._oauth2 {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -60px 0 0 -100px;
  width: 150px;
  height: 100px;
  text-align: center;
}
._loading {
  margin-bottom: 20px;
}
</style>
