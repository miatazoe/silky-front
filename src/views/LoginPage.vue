<!--<template>
    <div>
        <h2>Login</h2>
        <p class="mt-2 text-danger">テスト</p>
        <form @submit.prevent="login">
            <label><input v-model="email" placeholder="email"></label>
            <label><input v-model="pass" placeholder="password"></label>
            <br>
            <button type="submit">ログイン</button>
        </form>
    </div>
</template> -->


<template>
<v-main>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="teal lighten-3">
                <v-toolbar-title>マイページにログインする</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        id="email"
                        name="email"
                        label="email"
                        type="text"
                        color="teal lighten-3"
                    ></v-text-field>
                    <v-text-field
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        color="teal lighten-3"
                    ></v-text-field>
                </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="teal lighten-3" @click="login" class="white--text">ログイン</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</v-main>
</template>

<script>
import axios from 'axios'

const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {

    data() {
        return {
            email: '',
            pass: '',
            error: false,
            getUserMessage: ""
        };
    },
    methods: {
        login() {
            console.log('test')
            axios.get(apiDomain+'/sanctum/csrf-cookie')
                .then(() => {
                    axios.post(apiDomain+'/api/login', {
                        email: this.email,
                        password: this.pass,
                    })
                    .then((res) => {
                        if( res.data.status_code == 200 ) {
                            this.$router.push("/home");
                        }
                        this.getUserMessage = 'ログインに失敗しました。'
                    })
                    .catch((err) => {
                        console.log(err);
                        this.getUserMessage = 'ログインに失敗しました。'
                    })
                })
                .catch(() => {
                //
                })
        }
    }
};
</script>
