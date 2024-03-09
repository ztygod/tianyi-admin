import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import "./api/mock"
import Cookie from 'js-cookie'

Vue.config.productionTip = false

//添加一个全局前置导航守卫
router.beforeEach((to, from, next) => {
  //先判断token存不存在
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    //token不存在且不处于登录页面，说明当前用户未登录，应跳转至登录页
    next({ name: 'login' })
  } else if (token && to.name === 'login') { //token 存在，说明用户登录，此时跳转到首页
    next({ name: 'home', })
  } else {
    //token存在且不处于登录页，另外就是token不存在且在登录页面，直接执行next()
    next()
  }
})

Vue.use(ElementUI)
new Vue({
  store,
  router,
  render: h => h(App),
  //解决白屏问题
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
