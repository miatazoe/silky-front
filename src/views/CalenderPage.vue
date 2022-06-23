<template>
  <v-row>
    <v-col>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          color="teal lighten-3"
          type="week"
        ></v-calendar>
      </v-sheet>
</v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
const apiDomain = process.env.VUE_APP_API_DOMAIN

  export default {
    data: () => ({
      today: null,
      events: [
        {
          name: 'Weekly Meeting',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: `Thomas' Birthday`,
          start: '2019-01-10',
        },
        {
          name: 'Mash Potatoes',
          start: '2019-01-09 12:30',
          end: '2019-01-09 15:30',
        },
      ],
    }),
    mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    },
    created () {
        //ログインへリダイレクト
        axios.get(apiDomain + "/api/reservations", { withCredentials: true })
            .then((res) => {
            console.log(res);
            if (res.status == 200) {
                this.events = res.data;
            }
        })
    }
  }
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #a5c3e5;
  color: #88dff0;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 2px;
  margin-right: 0px;
}
</style>