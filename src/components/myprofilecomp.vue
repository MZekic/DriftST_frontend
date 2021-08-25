<template>
  <div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{info.tournamentName}}, {{info._id}} </li>

    </ul>
  </div>
</template>
<script>
import { Tournaments } from "@/services";
import store from "@/store.js"

export default {
  props:["info"],
  name: 'myprofilecomp',
 
 
 
}
</script>

