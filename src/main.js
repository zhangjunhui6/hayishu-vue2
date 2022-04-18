// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
var axios=require('axios');
axios.defaults.baseURL='http://127.0.0.1:10086/api';  // 部署时需要改成服务器地址
//全局注册，之后可以在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.use(ElementUI);

/*访问每个路由前调用钩子函数*/
router.beforeEach((to,from,next) => {
  if (to.meta.requireAuth === "user"){  //先判断是否需要登录
    if (store.state.user && store.state.user.identity === 1){ //需要则判断store里是否有user的信息
      next()  /*已登录，则正常跳转至用户界面*/
    }else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else if (to.meta.requireAuth === "admin"){
    if (store.state.user && store.state.user.identity === 0){ //需要则判断store里是否有user的信息
      next()  /*已登录，则正常跳转至用户界面*/
    }else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
