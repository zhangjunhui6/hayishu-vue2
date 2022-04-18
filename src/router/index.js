import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import Login from '../components/Login';
import Register from "../components/Register";
import Home from "../components/Home";
import BooksIndex from '../components/index/BookIndex';
import BookDetail from "../components/index/BookDetail";
import UserCenter from "../components/common/UserCenter";
import PalIndex from "../components/pal/PalIndex";
import Publish from "../components/publish/Publish";
import PublishBook from "../components/publish/PublishBook";
import PublishBookAndTemplate from "../components/publish/PublishBookAndTemplate";
import ShoppingCart from "../components/cart/ShoppingCart";
import PlaceOrders from "../components/cart/PlaceOrders";
import MyHome from "../components/personalCenter/MyHome";
import MyBooks from "../components/personalCenter/MyBooks";
import MyInfo from "../components/personalCenter/MyInfo";
import ChangePassword from "../components/personalCenter/ChangePassword";
import PaySuccess from "../components/pay/PaySuccess";
import BuyOrder from "../components/personalCenter/BuyOrder";
import SellOrder from "../components/personalCenter/SellOrder";
import MyWallet from "../components/personalCenter/MyWallet";
import Admin from "../components/admin/Admin";
import Manage from "../components/admin/Manage";
import UserList from "../components/admin/UserList";
import BookList from "../components/admin/BookList";
import OrderList from "../components/admin/OrderList";
export default new Router({
  /*mode: 'history',*/
  routes: [
    {
      path: '/',            /*登录*/
      name: 'login',
      redirect: '/login',
      component: Login
    },
    {
      path: '/login',      /*登录*/
      name: 'Login',
      component: Login
    },
    {
      path: '/register',   /*注册*/
      name: 'Register',
      component: Register
    },
    {
      path: '/pay/success',   /*支付成功页面*/
      name: 'PaySuccess',
      component: PaySuccess,
      meta:{
        requireAuth: "user"  /*表示进入这个路由需要用户登录，即登录拦截*/
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index', /*重定向到index,home页面不需要被访问*/
      children:[
        {
          path: '/index',         /*首页*/
          name: 'BooksIndex',
          component: BooksIndex,
          meta:{
            requireAuth: "user"  /*表示进入这个路由需要用户登录，即登录拦截*/
          }
        },
        {
          path: '/index/bookDetail',    /*书本详情*/
          name: 'BookDetail',
          component: BookDetail,
          meta: {
            requireAuth: "user"
          }
        },
        {
          path: '/userCenter',   /*某用户的个人页面*/
          name: 'UserCenter',
          component: UserCenter,
          meta: {
            requireAuth: "user"
          }
        },
        {
          path: '/pal',  /*书友*/
          name: 'PalIndex',
          component: PalIndex,
          meta:{
            requireAuth: "user"
          }
        },
        {
          path: '/publish',    /*发布*/
          name: 'Publish',
          component: Publish,
          meta:{
            requireAuth: "user"
          }
        },
        {
          path: '/publishBook',    /*在现有模板下发布书本*/
          name: 'PublishBook',
          component: PublishBook,
          meta:{
            requireAuth: "user"
          }
        },
        {
          path: '/publishBookAndTemplate',    /*没用模板下发布书本*/
          name: 'PublishBookAndTemplate',
          component: PublishBookAndTemplate,
          meta:{
            requireAuth: "user"
          }
        },
        {
          path: '/cart',    /*购物车*/
          name: 'ShoppingCart',
          component: ShoppingCart,
          meta:{
            requireAuth: "user"
          }
        },
        {
          path: '/placeOrders',   /*下订单*/
          name: 'PlaceOrders',
          component: PlaceOrders,
          meta: {
            requireAuth: "user"
          }
        },
        {
          path: '/myHome',    /*个人中心*/
          name: 'MyHome',
          component: MyHome,
          meta:{
            requireAuth: "user"
          },
          redirect: '/myBooks',
          children:[
            {
              path: '/myBooks',  /*售书架*/
              name: 'MyBooks',
              component: MyBooks,
              meta:{
                requireAuth: "user"
              }
            },
            {
              path: '/myInfo',  /*浏览、修改个人信息*/
              name: 'MyInfo',
              component: MyInfo,
              meta:{
                requireAuth: "user"
              }
            },
            {
              path: '/myWallet',  /*钱包*/
              name: 'MyWallet',
              component: MyWallet,
              meta:{
                requireAuth: "user"
              }
            },
            {
              path: '/myBuyOrder',  /*买的订单*/
              name: 'BuyOrder',
              component: BuyOrder,
              meta:{
                requireAuth: "user"
              }
            },
            {
              path: '/mySellOrder',  /*卖的订单*/
              name: 'SellOrder',
              component: SellOrder,
              meta:{
                requireAuth: "user"
              }
            },
            {
              path: '/changePassword',  /*修改密码*/
              name: 'ChangePassword',
              component: ChangePassword,
              meta:{
                requireAuth: "user"
              }
            }
          ]
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect: '/manage',
      children: [
        {
          path: '/manage',
          name: 'Manage',
          component: Manage,
          meta:{
            requireAuth: "admin"
          }
        },
        {
          path: '/userList',
          name: 'UserList',
          component: UserList,
          meta:{
            requireAuth: "admin"
          }
        },
        {
          path: '/bookList',
          name: 'BookList',
          component: BookList,
          meta:{
            requireAuth: "admin"
          }
        },
        {
          path: '/orderList',
          name: 'OrderList',
          component: OrderList,
          meta:{
            requireAuth: "admin"
          }
        }
      ]
    }
  ]
})
