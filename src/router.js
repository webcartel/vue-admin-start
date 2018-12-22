import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Login from "./components/Login.vue";

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "frame",
      component: () => import("./components/Frame.vue"),
      meta: { auth: true }
    },
    {
      path: "*",
      redirect: "/",
      meta: { auth: true }
    }
  ]
});
export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.state.auth) {
      next({
        path: "/login"
        // query: {
        //     redirect: '/',
        // },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
