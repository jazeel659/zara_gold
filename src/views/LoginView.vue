<template>
    <h1 class="brand">zara gold</h1>
    
            <div class="flash-message">
                {{ message }}
            </div>
<div class="login-page">
  <div class="form">
    
    <form class="login-form">
      <input type="text" placeholder="username" v-model="user">
      <input type="password" placeholder="password" v-model="pass">
      <button @click="login">login</button>
     
    </form>
  </div>
</div>



</template>
<script>
import { Icon } from '@iconify/vue';
import { supabase } from "../supabase";



export default{
     data() {
    return {

items:[],
user:'',
pass:''

    };

},
 methods: {

login(event){
  event.preventDefault()
console.log("K")
console.log(this.user)
if(this.user=="zara456" && this.pass=="rafee456"){
     this.$router.push({
                path: '/home'
            })
}else{
this.message = "invalid email id or password!"
}
},


 },

};







</script>
<style scoped>

.brand{
    text-align: center;
    color: burlywood;
    border: #1a1a1a;
    margin-top: 50px;
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  padding-top: 1%;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  margin: 0;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141,194,111);
  background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
.flash-message {
    color: red;
    font-weight: 500;
    text-align: center;
    margin: 10px;
}
</style>