import { createRouter, createWebHashHistory } from "vue-router";
import HomeTasks from "../views/HomeTasks.vue";

const routes = [
  {
    path: "/",
    name: "hometasks",
    component: HomeTasks,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
