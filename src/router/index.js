import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import h5 from "../views/h5.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "quill",
    component: index
  },
  {
    path: "/h5/:id",
    name: "h5",
    component: h5
  }
];

const router = new VueRouter({
  routes
});

export default router;
