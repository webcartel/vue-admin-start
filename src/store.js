import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    auth: false,
    token: null,
    baseRemoteUrl: "http://lvshop/public"
  },
  mutations: {
    setAuth(state, { item }) {
      state.auth = item.auth;
      state.token = item.token;
    }
  },
  actions: {
    auth({ commit }, authData) {
      commit("setAuth", { item: authData });
    }
  },

  plugins: [vuexLocalStorage.plugin]
});
