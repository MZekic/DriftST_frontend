<template>
  <div class="col-4 " >
    
      <div class="mt-4" v-if="info.tournamentName === 'Drift'">
       
        <div class="card mb-4 text-white bg-dark ">
          <img
            class="card-img-top"
            src="https://d23zpyj32c5wn3.cloudfront.net/images/masonry_bricks/pictures/60949/big/DSC_9440_k.jpg?1602746913"
            alt="Card image cap" 
            style= "height: 250px"
          />
          <div class="card-body" >
            <h5 class="card-title">Kategorija: {{ info.tournamentName }}</h5>
            <h5 class="card-title">ID: {{ info._id }}</h5>
            <h5 class="card-title">{{ info.competitors.length }}/16</h5>
            <p class="card-text"></p>
            <button
              class="btn btn-outline-primary"
              v-on:click="joinT(info._id)"
            >
              Priduži se turniru</button
            ><br /><br />
            <div v-if="info.competitors.length === 16">
              <router-link
                :to="{ name: 'brackets', params: { id: info._id } }"
                class="btn btn-outline-primary"
                >Bracket</router-link
              >
            </div>
          </div>
        </div>
      
    </div>
    
      <div class="mt-4" v-if="info.tournamentName === 'Brdo'">
        
        <div class="card mb-4 text-white bg-dark ">
          <img
            class="card-img-top"
            src="https://riautosport.hr/wp-content/uploads/2020/11/IMG_3383-700x525.jpg"
            alt="Card image cap" 
            style= "height: 250px"
          />
          <div class="card-body">
            <h5 class="card-title">Kategorija: {{ info.tournamentName }}</h5>
            <h5 class="card-title">ID: {{ info._id }}</h5>
            <h5 class="card-title">{{ info.competitors.length }}/16</h5>
            <p class="card-text"></p>
            <button
              class="btn btn-outline-primary"
              v-on:click="joinT(info._id)"
            >
              Priduži se turniru</button
            ><br /><br />
            <div v-if="info.competitors.length === 16">
              <router-link
                :to="{ name: 'brackets', params: { id: info._id } }"
                class="btn btn-outline-primary"
                >Bracket</router-link
              >
            </div>
          </div>
        
      </div>
    </div>
    
      <div class="mt-4" v-if="info.tournamentName === 'Kronometar'">
       
        <div class="card mb-4 text-white bg-dark ">
          <img
            class="card-img-top"
            src="data:image/jpeg;base64,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"
            alt="Card image cap"
          
          style= "height: 250px"/>
          <div class="card-body">
            <h5 class="card-title">Kategorija: {{ info.tournamentName }}</h5>
            <h5 class="card-title">ID: {{ info._id }}</h5>
            <h5 class="card-title">Mjesta: {{ info.competitors.length }}/16</h5>
            <p class="card-text"></p>
            <button
              class="btn btn-outline-primary"
              v-on:click="joinT(info._id)"
            >
              Priduži se turniru</button
            ><br /><br />
            <div v-if="info.competitors.length === 16">
              <router-link
                :to="{ name: 'brackets', params: { id: info._id } }"
                class="btn btn-outline-primary"
                >Bracket</router-link
              >
            </div>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Tournaments } from "@/services";
import store from "@/store.js";

export default {
  props: ["info"],
  name: "tournamentscomp",

  data() {
    return {};
  },

  methods: {
    async joinT(_id) {
      await Tournaments.joinTournament(_id);
      console.log(_id);
    },
  },
};
</script>
