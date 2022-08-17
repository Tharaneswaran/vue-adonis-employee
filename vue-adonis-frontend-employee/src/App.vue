<template>
  <div id="app">
    <div class = "routeLink">
      <router-link class="cta-btn" to="/EmployeeHome">Employee</router-link> |
      <router-link class="cta-btn" to="/DepartmentHome">Department</router-link>
      </div>
    <router-view/>
  </div>
</template>

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
