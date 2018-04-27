<template>
    <div class="public_head">
        <div class="content">
            <div class="left">
                <img src="https://pps.mingyuanyun.com/__static/logo/mingyuanyun.png" alt="">
            </div>
            <div class="right">
                <div class="search">
                    <el-input v-model="search" placeholder="请输入搜索内容" title="搜索一下" autosize></el-input>
                    <i class="el-icon-search"></i>
                </div>
                <ul class="menu">
                    <li v-for="(menu,index) in menuList" :key="index">
                        <router-link to="">
                            <i class="iconfont icon-viewgallery"></i>
                            {{menu}}
                        </router-link>
                    </li>
                    <li class="user">
                        <el-popover ref="popover" placement="bottom" width="40" trigger="click">
                            <i class="iconfont icon-logout"  @click="exit()"></i>
                            <span  @click="exit()">登出</span>
                        </el-popover>
                        <el-button v-popover:popover>
                            <span class="short">
                                <img :src="userIcon" v-if="userIcon"/>
                                <span v-if="!userIcon">{{shortName}}</span>
                            </span>
                            <span>{{userName}}</span>
                        </el-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import rely from '../oauth2/oauth2rely';

@Component
export default class FnNavBar extends Vue {
    menuList: object = ['门户首页', '应用中心', '云库', '日历', '会议室'];
    search: string = '';
    userName: string = '';
    shortName: string = '';
    showLogout: boolean = false;
    userIcon: string = '';
    created() {
        const user = localStorage.logonUser;
        this.userName = JSON.parse(user).UserName;
        const arr = this.userName.split('');
        this.shortName = arr[arr.length - 1];
        this.userIcon = JSON.parse(user).UserIcon;
    }
    exit() {
        rely.logout(this.$router.currentRoute);
    }
}
</script>

<style lang="scss" scoped>  
.public_head {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  width: 100%;
  height: 64px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: 1px 4px 8px 1px #e0e0e0;
  .content {
    max-width: 1272px;
    height: 64px;
    margin: auto;
    display: flex;
    flex-direction: row;
    .left {
      // float: left;
      width: 100px;
      height: 35px;
      margin-top: 14px;
      margin-right: 56px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      height: 64px;
      flex: 1;
      .search {
        width: 200px;
        height: 64px;
        line-height: 64px;
        float: left;
        position: relative;
          .el-input__inner {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          height: 28px;
          line-height: 28px;
        }
        i {
          position: absolute;
          top: 26px;
          left: 176px;
          color: #108ee9;
        }
      }
      .menu {
        float: right;
        li {
          float: left;
          margin-left: 30px;
          height: 100%;
          a {
            font-size: 12px;
            line-height: 64px;
            i {
              font-size: 12px;
              margin-right: 8px;
            }
          }
        }
        .user {
          height: 64px;
          line-height: 64px;
          position:relative;
          .short {
            display: inline-block;
            width: 25px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 50%;
            background: #e1e1e1;
            vertical-align: middle;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
          }
          .logout{
              width:100%;
              height:30px;
              position:absolute;
              top:56px;
              left:0;
              background:#fff;
              line-height:30px;
              border-radius:4px;
              box-shadow: 1px 4px 8px 1px #e0e0e0;
              text-align:center;
              font-size: 12px;
              font-weight: 400;
              color: rgba(0,0,0,.65);
              cursor: pointer;
              transition: all .3s;
              
          }
        }
      }
    }
  }
}
</style>
