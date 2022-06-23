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
        <v-form ref="form">
          <v-text-field
            v-model="name"
            label="お名前"
            readonly
            color="teal lighten-3"
            required
          ></v-text-field>
          <v-menu
            v-model="datemenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="予約日を選択してください。"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="datemenu = false"
              locale="ja-JP"
            ></v-date-picker>
          </v-menu>
          <v-menu
            ref="menu"
            v-model="timemenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="予約時間を選択してください。"
                prepend-icon="mdi-clock-time-four-outline"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timemenu"
              v-model="time"
              full-width
              format="24hr"
              min="10:00"
              max="19:00"
              scrollable
              :allowed-minutes="m=>m%30 === 0"
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>
          <v-text-field
            v-model="tel"
            label="電話番号"
            required
          ></v-text-field>
          <v-textarea
            v-model="remark"
            label="備考"
          ></v-textarea>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || '必ずチェックしてください']"
            label="上記内容で予約する"
          ></v-checkbox>
        </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="dialog = false"
      >
        閉じる
      </v-btn>
      <v-btn
        rounded color="teal lighten-3"
        @click="submit"
        class="white--text"
      >
        送信
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {
  props: {
    productId: {
      type: Number,
    }
  },
  data() {
    return {
      //general
      dialog: false,
      name: this.$store.getters.getUserName,
      tel: '',

      error: false,
      // getUserMessage: '',
      //form
      valid: false,
      datemenu: false,
      timemenu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null,
      // telRules: [
      //   v => !!v || '電話番号は必ず入力してください。',
      //   v => /.+@.+\..+/.test(v) || '正しい値で入力してください。',
      // ],
      checkbox: false,
      remark: '',
    };
  },

  methods: {
    submit() {
      axios.post(apiDomain+'/api/reservations/store', {
          date: this.date,
          time: this.time,
          tel: this.tel,
          remark: this.remark,
          pid : this.productId
        } ,{
        withCredentials: true
      })
      .then((res) => {
          if( res.data.status_code == 200 ) {
            this.dialog = false
            this.$router.push("/");
          }
          this.getUserMessage = '予約に失敗しました、もう一度試してください。'
      })
      .catch((err) => {
          console.log(err);
          this.getUserMessage = '予約保存に失敗しました。'
      })
    }
  },
}
</script>
