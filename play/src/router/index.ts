import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/alert",
    name: "Alert",
    component: () => import("../views/Alert.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
