import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/1"
    },
    {
      path: "/:page",
      name: "table",
      component: () => import("@views/Table.vue")
    }
  ]
});
