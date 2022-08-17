<template>
  <div class = "routeLink">
    <router-link class="cta-btn" to = "/EmployeeForm">Employee Form</router-link>
    <router-link class="cta-btn" to="/EmployeeDetails">Employee Details</router-link>
  </div>

</template>

<script>
// @ is an alias to /src
import EmployeeForm from '@/components/EmployeeForm.vue'
import EmployeeDetails from '@/components/EditEmployee.vue'

export default {
  name: 'Employee',
  components: {
    EmployeeForm,
    EmployeeDetails
  }
}
</script>
<style scoped>
.routeLink{
  padding-top: 20px;
  padding-bottom: 40px;
}
.cta-btn {
  background-color: rgb(69, 69, 185);
  color: white;
  padding: 10px 25px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
  width: 100%;
  border-radius: 10px;
  border: none;
}
</style>
