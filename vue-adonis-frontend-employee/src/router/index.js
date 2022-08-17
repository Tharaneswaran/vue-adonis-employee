import Vue from 'vue'
import VueRouter from 'vue-router'
import DepartmentHome from '../views/Department.vue'
import EmployeeHome from "@/views/Employee.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import DepartmentForm from "@/components/DepartmentForm";
import EmployeeDetails from '@/components/EditEmployee.vue'
import DepartmentDetails from '@/components/EditDepartment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/EmployeeHome',
    name: 'EmployeeHome',
    component: EmployeeHome,
  },
  {
    path: '/DepartmentHome',
    name: 'DepartmentHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DepartmentHome
  },
  {
    path : '/EmployeeForm',
    name : 'EmployeeForm',
    component: EmployeeForm,

  },
  {
    path : '/DepartmentForm',
    name : 'DepartmentForm',
    component: DepartmentForm,

  },
  {
    path : '/EmployeeDetails',
    name : 'EmployeeDetails',
    component: EmployeeDetails,

  },
  {
    path : '/DepartmentDetails',
    name : 'DepartmentDetails',
    component: DepartmentDetails,

  }
]

const router = new VueRouter({
  routes
})

export default router
