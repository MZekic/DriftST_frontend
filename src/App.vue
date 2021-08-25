<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <router-link class="navbar-brand" style ="font-family: 'Brush Script MT', cursive;" to="/"><i class="fas fa-car"></i> Split Drift</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="/competitors"
      v-if="authenticated"
        >Natjecatelji</router-link
      >

      <router-link class="navbar-brand" to="/tournaments"
      v-if="authenticated"
        >Dostupni turniri</router-link
      >

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li></li>
        </ul>
        <router-link
          v-if="!authenticated"
          class="btn btn-primary my-2 my-sm-0 mr-2"
          to="/login"
          >Prijava</router-link
        >
        <span v-if="authenticated">
          <router-link
          class ="mr-2" style ="color: black ; text-decoration: none"
            :to="{ name: 'myprofile', params: { username: getUser.username } }"
            >{{ getUser.username }}</router-link
          >
          <a @click="logout" class="btn btn-primary" href="#">Logout</a>
        </span>
        <router-link
          v-if="!authenticated"
          class="btn btn-outline my-2 my-sm-0 mr-2"
          to="/signup"
          >Registracija</router-link
        >
      </div>
    </nav>

    <router-view />

    <div id="footer" class="text-center mt-5" style="color: white">2021</div>
  </div>
</template>

<script>
import store from "@/store.js";
import { Auth } from "@/services";

export default {
  data() {
    return {
      ...Auth.state,
    };
  },

  methods: {
    logout() {
      Auth.logout();
      this.$router.go();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
