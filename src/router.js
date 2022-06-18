import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import LoginPage from "./views/LoginPage.vue";
import HomePage from "./views/HomePage.vue";

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "LoginPage",
            component: LoginPage,
        },
        {
            path: "/home",
            name: "HomePage",
            component: HomePage,
        }
    ]
});

export default router;
