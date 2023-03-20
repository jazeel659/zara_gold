<template>
    <div class="container">
<h1>Bill search</h1>
<div><label for="phone">Customer phone number</label>
<input type="text" id="phone" placeholder="enter customer number" v-model="phone"><button @click="onPhone">submit</button></div>

<div><label for="bill">bill number</label>
<input type="text" id="bill" placeholder="enter bill  number" v-model="bill" ><button @click="onBill">submit</button></div>
<div><label for="bill">bill number</label>
<input type="date" id="bill" placeholder="enter bill  number" v-model="date" ><button @click="onDate">submit</button></div>
<ul v-if="dat.length>0">
    <h2>orders</h2>
    <li v-for="item in customer" >
<span>{{item.name}}</span>
<span>{{ item.order_id }}</span>
         <button class="edit" @click="onEdit(item.order_id)" ><Icon icon="material-symbols:edit-document-rounded" /></button> 
</li>
</ul></div>
</template>
<script>

import { supabase } from "../supabase";
import { Icon } from '@iconify/vue';


export default {
components: {
		Icon,
	},
  data() {
    return {
        dat:[],

phone:"",
bill:'',
date:null,
customer:[]

    }

},

methods:{
    onEdit(id){
  this.$router.push({
                path: '/orderRe/'+id
            })
    },
      async onBill() {
        this.phone=''
        this.date=null
        
    const search = await supabase.from("orders").select().eq('order_id',this.bill)
    this.dat=search.data
        let a=[]
   let b= this.dat.forEach(element => {
    if(a.indexOf(element['order_id'])<0){
        a.push({'name':element['customer_name'],'order_id':element['order_id']})}
    })
    console.log(this.dat,a)
},   
  async onPhone() {
    this.bill=''
        this.date=null

    console.log('k')
    const search = await supabase.from("orders").select().eq('customer_phone',this.phone)
    this.dat=search.data
    let a=[]
   let b= this.dat.forEach(element => {
    if(a.indexOf(element['order_id'])<0){
        a.push({'name':element['customer_name'],'order_id':element['order_id']})}
    })
    
   
    console.log(this.dat)
},
     async onDate() {

        this.phone=''
    this.bill=''

    const search = await supabase.from("orders").select().eq('date',this.date)
    this.dat=search.data
        this.customer=[]
       let a=[]
   let b= this.dat.forEach(element => {
    if(a.indexOf(element['order_id'])<0){
        a.push(element['order_id'])
        this.customer.push({'name':element['customer_name'],'order_id':element['order_id']})}
    })
    console.log(this.dat,this.customer)
},   

}}

</script>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    height: 800px;
    justify-content: center;
    align-items: center;
}
.container div{
display: flex;
column-gap: 20px;
justify-content:space-between ;
align-items: center;
margin: 10px;


}
.container div label{

    width: 100px;
}
button{
    width: 50px;
    height: 25px;
    border-radius: 5px;
    padding: 5px;
}
button:hover{
  background: #43A047;
  cursor: pointer;

}
ul{
    list-style: none;
    padding: 2px;
    margin: 0;
    
    width: 500px;
    background-color: aqua;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
}
li{
    margin: 5px;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    column-gap: 60px;
    background-color: burlywood;
    color: rebeccapurple;
    font-size: medium;
    border:2px solid black;
    border-radius: 5px;
    width:90%;

}
.delete{
    border: none;
    background-color: burlywood;
}
.delete:hover{
    cursor: pointer;
    color: red;
}
input{

outline: none;

}

</style>