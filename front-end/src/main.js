import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ListaUsuarios from "./components/ListaUsuarios.vue";
import FormRegister from "./components/FormRegister.vue";

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: "/", component: ListaUsuarios },
  { path: "/usuarios/cadastrar", component: FormRegister },
  { path: "/usuarios/editar/:id", component: FormRegister, props: true },
];

const router = new VueRouter({
  routes,
  mode: "hash",
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
