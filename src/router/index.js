import Vue from 'vue'
import Router from 'vue-router'



import Shop from '@/views/shop' 
import Item from '@/views/item' // 商品详细页
import Cart from '@/views/cart' // 购物车
import Checkout from '@/views/checkout' // 商品结算
import Payment from '@/views/payment' // 提交订单



import Account from '@/views/account'   // 我的订单左侧
import Order from '@/views/account/order' 
import Address from '@/views/account/address' 
Vue.use(Router)



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'Account',
          component: Order,
        },
        {
          path: '/address',
          name: 'Address',
          component: Address
        }
    ]
    }
  ]
})
