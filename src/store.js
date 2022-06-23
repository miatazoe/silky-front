import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isAuthenticated: false,
        email: "",
        name: ""
    },
    mutations: {
        setUser(state, user) {
            state.isAuthenticated = true,
            state.email = user.email
            state.name = user.name
        },
        deleteUser(state) {
            state.isAuthenticated = false;
            state.email = "";
            state.name = "";
        },
    },
    actions: {
        auth(context, user) {
            context.commit('setUser', user)
        },
    },
    getters: {
        getUserName(state) {
            return state.name;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        }
    },
    modules: {},
})

export default store