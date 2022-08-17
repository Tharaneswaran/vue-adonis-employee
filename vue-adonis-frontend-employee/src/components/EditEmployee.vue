<script setup>
import "../assets/bootstrap.css"

</script>
<template>
  <div v-if = "isHidden == false" v-on:click="isHidden == false" >
    <div class="card">
<!--      <span style="text-align : center; color:green ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Employee details successfully updated' ">{{msg.error}}</span>-->
<!--      <span style="text-align : center; color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Employee ID  does not exists' ">{{msg.error}}</span>-->
      <form id="form" @submit.prevent="updateRecord()" method="post" >
        <h2 class="title">Update Form</h2><br>
        <span style="color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.userExists">{{msg.userExists}}</span>
        <div class="email-login">

          <label for = "id"><b>Employee ID</b></label>
          <input type="number" placeholder="Enter Employee ID" name="id" v-model = "id" required>

          <label for = "name"><b>Employee Name </b></label>
          <input type="text" placeholder="Enter Employee Name" name="name" v-model = "name" required>

          <label for="email"> <b>Email</b></label>
          <input type="email" placeholder="Enter Employee Email"  name="email" v-model = "email" required>
          <span style="color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.email"><ul><li
          >{{msg.email}}</li></ul></span>

          <label  for = "dob"><b>DOB</b></label>
          <date-picker ref="dob" v-model = "dob" format="MMMM DD,YYYY" valuetype="format" :disabled-date="(date) => date >= new Date()" :enable-time-picker ="false" value="dob"></date-picker>

          <label  for = "doj"><b>DOJ</b></label>
          <date-picker ref="doj" v-model = "doj" format="MMMM DD,YYYY" valuetype="format" :disabled-date="(date) => date >= new Date()" :enable-time-picker ="false" value="doj"></date-picker>

          <label for="phone"><b>Phone Number</b></label>
          <input type="number" id="phone" placeholder="Enter Phone Number" name="phone"  v-model = "phone" required>
          <span style="color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.phone"><ul><li
          >{{msg.phone}}</li></ul></span>

          <label><b>Department Name</b></label>
          <select v-model="departmentId" class="dropdownStyle">
            <option value="" disabled hidden>Select Department</option>
            <option v-for="dept in deptArray" v-bind:key="dept.dept_name" v-bind:value="dept.dept_id">{{ dept.dept_name }}</option>
          </select>

        </div>
        <button type="submit" class="cta-btn" >Submit</button>
      </form>
    </div>
  </div>
<!--  ***************************************************************************************************************-->
  <div v-else v-on:click="isHidden == !isHidden" >

    <div class="col">
      <div id = "test">
        <label><b>Category</b>&nbsp;
          <select class="dropdownStyle" name="category" id="category" v-model="selectedCategory">
            <option value="" disabled hidden>Select a category</option>
            <option v-for="category in categories" v-bind:value="category.id">
              {{ category.name }}
            </option>
          </select>
        </label>

        <label><b>Value</b>&nbsp;
          <select class="dropdownStyle" name="item" id="item" v-model="selectedItem" @change = "filterByDeptName(selectedItem)">
            <option value="" disabled hidden>Select Value</option>
            <option v-for="item in filteredItems" v-bind:value="item.id">
              {{ item.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="cardTable table">
        <table>
          <thead class = "row">
          <th class="col">
            <b>Employee ID</b>
          </th>
          <th class = "col">
            <b>Employee Name</b>
          </th>
          <th class = "col" >
            DOB
          </th>
          <th class = "col">
            DOJ
          </th>
          <th class = "col">
            <b>Employee Email</b>
          </th>
          <th class="col">
            <b>Employee Phone No</b>
          </th>
          <th class = "col">
            <b>Department Name</b>
          </th>
          <th class = "col">
            <b>Actions</b>
          </th>
          </thead><br>


          <!--*****************************************************************************************************-->
          <tr class = "row" v-for="(employee,i) in allRecords" :key = "i">
            <td class = "col emp_id">
              {{employee.id}}
            </td>
            <td class = "col">
              {{employee.name}}
            </td>
            <td class = "col" >
              {{employee.dob}}
            </td>
            <td class = "col">
              {{employee.doj}}
            </td>
            <td class = "col">
              {{employee.email}}
            </td>
            <td class="col">
              {{employee.phone}}
            </td>
            <td class="col" >
              {{employee.department_name}}
            </td>

            <td class="col">

              <button type="submit" class="cta-btn-table" @click = "editButton(employee)" >Edit</button>

              <button type="submit" class="cta-btn-table" @click = "deleteButton(employee)" >Delete</button>

            </td>
          </tr>

        </table>

      </div><br>
      <h4 class = "totalRecords">Total Number of Records : {{this.allRecords.length}}</h4>
    </div>
  </div>

</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    instance : '',
    key : "",
    allRecords : [],
    id:"",
    name : "",
    email: "",
    dob : "",
    doj : "",
    phone: "",
    departmentId:"",
    employee:"",

    categories: [
      { id: 0, name: "Employee ID" },
      { id: 1, name: "DeptName" }
    ],
    items: [
      { id: 0, category_id: 0, name: "All" },
      { id: 1, category_id: 0, name: "1-5" },
      { id : 2 , category_id: 0 ,name : "5-10"} ,
      { id : 3 , category_id: 0 ,name : "Descending"},

      // { id: 1, category_id: 1, name: "DevOps" },
      // { id: 2, category_id: 1, name: "IOT" },
      // { id: 3, category_id: 1, name: "Support" },
      // { id: 4, category_id: 1, name: "Operations" },
    ],

    selectedCategory: "",

    selectedItem: "",
    deptArray:[],
      // { deptName: 'DevOps', deptId: 1 },
      // { deptName: 'IOT', deptId: 2},
      // { deptName: 'Support', deptId: 3 },
      // { deptName: 'Operations', deptId: 4}

    msg:[],
    isHidden : true}),

  watch: {
    email(value){
      this.email = value;
      if(value == ""){
        this.msg['email'] = '';
      }
      else{
        this.validateEmail(value);
      }

    },

    phone(valuePhone){
      const checkPhone = valuePhone
      this.validatePhoneNo(checkPhone);
    }
  },
  mounted : async function () {
    this.instance =  axios.create({ baseURL: "http://127.0.0.1:3333" , headers:{
        'Content-type' : "application/json",
        'App_Key' : "fs10iNnNbSw3RD1lqcoZSFv9O0mcEFn_",
      }})
    this.selectedCategory = 0;
    this.selectedItem = 0;

    const tableDetails = await this.instance.get("/employeeTable/fetchJoin")
    this.allRecords = tableDetails.data
    console.log(tableDetails.data)

    const deptTableDetails = await this.instance.get("/departmentTable/fetchAll")
    this.deptArray = deptTableDetails.data.reverse()
    const n = deptTableDetails.data.length
    let i;
    for(i=0;i<n;i++){
      this.items.push({
        id: parseInt(deptTableDetails.data[i].id),
        category_id : 1,
        name : deptTableDetails.data[i].name,
      })
    }
  },
  computed: {
    filteredItems: function() {
      return this.items.filter(function(el) {
        return el.category_id === this.selectedCategory;
      }, this);
    }
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },

    clearForm() {
      this.id = "";
      this.name = "";
      this.email = "";
      this.phone = "";
      this.departmentId = "";
      this.dob = "";
      this.doj = "";

    },

    validatePhoneNo(valuePhone){

      if(valuePhone.length == 0 ){
        this.msg['phone'] = '';
      }
      else{
        if(valuePhone.length != 10 ){
          this.msg['phone'] = 'Invalid Phone No';
        }
        else{
          this.msg['phone'] = '';
        }
      }
    },
    validateEmail(value){
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
      {
        this.msg['email'] = 'Invalid Email Address';
      } else{
        this.msg['email'] = '';
      }
    },

    editButton(user){

      this.id = user.emp_id;
      this.name = user.emp_name;
      this.email = user.emp_email;
      this.phone = user.emp_phone_no;
      this.deptId = user.dept_id;
      this.isHidden = false

    },

    async filterByDeptName(selectedItem){
      const tableDetails = await this.instance.get("/employeeTable/fetchJoin")
      console.log(tableDetails.data)
      if(this.selectedItem === 0 && this.selectedCategory === 0){
        return this.allRecords = tableDetails.data
      }
      if(this.selectedItem === 1 && this.selectedCategory === 0){
        return this.allRecords = tableDetails.data.slice(0,5)
      }
      if(this.selectedItem === 2 && this.selectedCategory === 0){
        return this.allRecords = tableDetails.data.slice(5,10)
      }
      if(this.selectedItem === 3 && this.selectedCategory === 0){
        return this.allRecords = tableDetails.data.reverse()
      }
      if((this.selectedItem && this.selectedCategory === 1)){
        this.allRecords = tableDetails.data.filter(el => {
               //const num = parseInt()
              return  el.dept_id == this.selectedItem;
            })
      }

    },

    async updateRecord(){
      const data = {

        id: this.id,
        name: this.name,
        email: this.email,
        phone: this.phone ,
        deptId: this.deptId,
      }
      const result = await this.instance.post('/employeeTable/updateRecord' , data ).catch("Error")
      this.isHidden = false;
      alert(result.data)
      this.reloadPage()
      },

    async deleteButton(user){
      const allRecords = this.allRecords;
      const data ={
        id : user.emp_id,
      }
      const result = await this.instance.post('/employeeTable/deleteRecord' ,data).catch("error")
      alert(result.data)
      this.reloadPage()
    }

  },

};


</script>

<style scoped>
#test{
  position: relative;
  margin-left: 203px;
  margin-top: 100px;
  margin-bottom: -250px;
  border-radius: 10px;
  background-color: white;
  padding: 0.75rem;
  color: black;
  width: 550px;
  height: 80px;
  box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.1);
}
#test label{
  padding-left: 10px;
}
.dropdownStyle{
  padding: 10px 15px;
  margin-top: 8px;
  margin-bottom: 15px;
  margin-right: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}
.social-login img {
  width: 24px;
}
a {
  text-decoration: none;
}

.card {
  font-family: sans-serif Poppins;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  color: black;
  margin-top: 3em;
  margin-bottom:3em;
  border-radius: 10px;
  background-color: white;
  padding: 1.8rem;
  box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.1);
}
.title {
  text-align: center;
  font-weight: bold;
  margin: 0;
}
.subtitle {
  text-align: center;
  font-weight: bold;
}
.btn-text {
  margin: 0;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.google-btn {
  background: #fff;
  border: solid 2px rgb(245 239 239);
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  padding: 10px 10px;
  flex: auto;
  align-items: center;
  gap: 5px;
  justify-content: center;
}
.fb-btn {
  background: #fff;
  border: solid 2px rgb(69, 69, 185);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.or {
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid rgb(245 239 239);
  line-height: 0.1em;
  margin: 25px 0;
}
.or span {
  background: #fff;
  padding: 0 10px;
}

.email-login {
  display: flex;
  flex-direction: column;
}
.email-login label {
  color: black;
}

input[type="text"],
input[type="email"],
input[type = "number"]{
  padding: 15px 20px;
  margin-top: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.cta-btn {
  background-color: rgb(69, 69, 185);
  color: white;
  padding: 18px 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 10px;
  border: none;
}

.forget-pass {
  text-align: center;
  display: block;
}


.container{
  height: 100vh;
  width: 100%;
}
.col table{

  position: relative;
  margin-top: 20%;
  color: black;
  text-align: center;
  width: 1450px;
  height: auto;
}

.cardTable{

  font-family: sans-serif Poppins;
  width: 1450px;
  margin-left: auto;
  margin-right: auto;
  color: black;
  /*margin-top: 3em;*/
  /*margin-bottom:3em;*/
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.1);
}

.totalRecords{
  text-align: center;
}

.cta-btn-table{
  background-color: rgb(69, 69, 185);
  color: white;
  padding: 3px 2px;
  margin-top: 0px;
  margin-bottom: 10px;
  width: 55%;
  border-radius: 10px;
  border: none;
}

.maleRadio{
  accent-color: blue;

}
.femaleRadio{
  accent-color: deeppink;
}
</style>