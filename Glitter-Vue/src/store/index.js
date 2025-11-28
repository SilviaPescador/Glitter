import { createStore } from "vuex";
import auth from "./modules/auth";
import notifications from "./modules/notifications";
import search from "./modules/search";

const store = createStore({
  modules: {
    auth,
    notifications,
    search,
  },

  // Estado global
  state: {
    appVersion: "1.0.0",
  },

  // Para debugging en desarrollo
  strict: process.env.NODE_ENV !== "production",
});

export default store;
