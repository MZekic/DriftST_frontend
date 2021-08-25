<template>
  <div class="container">
    <h2>{{ getUser.username }}</h2>

    <h4>
      <div>
        <b-button variant="primary"  v-b-modal.modal-1 >Promjena lozinke</b-button>

        <b-modal id="modal-1" title="Promjena lozinke">
          <section class="mb-5 text-center">
            

            <form @submit.prevent="changePw">
              <div class="md-form md-outline">
                <b-form-input type="password" v-model="old_password" id="oldPass" class="form-control" />
                <label data-error="wrong" data-success="right" for="oldPass"
                  >Stara lozinka</label
                >
              </div>

              <div class="md-form md-outline">
                <b-form-input type="password" v-model="new_password" id="newPass" class="form-control" />
                <label
                  data-error="wrong"
                  data-success="right"
                  for="PassConfirm"
                  >Nova lozinka</label
                >
              </div>

              <button type="submit" class="btn btn-primary mb-4">
                Promijeni lozinku
              </button>
            </form>
          </section>
        </b-modal>
      </div>
    </h4>

    <h4>Turniri</h4>
    <div>
      <myprofilecomp v-for="user in users" :key="user._id" :info="user" />
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import { Auth } from "@/services";
import { Tournaments } from "@/services";
import myprofilecomp from "@/components/myprofilecomp.vue";

export default {
  data() {
    return {
      ...Auth.state,
      users: {},
    };
  },

  created() {
    this.dbGet();
    console.log(this.users);
  },

  methods: {
    async dbGet() {
      this.users = await Tournaments.getMyProfile();
      console.log("juzer", this.users);
    },
    async changePw() {
      let success = await Auth.changeYourPassword(this.username,this.old_password, this.new_password);
      console.log("Rez prijave", success);
      if (success == true) {
        // this.$router.push({ name: "myprofile" });
        this.$router.go()
      }
    },
  },

  components: {
    myprofilecomp,
  },
};
</script>

<style scoped>
/*use-itty-bitty-template*/
body {
  background: #ececec;
}
h1,
h2,
h3,
h4,
h5 {
  border-bottom: 1px solid #ccc;
  color: #f1f2fa;
  padding-bottom: 8px;
}
.container {
  margin: auto;
  width: 350px;
  text-align: center;
}
.listFlex {
  display: flex;
  justify-content: center;
}

img {
  width: 100%;
}
botun {
  width: 100%;
}
</style>
