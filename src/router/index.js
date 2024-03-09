import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import Pageone from '../views/Pageone.vue'
import Pagetwo from '../views/Pagetwo.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        component: Main,
        name: 'Main',
        redirect: '/home',
        children: [
            //这个是静态路由
            // {
            //     //首页
            //     path: 'home',
            //     name: 'home',
            //     component: Home
            // },
            // {
            //     //用户管理
            //     path: 'user',
            //     name: 'user',
            //     component: User
            // },
            // {
            //     //商品管理
            //     path: 'mall',
            //     name: 'mall',
            //     component: Mall
            // },
            // {
            //     //页面1
            //     path: 'page1',
            //     name: 'page1',
            //     component: Pageone
            // },
            // {
            //     //页面2
            //     path: 'page2',
            //     name: 'page2',
            //     component: Pagetwo
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login

    }
]

const router = new VueRouter({
    routes
})

export default router