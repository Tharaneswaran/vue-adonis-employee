<template>
  <div class = "routeLink">
    <router-link class="cta-btn" to = "/DepartmentForm">Department Form</router-link>
    <router-link class="cta-btn" to="/DepartmentDetails">Department Details</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import DepartmentForm from '@/components/DepartmentForm.vue'

export default {
  name: 'DepartmentForm',
  components: {
    DepartmentForm
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
