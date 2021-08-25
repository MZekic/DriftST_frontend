<template>
  <div class="card mb-3" style="width: 100%;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID turnira: {{ statistic._id }}</li>
      <li class="list-group-item">Kategorija: {{ statistic.tournamentName }}</li>
      <li class="list-group-item">
        broj slobodnih mjesta {{ 16 - statistic.numberOfCompetitors }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Tournaments } from "@/services";
import store from "@/store.js";

export default {
  props: ["statistic"],
  name: "tournamentscomp",

  data() {
    return {};
  },

  
};
</script>
