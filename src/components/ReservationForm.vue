<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
  <template v-slot:activator="{ on }">
  <v-btn color="orange" text class="mr-2" v-on="on">
  予約する
  </v-btn>
  </template>
  <v-card>
    <v-card-title>
      <span class="text-h5">予約フォーム</span>
    </v-card-title>
    <v-card-text>
    </v-card-text>
    <v-container>

    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="dialog = false"
      >
        Close
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="dialog = false"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
// import axios from 'axios'

// const apiDomain = process.env.VUE_APP_API_DOMAIN


export default {
  name: 'ReservationForm',
  porps: {
  },
  setup(props){
    console.log(props.dialog)
  },
  data(){
    return {
      dialog: false,
    }
  },
  methods: {
    resetValidation () {
      this.$refs.form.submit()
    },
  },
}
</script>
