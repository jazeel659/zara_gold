<template><div class="cont"><div><button @click="onPdf">pdf</button><button  @click="ondis">discount</button></div><div class="container" id="pdf" ref="document">
    
    <div class="header">
<div><h1>ZARA GOLD</h1>
<h5>cheemeni,kasargode</h5>
<h5>9876543210</h5>

</div >
<div><h1>order</h1></div>
<div><h4 class="details"> {{(datanew[0].created_at).substring(0,10).split("-").reverse().join("/") }}</h4><h3  class="details">{{ datanew[0].order_id }}</h3><h3  class="details">{{  datanew[0].customer_name
}}</h3><h3  class="details">{{ datanew[0].customer_phone }}</h3></div>

</div>
<div class="main">
    <div v-if="error" class="error"><h1>no bill found</h1></div>
<table class="old">
    <tr>
<th class="head">sl no.</th>
<th class="head">item</th>
<th class="head">weight</th>
<th class="head">M/C</th>
<th class="head">gst</th>
<th class="head">price</th>
    </tr>

</table>
<table class="new">
    <tr v-for="(item,index) in datanew">

        <th>{{ index+1 }}</th>

        <th>{{ item.item_name }}</th>
        <th>{{item.item_weight}}</th>
        <th>{{ Math.floor(item.m_c *item.item_weight * item.unit_price/100 )}}({{ item.m_c==null?"--":item.m_c}}%)</th>
        <th>{{ Math.floor(Number( item.item_weight * item.unit_price *0.03))}}({{item.gst==null?"--":item.gst}}%)</th>
        <th>{{ ((item.unit_price)*(item.item_weight)*(1+(item.m_c)/100)*(1+(item.gst)/100)).toFixed(2) }}</th>


    </tr>



</table>
<div>total: {{fullAmount}}</div>
<div class="advance">advance:{{datanew[0].advance  }}</div>
<div class="discount" v-if="discount">discount:{{ discount}}</div>
<div class="net-amount">amount to be paid:{{ (fullAmount-datanew[0].advance -discount).toFixed(2)}}</div>
<div class="discount" v-if="isdiscount"><label for="discount">discount amount</label>
<input type="number" id="discount" placeholder="enter discount amount" v-model="discount"><button @click="onDiscount">submit</button><button @click="onCa">cancel</button></div>
</div>


<div class="footers">

<h4>***THANK YOU***</h4>



</div></div>
<div class="bu">
<button @click="onCmp">ORDER-complted</button>

<button @click="onDel">delete bill</button>
</div>
</div>

</template>
<script>
import { supabase } from "../supabase";
import html2pdf from "html2pdf.js"


export default {

 data() {
    return {
id:'',
datanew:[],
total:0,
fullAmount:null,
isdiscount:false,
discount:null,
error:false,
    }

    },
    computed:{

        
        full(){

         
        }

    },
    methods:{
        async onCmp(){
        event.preventDefault()
        const result=await supabase
  .from('orders')
  .update({ 'order_status': 'true' })
  .eq('order_id',this.$route.params.id)
        console.log(result)

        },
      async  onDel(){
        event.preventDefault()

const { error } = await supabase
  .from('orders')
  .delete()
  .eq('order_id',this.$route.params.id)
console.log("k")

        },
     async   onDiscount(){
        event.preventDefault()


const result = await supabase
  .from('orders')
  .update({ 'discount': this.discount })
  .eq('order_id',this.$route.params.id)
this.isdiscount=false
        },
        onCa(){
            this.isdiscount=false
console.log("k")

        },
        ondis(){

this.isdiscount=true
console.log("k")
        },
    onPdf(event){
event.preventDefault()
        console.log("k")
	html2pdf(document.getElementById('pdf'));
    }},
   async created() {
    
    console.log(this.$route.params.id)
    const cars  = await supabase.from("orders").select().eq('order_id',this.$route.params.id)
console.log(cars)
    this.datanew = cars.data;
    this.discount=this.datanew[0].discount;
    console.log(this.datanew);

    let pr=0
     this.datanew.forEach(item=>pr+=((item.unit_price)*(item.item_weight)*(1+(item.m_c)/100)*(1+(item.gst)/100)))  
     this.fullAmount=pr.toFixed(2)
    console.log(this.fullAmount)
  },


 
}



</script>

<style>

.container{
    display: flex;
    flex-direction: column;
    justify-self: center;
    margin: auto;
    padding: 20px;
    width: 90vw;
}
#pdf{
    border: 2px solid black;
padding: 2px;
margin-top: 8px;
padding: 12px;
    margin: auto;
    margin-top: 20px;
width: 700px;

}
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid grey;
}
.main{
    
    border-bottom: 3px solid grey;
    
      height: 850px;


    
}
.main div{
    display: flex;
    justify-content: flex-end;
    margin-right: 7%;
    font-size: medium;
    font-style: italic;
    font-weight: bold;
    
}

h1{
    font-family: 'Times New Roman', Times, serif;
}
h1,h5{
    margin: 0;
}
.old{
       width: 100%;
 text-align: center;
}
th{
    width: 170px;
}
.new{
    width: 100%;
 
    border-bottom: 1px solid grey;
}
tr:first-child{
    font-weight: bolder;
}
.head{
    font-weight: bolder;
    color: brown;
    border-bottom: 1px solid grey;
}
.advance{
    margin-top: 30px;
}
.cont{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h3,h4{
    margin: 5px;
}
.details{
        font-size: 14px;
    font-weight: 300;
}
.footers h4{
    text-align:center ;
}
button{
    margin: 3px 10px;
    width: fit-content;
}
.bu{
    display: flex;
    justify-content: space-around;
}
</style>