import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthGuard } from "./authGuard";
import { isAuthenticated } from "./authGuard";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // beforeEnter: isAuthenticated,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    // beforeEnter: useAuthGuard,
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignupView.vue"),
  },
  {
    path: "/new-password",
    name: "new-password",
    component: () =>
      import(
        /* webpackChunkName: "new-password" */ "../views/PasswordView.vue"
      ),
  },
  {
    path: "/public",
    name: "public",
    beforeEnter: isAuthenticated,
    component: () =>
      import(/* webpackChunkName: "public" */ "../views/PublicView.vue"),
  },
  {
    path: "/private",
    name: "private",
    beforeEnter: useAuthGuard,
    component: () =>
      import(/* webpackChunkName: "private" */ "../views/PrivateView.vue"),
  },
  {
    path: "/unsubscribe",
    name: "unsubscribe",
    beforeEnter: useAuthGuard,
    component: () =>
      import(
        /* webpackChunkName: "unsubscribe" */ "../views/UnsubscribeView.vue"
      ),
  },
  {
    path: "/public-plus",
    name: "public-plus",
    component: () =>
      import(/* webpackChunkName: "public-plus" */ "../views/PublicPlusView.vue"),
  },
  {
    path: "/user-profile",
    name: "profile",
    beforeEnter: useAuthGuard,
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/UserProfileView.vue"),
  },
  {
    path: "/landing-page",
    name: "landing",
    component: () =>
      import(/* webpackChunkName: "landing" */ "../views/LandingPageView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

