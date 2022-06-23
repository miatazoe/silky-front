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
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

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
};
</script>
