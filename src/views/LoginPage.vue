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
                        label="email"
                        type="text"
                        v-model="email"
                        color="teal lighten-3"
                    ></v-text-field>
                    <v-text-field
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        v-model="password"
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
            password: '',
            error: false,
            getUserMessage: ""
        };
    },
    methods: {
        login(){
            axios.get(apiDomain+'/sanctum/csrf-cookie',{ withCredentials: true })
                .then(() => {
                    axios.post(apiDomain+'/api/login', {
                        email: this.email,
                        password: this.password,
                    }, { withCredentials: true })
                    .then((res) => {
                        console.log(res.status);
                        if( res.status == 200 ) {
                            this.$store.dispatch('auth',{
                                email : res.data.email,
                                name : res.data.name,
                            })
                            this.$router.push('/');
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
