<template>
  <div class="container">
    <h3 class="pb-3 mb-4 font-italic border-bottom text-white">
      Informacije o turnirima
    </h3>
    <div>
      <statisticscomp
        v-for="statistic in statistics"
        :key="statistic._id"
        :statistic="statistic"
      />
    </div>
  </div>
</template>

<script>
import { Tournaments } from "@/services";
import statisticscomp from "@/components/statisticscomp.vue";
export default {
  name: "tournaments",
  data() {
    return {
      statistics: [],
    };
  },

  created() {
    this.dbGetStatistics();
  },

  methods: {
    async dbGetStatistics() {
      this.statistics = await Tournaments.getStatistics();
      console.log("abc", this.statistics);
    },
  },

  components: {
    statisticscomp,
  },
};
</script>
