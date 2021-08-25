<template>
  <div class="row">
  <div class="mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Korisničko ime: {{info.username}}</h5>
        <p class="card-text">Ime: {{info.name}}</p>
        <p class="card-text">Kategorija: {{info.selected}}</p>

        
      </div>
    </div>
  </div>
  
</div>
</template>



<script>
import { allCompetitors } from "@/services";
import store from "@/store.js"


export default {
  props:["info"],
  name: 'competitorscomp',
 
 
 
}
</script>

<style scoped>
#dgmd {
  margin-top: 30%;
  padding: 50px;
}
.fa {
  color: yellow;
  font-size: 100px;
}
#pods {
  color: white;
  font-size: 20px;
  padding: 7px;
}
li {
  list-style-type: none;
}
.row {
  width: 100%;
}
.column {
  padding: 35px;
  float: left;
  width: 50%;
}
.column2 {
  padding: 60px;
  float: left;
  width: 20%;
}
.column3 {
  padding: 0px;
  float: left;
  width: 10%;
}
.column4 {
  padding: 0px;
  float: right;
  width: 10%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
#userinfo {
  margin-top: 3%;
  position: absolute;
}
#imekor {
  position: relative;
  font-size: 20px;
  color: white;
  margin-top: 9px;
}
#avatar {
  padding: 5px;
  border-radius: 50%;
  height: 110px;
}
.igraci {
  background: rgb(20, 20, 20);
  margin-top: 2%;
  width: 100vw;
  height: 240px;
  border-bottom: solid 1px white;
  border-top: solid 1px white;
}
</style>
