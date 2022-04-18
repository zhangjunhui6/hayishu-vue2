import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/**
 * 使用vuex设置状态变量和方法，实现登录拦截器
 * 用到localStorage本地存储name/value对，在项目打开时判断是否有user对象存在，有则获取username，否则置空
 **/
export default new Vuex.Store({
    state: {
        user: {   /*当前使用的用户的个人相关信息*/
            id: window.localStorage.getItem('user') === null ? "" : JSON.parse( window.localStorage.getItem('user')).id,
            name:window.localStorage.getItem('user') === null ? "" : JSON.parse( window.localStorage.getItem('user')).name,
            identity: window.localStorage.getItem('user') === null ? -1 : JSON.parse( window.localStorage.getItem('user')).identity,
            sales:window.localStorage.getItem('user') === null ? "" : JSON.parse( window.localStorage.getItem('user')).sales,
            fans:window.localStorage.getItem('user') === null ? "" : JSON.parse( window.localStorage.getItem('user')).fans,
        },
        book:window.localStorage.getItem('book') === null ? {} : JSON.parse( window.localStorage.getItem('book')),
        orderInfos: window.localStorage.getItem('orderInfos') === null ? [] : JSON.parse( window.localStorage.getItem('orderInfos')),   /*记录付款时所购买的订单(成功付款时会用到)*/
    },
    mutations:{
        login(state, user){
            state.user = user;
            window.localStorage.setItem('user',JSON.stringify(user)); //key,value
        },
        logout(state){
            window.localStorage.clear();
            /*window.localStorage.removeItem('user');*/
            state.user = {};
            state.book = {};
            state.orderInfos = [];
        },
        setBook(state,book){
            state.book = book;
            window.localStorage.setItem('book',JSON.stringify(book));
        },
        setOrders(state,orderInfos){
            state.orderInfos = orderInfos;
            window.localStorage.setItem('orderInfos',JSON.stringify(orderInfos));
        }
    }
})