<script setup>
import "../assets/bootstrap.css"

</script>
<template>
  <div class="card">
    <span style="text-align : center; color:green ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Inserted Successfully' ">{{msg.error}}</span>
    <span style="text-align : center; color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.error == 'Department Name already Exist' ">{{msg.error}} </span>
    <form id="form" @submit.prevent="addRecord()" method="post" >
      <h2 class="title">Form</h2><br>
      <span style="color:red ; font-size: 15px ; padding-bottom: 10px" v-if="msg.userExists">{{msg.userExists}}</span>
      <div class="email-login">

<!--        <label for = "empId"><b>Department ID</b></label>-->
<!--        <input type="number" placeholder="Enter Department ID" name="id" v-model = "id" required>-->

        <label for = "empName"><b>Department Name</b></label>
        <input type="text" placeholder="Enter Department Name" name="name" v-model = "name" required>


      </div>
      <button type="submit" class="cta-btn" >Submit</button>
    </form>
  </div>
</template>

<!-- ***************************************************JS************************************************************-->
<script>
import axios from "axios";

export default {
  data: () => ({
    instance : '',
    key : "",
    allRecords : [],
    id:"",
    name:"",
    deptArray:[],
    msg:[],
    isHidden : true}),

  mounted : async function () {
    this.instance =  axios.create({ baseURL: "http://127.0.0.1:3333" , headers:{
        'Content-type' : "application/json",
        'App_Key' : "fs10iNnNbSw3RD1lqcoZSFv9O0mcEFn_",
      }})

    const deptTableDetails = await this.instance.get("/departmentTable/fetchAll")
    this.allRecords = deptTableDetails.data.reverse()
  },

  methods: {
    clearForm() {
      this.id = "";
      this.name = "";
    },


    async addRecord() {
      //const allRecords = this.allRecords
      console.log(this.allRecords)
      // const formid = this.id
      const formName = this.name
      const found = this.allRecords.some(el => el.name === formName );
      console.log(found)
      if(found == false){
        if(this.name != ""){
            const data = {
              name :this.name,
            }
            const result = await this.instance.post('/departmentTable/insertRecord' ,data).catch("error")
            this.clearForm();
            this.msg['error'] = result.data

        }
        else{
          this.msg['all'] = "Fill all fields";
        }
      }
      else{
        this.clearForm()
        this.msg['error'] = "Department Name already Exist"
      }

    },
  },
};


</script>
<style scoped>

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