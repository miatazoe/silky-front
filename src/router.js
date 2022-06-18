import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import LoginPage from "./views/LoginPage.vue";
import HomePage from "./views/HomePage.vue";
import ReservationForm from "./views/ReservationForm.vue";


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
        },
        {
            path: "/reservation",
            name: "ReservationForm",
            component: ReservationForm,
        }

    ]
});

export default router;
