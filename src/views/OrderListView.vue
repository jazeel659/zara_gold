<template>
<div class="main">
<ul v-if="list.length>0">
    <h2>orders</h2>
    <li v-for="item in list" >
<span>{{item.name}}</span>
<span>{{ item.order_id }}</span>
         <button class="edit" @click="onEdit(item.order_id)" ><Icon icon="material-symbols:edit-document-rounded" /></button> 
</li>
</ul>

</div>
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
        list:[],


    }

},
methods:{
    onEdit(id){
  this.$router.push({
                path: '/orderRe/'+id
            })
    },},
async created(){

      const cars  = await supabase.from("orders").select().eq('order_status',"false")
      console.log(cars.data)
      this.dat=cars.data
        let a=[]
   let b= this.dat.forEach(element => {
    if(a.indexOf(element['order_id'])<0){
        a.push({'name':element['customer_name'],'order_id':element['order_id']})}
    })
    console.log(this.dat,a)
    this.list=a

},

}

</script>


<style scoped>

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
.main
{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>