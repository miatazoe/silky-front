import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import LoginPage from "./views/LoginPage.vue";
import HomePage from "./views/HomePage.vue";
import CustomerPage from "./views/CustomerPage.vue";
import store from '@/store.js';

import axios from 'axios'
const apiDomain = process.env.VUE_APP_API_DOMAIN

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/login",
            name: "LoginPage",
            component: LoginPage,
        },
        {
            path: "/home",
            name: "HomePage",
            component: HomePage,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: "/",
            name: "CustomerPage",
            component: CustomerPage,
            meta:{
                requiresAuth:true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(!store.getters.isAuthenticated){
            axios.get(apiDomain+'/api/me',
            { withCredentials: true })
            .then((res) => {
                if(res.status != 200) {
                next({name: 'LoginPage'})
                }
            })
            .catch(() => {
                next({name: 'LoginPage'})
            })
        }
    }
    next();
});
export default router;
