<template>
    <el-form ref="form" label-width="70px" class="login-container"  :inline='true' :model="form" :rules="rules">
        <h3 class="login-title">系统登陆</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" style="margin-left: 105px;margin-top: 10px;" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default{
    data() {
        return {
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {
                        required:true,trigger:'blur',//失去焦点时触发
                        message:'请输入用户名'
                    }
                ],
                password:[
                    {
                        required:true,trigger:'blur',//失去焦点时触发
                        message:'请输入用户名'
                    }
                ]
            }
        }
    },
    methods:{
        //登录
        submit(){
            //注释掉的为静态token，现在用后端接口进行动态处理
            // //token信息
            // const token = Mock.Random.guid()
            // //token信息存入cookie用于不同页面的通信
            // Cookie.set('token',token)


            //校验通过
            this.$refs.form.validate((valid) =>{
                 //valid 会根据表单是否提交成功返回一个布尔值
                 //此为element-ui中form的事件，详细见文档
                 if(valid){
                    getMenu(this.form).then(({data}) => {
                        console.log(data)
                        if(data.code === 20000){
                            //token信息存入cookie用于不同页面的通信
                            Cookie.set('token',data.data.token)

                            //获取菜单的数据，存入store,运用vuex状态管理
                            this.$store.commit('setMenu',data.data.menu)
                            this.$store.commit('addMenu',this.$router)
                            //跳转到首页
                             this.$router.push('/home')
                        }else{
                            //element-ui中用法
                            this.$message.error(data.data.message);
                        }
                    })
                 }
            })
            //跳转到首页
            // this.$router.push('/home')

        }
    }
}
</script>

<style lang="less" scoped>
    .login-container{
        width: 350px;
        border: 1px solid #eaeaea;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 15px ;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        .login-title{
            text-align: center;
            margin-bottom: 40px;
            color: #505458;
        }
        .el-input{
            width: 198px;
        }
    }
</style>