<template>
  <v-card
    class="ma-2"
    min-width="200"
    max-width="300"
    elevation="2"
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
      <ReservationForm :productId="product.id"/>
    </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import ReservationForm from "@/components/ReservationForm";

export default {
    name: 'DisplayProduct',
    components: {
      ReservationForm
    },
    props: {
      product: {
        type: Object,
        require : true,
      }
    },
    data() {
      return {

      }
    },
    methods: {
    }
};
</script>
