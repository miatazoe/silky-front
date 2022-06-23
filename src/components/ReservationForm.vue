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
            v-model ="name"
            :counter="10"
            :rules="nameRules"
            label="お名前"
            disable
            color="teal lighten-3"
          ></v-text-field>
          <v-select
            v-model="sex"
            :items="sexitems"
            :rules="sexRules"
            label="性別"
          ></v-select>
          <v-text-field
            v-model="tel"
            :rules="telRules"
            label="電話番号"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            required
          ></v-text-field>
          <v-select
            v-model="menu"
            :items="menuitems"
            :rules="menuRules"
            label="メニュー"
            required
          ></v-select>
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
  data: () => ({
    //general
    dialog: false,
    name: this.$store.getters.getUserName,
    sex: '',
    tel: '',
    email: '',
    menu: '',
    error: false,
    getUserMessage: "",
    //form
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '氏名は必ず入力してください。',
      v => (v && v.length <= 10) || '氏名は10文字以内です入力してください。',
    ],
    sex: null,
    sexitems: [
      '男性',
      '女性',
      '選択しない',
    ],
    sexRules: [
      v => !!v || '性別は必ず選択してください。',
    ],
    tel: '',
    telRules: [
      v => !!v || '電話番号は必ず入力してください。',
      v => /.+@.+\..+/.test(v) || '正しい値で入力してください。',
    ],
    email: '',
    emailRules: [
      v => !!v || 'メールアドレスは必ず入力してください。',
      v => /.+@.+\..+/.test(v) || '正しいアドレス形式で入力してください。',
    ],
    menu: null,
    menuitems: [
      '全身脱毛',
      '光フェイシャル',
      'VIO+脱毛',
      'おまかせコース',
    ],
    menuRules: [
      v => !!v || 'メニューは必ず選択してください。',
    ],
    checkbox: false,
  }),

  methods: {
    resetValidation () {
      this.$refs.form.submit()
    },
    submit() {
      alert('submitted'),
      this.$refs.form.submit()
      console.log('test')
      axios.get(apiDomain+'/sanctum/csrf-cookie')
            .then(() => {
              axios.post(apiDomain+'/api/reservations/create', {
                name: this.name,
                sex: this.sex,
                tel: this.tel,
                email: this.email,
                menu: this.menu,
            })
            .then((res) => {
                if( res.data.status_code == 200 ) {
                    this.$router.push("/reservation");
                }
                this.getUserMessage = '予約に失敗しました、もう一度試してください。'
            })
            .catch((err) => {
                console.log(err);
                this.getUserMessage = '予約保存に失敗しました。'
            })
        })
        .catch(() => {
        //
        })
      }
  },
}
</script>
