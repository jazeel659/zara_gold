<template>
    <div class="page">
        
    <div>
<h1>ZARA GOLD</h1>
<h4>cheemeni</h4>

    </div>
<div class="home">

<button @click="onOrder">sales</button>
<button @click="newOrder">order</button>
<button @click="onBill">bill search</button>
<button @click="onOrm">order list</button>





</div>

</div>




</template>
<script>

export default{

 methods: {
    onOrm(){
 this.$router.push({
                path: '/orlist'
            })


    },
onBill(){
     this.$router.push({
                path: '/bs'
            })
},
onOrder(){
     this.$router.push({
                path: '/order'
            })
},
newOrder(){
     this.$router.push({
                path: '/newo'
            })
}



 },



}

</script>
<style scoped>
.page{
    height: 100vh;
    display: flex;
    column-gap: 20px;
    align-items: center;
    justify-content: center;


}
.page div{
   box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

}
.home{
   height: 150px;
   width: 150px;
   box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   border-radius: 7px;
  background: #43A047;
}
.home:hover{
    background-color:silver;
}
button{
    width: 50px;
  margin: 0;

}
button:hover{
  background: #43A047;
  cursor: pointer;
  border: none;
  color: white;
  z-index: 5;
 
}


h1{
       color: burlywood;
}
h4{
    margin: 0;
}

</style>