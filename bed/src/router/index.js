import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/Home.vue')
  },
  {
    path: '/beds',
    name: 'beds',
    component: () => import('../views/admin/BedSelected.vue')
  },
  {
    path: '/nurse',
    name: 'Nurse',
    component: () => import('../views/nurse/Home.vue')
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: () => import('../views/doctor/Home.vue')
  },
  {
    path: '/advise',
    name: 'Advise',
    component: () => import('../views/doctor/Advises.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/doctor/Reports.vue')
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('../views/nurse/SignRecord.vue')
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/doctor/Record.vue')
  },
  /* {
    path: '/intake',
    name: 'Intake',
    component: () => import('../views/doctor/IntakeOutput.vue')
  }, */
  {
    path: '/infusion',
    name: 'Advise',
    component: () => import('../views/nurse/InfusionAdvise.vue')
  },
  {
    path: '/patient',
    name: 'Patient',
    component: () => import('../views/patient/Home.vue')
  },
  {
    path: '/dialing',
    name: 'Dialing',
    component: () => import('../views/patient/Dialing.vue')
  },
  {
    path: '/reports',
    name: 'PatientReport',
    component: () => import('../views/patient/Report.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/patient/Message.vue')
  },
  {
    path: '/fee',
    name: 'Fee',
    component: () => import('../views/patient/Fees.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/patient/Payments.vue')
  },
  {
    path: '/shade',
    name: 'Shade',
    component: () => import('../views/Shade.vue')
  },
  {
    path: '/reportDetail',
    name: 'ReportDetail',
    component: () => import('../views/patient/reportDetail.vue')
  },
  {
    path: '/checkDetail',
    name: 'CheckDetail',
    component: () => import('../views/patient/checkDetail.vue')
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('../views/patient/Education.vue')
  },
  {
    path: '/intake',
    name: 'Intake',
    component: () => import('../views/patient/Intake.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
