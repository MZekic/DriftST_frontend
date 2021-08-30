<template>
  <div class="tournament-brackets">
    <div v-if="username == 'Admin'">
      <form @submit.prevent="endT(competitors._id)">
        <button type="submit" class="btn btn-warning">Završi turnir</button>
      </form>
    </div>

    <div class="bracket">
      <template v-for="(round, index) in rounds">
        <div class="round" :key="index" :class="['round-' + round]">
          <template v-for="(match, matchIndex) in round">
            <div class="match" :key="matchIndex">
              <div
                id="foo"
                v-on:click="winner(matchIndex, round, competitors._id)"
                class="match__content"
                :style="matchStyle"
              >
                {{ competitors[`round${round}`][matchIndex] }}
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Tournaments } from "@/services";
const defaultRounds = [16, 8, 4, 2, 1];

export default {
  name: "bracketscomp",
  props: {
    bracketSize: {
      type: Number,
      default: 16,
    },
    matchStyle: {
      type: Object,
      default: () => ({
        backgroundColor: "orange",
        border: "2px solid black",
        color: "black",
        width: "100%",
        height: "30px",
        position: "relative",
        cursor: "pointer",
      }),
    },
  },

  data() {
    return {
      competitors: {},
      _id: "",
    };
  },

  computed: {
    rounds() {
      return defaultRounds.filter((rounds) => rounds <= this.bracketSize);
    },
  },
  created() {
    this.dbGet();
    this.checkAdmin();
  },
  methods: {
    async dbGet() {
      this.competitors = await Tournaments.viewBracket();
    },
    async winner(index, round, _id) {
      if (this.competitors.status != "inactive") {
        await Tournaments.bracketFunction(index, round, _id);
        this.dbGet();
      } else {
        alert("Turnir je zaključan");
      }
      // alert(`ALOHA ${round} ${index}`);
      //  this.$router.go(0)
    },
    async checkAdmin() {
      this.username = await Tournaments.getUsername();
    },
    endT(_id) {
      Tournaments.endTournament(this.competitors.round1[0], _id);
      console.log(status);
      alert(`Pobjednik turnira je ${this.competitors.round1[0]}`);
    },
  },
};
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}

.bracket {
  display: flex;
}

.round {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.round:first-child .match::before {
  display: none;
}

.round:first-child .match__content::before {
  display: none;
}

.round:last-child .match::after {
  display: none;
}

.match {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
  padding: 6px 0;
  flex-grow: 1;
  position: relative;
}

.match::before {
  content: "";
  display: block;
  min-height: 30px;
  border-left: 2px solid red;
  position: absolute;
  left: -10px;
  top: 50%;
  margin-top: -15px;
  margin-left: -2px;
}

.match:nth-child(odd)::after {
  content: "";
  display: block;
  border: 2px solid transparent;
  border-top-color: red;
  border-right-color: red;
  height: 50%;
  position: absolute;
  right: -10px;
  width: 10px;
  top: 50%;
}

.match:nth-child(even)::after {
  content: "";
  display: block;
  border: 2px solid transparent;
  border-bottom-color: red;
  border-right-color: red;
  height: 50%;
  position: absolute;
  right: -10px;
  width: 10px;
  bottom: 50%;
}

.match__content::before {
  content: "";
  display: block;
  width: 10px;
  border-bottom: 2px solid red;
  margin-left: -2px;
  position: absolute;
  top: 50%;
  left: -10px;
}
</style>
