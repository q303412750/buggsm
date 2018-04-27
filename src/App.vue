<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  name: 'app'
})
export default class App extends Vue {}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
ul,ol,li,dl,dd{
  list-style:none;
}
img{
  border:0;
  vertical-align:middle;
}
a{
  text-decoration:none;
  color:#333;
}
input{
  outline:none;
}
input[type="button"],input[type="submit"],input[type="reset"],input[type="file"]{
  cursor:pointer;
}
html{
  font-size:14px;
  font-family:"微软雅黑";
  color:#666;
}
.cl:after{
  content:"";
  display: block;
  clear: both;
  overflow: hidden;
  height: 0;
  visibility: hidden;
}
.cl{
  zoom:1;
}
textarea{
  resize:none;
  outline:none;
}
html,body{
  width: 100%;
  height: 100%;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #ECECEC;
  box-sizing: border-box;
  padding-top: 80px;
  font-size: 12px;
  .home .taskbox{
    label{
      font-size: 12px;
    }
    .el-input{
      width: 280px;
    }
    .el-input--small input {
      width: 130px;
    }
    .el-input__inner{
      width: 280px;
      height: 32px;
    }
     
    #MakerName{
      .el-textarea__inner{
        width: 280px;
      }
    }
    textarea{
       width: 520px;
       height: 150px;
       resize:none;
    }
  }
  .public_head {
    .el-input__inner {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: none;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: .1s;
      transition: .1s;
      padding: 0;
      font-size: 12px;
      border-radius: 4px;
    }
  }
  @-webkit-keyframes rollOut {
	0% {
		opacity: 1
	}
	100% {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
		transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)
	}
}

  @keyframes rollOut {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
      -ms-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
      transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)
    }
  }

  .rollOut {
    -webkit-animation-name: rollOut;
    animation-name: rollOut
  }
  @-webkit-keyframes rollIn {
	0% {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
		transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)
	}
	100% {
		opacity: 1;
		-webkit-transform: none;
		transform: none
	}
}

@keyframes rollIn {
	0% {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
		-ms-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
		transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)
	}
	100% {
		opacity: 1;
		-webkit-transform: none;
		-ms-transform: none;
		transform: none
	}
}

.rollIn {
	-webkit-animation-name: rollIn;
	animation-name: rollIn
}
    
}

.el-input__inner {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // height: 28px;
    line-height: 28px;
    font-size: 12px;
  .el-input .el-input__inner{
    width: 300px;
    margin: auto;
  }
  .el-textarea__inner{
    height: 200px;
  }
 
  textarea{
    resize : none;
    font-size: 14px;
    color: #606266;
  }
  .el-input--small .el-input__inner{
    width: 130px;
  }
}
.el-popover {
    position: absolute;
    background: #fff;
    min-width: 56px !important;
    border: 1px solid #ebeef5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1;
    text-align: center;
    font-size: 12px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    cursor: pointer;
  }

.el-loading-mask {
    position: absolute;
    z-index: 2000;
    background-color: #ECECEC;
}

</style>
