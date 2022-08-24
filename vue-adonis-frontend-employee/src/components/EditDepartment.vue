<script setup>
import "../assets/bootstrap.css"

</script>
<template>
  <div v-if = "isHidden == false" v-on:click="isHidden == false" >
    <div class="card">
      <!--      <span style="text-align : center; color:green ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Employee details successfully updated' ">{{msg.error}}</span>-->
            <span style="text-align : center; color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Department ID  does not exists' ">{{msg.error}}</span>
      <form id="form" @submit.prevent="updateRecord()" method="post" >
        <h2 class="title">Update Form</h2><br>
        <span style="color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.userExists">{{msg.userExists}}</span>
        <div class="email-login">

          <label for = "empId"><b>Department ID</b></label>
          <input type="number" placeholder="Enter Department ID" name="id" v-model = "id" required>

          <label for = "empName"><b>Department Name</b></label>
          <input type="text" placeholder="Enter Department Name" name="name" v-model = "name" required>

        </div>
        <button type="submit" class="cta-btn" >Update</button>
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
          <select class="dropdownStyle" name="item" id="item" v-model="selectedItem" @change = "filterByName(selectedItem)">
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
            <b>Department ID</b>
          </th>
          <th class = "col">
            <b>Department Name</b>
          </th>
          <th class = "col">
            <b>Actions</b>
          </th>
          </thead><br>


          <!--*****************************************************************************************************-->
          <tr class = "row" v-for="(department,i) in allRecords" :key = "i">
            <td class = "col emp_id">
              {{department.id}}
            </td>
            <td class="col" >
              {{department.name}}
            </td>
            <td class="col">
              <button type="submit" class="cta-btn-table" @click = "editButton(department)" >Edit</button>
              <button type="submit" class="cta-btn-table" @click = "deleteButton(department)" >Delete</button>
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
    name:"",
    dept:"",

    categories: [
      { id: 0, name: "Department ID" },
    ],
    items: [
      { id: 0, category_id: 0, name: "All" },
      { id: 1, category_id: 0, name: "1-5" },
      { id : 2 , category_id: 0 ,name : "5-10"} ,
      { id : 3 , category_id: 0 ,name : "Descending"},

    ],

    selectedCategory: "",

    selectedItem: "",
    deptArray:[],
    msg:[],
    isHidden : true}),

  mounted : async function () {
    this.instance =  axios.create({ baseURL: "http://127.0.0.1:3333" , headers:{
        'Content-type' : "application/json",
        'App_Key' : "fs10iNnNbSw3RD1lqcoZSFv9O0mcEFn_",
      }})
    this.selectedCategory = 0;
    this.selectedItem = 0;
    const deptTableDetails = await this.instance.get("/departmentTable/fetchAll")
    this.allRecords = deptTableDetails.data
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

    },

    editButton(department){

      this.id = department.id;
      this.name = department.name;
      this.isHidden = false

    },

    async filterByName(selectedItem){

      if(this.selectedItem === 0 && this.selectedCategory === 0){
        const sortManner = 'asc'
        const tableDetails = await this.instance.get("/departmentTable/fetchAll" , {params:{sortManner}})
        return this.allRecords = tableDetails.data
      }
      if(this.selectedItem === 1 && this.selectedCategory === 0){
        const tableDetails = await this.instance.get("/departmentTable/fetchAll")
        return this.allRecords = tableDetails.data.slice(0,5)
      }
      if(this.selectedItem === 2 && this.selectedCategory === 0){
        const tableDetails = await this.instance.get("/departmentTable/fetchAll")
        return this.allRecords = tableDetails.data.slice(5,10)
      }
      if(this.selectedItem === 3 && this.selectedCategory === 0){
        const sortManner = 'desc'
        const tableDetails = await this.instance.get("/departmentTable/fetchAll" ,{params:{sortManner}})
        return this.allRecords = tableDetails.data
      }
    },

    async updateRecord(){
      const formDepartmentId = this.id
      const found = this.allRecords.some(el => el.id == formDepartmentId);
      if(found == true){
        const data = {
          id: this.id,
          name : this.name,
        }
        console.log(data)
        const result = await this.instance.post('/departmentTable/updateRecord' , data ).catch("Error")
        this.isHidden = false;
        alert(result.data)
        this.reloadPage()
      }
      else{
        this.msg['error'] = "Department ID  does not exists"
      }

    },

    async deleteButton(department){
      const data ={
        id : department.id,
      }
      const result = await this.instance.post('/departmentTable/deleteRecord' ,data).catch("error")
      alert(result.data)
      this.reloadPage()
    }

  },


  // updateRecord(){
  //   const allRecords = this.allRecords;
  //   const formEmpID = this.empId;
  //   // const formPhoneNo = this.phoneNo;
  //   const elementIndex = allRecords.findIndex(el => el.empId === formEmpID );
  //   if(elementIndex != -1){
  //     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //     if( this.empID != "" && this.empName != "" && this.empEmail != "" &&  this.empPhoneNo != "" && this.id != ""){
  //       if(this.empPhoneNo.length == 10){
  //         if(this.empEmail.match(mailformat)){
  //           allRecords[elementIndex].empId = this.empId;
  //           allRecords[elementIndex].empName = this.empName;
  //           allRecords[elementIndex].empEmail = this.empEmail;
  //           allRecords[elementIndex].empPhoneNo = this.empPhoneNo;
  //           allRecords[elementIndex].id = this.id;
  //           this.isHidden =true;
  //           this.clearForm();
  //
  //         }
  //         else {
  //           this.msg['empEmail'] = 'Invalid Email Address';
  //         }
  //       }
  //       else{
  //         this.msg['empPhoneNo'] = 'Invalid PhoneNo';
  //       }
  //
  //     }
  //     else{
  //       this.msg['all'] = "Fill all fields";
  //     }
  //
  //   }
  //   else {
  //     this.msg['userExists'] = "User Does not exist"
  //     this.isHidden = true;
  //   }
  // },



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
  color: white;
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