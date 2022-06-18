<template>
  <v-main>
    <v-container fluid fill-height>
      <v-calendar
        locale="ja-jp"
        :columns="2"
        title-position="center"
      ></v-calendar>
    </v-container>
  </v-main>
</template>
<script>
export default {
    name: 'HomePage',
    data: () => ({}),
  }
</script>
