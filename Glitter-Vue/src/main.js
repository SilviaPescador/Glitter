import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "material-icons/iconfont/material-icons.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./assets/styles.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

createApp(App).use(router).use(VueAwesomePaginate).mount("#app");
