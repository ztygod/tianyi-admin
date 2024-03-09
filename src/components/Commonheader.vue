<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu"  icon="el-icon-menu" size="mini"></el-button>
            <span class="text">
                <!-- 面包 -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </span>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <!-- <img class="user" src="../assets/th.jpg" alt=""> -->
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancle">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div> 
    </div>

</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default{
    data() {
        return {
            
        }
    },
    methods:{
        handleMenu(){
            console.log(this.$store)
            this.$store.commit('collapseMenu')
            console.log(this.$store)
        },
        handleClick(command){
            //绑定到command事件，这是element-ui中关于<el-dropdown>的规定
           
            if(command ==='cancle')
            console.log('登出')
             //登出时清除cookie
            Cookie.remove('token')
            //登出也要清除cookie中的menu
            Cookie.remove('menu')
            //跳转到登录页面
            this.$router.push('/login')
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList//会返回对象，运用es6语法进行解构
        })
    },
    mounted(){
        console.log(this.tags,'tags')
    }
}
</script>

<style lang="less" scoped>
    .header-container{
        padding: 0 20px;
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item{
            .el-breadcrumb__inner{
                font-weight: normal;
                &.is-link{
                    color: #666;
                }
            }
            &:last-child{
                .breadcrumb__inner{
                    color: #fff;
                }
            }
        }
    }
</style>