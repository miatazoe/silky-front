<template>
  <v-main>
    <v-container>
       <v-layout wrap>
       <v-flex v-for="product in products" :key="product.id" xs12 sm6 md4>
        <DisplayProduct :product="product" />
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
        //製品情報を取得
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
