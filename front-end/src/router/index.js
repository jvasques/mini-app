import Vue from "vue";
import VueRouter from "vue-router";
import ListaUsuarios from "../components/ListaUsuarios.vue";
import FormRegister from "../components/FormRegister.vue";

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

router.replace("/usuarios/listar");

export default router;
