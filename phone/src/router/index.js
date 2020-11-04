import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/list',
        name: '一览',
        component: () => import('../views/list/List.vue'),
        redirect: '/list/beds',
        children: [
          {
            path: 'beds',
            name: '患者一览',
            component: () => import('../views/list/Beds.vue')
          },
          {
            path: 'nurses',
            name: '护士一览',
            component: () => import('../views/list/Nurses.vue')
          },
          {
            path: 'doctors',
            name: '医生一览',
            component: () => import('../views/list/Doctors.vue')
          }
        ]
      },
      {
        path: '/phonebook',
        name: '电话簿',
        component: () => import('../views/Phonebook.vue')
      },
      {
        path: '/bathCall',
        name: '卫浴呼叫',
        component: () => import('../views/BathCall.vue')
      },
      {
        path: '/office',
        name: '选择分区',
        component: () => import('../views/Office.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
