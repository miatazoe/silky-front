<template>
  <v-main>
    <v-container>
       <v-layout wrap>
       <v-flex v-for="product in products" :key="product.id" xs12 sm6 md4>
        <DisplayProduct :product="product" />
          <!-- <v-card
            class="ma-2"
            min-width="200"
            max-width="300"
            elevation="4"
          >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{product.name}}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-3">
            所要時間 : {{product.duration}}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>{{product.description}}</div>
            <div>￥{{product.price}}</div>
          </v-card-text>
          <v-row class="justify-end">
          <v-card-actions>
            <v-btn
            color="orange"
            text
            class="mr-2"
            v-on:click="openResevation"
            >
            予約する
            </v-btn>
          </v-card-actions>
          </v-row>
          </v-card> -->
      </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'
import DisplayProduct from '@/components/DisplayProduct.vue';
const apiDomain = process.env.VUE_APP_API_DOMAIN

  export default {
    components: { DisplayProduct },
    data() {
        return {
            products: null
        };
    },
    methods: {},
    created() {
        //ログインへリダイレクト
        console.log(!this.$store.getters.isAuthenticated);
        if (!this.$store.getters.isAuthenticated) {
            this.$router.push("/login");
        }
        axios.get(apiDomain + "/api/products", { withCredentials: true })
            .then((res) => {
            console.log(res);
            if (res.status == 200) {
                this.products = res.data;
            }
        });
    },
}
</script>
