<script setup>
import "../assets/bootstrap.css"
import DatePicker from 'vue2-datepicker';
import '../assets/datepicker.css';

</script>
<template>
  <div class="card">
    <span style="text-align : center; color:green ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Inserted Successfully' ">{{msg.error}}</span>
    <span style="text-align : center; color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Insert Failed' ">{{msg.error}}</span>
    <form id="form" @submit.prevent="addRecord()" method="post" >
      <h2 class="title">Form</h2><br>
      <span style="color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.userExists">{{msg.userExists}}</span>
      <div class="email-login">

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
          <option v-for="departments in deptArray" v-bind:key="departments.name" v-bind:value="departments.id">{{ departments.name }}</option>
        </select>

      </div>
      <button type="submit" class="cta-btn" >Submit</button>
    </form>
  </div>
</template>

<!-- ***************************************************JS************************************************************-->
<script>
import axios from "axios";
import dateFormat from "dateformat";

export default {

  setup() {
    const date = ref(new Date());
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    return {
      date,
      format,
    }
  },

  data: () => ({
    instance : '',
    key : "",
    allRecords : [],
    id:"",
    name: "",
    dob:"",
    doj : "",
    email: "",
    phone: "",
    departmentId:"",
    departments : "",
    deptName:"",
    deptArray:[],
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

    // const tableDetails = await this.instance.get("/employeeTable/fetchJoin")
    // this.allRecords = tableDetails.data

    const departmentTableDetails = await this.instance.get("/departmentTable/fetchAll")
    console.log(departmentTableDetails.data)
    this.deptArray = departmentTableDetails.data.reverse()
  },

  methods: {
    clearForm() {
      this.id = "";
      this.name = "";
      this.email = "";
      this.doj = "";
      this.dob = "";
      this.phone = "";
      this.departmentId = "";
      this.deptName = "";

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

    async addRecord() {
      const allRecords = this.allRecords
      const formEmail = this.email;
      const formPhone = this.phone
      const phoneLength = this.phone.length
      const found = allRecords.some(el => el.email === formEmail || el.phoneNo === formPhone );
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!found){
          if(this.name != "" && this.dob != "" && this.doj != "" && this.email != "" && this.phone != "" && this.departmentId != ""){
            if( phoneLength == 10){
              if(this.email.match(mailformat)){
                console.log("IN")
                const data = {

                  name: this.name,
                  dob : this.dob,
                  doj : this.doj,
                  email: this.email,
                  phone: this.phone ,
                  departmentId: this.departmentId,
                }
                console.log(data)
                const result = await this.instance.post('/employeeTable/insertRecord' ,data).catch("error")
                this.clearForm();
                this.msg['error'] = result.data
              }
              else {
                this.msg['email'] = 'Invalid Email Address';
              }
            }
            else{
              this.msg['phone'] = 'Invalid Phone No';
            }

          }
          else{
            this.msg['all'] = "Fill all fields";
          }
        }
        else{
          this.msg['userExists'] = "Employee Already exist with same email or phone"
        }

    },
  },
};


</script>
<style scoped >

.social-login img {
  width: 24px;
}
a {
  text-decoration: none;
}
.datepicker {
  padding: 15px 20px;
  margin-top: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
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
  /*margin-left: auto;*/
  /*margin-right: auto;*/
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
  margin-top: 10px;
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
.dropdownStyle{
  padding: 15px 20px;
  margin-top: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>