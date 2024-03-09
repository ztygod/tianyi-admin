<template>
<el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
  <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
  <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
    <i :class="`el-icon-${item.icon}`"></i>
    <span slot="title">{{ item.label }}</span>
  </el-menu-item>

  <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label" >
    <template slot="title">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </template>
    <el-menu-item-group v-for="subitem in item.children" :key="subitem.path">
      <el-menu-item @click="clickMenu(subitem)" :index="subitem.path">{{ subitem.label }}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  
</el-menu>
</template>


 


<script>
import Cookie from 'js-cookie'
  export default {
    
    data() {
      return {

      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        console.log(item)
        //当页面路由与跳转路由不一样时，才跳转
        if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
          this.$router.push(item.path)
        }
        this.$store.commit('selectMenu',item)
      }
    },
    computed:{
      noChildren(){
        return this.menuData.filter(item => !item.children)
      },
      hasChildren(){
        return this.menuData.filter(item => item.children)
      },
      isCollapse(){
        return this.$store.state.tab.isCollapes
      },
      //给出动态菜单数据
      menuData(){
        //判断当前数据，如果缓存中没有（可以理解为数据还没失去），就从store中去获取
        return JSON.parse(Cookie.get('menu')) ||  this.$store.state.tab.menu
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100vh;
    border-right: none;
    h3{
      color: #fff;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>