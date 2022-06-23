<template>
  <v-app>
    <v-app-bar
      color="teal lighten-3"
      dark
      max-height="64px"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src=""
          transition="scale-transition"
          width="40"
        />
        <h1>
          Silky
        </h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2">{{loginUserName}}</span>
      </v-btn>
      <v-btn
        text
        color="red"
        v-on:click="logout"
        v-if="loginUserName != ''"
      >
      ログアウト
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {
  name: 'App',
  components: {
  },
  computed: {
    loginUserName() {
      return this.$store.getters.getUserName
    }
  },
  data: () => ({
    //
  }),
  methods: {
    logout(){
      axios.get(apiDomain+'/sanctum/csrf-cookie',{ withCredentials: true })
          .then(() => {
              axios.post(apiDomain+'/api/logout', {
              }, { withCredentials: true })
              .then((res) => {
                  if( res.status == 200 ) {
                      this.$store.dispatch('logout')
                      this.$router.push('/login');
                  }
              })
              .catch((err) => {
                  console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          })
    }
  }
};
</script>
