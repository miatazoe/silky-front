import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import LoginPage from "./views/LoginPage.vue";
import HomePage from "./views/HomePage.vue";
import CustomerPage from "./views/CustomerPage.vue";

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
        },
        {
            path: "/customer",
            name: "CustomerPage",
            component: CustomerPage,
        },
    ]
});

export default router;
