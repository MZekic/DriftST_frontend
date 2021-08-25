<template>
  <div>
    <competitorscomp v-for="competitor in competitors" :key="competitor.username" :info="competitor"/>
        </div>

  
</template>

<script>

import { allCompetitors } from "@/services";
import competitorscomp from "@/components/competitorscomp.vue";


export default {
  data() {
    return {
      competitors: []
    };
  },

  
  created() {
    this.dbGet();
  },

  methods: {
    async dbGet() {
      this.competitors = await allCompetitors.getCompetitors();
      console.log(this.competitors)
    },
  },
  components: {
    competitorscomp
    
  },
};
</script>
