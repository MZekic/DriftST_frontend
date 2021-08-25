<template>
  <div>
    <h1>REGISTRACIJA</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="signup">
            <div class="form-group">
              <label for="username">Korisničko ime </label>
              <input
                type="text"
                v-model="username"
                class="form-control"
                id="username"
                placeholder="Unesite korisničko ime"
              />
            </div>
            <div class="form-group">
              <label for="username">Ime</label>
              <input
                type="text"
                v-model="name"
                class="form-control"
                id="name"
                placeholder="Unesite vaše ime"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Lozinka</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Lozinka"
              />
            </div>
            <div class="form-group">
              <span>Izaberite kategoriju: {{ selected }}</span>
              <select v-model="selected">
                <option>Drift</option>
                <option>Kronometar</option>
                <option>Brdo</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary btn-lg">Potvrdi</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import { Auth } from "@/services";
export default {
  data(){
    selected
    username,
    password,
    name
  },
  
  methods: {
    async signup() {
      let success = await Auth.signup(this.username,this.password, this.name, this.selected);
      console.log("Rez prijave", success);
      if (success == true) {
        this.$router.push({ name: "home" });
        this.$router.go()
      }
    },
  },
};
</script>
