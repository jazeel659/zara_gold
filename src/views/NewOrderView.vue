<template>
<div class="order-page">
<h1 class="brand">zara gold</h1>
<h2>order page</h2>
<div class="form">

     <form class="order-form">
        <div><label for="cu-name">Customer name</label>
<input type="text" id="cu-name" placeholder="enter customer name" v-model="customer"></div>
<div><label for="cu-num">Contact number</label>
<input type="text" id="cu-num" placeholder="enter customer number" v-model="phone"></div>
<div><label for="it-name">Item name</label>
<input type="text" id="it-name" placeholder="enter item name"  v-model="name"></div>
<div><label for="weight">Weight</label>
<input type="number" id="weight" placeholder="enter weight " v-model="weight"></div>
<div><label for="price">Unit price</label>
<input type="number" id="price" placeholder="enter price /gram" v-model="price"></div>
<div><label for="mc">M/C</label>
<input type="number" id="mc" placeholder="enter making charge" v-model="mc"></div>



<!-- <div><label for="stonew">stone-weight</label>
<input type="number" id="stonew" placeholder="enter stone weight" v-model="stonew"></div>
<div><label for="stonep">stone-price</label>
<input type="number" id="stonep" placeholder="enter stone price" v-model="stonep"></div> -->
<div><label for="gst">GST</label>

<input type="text" id="gst" placeholder="enter gst" v-model="gst"></div>

<div class="buttons"><button class="add" @click="onClick">Add Item</button>


      <button class="submit" @click="fake">submit</button></div>





        </form>
<ul v-if="items.length>0">
    <h2>orders</h2>
    <li v-for="item in items" >
<span>{{item.item_name}}</span>
<span>{{ item.item_weight }}</span>
          <span>{{item.total}}</span>  
         <button class="delete" @click="deleted(item.id)" ><Icon  icon="material-symbols:delete-outline-rounded" /></button> 
</li>
<h4>total:{{ total }}</h4>
<h4>advance:{{ advance }}  <button class="advdlt" @click="adDlt"  v-if="advance"><Icon  icon="material-symbols:delete-outline-rounded" /></button> </h4>
<button v-if="!advance" @click="onadvance">advance</button>

<div class="advance" v-if="isadvance"><label for="advance">advance amount</label>
<input type="number" id="advance" placeholder="enter advance amount" v-model="advance"><button @click="onad">ad</button></div>

</ul>
</div> </div>




</template>
<script>
import { Icon } from '@iconify/vue';
import { v4 as uuidv4 } from "uuid";

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { checkCompatEnabled } from '@vue/compiler-core';
import { supabase } from "../supabase";


export default{
    	components: {
		Icon,
	},
     data() {
    return {
        advance:null,
temp:[],
items:[],
customer:'',
phone:'',
name:'',
weight:'',
price:'',
gst:'',
tot:0,
total:0,
mc:null,
id:null,
oldw:0,
stonep:0,
stonew:0,
oldc:false,
oldp:0,
ne:[],
advance:null,
list:[{"id":"ch","values":"chain"},{"id":"ba","values":"bangles"}],
isadvance:false,

    }

},
methods:{
    adDlt(){
this.advance=null

    },
    deleted(id){
         event.preventDefault()
        console.log(this.items)
let ind=this.items.findIndex(x=>x['id']==id)
    // this.total-=this.items[ind].item_weight*this.price*(1+(this.items[ind].m_c)/100)*(1+.03)
    console.log(this.items[ind].item_weight*this.price*(1+(this.items[ind].m_c)/100)*(1+.03))
    this.total-=Number(this.items[ind].total)
let a=this.items.splice(ind,1)
this.items=a
        console.log(this.items)

},
    onad(){
        event.preventDefault()
this.isadvance=false


    },
    onadvance(){
        event.preventDefault()
        this.isadvance=true
    },
    onEnter(value){
        
        event.preventDefault()
 
   let a= this.list.filter(x=>x.id==value)
   
   this.name=a[0].values
   console.log(a,this.name)
    },

    onClick(event){   
    event.preventDefault()

    console.log(this.id)

// this.items.push({'item_name': this.name, 'item_weight': this.weight,'unit_price':this.price,'customer_name':this.customer,'customer_phone':this.phone,'order_id':this.id,'gst':this.gst,'m_c':this.mc})

      console.log("K")
if(this.gst==''){
this.tot=(this.weight*this.price*1.03*(1+this.mc/100)).toFixed(2)
}else{
this.tot=(this.weight*this.price*(1+this.mc/100)).toFixed(2)
}
if(this.weight!='' && this.price!='' && this.name!=''){
   this.items.push({'ids':uuidv4(),'date':null,'advance':null,'item_name': this.name, 'item_weight': this.weight,'unit_price':this.price,'customer_name':this.customer,'customer_phone':this.phone,'gst':3,'m_c':this.mc,'total':this.tot,'order_id':'','order_status':"false"})



this.total+=Number(this.tot)
console.log(this.total,this.tot,this.items)
    }
  this.name=''
this.weight=''
this.mc=''

// const datas = await supabase.from('orders').select()
// console.log(datas)
//   event.preventDefault()
  
//     const { error } = await supabase
//   .from('orders')
//   .insert([
//     { order_id: uuidv4(),item_namename: 'chain' ,item_weight:3,unit_price:300,gst:98,advance:300,discount:100},
//     { id: uuidv4(), name: 'bangles' },
//   ])
    //  this.$router.push({
    //             path: '/invoice'
    //         })

      
// console.log(this.items)
}, 
async fake(event){
    event.preventDefault()

    const date=new Date()
    let fn="o"+this.customer.substring(0,3)+(date.getDate().toString())+date.getMonth().toString()+date.getFullYear().toString()+this.phone.substring(8)+Math.floor(Math.random()*100).toString()
    console.log(fn)
    this.items.forEach(x=>{x['order_id']=fn
x['order_status']="false"
x['advance']=this.advance
x['date']=date
})
    console.log(date,this.items)


    const res=await supabase
 .from('orders')
  .insert(this.items)
  this.$router.push({
                path: '/orderRe/'+fn
            })
            console.log("k")

},
}
}



</script>
<style scoped>
.brand{
    text-align: center;
    color: burlywood;
    border: #1a1a1a;
    margin-top: 10px;
}
.order-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  width: 360px;
  padding: 8% 0 0;
  padding-top: 1%;
  margin: auto;
}
.form {
    display: flex;
  position: relative;
  column-gap: 20px;
  z-index: 1;
  background: #FFFFFF;
  width: 700px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form div input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 70%;
  height: 35px;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form .submit:hover,.form button:active,.form button:focus {
  background: #43A047;
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
form{
display: flex;
flex-direction: column;
}
form div{
    display: flex;
    justify-content: flex-start;
    column-gap: 10px;
    align-items: center;
    justify-content: center;
}
form div label{
    width: 100px;
}
.buttons{
    display: flex;
    width: 100%;
    align-items: flex-end;
}
h4{
    color: maroon;
}
li span{
    width: 100%;
}
.old{
z-index: 5;
 display: flex;
  position: absolute;
  top: 50%;
  align-self: flex-start;
  column-gap: 20px;
  background: #FFFFFF;
  width: 430px;
  padding: 22px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
@media (max-width: 480px) {

.form{
     width: 325px;
  padding: 4px;
  flex-direction: column;
}

    
}
button{
    width: 70px;
}
.advance{
    z-index: 5;
 display: flex;
  position: absolute;
  top: 50%;
  align-self: flex-start;
  column-gap: 20px;
  background: #FFFFFF;
  width: 430px;
  padding: 22px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  cursor: pointer;
}
.advdlt button{
    background-color:aqua ;
    border: none;

}

</style>