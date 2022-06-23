<template>
<v-main>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="teal lighten-3">
                <v-toolbar-title>予約フォーム</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="お名前"
                    required
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
                <v-btn rounded color="teal lighten-3" @click="submit" class="white--text">送信</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</v-main>
</template>

<script>
// import axios from 'axios'
// const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {
  data: () => ({
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
    // validate () {
    //   this.$refs.form.validate()
    // },
    // reset () {
    //   this.$refs.form.reset()
    // },
    resetValidation () {
      this.$refs.form.submit()
    },
  },
}
</script>

<script>
import axios from 'axios'

const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {

    data() {
        return {
          name: '',
          sex: '',
          tel: '',
          email: '',
          menu: '',
          error: false,
          getUserMessage: ""
        };
    },
    methods: {
        submit() {
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
    }
};
</script>
