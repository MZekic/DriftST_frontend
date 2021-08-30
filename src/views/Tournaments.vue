<template>
  <div class="container">
    <h3 class="pb-3 mb-4 font-italic border-bottom text-white">
      Turniri
    </h3>

    <div v-if="username == 'Admin'">
      <h4 class="pb-1 mb-1 font-italic  text-white">
        Kreiraj turnir
      </h4>
      <form @submit.prevent="createT">
        <select v-model="tournamentName">
          <option value="Drift">Drift</option>
          <option value="Kronometar">Kronometar</option>
          <option value="Brdo">Brdo</option>
        </select>
        <button type="submit" class="btn btn-dark">Submit</button>
      </form>
      <h4 class="pb-3 mb-4 font-italic  text-white">
        Izbriši turnir
      </h4>
      <form @submit.prevent="deleteT">
        <input
          type="text"
          v-model="_id"
          class="form-control"
          placeholder="Unesi id turnira"
        />
        <button type="submit" class="btn btn-dark">delete</button>
      </form>
    </div>

    <div class="row align-items-start">
      <tournamentscomp
        v-for="tournament in tournaments"
        :key="tournament._id"
        :info="tournament"
      />
      </div>
    
  </div>
</template>

<script>
import { Tournaments } from "@/services";
import tournamentscomp from "@/components/tournamentscomp.vue";

export default {
  name: "tournaments",
  data() {
    return {
      tournamentName: "",
      tournaments: [],
      username: "",
      statistics: [],
      _id: "",
    };
  },

  created() {
    this.dbGet();
    this.checkAdmin();
  },

  methods: {
    async createT(_id) {
      await Tournaments.createTournament(
        this.tournamentName,
        _id
      );
      this.dbGet();
      // this.$router.go();
    },
    async deleteT(_id) {
      await Tournaments.deleteTournament(this._id);
      this.dbGet();
    },

    async dbGet() {
      this.tournaments = await Tournaments.getTournaments();
    },
    async checkAdmin() {
      this.username = await Tournaments.getUsername();
    },
  },

  components: {
    tournamentscomp,
  },
};
</script>
