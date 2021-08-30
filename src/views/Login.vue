<template>
  <div>
    <h1>PRIJAVA</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="username">Korisničko ime</label>
              <input type="text" v-model="username" class="form-control" id="username"  placeholder="Unesite korisničko ime">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Lozinka</label>
              <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Lozinka">
            </div>
            <button type="submit" class="btn btn-primary mt-5">Submit</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import store from '@/store.js'
import { Auth } from '@/services'
export default {


  data(){
    return{

    }
  },
  methods: {
    async login () {
      let success = await Auth.login(this.username, this.password)
      console.log('Rez prijave', success)
      if (success == true){
        this.$router.push({name: 'home' })
        this.$router.go()
      
      }
    }

  }
}
</script>
